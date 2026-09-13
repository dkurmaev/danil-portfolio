import 'server-only';

import type {
  Katalog,
  LineBreakdownEntry,
  PriceRange,
  PricingLevel,
  SelectionLine,
  EstimateResult,
} from './types';

/** ±20% um den standard-Preis. */
const RANGE_SPREAD = 0.2;
/** Unterhalb dieser standard-Summe wird auf 100 gerundet, ab hier auf 500 — feste 500 machten kleine Positionen (z. B. eine einzelne Sektion) unbrauchbar ungenau. */
const RANGE_STEP_THRESHOLD = 2000;
const RANGE_STEP_SMALL = 100;
const RANGE_STEP_LARGE = 500;

export class UnknownCodeError extends Error {
  constructor(public readonly code: string) {
    super(`Unbekannter Positions- oder Paketcode: "${code}"`);
    this.name = 'UnknownCodeError';
  }
}

function floorToStep(value: number, step: number): number {
  return Math.floor(value / step) * step;
}

function ceilToStep(value: number, step: number): number {
  return Math.ceil(value / step) * step;
}

/**
 * Aufwand (Stunden) für eine gewählte Zeile. Löst sowohl einzelne
 * Katalogpositionen als auch Pakete auf — ein Paket ist die Summe seiner
 * enthaltenen Positionen abzüglich `discountHours` (siehe §2 "Rundung der
 * Wilka" / "Pakete günstiger als Summe der Positionen").
 */
export function resolveLineHours(
  katalog: Katalog,
  line: SelectionLine,
): number {
  const item = katalog.items.find((entry) => entry.code === line.code);
  if (item) {
    return item.hours * line.quantity;
  }

  const pkg = katalog.packages.find((entry) => entry.code === line.code);
  if (pkg) {
    const includedHours = pkg.includes.reduce((sum, entry) => {
      const includedItem = katalog.items.find(
        (candidate) => candidate.code === entry.itemCode,
      );
      if (!includedItem) {
        throw new UnknownCodeError(entry.itemCode);
      }
      return sum + includedItem.hours * entry.quantity;
    }, 0);

    return Math.max(includedHours - pkg.discountHours, 0) * line.quantity;
  }

  throw new UnknownCodeError(line.code);
}

/**
 * ±20%-Wilka um `standardPrice`. Grenzen sind auf Vielfache von `step`
 * gerundet — `step` selbst hängt von der Größenordnung ab, sonst frisst die
 * Rundung bei kleinen Summen die ±20%-Genauigkeit fast komplett auf (eine
 * einzelne Sektion würde z. B. auf "500–1000" statt "ab ~100" landen).
 */
function buildStandardRange(standardPrice: number): PriceRange {
  if (standardPrice <= 0) {
    return { min: 0, max: 0 };
  }

  const step =
    standardPrice < RANGE_STEP_THRESHOLD ? RANGE_STEP_SMALL : RANGE_STEP_LARGE;

  const min = Math.max(
    step,
    floorToStep(standardPrice * (1 - RANGE_SPREAD), step),
  );
  const max = Math.max(
    min + step,
    ceilToStep(standardPrice * (1 + RANGE_SPREAD), step),
  );

  return { min, max };
}

export function calculateEstimate(
  katalog: Katalog,
  selection: SelectionLine[],
): EstimateResult {
  const hours = selection.reduce(
    (sum, line) => sum + resolveLineHours(katalog, line),
    0,
  );

  const levels = Object.keys(katalog.levelMultipliers) as PricingLevel[];
  const priceByLevel = Object.fromEntries(
    levels.map((level) => [
      level,
      Math.round(hours * katalog.hourlyRate * katalog.levelMultipliers[level]),
    ]),
  ) as Record<PricingLevel, number>;

  return {
    hours,
    priceByLevel,
    standardRange: buildStandardRange(priceByLevel.standard),
  };
}

/**
 * Positionsweise Aufschlüsselung (Stunden + Preis je Stufe) für das interne
 * Angebot per E-Mail (`checklistEmail.ts`) — verlässt den Server nie in
 * dieser Form, siehe CLAUDE.md §4 "Ценовые данные".
 */
export function calculateLineBreakdown(
  katalog: Katalog,
  selection: SelectionLine[],
): LineBreakdownEntry[] {
  const levels = Object.keys(katalog.levelMultipliers) as PricingLevel[];

  return selection.map((line) => {
    const hours = resolveLineHours(katalog, line);
    const priceByLevel = Object.fromEntries(
      levels.map((level) => [
        level,
        Math.round(
          hours * katalog.hourlyRate * katalog.levelMultipliers[level],
        ),
      ]),
    ) as Record<PricingLevel, number>;

    return { code: line.code, quantity: line.quantity, hours, priceByLevel };
  });
}
