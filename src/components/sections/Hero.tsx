import { ArrowRight, Code2, Layers } from 'lucide-react';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';

import { Button } from '@/components/ui/Button';
import { HeroReveal } from '@/components/sections/HeroReveal';
import { Link } from '@/i18n/navigation';

const BACKGROUND_SIZES = '100vw';
const PORTRAIT_SIZES = '(min-width: 1024px) 48vw, 116vw';

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
      className="border-border bg-bg relative isolate scroll-mt-[72px] overflow-hidden border-b lg:min-h-[calc(100svh-5rem)] lg:scroll-mt-20"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 right-0 -z-20 hidden h-[58%] w-[40%] overflow-hidden opacity-[0.90] lg:block"
      >
        <Image
          src="/brand/about_back_comp.webp"
          alt=""
          fill
          sizes="40vw"
          className="[mask-image:linear-gradient(to_bottom_left,black_0%,black_22%,transparent_75%)] object-cover object-right-top [-webkit-mask-image:linear-gradient(to_bottom_left,black_0%,black_22%,transparent_75%)]"
        />
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-20 h-[56svh] overflow-hidden opacity-[0.70] lg:h-[44svh]"
      >
        <Image
          src="/brand/background_about_code.webp"
          alt=""
          fill
          sizes={BACKGROUND_SIZES}
          className="[mask-image:linear-gradient(to_top,black_0%,black_35%,transparent_100%)] object-cover object-left-bottom [-webkit-mask-image:linear-gradient(to_top,black_0%,black_35%,transparent_100%)]"
        />
      </div>

      <div
        aria-hidden="true"
        className="from-bg via-bg/90 absolute inset-0 -z-10 bg-gradient-to-r from-0% via-62% to-transparent lg:via-42%"
      />

      <div className="relative mx-auto w-full max-w-[1760px] px-5 md:px-8 lg:grid lg:min-h-[calc(100svh-5rem)] lg:grid-cols-[minmax(0,52%)_minmax(0,48%)] lg:px-12 xl:px-16">
        <div className="relative z-10 flex max-w-[820px] flex-col pt-8 pb-6 sm:py-16 lg:static lg:justify-center lg:py-14">
          <HeroReveal className="relative z-20">
            <p className="text-fg-muted mb-4 font-mono text-[0.625rem] tracking-[0.18em] uppercase sm:mb-6 sm:text-xs sm:tracking-[0.2em]">
              {t('eyebrow')}
            </p>

            <h1
              className={`text-fg font-bold tracking-[-0.045em] lg:w-[calc(100%+5rem)] lg:leading-[0.96] xl:w-[calc(100%+7rem)] ${titleSize}`}
            >
              <span className="block leading-[0.96] lg:hidden">
                <span className="block w-[72%] text-[clamp(1.7rem,7.2vw,2rem)] whitespace-nowrap">
                  {t('titleMobileLine1')}
                </span>
                <span className="mt-1 block w-[65%] text-[clamp(1.62rem,6.9vw,1.92rem)] whitespace-nowrap">
                  {t('titleMobileLine2')}
                </span>
                <span className="mt-1 block max-w-[48%] text-[clamp(1.58rem,6.7vw,1.86rem)] leading-[0.98]">
                  {t('titleMobileLine3')}
                </span>
              </span>

              <span className="hidden lg:block">
                <span className="block">{t('titleLine1')}</span>
                <span className="block">{t('titleLine2')}</span>
              </span>
            </h1>
          </HeroReveal>

          <div className="relative -mt-5 h-[285px] sm:mt-7 sm:h-[360px] lg:static lg:h-auto">
            <HeroReveal
              className="absolute -top-20 right-[-38%] z-0 w-[116%] sm:right-[-5%] sm:w-[62%] lg:top-auto lg:right-[-3%] lg:bottom-0 lg:w-[48%] xl:right-[-1%]"
              delay={0.08}
              direction="right"
            >
              <Image
                src="/brand/danil-portrait-transparent.webp"
                alt={t('portraitAlt')}
                width={1368}
                height={1149}
                priority
                quality={95}
                sizes={PORTRAIT_SIZES}
                className="h-auto w-full max-w-none [mask-image:linear-gradient(to_bottom,black_0%,black_90%,transparent_100%)] object-contain object-top [filter:drop-shadow(0_13px_13px_rgba(17,19,24,0.10))] lg:ml-auto lg:h-[min(78svh,780px)] lg:w-auto lg:origin-bottom lg:scale-[1.035] lg:[mask-image:none] lg:object-bottom"
              />
            </HeroReveal>

            <p className="text-fg-secondary relative z-10 max-w-[48%] pt-[5.75rem] text-[0.8125rem] leading-[1.55] sm:max-w-[46%] sm:pt-0 sm:text-base lg:mt-7 lg:max-w-[740px] lg:text-xl lg:leading-relaxed">
              <span className="lg:hidden">{t('descriptionMobile')}</span>
              <span className="hidden lg:inline">{t('description')}</span>
            </p>

            <div className="absolute bottom-5 left-0 z-10 flex max-w-[44%] items-center gap-2 text-[0.6875rem] leading-snug text-[#70757B] sm:bottom-10 sm:text-xs lg:hidden">
              <span
                aria-hidden="true"
                className="relative flex h-2 w-2 shrink-0 items-center justify-center"
              >
                <span className="absolute inset-0 rounded-full bg-[#5E806C]/40 [animation-duration:2.4s] motion-safe:animate-ping" />
                <span className="relative h-1.5 w-1.5 rounded-full bg-[#5E806C] shadow-[0_0_0_3px_rgba(94,128,108,0.12)]" />
              </span>
              <span>{t('availabilityAvailable')}</span>
            </div>
          </div>

          <HeroReveal className="relative z-20 -mt-2 lg:hidden" delay={0.16}>
            <div className="grid grid-cols-[1.18fr_0.82fr] items-center gap-2">
              <Button
                href="#projects"
                variant="primary"
                className="w-full min-w-0 gap-1.5 bg-[#6C7F93]! px-2 text-[0.75rem] whitespace-nowrap text-white hover:bg-[#5E7186]! focus-visible:ring-[#8798A9] active:bg-[#536678]! min-[390px]:px-3 min-[390px]:text-sm"
              >
                {t('ctaPrimary')}
                <ArrowRight size={13} className="shrink-0" aria-hidden="true" />
              </Button>

              <a
                href="#contact"
                className="inline-flex min-h-12 min-w-0 items-center justify-center rounded-sm px-1 text-center text-[0.75rem] font-medium whitespace-nowrap text-[#303840] transition-colors hover:text-[#53616E] focus-visible:ring-2 focus-visible:ring-[#8798A9] focus-visible:ring-offset-4 focus-visible:outline-none min-[390px]:text-sm"
              >
                {t('ctaSecondary')}
              </a>
            </div>

            <Link
              href="/checkliste"
              className="group mt-4 inline-flex max-w-full items-center gap-2 rounded-sm text-xs leading-snug text-[#53616E] underline decoration-[#8798A9] underline-offset-4 transition-colors hover:text-[#17191D] focus-visible:ring-2 focus-visible:ring-[#8798A9] focus-visible:ring-offset-4 focus-visible:outline-none"
            >
              {t('ctaTertiary')}
              <ArrowRight
                size={13}
                className="shrink-0 transition-transform group-hover:translate-x-0.5 motion-reduce:transform-none"
                aria-hidden="true"
              />
            </Link>
          </HeroReveal>

          <HeroReveal
            className="relative z-20 mt-8 hidden w-full max-w-[700px] grid-cols-2 gap-3 lg:grid"
            delay={0.14}
          >
            <Button
              href="#projects"
              variant="primary"
              className="w-full bg-[#6C7F93]! text-white hover:bg-[#5E7186]! focus-visible:ring-[#8798A9] active:bg-[#536678]!"
            >
              {t('ctaPrimary')}
              <ArrowRight size={16} aria-hidden="true" />
            </Button>

            <Button href="#contact" variant="secondary" className="w-full">
              {t('ctaSecondary')}
            </Button>
          </HeroReveal>

          <Link
            href="/checkliste"
            className="group focus-visible:ring-offset-bg mt-5 hidden w-full max-w-[300px] items-center justify-between gap-3 rounded-sm text-sm font-medium text-[#6C7F93] underline decoration-[#CBD4DC] underline-offset-4 transition-colors hover:text-[#53616E] focus-visible:ring-2 focus-visible:ring-[#8798A9] focus-visible:ring-offset-4 focus-visible:outline-none lg:inline-flex"
          >
            {t('ctaTertiary')}
            <ArrowRight
              size={14}
              className="transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transform-none"
              aria-hidden="true"
            />
          </Link>

          <div className="border-border relative z-20 mt-9 hidden max-w-162.5 border-t pt-6 lg:block">
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

        <div aria-hidden="true" className="hidden lg:block" />
      </div>
    </section>
  );
}
