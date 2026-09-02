import { useTranslations } from 'next-intl';

import { Container } from '@/components/ui/Container';
import { SocialLinks } from '@/components/ui/SocialLinks';
import { Link } from '@/i18n/navigation';

const NAV_ITEMS = ['about', 'projects', 'services', 'contact'] as const;

export function Footer() {
  const t = useTranslations('Footer');
  const tNav = useTranslations('Nav');
  const tHeader = useTranslations('Header');
  const year = new Date().getFullYear();

  return (
    <footer className="border-border bg-bg-secondary border-t">
      <Container className="flex flex-col gap-10 py-14 md:py-20">
        <div className="flex flex-col justify-between gap-10 md:flex-row">
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-3">
              <span className="rounded-chip border-border bg-bg-card text-accent flex h-10 w-10 items-center justify-center border font-mono text-sm font-semibold">
                DK
              </span>
              <span className="flex flex-col leading-tight">
                <span className="text-fg text-sm font-semibold">
                  {tHeader('brandName')}
                </span>
                <span className="text-fg-muted font-mono text-[11px] tracking-wider uppercase">
                  {tHeader('brandRole')}
                </span>
              </span>
            </Link>
            <p className="text-fg-secondary text-sm">{t('location')}</p>
            <SocialLinks />
          </div>

          <nav
            aria-label={t('navAriaLabel')}
            className="flex flex-wrap gap-x-8 gap-y-3"
          >
            {NAV_ITEMS.map((item) => (
              <a
                key={item}
                href={`#${item}`}
                className="text-fg-secondary hover:text-fg text-sm font-medium transition-colors duration-200"
              >
                {tNav(item)}
              </a>
            ))}
          </nav>
        </div>

        <div className="border-border text-fg-muted flex flex-col-reverse items-start justify-between gap-4 border-t pt-8 text-sm md:flex-row md:items-center">
          <p>{t('copyright', { year })}</p>
          <div className="flex gap-6">
            <Link
              href="/impressum"
              className="hover:text-fg-secondary transition-colors duration-200"
            >
              {t('legalImpressum')}
            </Link>
            <Link
              href="/datenschutz"
              className="hover:text-fg-secondary transition-colors duration-200"
            >
              {t('legalDatenschutz')}
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
