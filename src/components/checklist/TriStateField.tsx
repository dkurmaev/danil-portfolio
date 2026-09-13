import type { UseFormRegister } from 'react-hook-form';
import { useTranslations } from 'next-intl';

import {
  ASSET_STATUSES,
  type ChecklistFormValues,
  type ExistingAsset,
} from '@/lib/checklistFormSchema';

interface TriStateFieldProps {
  asset: ExistingAsset;
  register: UseFormRegister<ChecklistFormValues>;
}

/**
 * Eine Zeile aus "Was ist bereits vorhanden?" (PDF §09) — Titel/Beschreibung
 * links, ja/teilweise/nein als Radio-Pills rechts. Anders als bei
 * goals/blocks ist hier jeder Punkt ein unabhängiges Enum-Feld
 * (`existingAssets.<asset>`), daher normales `register` statt `Controller`.
 */
export function TriStateField({ asset, register }: TriStateFieldProps) {
  const t = useTranslations('Checkliste.steps.existing');

  return (
    <div className="border-border flex flex-col gap-3 border-b py-4 last:border-b-0 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-col gap-1">
        <span className="text-fg text-sm font-medium">
          {t(`options.${asset}.label`)}
        </span>
        {t.has(`options.${asset}.description`) && (
          <span className="text-fg-secondary text-sm">
            {t(`options.${asset}.description`)}
          </span>
        )}
      </div>

      <div className="flex shrink-0 gap-2">
        {ASSET_STATUSES.map((status) => (
          <label key={status} className="cursor-pointer">
            <input
              type="radio"
              value={status}
              className="peer sr-only"
              {...register(`existingAssets.${asset}`)}
            />
            <span className="rounded-chip border-border bg-bg-card text-fg-secondary peer-checked:border-accent peer-checked:bg-accent/5 peer-checked:text-fg peer-focus-visible:ring-accent/30 inline-flex items-center border px-3 py-1.5 text-sm font-medium transition-colors duration-200 peer-focus-visible:ring-2">
              {t(`statuses.${status}`)}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}
