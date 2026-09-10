import { forwardRef, useId, type InputHTMLAttributes } from 'react';

import { cn } from '@/lib/cn';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, id, className, name, ...props }, ref) => {
    const generatedId = useId();
    const inputId = id ?? name ?? generatedId;

    return (
      <div className="flex flex-col gap-2">
        <label htmlFor={inputId} className="text-fg text-sm font-medium">
          {label}
        </label>

        <input
          id={inputId}
          name={name}
          ref={ref}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : undefined}
          className={cn(
            'rounded-button border-border bg-bg-card text-fg placeholder:text-fg-muted focus-visible:border-accent focus-visible:ring-accent/30 border px-4 py-3 text-sm transition-colors duration-200 outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-60',
            error && 'border-error',
            className,
          )}
          {...props}
        />

        {error && (
          <p id={`${inputId}-error`} className="text-error text-xs">
            {error}
          </p>
        )}
      </div>
    );
  },
);

Input.displayName = 'Input';
