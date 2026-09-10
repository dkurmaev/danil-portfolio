'use client';

import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/Button';
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher';
import { mainNavigation } from '@/config/navigation';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const FOCUSABLE_ELEMENTS =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const t = useTranslations('Nav');
  const tHeader = useTranslations('Header');
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const previousActiveElement = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.defaultPrevented) return;

      if (event.key === 'Escape') {
        onClose();
        return;
      }

      if (event.key !== 'Tab') return;

      const focusableElements = Array.from(
        dialogRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE_ELEMENTS) ??
          [],
      );
      const firstElement = focusableElements[0];
      const lastElement = focusableElements.at(-1);

      if (!firstElement || !lastElement) return;

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
      previousActiveElement?.focus();
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div
      ref={dialogRef}
      id="mobile-navigation"
      role="dialog"
      aria-modal="true"
      aria-label={t('ariaLabel')}
      className="bg-bg fixed inset-0 isolate z-[100] flex min-h-dvh flex-col overflow-y-auto lg:hidden"
    >
      <div className="border-border flex min-h-[72px] items-center justify-between border-b px-5 pt-[env(safe-area-inset-top)] md:px-8">
        <div className="flex min-w-0 items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/brand/dk-logo-mark.svg"
            alt=""
            width={52}
            height={40}
            className="h-10 w-auto shrink-0"
          />
          <span className="text-fg truncate text-base font-semibold tracking-[-0.02em]">
            {tHeader('brandName')}
          </span>
        </div>

        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          aria-label={t('closeMenu')}
          className="border-border text-fg hover:bg-bg-elevated focus-visible:ring-accent focus-visible:ring-offset-bg flex h-11 w-11 shrink-0 items-center justify-center rounded-full border transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none motion-reduce:transition-none"
        >
          <X size={20} aria-hidden="true" />
        </button>
      </div>

      <nav
        aria-label={t('ariaLabel')}
        className="flex flex-1 flex-col justify-center px-5 md:px-8"
      >
        {mainNavigation.map(({ key, href }, index) => (
          <a
            key={key}
            href={href}
            onClick={onClose}
            className="border-border text-fg hover:text-accent focus-visible:text-accent flex items-center justify-between border-b py-4 text-2xl font-semibold transition-colors focus-visible:outline-none motion-reduce:transition-none sm:text-3xl"
          >
            <span>{t(key)}</span>
            <span
              aria-hidden="true"
              className="text-fg-muted font-mono text-xs font-normal"
            >
              0{index + 1}
            </span>
          </a>
        ))}
      </nav>

      <div className="border-border border-t px-5 pt-6 pb-[calc(1.5rem+env(safe-area-inset-bottom))] md:px-8">
        <div className="mb-5 flex items-center justify-between">
          <span className="text-fg-muted font-mono text-xs tracking-wider uppercase">
            {t('language')}
          </span>
          <LanguageSwitcher onLocaleChange={onClose} />
        </div>
        <Button
          href="#contact"
          variant="primary"
          className="min-h-12 w-full"
          onClick={onClose}
        >
          {t('projectInquiry')}
        </Button>
      </div>
    </div>,
    document.body,
  );
}
