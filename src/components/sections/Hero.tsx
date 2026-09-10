import { ArrowRight, Code2, Layers } from 'lucide-react';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';

import { Button } from '@/components/ui/Button';
import { Link } from '@/i18n/navigation';

const BACKGROUND_SIZES = '100vw';
const PORTRAIT_SIZES = '(min-width: 1024px) 50vw, 100vw';

export function Hero() {
  const t = useTranslations('Hero');
  const locale = useLocale();

  const titleSize = {
    de: 'text-[clamp(2.75rem,4vw,3.75rem)]',
    en: 'text-[clamp(2.75rem,4vw,3.75rem)]',
    ru: 'text-[clamp(2.75rem,4vw,3.75rem)]',
  }[locale];

  return (
    <section
      id="hero"
      className="border-border bg-bg relative isolate min-h-[calc(100svh-4.5rem)] scroll-mt-[72px] overflow-hidden border-b lg:min-h-[calc(100svh-5rem)] lg:scroll-mt-20"
    >
      <Image
        src="/brand/portfolio-hero-background.png"
        alt=""
        fill
        priority
        sizes={BACKGROUND_SIZES}
        className="-z-20 object-cover object-center"
      />

      <div
        aria-hidden="true"
        className="from-bg via-bg/75 absolute inset-0 -z-10 bg-gradient-to-r from-0% via-48% to-transparent lg:via-42%"
      />

      <div className="mx-auto grid min-h-[calc(100svh-4.5rem)] w-full max-w-[1760px] grid-cols-1 px-5 md:px-8 lg:min-h-[calc(100svh-5rem)] lg:grid-cols-[minmax(0,52%)_minmax(0,48%)] lg:px-12 xl:px-16">
        <div className="relative z-10 flex max-w-[820px] flex-col justify-center py-16 sm:py-20 lg:py-14">
          <p className="text-fg-muted mb-6 font-mono text-xs tracking-[0.2em] uppercase">
            {t('eyebrow')}
          </p>

          <h1
            className={`text-fg leading-[0.96] font-bold tracking-[-0.045em] lg:w-[calc(100%+5rem)] xl:w-[calc(100%+7rem)] ${titleSize}`}
          >
            <span className="block">{t('titleLine1')}</span>
            <span className="block">{t('titleLine2')}</span>
          </h1>

          <p className="text-fg-secondary mt-7 max-w-[740px] text-base leading-relaxed sm:text-lg lg:text-xl">
            {t('description')}
          </p>

          <div className="mt-8 grid w-full max-w-[700px] grid-cols-1 gap-3 sm:grid-cols-2">
            <Button href="#projects" variant="primary" className="w-full">
              {t('ctaPrimary')}
              <ArrowRight size={16} aria-hidden="true" />
            </Button>
            <Button href="#contact" variant="secondary" className="w-full">
              {t('ctaSecondary')}
            </Button>
          </div>

          <Link
            href="/checkliste"
            className="group text-accent decoration-accent/40 hover:decoration-accent focus-visible:ring-accent focus-visible:ring-offset-bg mt-5 inline-flex w-full max-w-[300px] items-center justify-between gap-3 rounded-sm text-sm font-medium underline underline-offset-4 transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-offset-4 focus-visible:outline-none"
          >
            {t('ctaTertiary')}
            <ArrowRight
              size={14}
              className="transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transform-none"
              aria-hidden="true"
            />
          </Link>

          <div className="border-border mt-9 max-w-[650px] border-t pt-6">
            <div className="text-fg-secondary flex items-start gap-3 text-sm">
              <span className="border-border flex h-7 w-7 shrink-0 items-center justify-center border">
                <Code2 size={14} aria-hidden="true" />
              </span>
              <span className="pt-1">{t('techRow1')}</span>
            </div>
            <div className="text-fg-secondary mt-3 flex items-start gap-3 text-sm">
              <span className="border-border flex h-7 w-7 shrink-0 items-center justify-center border">
                <Layers size={14} aria-hidden="true" />
              </span>
              <span className="pt-1">{t('techRow2')}</span>
            </div>
          </div>
        </div>

        <div className="relative min-h-[430px] sm:min-h-[540px] lg:min-h-0">
          <Image
            src="/brand/danil-portrait-transparent.png"
            alt={t('portraitAlt')}
            width={1368}
            height={1149}
            priority
            quality={95}
            sizes={PORTRAIT_SIZES}
            className="absolute right-1/2 bottom-0 h-auto w-[min(112%,760px)] max-w-none
  translate-x-1/2 object-contain object-bottom
  [filter:drop-shadow(0_21px_21px_rgba(17,19,24,0.13))_drop-shadow(-10px_8px_12px_rgba(108,76,245,0.045))]
  lg:right-[-3%] lg:h-[min(78svh,780px)] lg:w-auto lg:origin-bottom
  lg:translate-x-0 lg:scale-[1.035]
  xl:right-[-4%]"
          />
        </div>
      </div>
    </section>
  );
}
