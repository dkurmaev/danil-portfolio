'use client';

import { useEffect, useRef, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';

const FACT_ITEMS = ['location', 'role', 'focus', 'languages'] as const;

export function About() {
  const t = useTranslations('About');
  const locale = useLocale();
  const paragraphs = t.raw('paragraphs') as string[];
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setIsVisible(true);
        observer.disconnect();
      },
      { threshold: 0.12 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const headlineSize = {
    de: 'text-[clamp(2.5rem,3.2vw,3rem)]',
    en: 'text-[clamp(2.5rem,3.2vw,3.25rem)]',
    ru: 'text-[clamp(2.35rem,3vw,3rem)]',
  }[locale];

  const reveal = isVisible
    ? 'translate-y-0 opacity-100'
    : 'translate-y-12 opacity-0';

  return (
    <section
      ref={sectionRef}
      id="about"
      className="border-border relative scroll-mt-20 overflow-hidden border-b bg-[#efeee9]"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="border-border absolute top-0 left-[5%] hidden h-full border-l md:block" />
        <div className="border-border absolute top-0 left-1/2 hidden h-[72%] border-l lg:block" />
        <div
          className={`border-border absolute top-[19%] right-[7%] hidden h-36 w-36 rounded-full border transition-[opacity,transform] duration-1000 ease-out motion-reduce:transition-none lg:block ${
            isVisible ? 'scale-100 opacity-100' : 'scale-75 opacity-0'
          }`}
        />
        <div className="border-accent/50 absolute top-[19%] right-[7%] hidden h-2 w-2 -translate-y-1/2 rounded-full border bg-[#efeee9] lg:block" />
        <div
          className={`border-border absolute top-[19%] right-0 hidden w-[38%] origin-right border-t transition-transform delay-300 duration-1000 ease-out motion-reduce:transition-none lg:block ${
            isVisible ? 'scale-x-100' : 'scale-x-0'
          }`}
        />
        <div
          className={`border-border absolute top-[10%] right-[21%] hidden h-[52%] origin-top rotate-[-35deg] border-l transition-[opacity,transform] delay-500 duration-1000 ease-out motion-reduce:transition-none lg:block ${
            isVisible ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0'
          }`}
        />
      </div>

      <div className="relative mx-auto w-full max-w-[1760px] px-5 pt-20 pb-16 md:px-8 md:pt-24 md:pb-20 lg:px-12 lg:pt-28 lg:pb-24 xl:px-16">
        <div
          className={`mb-10 flex items-end gap-6 transition-[opacity,transform] duration-700 ease-out motion-reduce:transition-none md:mb-14 lg:gap-10 ${reveal}`}
        >
          <span
            aria-hidden="true"
            className="text-[clamp(5rem,10vw,10rem)] leading-[0.72] font-light tracking-[-0.08em] text-transparent [-webkit-text-stroke:1px_#6c4cf5]"
          >
            01
          </span>
          <div className="mb-1 flex min-w-0 flex-1 items-center gap-5 md:mb-2 md:gap-8">
            <p className="text-fg-muted shrink-0 font-mono text-[10px] tracking-[0.2em] uppercase sm:text-xs">
              {t('eyebrow')}
            </p>
            <span
              className={`bg-border h-px max-w-72 flex-1 origin-left transition-transform delay-200 duration-1000 ease-out motion-reduce:transition-none ${
                isVisible ? 'scale-x-100' : 'scale-x-0'
              }`}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1.16fr)_minmax(0,0.84fr)] lg:gap-14 xl:gap-20">
          <h2
            className={`text-fg max-w-[920px] leading-[1] font-semibold tracking-[-0.05em] ${headlineSize}`}
          >
            <span
              className={`block transition-[opacity,transform] delay-100 duration-700 ease-out motion-reduce:transition-none ${reveal}`}
            >
              {t('headlineLine1')}
              <span className="text-accent">.</span>
            </span>
            <span
              className={`mt-2 block transition-[opacity,transform] delay-200 duration-700 ease-out motion-reduce:transition-none lg:whitespace-nowrap ${reveal}`}
            >
              {t('headlineLine2')}
            </span>
          </h2>

          <div className="relative z-10 max-w-[660px] lg:pt-1">
            {paragraphs.map((paragraph, index) => (
              <p
                key={paragraph}
                style={{ transitionDelay: `${280 + index * 120}ms` }}
                className={[
                  'transition-[opacity,transform] duration-700 ease-out motion-reduce:transition-none',
                  reveal,
                  index === 0
                    ? 'text-fg text-lg leading-[1.55] font-normal md:text-xl'
                    : 'text-fg-secondary mt-6 text-base leading-[1.65] md:text-lg',
                ].join(' ')}
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>

      <div
        className={`relative bg-[#111318] text-white transition-[opacity,transform] delay-500 duration-700 ease-out motion-reduce:transition-none ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-14 opacity-0'
        }`}
      >
        <div className="mx-auto grid w-full max-w-[1760px] grid-cols-1 px-5 sm:grid-cols-2 md:px-8 lg:grid-cols-4 lg:px-12 xl:px-16">
          {FACT_ITEMS.map((key, index) => (
            <div
              key={key}
              style={{ transitionDelay: `${680 + index * 90}ms` }}
              className={[
                'border-white/12 py-6 transition-[opacity,transform] duration-500 ease-out motion-reduce:transition-none sm:px-7 lg:min-h-28 lg:px-9 lg:py-7',
                isVisible
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-5 opacity-0',
                index > 0 ? 'border-t sm:border-t-0' : '',
                index % 2 === 1 ? 'sm:border-l' : '',
                index > 1 ? 'sm:border-t lg:border-t-0' : '',
                index > 0 ? 'lg:border-l' : '',
              ].join(' ')}
            >
              <p className="flex items-center gap-3 font-mono text-[10px] tracking-[0.18em] text-white/50 uppercase sm:text-xs">
                <span
                  className="text-accent text-base leading-none"
                  aria-hidden="true"
                >
                  +
                </span>
                {t(`cards.${key}.label`)}
              </p>
              <p className="mt-3 text-base font-medium sm:text-lg">
                {t(`cards.${key}.value`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
