import type { ReactNode } from 'react';

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={['flex flex-col gap-4', className].filter(Boolean).join(' ')}
    >
      {eyebrow && (
        <p className="text-fg-muted font-mono text-xs tracking-[0.2em] uppercase">
          {eyebrow}
        </p>
      )}
      <h2 className="text-fg text-[clamp(2rem,3.5vw+1rem,3rem)] leading-[1.05] font-bold tracking-tight">
        {title}
      </h2>
      {description && (
        <p className="text-fg-secondary max-w-2xl text-lg">{description}</p>
      )}
    </div>
  );
}
