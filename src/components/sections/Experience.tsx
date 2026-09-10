'use client';

import type { CSSProperties } from 'react';
import { ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { motion, useReducedMotion } from 'motion/react';

import { cn } from '@/lib/cn';
import { experiences } from '@data/experiences';
import type { ExperienceEntry } from '@/types/experiences';

/** Vertical stagger per step in the desktop staircase, in pixels. */
const STEP_PX = 64;
/** Gap between a dot's rail and the card content below it, in pixels. */
const DOT_GAP_PX = 32;
/** Time between one "hop" (dot → line → line → dot) and the next, in seconds. */
const HOP_SECONDS = 0.5;

function ExperienceEntryCard({ entry }: { entry: ExperienceEntry }) {
  const t = useTranslations('Experience');
  const tags = t.raw(`items.${entry.id}.tags`) as string[];
  const meta = [entry.company, entry.location].filter(Boolean).join(' · ');

  return (
    <div
      className={cn(
        entry.current &&
          'border-border bg-bg-elevated rounded-2xl border p-6 md:p-7',
      )}
    >
      <p className="text-fg-muted font-mono text-xs tracking-[0.15em] uppercase">
        {t(`items.${entry.id}.period`)}
      </p>
      <h3 className="text-fg mt-3 text-xl font-semibold tracking-[-0.02em] md:text-2xl">
        {t(`items.${entry.id}.title`)}
      </h3>
      {meta && (
        <p className="text-fg-muted mt-1 font-mono text-[0.68rem] tracking-[0.12em] uppercase">
          {meta}
        </p>
      )}
      <p className="text-fg-secondary mt-4 max-w-md text-sm leading-6">
        {t(`items.${entry.id}.description`)}
      </p>
      <p className="border-border text-fg-muted mt-5 border-t pt-4 font-mono text-[0.66rem] tracking-[0.1em] uppercase">
        {tags.join(' · ')}
      </p>
      {entry.ctaHref && (
        <a
          href={entry.ctaHref}
          className="text-accent focus-visible:outline-accent mt-5 inline-flex items-center gap-2 text-sm font-semibold underline-offset-4 hover:underline focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4"
        >
          {t(`items.${entry.id}.cta`)}{' '}
          <ArrowRight size={15} aria-hidden="true" />
        </a>
      )}
    </div>
  );
}

interface TimelineDotProps {
  x: string | number;
  y: string | number;
  current: boolean;
  delay: number;
  reducedMotion: boolean;
}

function TimelineDot({
  x,
  y,
  current,
  delay,
  reducedMotion,
}: TimelineDotProps) {
  return (
    <motion.span
      aria-hidden="true"
      style={{ left: x, top: y }}
      initial={reducedMotion ? undefined : { opacity: 0, scale: 0.4 }}
      whileInView={reducedMotion ? undefined : { opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 0.3, delay, ease: 'easeOut' }}
      className={cn(
        'absolute size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full',
        current ? 'bg-accent' : 'bg-fg-muted',
      )}
    />
  );
}

interface TimelineLineProps {
  orientation: 'horizontal' | 'vertical';
  style: CSSProperties;
  delay: number;
  duration?: number;
  reducedMotion: boolean;
}

function TimelineLine({
  orientation,
  style,
  delay,
  duration = 0.4,
  reducedMotion,
}: TimelineLineProps) {
  const axisKey = orientation === 'horizontal' ? 'scaleX' : 'scaleY';

  return (
    <motion.span
      aria-hidden="true"
      style={{
        ...style,
        transformOrigin: orientation === 'horizontal' ? 'left' : 'top',
      }}
      initial={reducedMotion ? undefined : { [axisKey]: 0 }}
      whileInView={reducedMotion ? undefined : { [axisKey]: 1 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration, delay, ease: 'easeInOut' }}
      className="bg-accent absolute"
    />
  );
}

export function Experience() {
  const t = useTranslations('Experience');
  const reducedMotion = !!useReducedMotion();

  const total = experiences.length;

  return (
    <section
      id="experience"
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
            04
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

        <div className="relative mt-24 md:mt-28">
          {/* Desktop staircase */}
          <div className="relative hidden lg:grid lg:grid-cols-3 lg:gap-x-10">
            <div
              className="pointer-events-none absolute inset-0"
              aria-hidden="true"
            >
              {experiences.map((entry, index) => {
                const x = `${(index / total) * 100}%`;
                const y = index * STEP_PX;
                const dotDelay = index === 0 ? 0 : index * HOP_SECONDS;

                return (
                  <div key={entry.id}>
                    {index === 0 && (
                      <span
                        style={{ left: x, top: y }}
                        className="text-accent absolute -translate-y-[calc(100%+10px)] font-mono text-[0.65rem] font-semibold tracking-[0.15em] uppercase"
                      >
                        {t('now')}
                      </span>
                    )}

                    <TimelineDot
                      x={x}
                      y={y}
                      current={entry.current}
                      delay={dotDelay}
                      reducedMotion={reducedMotion}
                    />

                    {index < total - 1 && (
                      <>
                        <span
                          style={{ left: `calc(${x} + 6rem)`, top: y }}
                          className="text-fg-muted absolute -translate-y-[calc(100%+10px)] font-mono text-[0.62rem] tracking-[0.15em] whitespace-nowrap uppercase"
                        >
                          {t(`items.${entry.id}.connectorLabel`)}
                        </span>
                        <TimelineLine
                          orientation="horizontal"
                          style={{
                            left: x,
                            top: y,
                            width: `${100 / total}%`,
                            height: 2,
                          }}
                          delay={index * HOP_SECONDS}
                          reducedMotion={reducedMotion}
                        />
                        <TimelineLine
                          orientation="vertical"
                          style={{
                            left: `${((index + 1) / total) * 100}%`,
                            top: y,
                            width: 2,
                            height: STEP_PX,
                          }}
                          delay={index * HOP_SECONDS + 0.25}
                          duration={0.3}
                          reducedMotion={reducedMotion}
                        />
                      </>
                    )}
                  </div>
                );
              })}
            </div>

            {experiences.map((entry, index) => (
              <motion.div
                key={entry.id}
                style={{ marginTop: index * STEP_PX + DOT_GAP_PX }}
                initial={reducedMotion ? undefined : { opacity: 0, y: 20 }}
                whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '0px 0px -15% 0px' }}
                transition={{
                  duration: 0.55,
                  delay: index * 0.15,
                  ease: 'easeOut',
                }}
              >
                <ExperienceEntryCard entry={entry} />
              </motion.div>
            ))}
          </div>

          {/* Mobile / tablet: vertical list */}
          <ol className="relative flex flex-col gap-10 lg:hidden">
            <TimelineLine
              orientation="vertical"
              style={{ left: 3, top: 4, width: 2, height: 'calc(100% - 8px)' }}
              delay={0}
              duration={0.8}
              reducedMotion={reducedMotion}
            />
            {experiences.map((entry, index) => (
              <motion.li
                key={entry.id}
                className="relative pl-8"
                initial={reducedMotion ? undefined : { opacity: 0, y: 16 }}
                whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '0px 0px -10% 0px' }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.12,
                  ease: 'easeOut',
                }}
              >
                <TimelineDot
                  x={4}
                  y={4}
                  current={entry.current}
                  delay={index === 0 ? 0 : index * HOP_SECONDS}
                  reducedMotion={reducedMotion}
                />
                <ExperienceEntryCard entry={entry} />
              </motion.li>
            ))}
          </ol>
        </div>

        <motion.div
          initial={reducedMotion ? undefined : { opacity: 0, y: 16 }}
          whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '0px 0px -10% 0px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="border-border mt-16 grid gap-8 border-t pt-10 sm:grid-cols-[auto_1fr] sm:items-center lg:grid-cols-[auto_1fr_auto_auto] lg:gap-10 xl:mt-20"
        >
          <div className="border-border flex items-baseline gap-4 sm:border-r sm:pr-8 lg:pr-10">
            <span className="text-accent text-5xl font-semibold tracking-[-0.03em]">
              {t('stats.years')}
            </span>
            <p className="text-fg-muted font-mono text-[0.65rem] leading-4 tracking-[0.12em] uppercase">
              {t('stats.yearsLabel')}
            </p>
          </div>
          <p className="text-fg max-w-xl text-xl leading-snug font-medium sm:text-2xl">
            {t('stats.statement')}
            <span className="text-accent">.</span>
          </p>
          <p className="text-fg-muted border-border font-mono text-[0.62rem] tracking-[0.15em] uppercase lg:border-l lg:pl-10">
            {t('stats.noteLeft')}
          </p>
          <p className="text-fg-muted border-border font-mono text-[0.62rem] tracking-[0.15em] uppercase lg:border-l lg:pl-10">
            {t('stats.noteRight')}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
