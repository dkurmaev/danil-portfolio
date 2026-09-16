import { ArrowUp, ArrowUpRight } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';

import { mainNavigation } from '@/config/navigation';
import { socialLinks } from '@/config/social';
import { Link } from '@/i18n/navigation';
import { locales } from '@/i18n/routing';

const FOOTER_SERVICE_IDS = [
  'web-applications',
  'fullstack-development',
  'backend-api',
  'saas-mvp',
] as const;

const PROCESS_STAGES = [
  'idea',
  'architecture',
  'development',
  'deployment',
] as const;

export function Footer() {
  const t = useTranslations('Footer');
  const tNav = useTranslations('Nav');
  const tHeader = useTranslations('Header');
  const tServices = useTranslations('Services');
  const locale = useLocale();
  const year = new Date().getFullYear();
  const email = socialLinks.email.replace('mailto:', '');
  const tagline = t('tagline').split('\n');
  const stages = PROCESS_STAGES.map((stage) => t(`stages.${stage}`)).join(
    ' • ',
  );

  return (
    <footer className="border-border bg-bg-elevated border-t">
      <div className="relative mx-auto w-full max-w-[1840px] overflow-hidden px-5 py-14 md:px-8 md:py-20 xl:px-14">
        {/* Decorative — Berlin coordinates, purely visual. */}
        <div
          aria-hidden="true"
          className="text-fg-muted/60 pointer-events-none absolute top-14 left-5 hidden font-mono text-[0.65rem] leading-5 tracking-wider sm:block md:left-8 xl:left-14"
        >
          <p>{t('coordinates.lat')}</p>
          <p>{t('coordinates.lon')}</p>
        </div>

        <div className="relative flex items-start justify-end">
          <a
            href="#hero"
            className="text-fg hover:text-accent-secondary focus-visible:ring-accent focus-visible:ring-offset-bg-elevated border-accent inline-flex items-center gap-2 border-b pb-0.5 text-sm font-medium transition-colors duration-200 focus-visible:rounded-sm focus-visible:ring-2 focus-visible:outline-none"
          >
            {t('backToTop')}
            <ArrowUp size={15} aria-hidden="true" />
          </a>
        </div>

        <div className="relative mt-10 grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-4 sm:gap-x-10 lg:grid-cols-[1.6fr_1fr_1fr_1fr] xl:grid-cols-[1.6fr_1fr_1fr_1fr_auto]">
          <div className="col-span-2 flex flex-col gap-4 sm:col-span-4 lg:col-span-1">
            <Link
              href="/"
              aria-label={tHeader('homeLabel')}
              className="inline-flex items-center gap-3"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/brand/dk-logo-mark.svg"
                alt=""
                width={52}
                height={40}
                className="h-9 w-auto"
              />
            </Link>
            <div>
              <p className="text-fg text-xl font-semibold tracking-[-0.01em] uppercase">
                {tHeader('brandName')}
              </p>
              <p className="text-fg-muted font-mono text-[11px] tracking-wider uppercase">
                {tHeader('brandRole')}
              </p>
            </div>
            <span className="border-border w-10 border-t" aria-hidden="true" />
            <p className="text-fg-secondary text-sm leading-6">
              {t('brandDescription')}
            </p>
            <p className="text-fg-secondary flex items-center gap-2.5 text-sm">
              <span
                className="bg-success h-2 w-2 shrink-0 rounded-full"
                aria-hidden="true"
              />
              {t('availability')}
            </p>
          </div>

          <nav
            aria-label={t('columns.navigation')}
            className="flex flex-col gap-4"
          >
            <p className="text-fg-muted font-mono text-[0.65rem] tracking-[0.2em] uppercase">
              {t('columns.navigation')}
            </p>
            <ul className="flex flex-col gap-3">
              {mainNavigation.map(({ key, href }) => (
                <li key={key}>
                  <a
                    href={href}
                    className="text-fg-secondary hover:text-fg text-sm transition-colors duration-200"
                  >
                    {tNav(key)}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav
            aria-label={t('columns.services')}
            className="flex flex-col gap-4"
          >
            <p className="text-fg-muted font-mono text-[0.65rem] tracking-[0.2em] uppercase">
              {t('columns.services')}
            </p>
            <ul className="flex flex-col gap-3">
              {FOOTER_SERVICE_IDS.map((id) => (
                <li key={id}>
                  <a
                    href="#services"
                    className="text-fg-secondary hover:text-fg text-sm transition-colors duration-200"
                  >
                    {tServices(`items.${id}.title`)}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#services"
                  className="text-fg-secondary hover:text-fg text-sm transition-colors duration-200"
                >
                  {t('services.automationAi')}
                </a>
              </li>
            </ul>
          </nav>

          <div className="flex flex-col gap-4">
            <p className="text-fg-muted font-mono text-[0.65rem] tracking-[0.2em] uppercase">
              {t('columns.contact')}
            </p>
            <ul className="flex flex-col gap-3">
              <li className="text-fg-secondary text-sm">{t('location')}</li>
              <li>
                <a
                  href={socialLinks.email}
                  className="text-fg-secondary hover:text-fg text-sm transition-colors duration-200"
                >
                  {email}
                </a>
              </li>
              <li>
                <a
                  href={socialLinks.github}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-accent hover:text-accent-secondary inline-flex items-center gap-1 text-sm font-medium transition-colors duration-200"
                >
                  GitHub
                  <ArrowUpRight size={14} aria-hidden="true" />
                </a>
              </li>
              <li>
                <a
                  href={socialLinks.linkedin}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-accent hover:text-accent-secondary inline-flex items-center gap-1 text-sm font-medium transition-colors duration-200"
                >
                  LinkedIn
                  <ArrowUpRight size={14} aria-hidden="true" />
                </a>
              </li>
            </ul>
          </div>

          {/* Decorative — oversized monogram + tagline, purely visual. */}
          <div
            aria-hidden="true"
            className="hidden flex-col items-end justify-self-end pl-6 xl:flex"
          >
            <span
              className="text-[5.5rem] leading-none font-bold text-transparent select-none"
              style={{ WebkitTextStroke: '1px var(--color-border)' }}
            >
              DK
            </span>
            <span className="text-fg-muted/50 mt-3 flex flex-col items-end font-mono text-[0.6rem] leading-5 tracking-wider">
              {tagline.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </span>
          </div>
        </div>

        <div
          aria-hidden="true"
          className="relative mt-14 hidden items-center justify-center sm:flex"
        >
          <span className="border-border absolute inset-x-0 top-1/2 border-t" />
          <span className="bg-bg-elevated relative inline-flex items-center gap-2 px-4">
            <span className="bg-accent h-1.5 w-1.5 rounded-full" />
            <span className="text-fg-muted font-mono text-[0.6rem] tracking-[0.2em] uppercase">
              {stages}
            </span>
          </span>
        </div>
      </div>

      <div className="bg-fg">
        <div className="mx-auto flex w-full max-w-[1840px] flex-col items-center gap-3 px-5 py-6 text-center text-xs sm:flex-row sm:justify-between sm:gap-4 sm:px-8 sm:text-left xl:px-14">
          <p className="text-fg-inverse/70">{t('copyright', { year })}</p>
          <p className="text-fg-inverse/50 order-last sm:order-none">
            {t('designedIn')}
          </p>
          <div className="text-fg-inverse/70 flex items-center gap-3">
            <Link
              href="/impressum"
              className="hover:text-fg-inverse transition-colors duration-200"
            >
              {t('legalImpressum')}
            </Link>
            <span className="text-fg-inverse/20" aria-hidden="true">
              |
            </span>
            <Link
              href="/datenschutz"
              className="hover:text-fg-inverse transition-colors duration-200"
            >
              {t('legalDatenschutz')}
            </Link>
            <span className="text-fg-inverse/20" aria-hidden="true">
              |
            </span>
            <nav
              aria-label={t('navAriaLabel')}
              className="flex items-center gap-1"
            >
              {locales.map((loc, index) => (
                <span key={loc} className="flex items-center gap-1">
                  {index > 0 && <span className="text-fg-inverse/30">/</span>}
                  <Link
                    href="/"
                    locale={loc}
                    aria-current={loc === locale ? 'page' : undefined}
                    className={
                      loc === locale
                        ? 'text-[#9B85FF] underline decoration-[#9B85FF] underline-offset-4'
                        : 'text-fg-inverse/70 hover:text-fg-inverse transition-colors duration-200'
                    }
                  >
                    {loc.toUpperCase()}
                  </Link>
                </span>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
