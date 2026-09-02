import type { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  className?: string;
}

export function Badge({ children, className }: BadgeProps) {
  return (
    <span
      className={[
        'rounded-chip border-border bg-bg-card text-fg-secondary inline-flex items-center gap-2 border px-3 py-1.5 text-sm',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <span className="relative flex h-2 w-2" aria-hidden="true">
        <span className="bg-success absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 motion-reduce:animate-none" />
        <span className="bg-success relative inline-flex h-2 w-2 rounded-full" />
      </span>
      {children}
    </span>
  );
}
