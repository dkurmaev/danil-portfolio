'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';

import { cn } from '@/lib/cn';
import { technologyGroups } from '@data/technologies';

const CORE_TECHNOLOGIES = [
  { name: 'React', slug: 'react', position: 'leftTop' },
  { name: 'React Native', slug: 'reactNative', position: 'rightTop' },
  { name: 'Next.js', slug: 'nextjs', position: 'center' },
  { name: 'PostgreSQL', slug: 'postgresql', position: 'leftBottom' },
  { name: 'NestJS', slug: 'nestjs', position: 'rightBottom' },
] as const;

export function TechStack() {
  const t = useTranslations('TechStack');
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="stack"
      className="border-border bg-bg scroll-mt-20 overflow-hidden border-b py-20 md:py-24 xl:py-28"
    >
      <div className="mx-auto w-full max-w-[1840px] px-5 md:px-8 xl:px-14">
        <div
          className={cn(
            'transition-[opacity,transform] duration-700 ease-out motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none',
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0',
          )}
        >
          <div className="grid gap-16 xl:grid-cols-[minmax(0,1.18fr)_minmax(620px,0.82fr)] xl:gap-20">
            <div className="min-w-0">
              <header className="grid gap-6 md:grid-cols-[auto_minmax(0,1fr)] md:gap-10">
                <span
                  aria-hidden="true"
                  className="font-sans text-[clamp(6rem,8.5vw,9.5rem)] leading-[0.78] font-light tracking-[-0.08em]"
                  style={{
                    WebkitTextStroke: '1.5px var(--color-fg-muted)',
                    color: 'transparent',
                  }}
                >
                  02
                </span>

                <div className="min-w-0 pt-1">
                  <div className="flex items-center gap-5">
                    <p className="text-fg-muted shrink-0 font-mono text-[0.65rem] tracking-[0.22em] uppercase">
                      {t('eyebrow')} / {t('title')}
                    </p>
                    <span
                      className="bg-border h-px flex-1"
                      aria-hidden="true"
                    />
                  </div>

                  <h2 className="text-fg mt-6 max-w-[720px] text-[clamp(2.8rem,3.8vw,4.5rem)] leading-[0.95] font-semibold tracking-[-0.055em]">
                    {t('headline')}
                    <span className="text-accent">.</span>
                  </h2>

                  <p className="text-fg-secondary mt-5 max-w-[620px] text-base leading-7">
                    {t('description')}
                  </p>
                </div>
              </header>

              <div className="relative mt-10 aspect-[25/14] min-h-[340px] w-full sm:min-h-[380px]">
                <svg
                  className="text-border absolute inset-0 h-full w-full"
                  viewBox="0 0 1000 560"
                  preserveAspectRatio="none"
                  fill="none"
                  aria-hidden="true"
                >
                  <ellipse
                    cx="500"
                    cy="204"
                    rx="440"
                    ry="195"
                    stroke="currentColor"
                    strokeDasharray="4 5"
                  />
                  <path
                    d="M270 123C400 123 400 151 500 151"
                    stroke="currentColor"
                  />
                  <path
                    d="M730 123C600 123 600 151 500 151"
                    stroke="currentColor"
                  />
                  <path
                    d="M270 286C400 286 400 218 500 218"
                    stroke="currentColor"
                  />
                  <path
                    d="M730 286C600 286 600 218 500 218"
                    stroke="currentColor"
                  />
                  <path
                    d="M20 185H235"
                    stroke="currentColor"
                    strokeDasharray="4 5"
                  />
                  <path
                    d="M765 185H980"
                    stroke="currentColor"
                    strokeDasharray="4 5"
                  />
                  <path
                    d="M500 218V325"
                    stroke="currentColor"
                    strokeDasharray="4 5"
                  />

                  <circle cx="270" cy="123" r="5" className="fill-accent" />
                  <circle cx="730" cy="123" r="5" className="fill-accent" />
                  <circle cx="500" cy="151" r="5" className="fill-accent" />
                  <circle cx="500" cy="218" r="5" className="fill-accent" />
                  <circle cx="270" cy="286" r="5" className="fill-accent" />
                  <circle cx="730" cy="286" r="5" className="fill-accent" />
                </svg>

                {CORE_TECHNOLOGIES.map((technology) => (
                  <div
                    key={technology.name}
                    className={cn(
                      'absolute z-10 -translate-x-1/2 text-center',
                      technology.position === 'leftTop' &&
                        'top-[22%] left-[27%] -translate-y-[calc(100%+14px)]',
                      technology.position === 'rightTop' &&
                        'top-[22%] left-[73%] -translate-y-[calc(100%+14px)]',
                      technology.position === 'center' &&
                        'top-[33%] left-1/2 -translate-y-1/2',
                      technology.position === 'leftBottom' &&
                        'top-[51%] left-[27%] -translate-y-[calc(100%+14px)]',
                      technology.position === 'rightBottom' &&
                        'top-[51%] left-[73%] -translate-y-[calc(100%+14px)]',
                    )}
                  >
                    <span className="text-fg block text-xl font-semibold tracking-[-0.03em] whitespace-nowrap sm:text-2xl xl:text-[1.7rem]">
                      {technology.name}
                    </span>
                    <span className="text-fg-muted mt-2 block font-mono text-[0.6rem] tracking-[0.18em] whitespace-nowrap uppercase">
                      {t(`core.${technology.slug}`)}
                    </span>
                  </div>
                ))}

                <div className="text-fg-muted absolute top-[33%] left-0 max-w-[7rem] -translate-y-1/2 font-mono text-[0.62rem] leading-relaxed tracking-[0.18em] uppercase">
                  {t('flowStart')}
                </div>
                <div className="text-fg-muted absolute top-[33%] right-0 max-w-[8rem] -translate-y-1/2 text-right font-mono text-[0.62rem] leading-relaxed tracking-[0.18em] uppercase">
                  {t('flowEnd')}
                </div>

                <div className="absolute top-[61%] left-1/2 flex -translate-x-1/2 flex-col items-center gap-1.5">
                  {/*   <span
                    aria-hidden="true"
                    className="text-accent font-mono text-xs leading-none"
                  >
                    +
                  </span> */}
                  {/*  <span
                    aria-hidden="true"
                    className="text-accent font-mono text-xs leading-none"
                  >
                    охйгйгйгйгг
                  </span> */}
                  <span className="text-fg-muted font-mono text-[0.62rem] tracking-[0.2em] whitespace-nowrap uppercase">
                    {t('foundation')}
                  </span>
                </div>
              </div>
            </div>

            <div className="min-w-0">
              <div className="border-border flex items-center gap-4 border-y py-4">
                <span className="bg-border h-px flex-1" aria-hidden="true" />
                <span className="text-fg-muted font-mono text-[0.64rem] tracking-[0.2em] uppercase">
                  {t('process')}
                </span>
                <span className="text-accent" aria-hidden="true">
                  +
                </span>
              </div>

              <ol className="relative">
                <span
                  className="bg-border absolute top-0 bottom-0 left-[0.5rem] hidden w-px sm:block"
                  aria-hidden="true"
                />

                {technologyGroups.map((group, index) => (
                  <li
                    key={group.id}
                    className={cn(
                      'border-border grid gap-4 border-b py-6 transition-[opacity,transform] duration-500 ease-out motion-reduce:translate-x-0 motion-reduce:opacity-100 motion-reduce:transition-none sm:grid-cols-[1rem_2rem_9rem_1fr] sm:items-start',
                      isVisible
                        ? 'translate-x-0 opacity-100'
                        : 'translate-x-5 opacity-0',
                    )}
                    style={{
                      transitionDelay: isVisible
                        ? `${160 + index * 75}ms`
                        : '0ms',
                    }}
                  >
                    <span
                      className="bg-accent mt-[7px] hidden size-1.5 rounded-full sm:block"
                      aria-hidden="true"
                    />
                    <span className="text-fg-muted font-mono text-xs">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <h3 className="text-fg font-mono text-xs tracking-[0.08em] uppercase">
                      {t(`categories.${group.id}`)}
                    </h3>
                    <ul className="flex flex-wrap gap-2">
                      {group.items.map((item) => (
                        <li
                          key={item}
                          className="border-border bg-bg-elevated text-fg-secondary rounded-md border px-3 py-1.5 font-mono text-[0.68rem]"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <div className="border-border mt-16 flex items-center gap-4 border-t pt-6 font-mono text-[0.62rem] tracking-[0.2em] uppercase xl:mt-20">
            <span className="text-accent" aria-hidden="true">
              +
            </span>
            <span className="text-fg-muted whitespace-nowrap">
              {t('outroLeft')}
            </span>
            <span className="bg-border h-px flex-1" aria-hidden="true" />
            <span className="text-fg-muted whitespace-nowrap">
              {t('outroRight')}
            </span>
            <span className="text-accent" aria-hidden="true">
              +
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
