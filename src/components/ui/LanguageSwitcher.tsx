'use client';

import {
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
} from 'react';
import { Check, ChevronDown } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';

import { usePathname, useRouter } from '@/i18n/navigation';
import { locales } from '@/i18n/routing';
import { cn } from '@/lib/cn';

interface LanguageSwitcherProps {
  className?: string;
  onLocaleChange?: () => void;
}

export function LanguageSwitcher({
  className,
  onLocaleChange,
}: LanguageSwitcherProps) {
  const t = useTranslations('LocaleSwitcher');
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const menuId = useId();
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const optionRefs = useRef<Array<HTMLButtonElement | null>>([]);

  useEffect(() => {
    if (!isOpen) return;

    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;

      event.preventDefault();
      event.stopPropagation();
      setIsOpen(false);
      triggerRef.current?.focus();
    };

    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);

    const activeIndex = locales.indexOf(locale as (typeof locales)[number]);
    optionRefs.current[activeIndex]?.focus();

    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen, locale]);

  const changeLocale = (nextLocale: (typeof locales)[number]) => {
    setIsOpen(false);
    onLocaleChange?.();

    const hash = window.location.hash;
    router.replace(`${pathname}${hash}`, { locale: nextLocale });
  };

  const handleMenuKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    const currentIndex = optionRefs.current.findIndex(
      (option) => option === document.activeElement,
    );

    let nextIndex: number | undefined;

    if (event.key === 'ArrowDown') {
      nextIndex = (currentIndex + 1) % locales.length;
    } else if (event.key === 'ArrowUp') {
      nextIndex = (currentIndex - 1 + locales.length) % locales.length;
    } else if (event.key === 'Home') {
      nextIndex = 0;
    } else if (event.key === 'End') {
      nextIndex = locales.length - 1;
    }

    if (nextIndex === undefined) return;

    event.preventDefault();
    optionRefs.current[nextIndex]?.focus();
  };

  return (
    <div ref={rootRef} className={cn('relative', className)}>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        aria-label={`${t('label')}: ${locale.toUpperCase()}`}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-controls={isOpen ? menuId : undefined}
        className="text-fg hover:bg-bg-elevated focus-visible:ring-accent focus-visible:ring-offset-bg flex h-10 items-center gap-1.5 rounded-full px-3 text-sm font-semibold uppercase transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none motion-reduce:transition-none"
      >
        {locale}
        <ChevronDown
          size={14}
          aria-hidden="true"
          className={cn(
            'transition-transform duration-200 motion-reduce:transition-none',
            isOpen && 'rotate-180',
          )}
        />
      </button>

      {isOpen && (
        <div
          id={menuId}
          role="menu"
          aria-label={t('label')}
          onKeyDown={handleMenuKeyDown}
          className="border-border bg-bg-card absolute top-full right-0 z-[70] mt-2 min-w-40 rounded-xl border p-1.5 shadow-[0_16px_40px_rgba(17,19,24,0.10)]"
        >
          {locales.map((loc) => (
            <button
              key={loc}
              ref={(element) => {
                optionRefs.current[locales.indexOf(loc)] = element;
              }}
              type="button"
              role="menuitemradio"
              aria-checked={loc === locale}
              onClick={() => changeLocale(loc)}
              className="text-fg-secondary hover:bg-bg-elevated hover:text-fg focus-visible:bg-bg-elevated focus-visible:text-fg flex w-full items-center justify-between gap-4 rounded-lg px-3 py-2.5 text-left text-sm transition-colors focus-visible:outline-none motion-reduce:transition-none"
            >
              <span>{t(loc)}</span>
              {loc === locale && (
                <Check size={15} aria-hidden="true" className="text-accent" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
