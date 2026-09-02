import { cn } from '@/lib/cn';

interface CoverPlaceholderProps {
  /** Short text shown centered at the bottom — e.g. a monogram or initials. */
  label: string;
  /** Controls the outer box: aspect-ratio, rounding, border, background. */
  className?: string;
  /** Controls label typography — sizing differs by how large the placeholder renders. */
  labelClassName?: string;
}

/**
 * Decorative cover placeholder — accent glow blobs over a faint grid, with a
 * centered label. Used wherever a real project/profile photo isn't available
 * yet (see docs/technical-spec.md §66 Placeholder Policy): the composition
 * keeps the intended aspect-ratio so swapping in `next/image` later doesn't
 * require layout changes.
 */
export function CoverPlaceholder({
  label,
  className,
  labelClassName,
}: CoverPlaceholderProps) {
  return (
    <div
      aria-hidden="true"
      className={cn('relative w-full overflow-hidden', className)}
    >
      <div className="bg-accent/25 absolute -top-[15%] -left-[15%] h-[45%] w-[45%] rounded-full blur-3xl" />
      <div className="bg-accent-secondary/20 absolute -right-[18%] -bottom-[18%] h-[50%] w-[50%] rounded-full blur-3xl" />
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            'linear-gradient(var(--color-border) 1px, transparent 1px), linear-gradient(90deg, var(--color-border) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />
      <span
        className={cn(
          'text-fg/10 absolute bottom-4 left-1/2 -translate-x-1/2 font-mono font-semibold tracking-tight',
          labelClassName,
        )}
      >
        {label}
      </span>
    </div>
  );
}
