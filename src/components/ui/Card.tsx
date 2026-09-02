import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className }: CardProps) {
  return (
    <div
      className={['rounded-card border-border bg-bg-card border', className]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </div>
  );
}
