'use client';

import { useCallback, useEffect, useState } from 'react';
import { Menu } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { MobileMenu } from '@/components/layout/MobileMenu';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher';
import { mainNavigation } from '@/config/navigation';
import { Link } from '@/i18n/navigation';

export function Header() {
  const t = useTranslations('Nav');
  const tHeader = useTranslations('Header');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = useCallback(() => setIsMenuOpen(false), []);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={[
        'sticky top-0 z-40 border-b transition-[background-color,border-color] duration-300 motion-reduce:transition-none',
        isScrolled
          ? 'border-border bg-bg/95 backdrop-blur-md'
          : 'bg-bg/80 border-transparent backdrop-blur-sm',
      ].join(' ')}
    >
      <Container className="flex h-[72px] items-center justify-between lg:h-20">
        <Link
          href="/"
          aria-label={tHeader('homeLabel')}
          className="focus-visible:ring-accent focus-visible:ring-offset-bg flex items-center gap-2 rounded-sm focus-visible:ring-2 focus-visible:ring-offset-4 focus-visible:outline-none sm:gap-2.5 lg:gap-3"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/brand/dk-logo-mark-blue.svg"
            alt=""
            width={52}
            height={40}
            className="h-8 w-auto sm:h-9 lg:h-10"
          />
          <span className="text-fg text-[0.875rem] font-semibold tracking-[-0.02em] whitespace-nowrap sm:text-base lg:text-lg">
            {tHeader('brandName')}
          </span>
        </Link>

        <nav
          aria-label={t('ariaLabel')}
          className="hidden items-center gap-6 lg:flex xl:gap-8"
        >
          {mainNavigation.map(({ key, href }) => (
            <a
              key={key}
              href={href}
              className="text-fg-secondary hover:text-fg focus-visible:ring-accent focus-visible:ring-offset-bg rounded-sm text-sm font-medium transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-offset-4 focus-visible:outline-none"
            >
              {t(key)}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <LanguageSwitcher />
          <Button href="#contact" variant="secondary">
            {t('projectInquiry')}
          </Button>
        </div>

        <div className="flex items-center gap-3 lg:hidden">
          <LanguageSwitcher />
          <button
            type="button"
            onClick={() => setIsMenuOpen(true)}
            aria-label={t('openMenu')}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
            className="border-border text-fg hover:bg-bg-elevated focus-visible:ring-accent focus-visible:ring-offset-bg flex h-11 w-11 items-center justify-center rounded-full border transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none motion-reduce:transition-none"
          >
            <Menu size={20} aria-hidden="true" />
          </button>
        </div>
      </Container>

      <MobileMenu isOpen={isMenuOpen} onClose={closeMenu} />
    </header>
  );
}
