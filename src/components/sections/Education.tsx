'use client';

import { ArrowRight, MapPin } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { motion, useReducedMotion } from 'motion/react';

import { Button } from '@/components/ui/Button';
import { certificates, educationEntries } from '@data/education';
import type { CertificateEntry, EducationEntry } from '@/types/education';

interface EducationCardProps {
  entry: EducationEntry;
  index: number;
  reducedMotion: boolean;
}

function EducationCard({ entry, index, reducedMotion }: EducationCardProps) {
  const t = useTranslations('Education');
  const tags = t.raw(`entries.${entry.id}.tags`) as string[];
  const meta = [entry.institution, entry.location].filter(Boolean).join(' · ');

  return (
    <motion.div
      initial={reducedMotion ? undefined : { opacity: 0, y: 24 }}
      whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 0.55, delay: index * 0.15, ease: 'easeOut' }}
      className="border-border bg-bg-elevated relative rounded-2xl border p-6 md:p-8"
    >
      <span className="text-fg-muted absolute top-6 right-6 font-mono text-[0.65rem] tracking-[0.15em] uppercase md:top-8 md:right-8">
        {String(index + 1).padStart(2, '0')}
      </span>
      <p className="text-fg-muted text-[clamp(2.4rem,4.8vw,3.5rem)] leading-none font-light tracking-tight">
        {t(`entries.${entry.id}.period`)}
      </p>
      <h3 className="text-fg mt-5 max-w-[85%] text-xl font-semibold tracking-[-0.02em] md:text-2xl">
        {t(`entries.${entry.id}.title`)}
      </h3>
      {meta && (
        <p className="text-fg-muted mt-3 flex items-start gap-1.5 font-mono text-[0.68rem] tracking-[0.12em] uppercase">
          <MapPin size={13} className="mt-0.5 shrink-0" aria-hidden="true" />
          <span>{meta}</span>
        </p>
      )}
      <p className="border-border text-fg-muted mt-6 border-t pt-4 font-mono text-[0.66rem] tracking-[0.1em] uppercase">
        {t(`entries.${entry.id}.note`)}
      </p>
      {tags.length > 0 && (
        <p className="text-fg-muted mt-2 font-mono text-[0.66rem] tracking-[0.1em] uppercase">
          {tags.join(' · ')}
        </p>
      )}
    </motion.div>
  );
}

function Connector({
  label,
  reducedMotion,
}: {
  label: string;
  reducedMotion: boolean;
}) {
  return (
    <>
      {/* Desktop: horizontal connector between the two cards. */}
      <div
        aria-hidden="true"
        className="hidden flex-col items-center justify-center gap-4 px-2 lg:flex"
      >
        <p className="text-fg-muted max-w-[9.5rem] text-center font-mono text-[0.6rem] leading-4 tracking-[0.12em] uppercase">
          {label}
        </p>
        <div className="flex w-16 items-center xl:w-24">
          <span className="bg-accent size-2 shrink-0 rounded-full" />
          <motion.span
            style={{ transformOrigin: 'left' }}
            initial={reducedMotion ? undefined : { scaleX: 0 }}
            whileInView={reducedMotion ? undefined : { scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2, ease: 'easeInOut' }}
            className="bg-accent h-px flex-1"
          />
          <ArrowRight className="text-accent shrink-0" size={16} />
        </div>
      </div>

      {/* Mobile / tablet: short vertical connector between stacked cards. */}
      <div
        aria-hidden="true"
        className="flex items-center justify-center gap-3 py-1 lg:hidden"
      >
        <span className="bg-accent size-1.5 shrink-0 rounded-full" />
        <motion.span
          style={{ transformOrigin: 'top' }}
          initial={reducedMotion ? undefined : { scaleY: 0 }}
          whileInView={reducedMotion ? undefined : { scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
          className="bg-accent h-8 w-px"
        />
      </div>
    </>
  );
}

function CertificateItem({
  cert,
  index,
  reducedMotion,
}: {
  cert: CertificateEntry;
  index: number;
  reducedMotion: boolean;
}) {
  const t = useTranslations('Education');

  return (
    <motion.div
      initial={reducedMotion ? undefined : { opacity: 0, y: 16 }}
      whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 0.45, delay: index * 0.12, ease: 'easeOut' }}
      className="flex flex-col gap-1.5"
    >
      <div className="flex items-center gap-2">
        <span className="text-fg-muted font-mono text-[0.6rem] tracking-[0.15em] uppercase">
          {String(index + 1).padStart(2, '0')}
        </span>
        <span className="bg-accent size-1.5 rounded-full" aria-hidden="true" />
        <span className="text-fg text-xl font-semibold tracking-[-0.02em]">
          {t(`certificates.${cert.id}.period`)}
        </span>
      </div>
      <p className="text-fg text-sm font-medium">
        {t(`certificates.${cert.id}.title`)}
      </p>
      <p className="text-fg-muted font-mono text-[0.65rem] tracking-[0.1em] uppercase">
        {cert.institution}
      </p>
    </motion.div>
  );
}

export function Education() {
  const t = useTranslations('Education');
  const reducedMotion = !!useReducedMotion();

  return (
    <section
      id="education"
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
            05
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

        <div className="mt-16 grid grid-cols-1 items-center gap-2 md:mt-20 lg:grid-cols-[1fr_auto_1fr] lg:gap-2">
          <EducationCard
            entry={educationEntries[0]}
            index={0}
            reducedMotion={reducedMotion}
          />
          <Connector
            label={t('connectorLabel')}
            reducedMotion={reducedMotion}
          />
          <EducationCard
            entry={educationEntries[1]}
            index={1}
            reducedMotion={reducedMotion}
          />
        </div>

        <div className="border-border mt-16 border-t pt-10 md:mt-20">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between lg:gap-12">
            <div className="min-w-0 flex-1">
              <p className="text-fg-muted font-mono text-xs tracking-[0.2em] uppercase">
                {t('certificatesLabel')}
              </p>
              <div className="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-6">
                {certificates.map((cert, index) => (
                  <CertificateItem
                    key={cert.id}
                    cert={cert}
                    index={index}
                    reducedMotion={reducedMotion}
                  />
                ))}
              </div>
            </div>

            {/* Stub — certificate modal / page land in a later block. */}
            <Button
              type="button"
              variant="secondary"
              disabled
              className="shrink-0 self-start"
            >
              {t('cta')}
            </Button>
          </div>
        </div>

        <motion.p
          initial={reducedMotion ? undefined : { opacity: 0, y: 16 }}
          whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '0px 0px -10% 0px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="text-fg mt-16 max-w-xl text-xl leading-snug font-medium md:mt-20 md:text-2xl"
        >
          {t('statement')}
          <span className="text-accent">.</span>
        </motion.p>
      </div>
    </section>
  );
}
