import 'server-only';

import { getTranslations } from 'next-intl/server';

import type { AppLocale } from '@/i18n/routing';
import {
  EXISTING_ASSETS,
  type ChecklistFormValues,
} from '@/lib/checklistFormSchema';
import { RESPONSE_TIME_DAYS } from '@/lib/checklistConstants';

import type { EmailMessage } from './email';
import type {
  EstimateResult,
  LineBreakdownEntry,
  PricingLevel,
} from './pricing';

/** Katalog-Optionen leben unter diesen Schritt-Namespaces (siehe messages/de.json). */
const OPTION_NAMESPACES = [
  'blocks',
  'functions',
  'visibility',
  'telegram',
  'webapp',
] as const;

const LEVEL_LABELS: Record<PricingLevel, string> = {
  standard: 'Standard',
  bekanntschaft: 'Bekanntschaft',
  familie: 'Familie',
};

const EMPTY = '—';

interface BuildInternalEmailParams {
  values: ChecklistFormValues;
  breakdown: LineBreakdownEntry[];
  result: EstimateResult;
  recipient: string;
}

/**
 * Volle Smeta per E-Mail an den Betreiber — Positionen mit Preisen auf allen
 * drei Stufen, nie an den Kunden (CLAUDE.md §4 "Ценовые данные"). Immer
 * Deutsch, unabhängig von der Formular-Locale — internes Dokument, kein
 * UI-Text, deshalb feste deutsche Strings statt messages/*.json (das würde
 * eine sinnlose "Übersetzung" in EN/RU erzwingen, die nie verwendet wird).
 * Positions-Labels kommen aus den echten UI-Strings (`Checkliste.steps.*`,
 * immer auf Deutsch geladen), damit sie nicht doppelt gepflegt werden.
 */
export async function buildInternalEmail({
  values,
  breakdown,
  result,
  recipient,
}: BuildInternalEmailParams): Promise<EmailMessage> {
  const t = await getTranslations({
    locale: 'de',
    namespace: 'Checkliste.steps',
  });

  const optionLabel = (code: string): string => {
    for (const namespace of OPTION_NAMESPACES) {
      const key = `${namespace}.options.${code}.label`;
      if (t.has(key)) {
        return t(key);
      }
    }

    const quantityFieldLabels: Record<string, string> = {
      'site-page': t('scope.fields.pageCount'),
      'site-language': t('scope.fields.languageCount'),
      'site-section': t('scope.fields.additionalSections'),
      'bot-auto-message': t('telegram.autoMessageCount.label'),
      'webapp-data-domain': t('webapp.dataDomainCount.label'),
    };
    return quantityFieldLabels[code] ?? code;
  };

  const hasWebsiteGoal =
    values.goals.includes('newWebsite') ||
    values.goals.includes('websiteRelaunch');

  const lines: string[] = [];
  const heading = (title: string) => {
    lines.push(title);
    lines.push('-'.repeat(title.length));
  };
  const list = (labels: string[]) => {
    if (labels.length === 0) {
      lines.push(EMPTY);
      return;
    }
    for (const label of labels) {
      lines.push(`- ${label}`);
    }
  };

  lines.push('NEUE ANFRAGE ÜBER DIE PROJEKT-CHECKLISTE');
  lines.push('');

  heading('Kontakt');
  lines.push(`Name: ${values.name}`);
  lines.push(`Firma: ${values.company || EMPTY}`);
  lines.push(`E-Mail: ${values.email}`);
  lines.push(`Telefon: ${values.phone || EMPTY}`);
  lines.push(`Branche / Tätigkeit: ${values.industry || EMPTY}`);
  lines.push(`Wunschtermin fertig: ${values.desiredDeadline || EMPTY}`);
  lines.push(`Bestehende Website: ${values.existingWebsite || EMPTY}`);
  lines.push(`Ort / Region: ${values.location || EMPTY}`);
  lines.push('');

  heading('Was soll entstehen');
  list(values.goals.map((goal) => t(`goals.options.${goal}.label`)));
  lines.push('');

  if (hasWebsiteGoal) {
    heading('Website · Umfang');
    lines.push(`Anzahl Unterseiten: ${values.pageCount}`);
    lines.push(`Anzahl Sprachen: ${values.languageCount}`);
    lines.push(`Zusätzliche Abschnitte: ${values.additionalSections}`);
    lines.push('');

    heading('Website · Bausteine');
    list(values.blocks.map(optionLabel));
    lines.push('');

    heading('Website · Funktionen');
    list(values.features.map(optionLabel));
    lines.push('');

    heading('Sichtbarkeit, Recht und Auswertung');
    list(values.visibilityItems.map(optionLabel));
    lines.push('');
  }

  if (values.goals.includes('telegramBot')) {
    heading('Telegram-Bot');
    list(values.telegramFeatures.map(optionLabel));
    if (values.telegramAutoMessageCount > 0) {
      lines.push(
        `Automatische Nachrichten: ${values.telegramAutoMessageCount}`,
      );
    }
    lines.push('');
  }

  if (values.goals.includes('webApp')) {
    heading('Webanwendung / Portal');
    list(values.webappFeatures.map(optionLabel));
    if (values.webappDataDomainCount > 0) {
      lines.push(`Verwaltete Datenbereiche: ${values.webappDataDomainCount}`);
    }
    lines.push('');
  }

  heading('Was ist bereits vorhanden');
  for (const asset of EXISTING_ASSETS) {
    const status = values.existingAssets[asset];
    lines.push(
      `${t(`existing.options.${asset}.label`)}: ${
        status ? t(`existing.statuses.${status}`) : EMPTY
      }`,
    );
  }
  lines.push('');

  heading('Nach dem Start');
  lines.push(t(`support.options.${values.supportLevel}.label`));
  lines.push('');

  heading('Anmerkungen');
  lines.push(
    `Was ist Ihnen besonders wichtig: ${values.importantNotes || EMPTY}`,
  );
  lines.push(`Websites, die Ihnen gefallen: ${values.likedWebsites || EMPTY}`);
  lines.push(`Sonstiges: ${values.otherNotes || EMPTY}`);
  lines.push('');

  heading('Kalkulation (intern, nicht für den Kunden)');
  for (const entry of breakdown) {
    const price = (level: PricingLevel) =>
      `${LEVEL_LABELS[level]} ${entry.priceByLevel[level]} €`;
    lines.push(
      `${optionLabel(entry.code)} × ${entry.quantity} — ${entry.hours}h — ${price('standard')} · ${price('bekanntschaft')} · ${price('familie')}`,
    );
  }
  lines.push('');
  lines.push(
    `Gesamt: ${result.hours}h — Standard ${result.priceByLevel.standard} € · Bekanntschaft ${result.priceByLevel.bekanntschaft} € · Familie ${result.priceByLevel.familie} €`,
  );
  lines.push(
    `Wilka an den Kunden (Standard, ±20%): ${result.standardRange.min}–${result.standardRange.max} €`,
  );

  return {
    to: recipient,
    subject: `Neue Anfrage über die Projekt-Checkliste — ${values.name}`,
    text: lines.join('\n'),
    replyTo: values.email,
  };
}

interface BuildClientConfirmationEmailParams {
  values: ChecklistFormValues;
  locale: AppLocale;
}

/**
 * Bestätigungsmail an den Kunden — bewusst ohne jede Zahl (CLAUDE.md §4),
 * nur Eingangsbestätigung + Antwortzeit-Versprechen. In der Formular-Locale.
 */
export async function buildClientConfirmationEmail({
  values,
  locale,
}: BuildClientConfirmationEmailParams): Promise<EmailMessage> {
  const t = await getTranslations({
    locale,
    namespace: 'Checkliste.confirmationEmail',
  });

  const text = [
    t('greeting', { name: values.name }),
    '',
    t('body', { days: RESPONSE_TIME_DAYS }),
    '',
    t('signature'),
  ].join('\n');

  return {
    to: values.email,
    subject: t('subject'),
    text,
  };
}
