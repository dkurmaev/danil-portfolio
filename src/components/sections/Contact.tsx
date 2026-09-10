'use client';

import { Clock, Mail, MapPin } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { motion, useReducedMotion } from 'motion/react';

import { ContactForm } from '@/components/contact/ContactForm';
import { SocialLinks } from '@/components/ui/SocialLinks';
import { socialLinks } from '@/config/social';

const STAGGER_STEP = 0.08;

const PROCESS_STAGES = [
  'idea',
  'architecture',
  'development',
  'deployment',
] as const;

/** Decorative process strip — purely visual, matches docs/design/kontakt.png. */
function ProcessDiagram() {
  const t = useTranslations('Contact.diagram');

  return (
    <div aria-hidden="true" className="relative mt-10 hidden pt-2 sm:block">
      <div className="border-border absolute top-1/2 right-0 left-0 border-t border-dashed" />
      <div className="relative flex items-center justify-between">
        {PROCESS_STAGES.map((stage) => {
          const isAccent = stage === 'architecture';

          return (
            <div
              key={stage}
              className="bg-bg flex flex-col items-center gap-3 px-2"
            >
              <span
                className={`h-3.5 w-3.5 rotate-45 rounded-[3px] border ${
                  isAccent
                    ? 'border-accent bg-accent'
                    : 'border-border bg-bg-card'
                }`}
              />
              <span className="text-fg-muted font-mono text-[0.6rem] tracking-[0.18em] uppercase">
                {t(stage)}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function Contact() {
  const t = useTranslations('Contact');
  const reducedMotion = !!useReducedMotion();
  const email = socialLinks.email.replace('mailto:', '');

  const reveal = (index: number) => ({
    initial: reducedMotion ? undefined : { opacity: 0, y: 12 },
    whileInView: reducedMotion ? undefined : { opacity: 1, y: 0 },
    viewport: { once: true, margin: '0px 0px -10% 0px' } as const,
    transition: {
      duration: 0.5,
      delay: index * STAGGER_STEP,
      ease: 'easeOut' as const,
    },
  });

  return (
    <section id="contact" className="scroll-mt-20 py-20 md:py-24 xl:py-28">
      <div className="mx-auto w-full max-w-[1840px] px-5 md:px-8 xl:px-14">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-16 xl:gap-20">
          <div>
            <header>
              <div className="flex items-center gap-5">
                <span
                  aria-hidden="true"
                  className="font-sans text-[clamp(4rem,7vw,5.5rem)] leading-[0.8] font-light tracking-[-0.06em]"
                  style={{
                    WebkitTextStroke: '1.5px var(--color-fg-muted)',
                    color: 'transparent',
                  }}
                >
                  08
                </span>
                <div className="flex min-w-0 flex-1 items-center gap-5">
                  <p className="text-fg-muted shrink-0 font-mono text-[0.65rem] tracking-[0.22em] uppercase">
                    {t('eyebrow')} / {t('selection')}
                  </p>
                  <span className="bg-border h-px flex-1" aria-hidden="true" />
                </div>
              </div>
              <h2 className="text-fg mt-6 text-[clamp(2.25rem,3.6vw,3.5rem)] leading-[1.05] font-semibold tracking-[-0.03em]">
                {t('headline')}
                <span className="text-accent">.</span>
              </h2>
              <p className="text-fg-secondary mt-5 text-base leading-7 md:text-lg">
                {t('description')}
              </p>
            </header>

            <div className="mt-10 flex flex-col gap-6 md:mt-12">
              <ul className="flex flex-col gap-3">
                <motion.li
                  {...reveal(0)}
                  className="text-fg-secondary flex items-center gap-3 text-sm"
                >
                  <span className="relative flex h-3.5 w-3.5 shrink-0 items-center justify-center">
                    <span className="bg-success absolute inline-flex h-2.5 w-2.5 animate-ping rounded-full opacity-75 motion-reduce:animate-none" />
                    <span className="bg-success relative inline-flex h-2 w-2 rounded-full" />
                  </span>
                  {t('status.available')}
                </motion.li>
                <motion.li
                  {...reveal(1)}
                  className="text-fg-secondary flex items-center gap-3 text-sm"
                >
                  <MapPin
                    size={16}
                    className="text-fg-muted shrink-0"
                    aria-hidden="true"
                  />
                  {t('status.location')}
                </motion.li>
                <motion.li
                  {...reveal(2)}
                  className="text-fg-secondary flex items-center gap-3 text-sm"
                >
                  <Clock
                    size={16}
                    className="text-fg-muted shrink-0"
                    aria-hidden="true"
                  />
                  {t('status.responseTime')}
                </motion.li>
                <motion.li
                  {...reveal(3)}
                  className="text-fg-secondary flex items-center gap-3 text-sm"
                >
                  <Mail
                    size={16}
                    className="text-fg-muted shrink-0"
                    aria-hidden="true"
                  />
                  <a
                    href={socialLinks.email}
                    className="hover:text-fg transition-colors duration-200"
                  >
                    {email}
                  </a>
                </motion.li>
              </ul>

              <motion.div
                {...reveal(4)}
                className="border-border border-t pt-6"
              >
                <SocialLinks variant="text" />
              </motion.div>

              <motion.p
                {...reveal(5)}
                className="text-fg-muted border-border border-t pt-6 text-sm"
              >
                {t('trust')}
              </motion.p>
            </div>

            <motion.div {...reveal(6)}>
              <ProcessDiagram />
            </motion.div>
          </div>

          <motion.div {...reveal(2)}>
            <ContactForm />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
