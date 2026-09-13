interface ChecklistProgressProps {
  current: number;
  total: number;
  label: string;
}

/** "Schritt X von Y" + dünner Fortschrittsbalken — PDF-Vorgabe §73 (Calculator Mobile UX). */
export function ChecklistProgress({
  current,
  total,
  label,
}: ChecklistProgressProps) {
  const percent = total > 0 ? (current / total) * 100 : 0;

  return (
    <div className="flex flex-col gap-2" aria-live="polite">
      <p className="text-fg-muted font-mono text-xs tracking-[0.2em] uppercase">
        {label}
      </p>
      <div
        role="progressbar"
        aria-valuenow={current}
        aria-valuemin={1}
        aria-valuemax={total}
        aria-label={label}
        className="bg-border h-1.5 w-full overflow-hidden rounded-full"
      >
        <div
          className="bg-accent h-full rounded-full transition-[width] duration-300"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
