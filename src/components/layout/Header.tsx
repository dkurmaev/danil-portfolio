'use client';

import { useEffect, useState } from 'react';
import { Menu } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { MobileMenu } from '@/components/layout/MobileMenu';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher';
import { Link } from '@/i18n/navigation';

const NAV_ITEMS = [
  'about',
  'projects',
  'stack',
  'experience',
  'services',
  'contact',
] as const;

export function Header() {
  const t = useTranslations('Nav');
  const tHeader = useTranslations('Header');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={[
        'sticky top-0 z-40 transition-colors duration-300',
        isScrolled
          ? 'border-border bg-bg/80 border-b backdrop-blur-md'
          : 'border-b border-transparent bg-transparent',
      ].join(' ')}
    >
      <Container className="flex h-16 items-center justify-between md:h-20">
        <Link href="/" className="flex items-center gap-3">
          <span className="rounded-chip border-border bg-bg-card text-accent flex h-10 w-10 items-center justify-center border font-mono text-sm font-semibold">
            DK
          </span>
          <span className="flex flex-col leading-tight">
            <span className="text-fg text-sm font-semibold">
              {tHeader('brandName')}
            </span>
            <span className="text-fg-muted hidden font-mono text-[11px] tracking-wider uppercase lg:block">
              {tHeader('brandRole')}
            </span>
          </span>
        </Link>

        <nav
          aria-label={t('ariaLabel')}
          className="hidden items-center gap-8 md:flex"
        >
          {NAV_ITEMS.map((item) => (
            <a
              key={item}
              href={`#${item}`}
              className="text-fg-secondary hover:text-fg text-sm font-medium transition-colors duration-200"
            >
              {t(item)}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-6 md:flex">
          <LanguageSwitcher />
          <Button href="#contact" variant="primary">
            {t('letsTalk')}
          </Button>
        </div>

        <div className="flex items-center gap-4 md:hidden">
          <LanguageSwitcher />
          <button
            type="button"
            onClick={() => setIsMenuOpen(true)}
            aria-label={t('openMenu')}
            className="rounded-chip border-border text-fg focus-visible:ring-accent flex h-10 w-10 items-center justify-center border focus-visible:ring-2 focus-visible:outline-none"
          >
            <Menu size={20} aria-hidden="true" />
          </button>
        </div>
      </Container>

      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </header>
  );
}
