import { useId } from 'react';
import { Check } from 'lucide-react';

import { cn } from '@/lib/cn';

interface CheckboxCardProps {
  label: string;
  description?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

/**
 * Karten-Checkbox mit Titel + optionaler Beschreibung — für Gruppen, deren
 * Auswahl in einem Array-Feld landet (`goals`, `blocks`). Wird über
 * `Controller` angesteuert, nicht über `register`, siehe `ChecklistWizard`.
 */
export function CheckboxCard({
  label,
  description,
  checked,
  onChange,
}: CheckboxCardProps) {
  const inputId = useId();

  return (
    <label
      htmlFor={inputId}
      className={cn(
        'rounded-card border-border bg-bg-card flex cursor-pointer items-start gap-3 border p-4 transition-colors duration-200',
        checked && 'border-accent bg-accent/5',
      )}
    >
      <input
        id={inputId}
        type="checkbox"
        className="peer sr-only"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
      />
      <span
        aria-hidden="true"
        className={cn(
          'border-border peer-focus-visible:ring-accent/30 mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-sm border transition-colors duration-200 peer-focus-visible:ring-2',
          checked && 'border-accent bg-accent',
        )}
      >
        {checked && (
          <Check size={14} className="text-fg-inverse" strokeWidth={3} />
        )}
      </span>
      <span className="flex flex-col gap-1">
        <span className="text-fg text-sm font-medium">{label}</span>
        {description && (
          <span className="text-fg-secondary text-sm">{description}</span>
        )}
      </span>
    </label>
  );
}
