'use client';

import { useEffect } from 'react';
import { X } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/Button';
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher';

const NAV_ITEMS = [
  'about',
  'projects',
  'stack',
  'experience',
  'services',
  'calculator',
  'contact',
] as const;

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const t = useTranslations('Nav');

  useEffect(() => {
    if (!isOpen) return;

    document.body.style.overflow = 'hidden';

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="bg-bg fixed inset-0 z-[60] flex flex-col md:hidden">
      <div className="flex h-16 items-center justify-between px-5">
        <LanguageSwitcher />
        <button
          type="button"
          onClick={onClose}
          aria-label={t('closeMenu')}
          className="rounded-chip border-border text-fg focus-visible:ring-accent flex h-10 w-10 items-center justify-center border focus-visible:ring-2 focus-visible:outline-none"
        >
          <X size={20} aria-hidden="true" />
        </button>
      </div>

      <nav
        aria-label={t('ariaLabel')}
        className="flex flex-1 flex-col justify-center gap-1 px-5"
      >
        {NAV_ITEMS.map((item) => (
          <a
            key={item}
            href={`#${item}`}
            onClick={onClose}
            className="border-border text-fg border-b py-4 text-2xl font-semibold"
          >
            {t(item)}
          </a>
        ))}
      </nav>

      <div className="px-5 pb-10">
        <Button
          href="#contact"
          variant="primary"
          className="w-full"
          onClick={onClose}
        >
          {t('letsTalk')}
        </Button>
      </div>
    </div>
  );
}
