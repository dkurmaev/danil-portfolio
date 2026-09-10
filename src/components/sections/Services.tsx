'use client';

import { useTranslations } from 'next-intl';
import { motion, useReducedMotion } from 'motion/react';

import { cn } from '@/lib/cn';
import { services } from '@data/services';

export function Services() {
  const t = useTranslations('Services');
  const reducedMotion = !!useReducedMotion();

  return (
    <section
      id="services"
      className="border-border bg-bg scroll-mt-20 border-b py-20 md:py-24 xl:py-28"
    >
      <div className="mx-auto w-full max-w-[1840px] px-5 md:px-8 xl:px-14">
        <header className="grid gap-6 md:grid-cols-[auto_minmax(0,1fr)] md:gap-10">
          <span
            aria-hidden="true"
            className="font-sans text-[clamp(6rem,8.5vw,9.5rem)] leading-[0.78] font-light tracking-[-0.08em]"
            style={{
              WebkitTextStroke: '1.5px var(--color-fg-muted)',
              color: 'transparent',
            }}
          >
            06
          </span>
          <div className="min-w-0 pt-1">
            <div className="flex items-center gap-5">
              <p className="text-fg-muted shrink-0 font-mono text-[0.65rem] tracking-[0.22em] uppercase">
                {t('eyebrow')} / {t('selection')}
              </p>
              <span className="bg-border h-px flex-1" aria-hidden="true" />
            </div>
            <h2 className="text-fg mt-6 max-w-4xl text-[clamp(2.75rem,4.2vw,4.8rem)] leading-[0.96] font-semibold tracking-[-0.055em]">
              {t('headline')}
              <span className="text-accent">.</span>
            </h2>
            <p className="text-fg-secondary mt-5 max-w-2xl text-base leading-7 md:text-lg">
              {t('description')}
            </p>
          </div>
        </header>

        <div className="border-border divide-border mt-14 divide-y border-t border-b md:mt-16">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={reducedMotion ? undefined : { opacity: 0, y: 16 }}
              whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '0px 0px -10% 0px' }}
              transition={{
                duration: 0.5,
                delay: index * 0.08,
                ease: 'easeOut',
              }}
              className={cn(
                'flex flex-col gap-4 border-l-2 border-l-transparent py-6 pl-4 sm:flex-row sm:items-start sm:gap-6 sm:pl-6 md:items-center md:py-7',
                service.featured && 'border-l-accent bg-bg-elevated',
              )}
            >
              <div className="flex items-start gap-4 sm:flex-1 sm:items-center sm:gap-6 md:gap-8">
                <span className="text-fg-muted w-10 shrink-0 text-2xl leading-none font-light sm:text-3xl">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div className="min-w-0">
                  <h3 className="text-fg text-base font-semibold tracking-[-0.01em] sm:text-lg">
                    {t(`items.${service.id}.title`)}
                  </h3>
                  <p className="text-fg-secondary mt-1.5 max-w-md text-sm leading-6 sm:text-base">
                    {t(`items.${service.id}.description`)}
                  </p>
                </div>
              </div>
              <p
                className={cn(
                  'text-fg-muted sm:border-border pl-14 font-mono text-[0.65rem] tracking-[0.18em] uppercase sm:w-44 sm:shrink-0 sm:border-l sm:pl-6 sm:text-right sm:text-xs md:w-52',
                  service.featured && 'text-accent',
                )}
              >
                {t(`items.${service.id}.tag`)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
