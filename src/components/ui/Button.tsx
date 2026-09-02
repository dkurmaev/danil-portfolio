import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from 'react';

import { cn } from '@/lib/cn';

type Variant = 'primary' | 'secondary' | 'ghost';

const baseStyles =
  'inline-flex items-center justify-center gap-2 rounded-button px-6 py-3 text-sm font-semibold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:cursor-not-allowed disabled:opacity-50';

const variantStyles: Record<Variant, string> = {
  primary:
    'bg-accent text-fg hover:bg-accent-secondary active:bg-accent-secondary',
  secondary:
    'border border-border bg-transparent text-fg hover:border-accent/60 hover:bg-bg-card active:bg-bg-elevated',
  ghost:
    'border border-border/50 bg-transparent text-fg-secondary hover:border-border hover:bg-bg-card hover:text-fg active:bg-bg-elevated',
};

interface CommonProps {
  variant?: Variant;
  children: ReactNode;
  className?: string;
}

type ButtonAsLink = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & { href: string };

type ButtonAsButton = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type ButtonProps = ButtonAsLink | ButtonAsButton;

export function Button({
  variant = 'primary',
  children,
  className,
  ...props
}: ButtonProps) {
  const classes = cn(baseStyles, variantStyles[variant], className);

  if ('href' in props && typeof props.href === 'string') {
    const { href, ...anchorProps } = props;
    const isExternal = /^https?:|^mailto:/.test(href);

    return (
      <a
        href={href}
        className={classes}
        {...(isExternal
          ? { target: '_blank', rel: 'noreferrer noopener' }
          : {})}
        {...anchorProps}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      className={classes}
      {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </button>
  );
}
