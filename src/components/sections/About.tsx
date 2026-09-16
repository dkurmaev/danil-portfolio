'use client';

import Image from 'next/image';
import { BriefcaseBusiness, Languages, Layers3, MapPin } from 'lucide-react';
import { useReducedMotion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';

const FACT_ITEMS = [
  { key: 'location', Icon: MapPin },
  { key: 'role', Icon: BriefcaseBusiness },
  { key: 'focus', Icon: Layers3 },
  { key: 'languages', Icon: Languages },
] as const;

const TIMELINE_ITEMS = ['early', 'basic', 'today'] as const;

export function About() {
  const t = useTranslations('About');
  const locale = useLocale();

  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Reduced-motion viewers get the settled state via the motion-reduce:
    // variants already on every reveal element below — no JS branch needed.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        setIsVisible(true);
        observer.disconnect();
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -6% 0px',
      },
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  const headlineSize = {
    de: 'text-[clamp(2.35rem,3.25vw,3.9rem)]',
    en: 'text-[clamp(2.45rem,3.4vw,4.05rem)]',
    ru: 'text-[clamp(2.25rem,3.15vw,3.8rem)]',
  }[locale];

  const visualReveal = isVisible
    ? 'translate-x-0 translate-y-0 scale-100 opacity-100'
    : '-translate-x-10 translate-y-5 scale-[0.985] opacity-0';

  const contentReveal = isVisible
    ? 'translate-x-0 opacity-100'
    : 'translate-x-8 opacity-0';

  const copyReveal = isVisible
    ? 'translate-y-0 opacity-100'
    : 'translate-y-6 opacity-0';

  const timelineReveal = isVisible
    ? 'translate-x-0 opacity-100'
    : 'translate-x-6 opacity-0';

  return (
    <section
      ref={sectionRef}
      id="about"
      className="bg-bg relative isolate scroll-mt-20 overflow-hidden"
    >
      {/* Shared visual language: soft code / blueprint background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <Image
          src="/brand/background_about_code.webp"
          alt=""
          fill
          sizes="100vw"
          className="[mask-image:linear-gradient(to_bottom,transparent_0%,black_13%,black_100%)] object-cover object-center opacity-[0.22] [-webkit-mask-image:linear-gradient(to_bottom,transparent_0%,black_13%,black_100%)]"
        />

        {/* Smooth transition from Hero */}
        <div className="from-bg via-bg/92 absolute inset-x-0 top-0 h-28 bg-gradient-to-b to-transparent md:h-32 lg:h-36" />

        {/* Extra programming texture only on wide screens */}
        <div className="absolute top-[18%] right-[2%] hidden h-[46%] w-[28%] opacity-[0.035] xl:block">
          <Image
            src="/brand/comp_about_code.webp"
            alt=""
            fill
            sizes="28vw"
            className="object-contain object-right"
          />
        </div>
      </div>

      <div className="relative mx-auto w-full max-w-[1760px] px-5 pt-0 pb-12 md:px-8 md:pt-1 lg:px-12 lg:pt-2 lg:pb-14 xl:px-16 xl:pt-3">
        {/* Facts strip */}
        <div
          className={[
            'relative -mt-3 mb-14 overflow-hidden border-y border-[#6C7F93]/20 lg:-mt-4 lg:mb-16',
            'transition-[opacity,transform] delay-500 duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]',
            'motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none',
            isVisible
              ? 'translate-y-0 opacity-100'
              : '-translate-y-4 opacity-0',
          ].join(' ')}
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
          >
            <Image
              src="/brand/background_about_code.webp"
              alt=""
              fill
              sizes="100vw"
              className="object-cover object-center opacity-[0.10]"
            />
            <div className="bg-bg/82 absolute inset-0 backdrop-blur-[1px]" />
          </div>

          <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {FACT_ITEMS.map(({ key, Icon }, index) => (
              <div
                key={key}
                style={{
                  transitionDelay: prefersReducedMotion
                    ? '0ms'
                    : `${720 + index * 80}ms`,
                }}
                className={[
                  'flex min-h-22 items-center gap-4 py-5 transition-[opacity,transform] duration-500 ease-out sm:px-6 lg:px-7',
                  'motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none',
                  isVisible
                    ? 'translate-y-0 opacity-100'
                    : 'translate-y-3 opacity-0',
                  index > 0 ? 'border-t border-[#6C7F93]/16 sm:border-t-0' : '',
                  index % 2 === 1 ? 'sm:border-l' : '',
                  index > 1 ? 'sm:border-t lg:border-t-0' : '',
                  index > 0 ? 'lg:border-l' : '',
                ].join(' ')}
              >
                <Icon
                  aria-hidden="true"
                  className="h-5 w-5 shrink-0 stroke-[1.6] text-[#6C7F93]"
                />

                <div className="min-w-0">
                  <p className="text-fg text-sm font-medium md:text-base">
                    {t(`cards.${key}.value`)}
                  </p>

                  <p className="text-fg-muted mt-1 font-mono text-[9px] tracking-[0.16em] uppercase">
                    {t(`cards.${key}.caption`)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="grid items-start gap-9 lg:grid-cols-[minmax(300px,0.62fr)_minmax(0,1.15fr)_minmax(205px,0.32fr)] lg:gap-9 xl:grid-cols-[minmax(340px,0.6fr)_minmax(0,1.2fr)_minmax(220px,0.3fr)] xl:gap-11">
          {/* Portrait — mirrored against Hero */}
          <div className="relative z-10 order-2 flex justify-center lg:order-1 lg:block lg:self-stretch">
            <div
              className={[
                'relative transition-[opacity,transform] delay-75 duration-[950ms] ease-[cubic-bezier(0.22,1,0.36,1)]',
                'motion-reduce:translate-x-0 motion-reduce:translate-y-0 motion-reduce:scale-100 motion-reduce:opacity-100 motion-reduce:transition-none',
                'lg:h-full lg:-translate-y-3',
                visualReveal,
              ].join(' ')}
            >
              <Image
                src="/brand/danil_about_code.webp"
                alt={t('portraitAlt')}
                width={1122}
                height={1402}
                priority={false}
                quality={95}
                sizes="(min-width: 1280px) 30vw, (min-width: 1024px) 31vw, 82vw"
                className="mx-auto h-auto w-[82%] max-w-[410px] object-contain [filter:drop-shadow(0_18px_24px_rgba(17,19,24,0.10))] lg:mx-0 lg:h-[min(72svh,600px)] lg:w-auto lg:max-w-none lg:origin-bottom lg:object-bottom"
              />

              <span
                aria-hidden="true"
                className={[
                  'bg-bg absolute top-[14%] right-[6%] hidden h-2 w-2 rounded-full border border-[#6C7F93]/70 xl:block',
                  'transition-[opacity,transform] delay-700 duration-700 motion-reduce:scale-100 motion-reduce:opacity-100 motion-reduce:transition-none',
                  isVisible ? 'scale-100 opacity-100' : 'scale-50 opacity-0',
                ].join(' ')}
              />
            </div>
          </div>

          {/* Main copy */}
          <div className="relative z-20 order-1 lg:order-2 lg:pt-0">
            <div
              className={[
                'transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]',
                'motion-reduce:translate-x-0 motion-reduce:opacity-100 motion-reduce:transition-none',
                contentReveal,
              ].join(' ')}
            >
              <div className="flex items-end gap-5">
                <span
                  aria-hidden="true"
                  className="text-[clamp(4.4rem,7vw,7.7rem)] leading-[0.72] font-light tracking-[-0.08em] text-transparent [-webkit-text-stroke:1px_#6C7F93]"
                >
                  01
                </span>

                <span
                  aria-hidden="true"
                  className={[
                    'mb-2 h-px w-14 origin-left bg-[#6C7F93]/45 transition-transform delay-200 duration-700 md:w-20',
                    'motion-reduce:scale-x-100 motion-reduce:transition-none',
                    isVisible ? 'scale-x-100' : 'scale-x-0',
                  ].join(' ')}
                />
              </div>

              <div className="mt-6 flex items-center gap-5">
                <p className="text-fg-muted font-mono text-[10px] tracking-[0.24em] uppercase sm:text-xs">
                  {t('eyebrow')}
                </p>

                <span
                  aria-hidden="true"
                  className={[
                    'bg-border h-px max-w-40 flex-1 origin-left transition-transform delay-300 duration-700',
                    'motion-reduce:scale-x-100 motion-reduce:transition-none',
                    isVisible ? 'scale-x-100' : 'scale-x-0',
                  ].join(' ')}
                />
              </div>
            </div>

            <h2
              className={`text-fg mt-7 max-w-[680px] leading-[0.99] font-semibold tracking-[-0.052em] ${headlineSize}`}
            >
              <span
                className={[
                  'block transition-[opacity,transform] delay-100 duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]',
                  'motion-reduce:translate-x-0 motion-reduce:opacity-100 motion-reduce:transition-none',
                  contentReveal,
                ].join(' ')}
              >
                {t('headlineLine1')}.
              </span>

              <span
                className={[
                  'mt-1 block text-[#6C7F93] transition-[opacity,transform] delay-180 duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]',
                  'motion-reduce:translate-x-0 motion-reduce:opacity-100 motion-reduce:transition-none',
                  contentReveal,
                ].join(' ')}
              >
                {t('headlineLine2')}.
              </span>
            </h2>

            <div className="mt-7 max-w-[650px] space-y-4.5">
              {(t.raw('paragraphs') as string[]).map((paragraph, index) => (
                <p
                  key={`${index}-${paragraph.slice(0, 24)}`}
                  style={{
                    transitionDelay: prefersReducedMotion
                      ? '0ms'
                      : `${240 + index * 90}ms`,
                  }}
                  className={[
                    'transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]',
                    'motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none',
                    copyReveal,
                    index === 0
                      ? 'text-fg text-[1.01rem] leading-[1.6] md:text-[1.08rem]'
                      : 'text-fg-secondary text-[0.98rem] leading-[1.62] md:text-[1.03rem]',
                  ].join(' ')}
                >
                  {paragraph}
                </p>
              ))}
            </div>

            <div
              className={[
                'mt-7 flex items-center gap-4 transition-[opacity,transform] delay-500 duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]',
                'motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none',
                copyReveal,
              ].join(' ')}
            >
              <span className="font-script text-[2.4rem] leading-none text-[#53616E]">
                Danil
              </span>

              <span
                aria-hidden="true"
                className={[
                  'h-px w-14 origin-left bg-[#6C7F93]/55 transition-transform delay-650 duration-700',
                  'motion-reduce:scale-x-100 motion-reduce:transition-none',
                  isVisible ? 'scale-x-100' : 'scale-x-0',
                ].join(' ')}
              />

              <p className="max-w-[220px] font-mono text-[9px] leading-[1.55] tracking-[0.18em] text-[#53616E] uppercase">
                {t('statement')}
              </p>
            </div>
          </div>

          {/* Timeline */}
          <aside
            className={[
              'relative z-20 order-3 hidden pt-8 transition-[opacity,transform] delay-300 duration-800 ease-[cubic-bezier(0.22,1,0.36,1)] lg:block',
              'motion-reduce:translate-x-0 motion-reduce:opacity-100 motion-reduce:transition-none',
              timelineReveal,
            ].join(' ')}
            aria-label={t('timelineAriaLabel')}
          >
            <div className="relative pl-8">
              <span
                aria-hidden="true"
                className="absolute top-0 bottom-0 left-0 w-px bg-[#6C7F93]/16"
              />

              <span
                aria-hidden="true"
                className={[
                  'absolute top-0 bottom-0 left-0 w-px origin-top bg-[#6C7F93]/45 transition-transform delay-350 duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)]',
                  'motion-reduce:scale-y-100 motion-reduce:transition-none',
                  isVisible ? 'scale-y-100' : 'scale-y-0',
                ].join(' ')}
              />

              {TIMELINE_ITEMS.map((key, index) => (
                <div
                  key={key}
                  className={
                    index === TIMELINE_ITEMS.length - 1
                      ? 'relative'
                      : 'relative pb-14 xl:pb-16'
                  }
                >
                  <span
                    aria-hidden="true"
                    style={{
                      transitionDelay: prefersReducedMotion
                        ? '0ms'
                        : `${520 + index * 150}ms`,
                    }}
                    className={[
                      'bg-bg absolute -left-[37px] mt-1.5 h-[11px] w-[11px] rounded-full border-2 border-[#6C7F93]',
                      'transition-[opacity,transform] duration-500 ease-out',
                      'motion-reduce:scale-100 motion-reduce:opacity-100 motion-reduce:transition-none',
                      isVisible
                        ? 'scale-100 opacity-100'
                        : 'scale-50 opacity-0',
                    ].join(' ')}
                  />

                  <div
                    style={{
                      transitionDelay: prefersReducedMotion
                        ? '0ms'
                        : `${590 + index * 150}ms`,
                    }}
                    className={[
                      'transition-[opacity,transform] duration-600 ease-out',
                      'motion-reduce:translate-x-0 motion-reduce:opacity-100 motion-reduce:transition-none',
                      isVisible
                        ? 'translate-x-0 opacity-100'
                        : 'translate-x-3 opacity-0',
                    ].join(' ')}
                  >
                    <p className="text-fg text-[0.98rem] leading-tight font-semibold xl:text-base">
                      {t(`timeline.${key}.title`)}
                    </p>

                    <p className="mt-2 text-[0.82rem] leading-[1.45] text-[#53616E]">
                      {t(`timeline.${key}.description`)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <p
              className={[
                'mt-14 flex max-w-[185px] items-start gap-1.5 font-mono text-[9px] leading-[1.65] tracking-[0.18em] text-[#53616E] uppercase xl:mt-16',
                'transition-[opacity,transform] delay-[950ms] duration-600 ease-out',
                'motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none',
                isVisible
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-3 opacity-0',
              ].join(' ')}
            >
              <span aria-hidden="true">&lt;</span>
              <span>{t('timelineNote')}</span>
              <span aria-hidden="true">&gt;</span>
            </p>
          </aside>
        </div>

        {/* Mobile timeline */}
        <div className="mt-8 lg:hidden">
          <div className="grid gap-4 sm:grid-cols-3">
            {TIMELINE_ITEMS.map((key, index) => (
              <div
                key={key}
                style={{
                  transitionDelay: prefersReducedMotion
                    ? '0ms'
                    : `${560 + index * 90}ms`,
                }}
                className={[
                  'border-l border-[#6C7F93]/25 pl-4 transition-[opacity,transform] duration-500 ease-out',
                  'motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none',
                  isVisible
                    ? 'translate-y-0 opacity-100'
                    : 'translate-y-3 opacity-0',
                ].join(' ')}
              >
                <p className="text-fg text-sm font-semibold">
                  {t(`timeline.${key}.title`)}
                </p>

                <p className="text-fg-muted mt-1 text-xs leading-relaxed">
                  {t(`timeline.${key}.description`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
