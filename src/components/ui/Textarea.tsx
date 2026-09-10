import { forwardRef, useId, type TextareaHTMLAttributes } from 'react';

import { cn } from '@/lib/cn';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, id, className, name, rows = 5, ...props }, ref) => {
    const generatedId = useId();
    const textareaId = id ?? name ?? generatedId;

    return (
      <div className="flex flex-col gap-2">
        <label htmlFor={textareaId} className="text-fg text-sm font-medium">
          {label}
        </label>

        <textarea
          id={textareaId}
          name={name}
          rows={rows}
          ref={ref}
          aria-invalid={!!error}
          aria-describedby={error ? `${textareaId}-error` : undefined}
          className={cn(
            'rounded-button border-border bg-bg-card text-fg placeholder:text-fg-muted focus-visible:border-accent focus-visible:ring-accent/30 resize-y border px-4 py-3 text-sm transition-colors duration-200 outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-60',
            error && 'border-error',
            className,
          )}
          {...props}
        />

        {error && (
          <p id={`${textareaId}-error`} className="text-error text-xs">
            {error}
          </p>
        )}
      </div>
    );
  },
);

Textarea.displayName = 'Textarea';
