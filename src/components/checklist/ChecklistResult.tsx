'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { ArrowLeft, CheckCircle2, Loader2, RefreshCw } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';

import { Button } from '@/components/ui/Button';
import type { AppLocale } from '@/i18n/routing';
import { buildSelectionLines } from '@/lib/checklistSelection';
import { RESPONSE_TIME_DAYS } from '@/lib/checklistConstants';
import type { ChecklistFormValues } from '@/lib/checklistFormSchema';

interface PriceRange {
  min: number;
  max: number;
}

type EstimateState =
  | { status: 'loading' }
  | { status: 'error' }
  | { status: 'ready'; range: PriceRange };

type SubmitState = 'idle' | 'sending' | 'success' | 'error';

interface ChecklistResultProps {
  values: ChecklistFormValues;
  /** Zurück zum "Kontakt"-Schritt, um Antworten zu ändern. */
  onEdit: () => void;
  /** Kompletter Reset des Wizards nach erfolgreichem Versand (PDF §48 Calculator State). */
  onReset: () => void;
}

/**
 * Ergebnis-Screen nach Schritt 10: Wilka aus `/api/estimate`, Disclaimer
 * (§42), Versand an `/api/checklist-submit`. Der Client sieht in jeder
 * Antwort nur die Wilka — nie die interne Positionsaufschlüsselung.
 */
export function ChecklistResult({
  values,
  onEdit,
  onReset,
}: ChecklistResultProps) {
  const t = useTranslations('Checkliste.result');
  const locale = useLocale() as AppLocale;

  // Nichts ausgewählt (z. B. nur ein Ziel ohne weitere Angaben) — keine leere
  // Anfrage an /api/estimate schicken (min(1) dort), 0-Wilka reicht. Wird als
  // reiner Render-Wert behandelt (siehe `displayEstimate`), nicht über
  // `setEstimate` im Effect, sonst meldet react-hooks/set-state-in-effect
  // einen synchronen setState-Aufruf im Effekt-Body.
  // `useMemo` ist hier keine Optimierung, sondern nötig: `buildSelectionLines`
  // liefert bei jedem Aufruf ein neues Array — ohne stabile Referenz würde
  // `fetchEstimate` (deps: [items]) bei jedem Render neu entstehen, der
  // Effekt erneut feuern und so eine Endlosschleife von Requests auslösen.
  const items = useMemo(() => buildSelectionLines(values), [values]);

  const [estimate, setEstimate] = useState<EstimateState>({
    status: 'loading',
  });
  const [submitState, setSubmitState] = useState<SubmitState>('idle');

  const fetchEstimate = useCallback(async () => {
    try {
      const response = await fetch('/api/estimate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items }),
      });
      const data: { ok: boolean; range?: PriceRange } = await response.json();

      if (!response.ok || !data.ok || !data.range) {
        throw new Error('estimate_failed');
      }

      setEstimate({ status: 'ready', range: data.range });
    } catch {
      setEstimate({ status: 'error' });
    }
  }, [items]);

  useEffect(() => {
    if (items.length === 0) return;
    // Standard "fetch on mount"-Pattern (react.dev/reference/react/useEffect
    // #fetching-data-with-effects) — die Regel kann synchron/asynchron
    // innerhalb der aufgerufenen Funktion nicht unterscheiden und meldet
    // jeden setState-Aufruf in `fetchEstimate`, auch den erst nach `await`.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchEstimate();
  }, [items, fetchEstimate]);

  const handleRetry = () => {
    setEstimate({ status: 'loading' });
    fetchEstimate();
  };

  const displayEstimate: EstimateState =
    items.length === 0
      ? { status: 'ready', range: { min: 0, max: 0 } }
      : estimate;

  const handleSend = async () => {
    setSubmitState('sending');

    try {
      const response = await fetch('/api/checklist-submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ locale, values }),
      });
      const data: { ok: boolean } = await response.json();

      if (!response.ok || !data.ok) {
        throw new Error('submit_failed');
      }

      setSubmitState('success');
    } catch {
      setSubmitState('error');
    }
  };

  const formatPrice = (value: number) =>
    new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0,
    }).format(value);

  if (submitState === 'success') {
    return (
      <div className="flex flex-col items-center gap-4 py-8 text-center">
        <CheckCircle2 size={32} className="text-success" aria-hidden="true" />
        <h3 className="text-fg text-xl font-semibold">{t('successTitle')}</h3>
        <p className="text-fg-secondary max-w-md text-sm leading-6">
          {t('successMessage', { days: RESPONSE_TIME_DAYS })}
        </p>
        <Button type="button" onClick={onReset}>
          {t('resetCta')}
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col items-center gap-3 py-4 text-center">
        <p className="text-fg-muted font-mono text-xs tracking-[0.2em] uppercase">
          {t('title')}
        </p>

        {displayEstimate.status === 'loading' && (
          <p className="text-fg-secondary flex items-center gap-2 text-sm">
            <Loader2 className="animate-spin" size={16} aria-hidden="true" />
            {t('loading')}
          </p>
        )}

        {displayEstimate.status === 'error' && (
          <div className="flex flex-col items-center gap-3">
            <p className="text-fg-secondary text-sm">{t('errorTitle')}</p>
            <Button type="button" variant="secondary" onClick={handleRetry}>
              <RefreshCw size={16} aria-hidden="true" />
              {t('retry')}
            </Button>
          </div>
        )}

        {displayEstimate.status === 'ready' && (
          <p className="text-fg text-4xl font-bold tracking-tight sm:text-5xl">
            {formatPrice(displayEstimate.range.min)} –{' '}
            {formatPrice(displayEstimate.range.max)}
          </p>
        )}
      </div>

      <p className="text-fg-muted text-center text-xs">{t('disclaimer')}</p>

      {submitState === 'error' && (
        <p className="text-error text-center text-sm">{t('sendError')}</p>
      )}

      <div className="border-border flex flex-col gap-3 border-t pt-6 sm:flex-row sm:items-center sm:justify-between">
        <Button
          type="button"
          variant="secondary"
          onClick={onEdit}
          disabled={submitState === 'sending'}
        >
          <ArrowLeft size={16} aria-hidden="true" />
          {t('backCta')}
        </Button>

        <Button
          type="button"
          onClick={handleSend}
          disabled={
            displayEstimate.status !== 'ready' || submitState === 'sending'
          }
        >
          {submitState === 'sending' ? t('sendPending') : t('sendCta')}
        </Button>
      </div>
    </div>
  );
}
