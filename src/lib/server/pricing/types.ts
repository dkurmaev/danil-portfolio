import 'server-only';

/**
 * Interne Preisstufen. Nur `standard` verlässt den Server (siehe
 * `/api/estimate`) — `bekanntschaft`/`familie` sind für manuelle Angebote.
 */
export type PricingLevel = 'standard' | 'bekanntschaft' | 'familie';

export type ItemUnit =
  | 'einmalig'
  | 'monatlich'
  | 'pro_seite'
  | 'pro_sprache'
  | 'pro_abschnitt'
  | 'pro_event'
  | 'pro_bereich';

export interface CatalogItem {
  code: string;
  /** Gruppierung entlang der Projekt-Checkliste (docs/Projekt-Checkliste.pdf), z. B. "website-blocks". */
  category: string;
  unit: ItemUnit;
  /** Aufwand in Stunden bei quantity=1, auf Basis der standard-Stundensatz. */
  hours: number;
}

export interface CatalogPackageEntry {
  itemCode: string;
  quantity: number;
}

export interface CatalogPackage {
  code: string;
  category: string;
  includes: CatalogPackageEntry[];
  /** Stunden, die gegenüber der Summe der Einzelpositionen erlassen werden. */
  discountHours: number;
}

export interface Katalog {
  hourlyRate: number;
  levelMultipliers: Record<PricingLevel, number>;
  items: CatalogItem[];
  packages: CatalogPackage[];
}

/** Vom Client gewählte Position oder Paket + Menge. */
export interface SelectionLine {
  code: string;
  quantity: number;
}

export interface PriceRange {
  min: number;
  max: number;
}

export interface EstimateResult {
  hours: number;
  priceByLevel: Record<PricingLevel, number>;
  /** ±20%-Wilka um `priceByLevel.standard`, Grenzen auf Vielfache von 500 gerundet. */
  standardRange: PriceRange;
}
