import { describe, expect, it } from 'vitest';

import fixtureKatalog from '../katalog.example.json';
import { calculateEstimate, UnknownCodeError } from './calculate';
import type { Katalog } from './types';

// katalog.example.json ist committed (im Gegensatz zu katalog.json) und
// deckt dieselbe Struktur ab — die Tests laufen so auch ohne die echten,
// gitignorten Stundensätze/Koeffizienten.
const katalog = fixtureKatalog as unknown as Katalog;

describe('calculateEstimate', () => {
  it('rechnet eine einzelne Position über alle Preisstufen (hourlyRate=50, hours=2)', () => {
    const result = calculateEstimate(katalog, [
      { code: 'block-hero-startbereich', quantity: 1 },
    ]);

    expect(result.hours).toBe(2);
    expect(result.priceByLevel).toEqual({
      standard: 100, // 2h * 50€
      bekanntschaft: 70, // 2h * 50€ * 0.7
      familie: 50, // 2h * 50€ * 0.5
    });
  });

  it('summiert mehrere Zeilen', () => {
    const result = calculateEstimate(katalog, [
      { code: 'block-hero-startbereich', quantity: 1 }, // 2h
      { code: 'feature-contact-form', quantity: 1 }, // 2h
    ]);

    expect(result.hours).toBe(4);
    expect(result.priceByLevel.standard).toBe(200);
  });

  it('multipliziert mengenbasierte Positionen: pro Seite', () => {
    const result = calculateEstimate(katalog, [
      { code: 'site-page', quantity: 20 },
    ]);

    expect(result.hours).toBe(40); // 2h * 20 Seiten
    expect(result.priceByLevel.standard).toBe(2000);
  });

  it('multipliziert mengenbasierte Positionen: pro Event', () => {
    const result = calculateEstimate(katalog, [
      { code: 'bot-auto-message', quantity: 4 },
    ]);

    expect(result.hours).toBe(6); // 1.5h * 4 Events
    expect(result.priceByLevel.standard).toBe(300);
  });

  it('rundet die standard-Wilka unterhalb von 2000€ auf Vielfache von 100 (±20%)', () => {
    // 20h * 50€ = 1000€ standard → [1000*0.8, 1000*1.2] = [800, 1200] → schon auf 100 exakt.
    const result = calculateEstimate(katalog, [
      { code: 'site-page', quantity: 10 },
    ]);

    expect(result.priceByLevel.standard).toBe(1000);
    expect(result.standardRange).toEqual({ min: 800, max: 1200 });
  });

  it('rundet die standard-Wilka ab 2000€ auf Vielfache von 500 (±20%)', () => {
    // 40h * 50€ = 2000€ standard → [2000*0.8, 2000*1.2] = [1600, 2400] → auf 500 gerundet.
    const result = calculateEstimate(katalog, [
      { code: 'site-page', quantity: 20 },
    ]);

    expect(result.priceByLevel.standard).toBe(2000);
    expect(result.standardRange).toEqual({ min: 1500, max: 2500 });
  });

  it('hebt eine sehr kleine Wilka auf mindestens einen Schritt an, statt bei 0 zu starten', () => {
    // 1.5h * 50€ = 75€ standard → 0.8x rundet unter den 100er-Schritt, die untere Grenze wird angehoben.
    const result = calculateEstimate(katalog, [
      { code: 'bot-auto-message', quantity: 1 },
    ]);

    expect(result.priceByLevel.standard).toBe(75);
    expect(result.standardRange).toEqual({ min: 100, max: 200 });
  });

  it('liefert eine leere Wilka für eine leere Auswahl', () => {
    const result = calculateEstimate(katalog, []);

    expect(result.hours).toBe(0);
    expect(result.priceByLevel).toEqual({
      standard: 0,
      bekanntschaft: 0,
      familie: 0,
    });
    expect(result.standardRange).toEqual({ min: 0, max: 0 });
  });

  it('rechnet ein Paket günstiger als die Summe seiner Einzelpositionen', () => {
    const packageResult = calculateEstimate(katalog, [
      { code: 'pkg-website-starter', quantity: 1 },
    ]);

    const individualResult = calculateEstimate(katalog, [
      { code: 'block-hero-startbereich', quantity: 1 },
      { code: 'block-services-overview', quantity: 1 },
      { code: 'feature-contact-form', quantity: 1 },
      { code: 'seo-technical', quantity: 1 },
      { code: 'legal-cookie-banner', quantity: 1 },
    ]);

    expect(packageResult.priceByLevel.standard).toBeLessThan(
      individualResult.priceByLevel.standard,
    );
    expect(packageResult.priceByLevel.standard).toBe(400); // (10h - 2h discount) * 50€
    expect(individualResult.priceByLevel.standard).toBe(500); // 10h * 50€
  });

  it('wirft bei einem unbekannten Code', () => {
    expect(() =>
      calculateEstimate(katalog, [{ code: 'does-not-exist', quantity: 1 }]),
    ).toThrow(UnknownCodeError);
  });
});
