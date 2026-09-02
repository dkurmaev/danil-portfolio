'use client';

import { useLocale, useTranslations } from 'next-intl';

import { usePathname, useRouter } from '@/i18n/navigation';
import { locales } from '@/i18n/routing';

interface LanguageSwitcherProps {
  className?: string;
}

export function LanguageSwitcher({ className }: LanguageSwitcherProps) {
  const t = useTranslations('LocaleSwitcher');
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div
      role="group"
      aria-label={t('label')}
      className={['flex items-center gap-1 text-sm font-medium', className]
        .filter(Boolean)
        .join(' ')}
    >
      {locales.map((loc, index) => (
        <span key={loc} className="flex items-center gap-1">
          {index > 0 && (
            <span className="text-fg-muted" aria-hidden="true">
              /
            </span>
          )}
          <button
            type="button"
            aria-current={loc === locale ? 'true' : undefined}
            aria-label={t(loc)}
            onClick={() => router.replace(pathname, { locale: loc })}
            className={[
              'rounded-chip focus-visible:ring-accent px-1.5 py-1 uppercase transition-colors duration-200 focus-visible:ring-2 focus-visible:outline-none',
              loc === locale
                ? 'bg-bg-card text-fg font-semibold'
                : 'text-fg-secondary hover:text-fg',
            ].join(' ')}
          >
            {loc}
          </button>
        </span>
      ))}
    </div>
  );
}
