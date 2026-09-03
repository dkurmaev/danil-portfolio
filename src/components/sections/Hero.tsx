import { ArrowRight, Code2, Layers } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { CoverPlaceholder } from '@/components/ui/CoverPlaceholder';
import { SocialLinks } from '@/components/ui/SocialLinks';
import { siteConfig } from '@/config/site';

export function Hero() {
  const t = useTranslations('Hero');

  return (
    <section
      id="hero"
      className="border-border relative flex min-h-[90svh] scroll-mt-20 items-center border-b py-20 md:min-h-[95svh] md:py-28"
    >
      <Container>
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[minmax(0,45%)_minmax(0,55%)] md:grid-rows-[auto_auto] md:gap-x-16 md:gap-y-10">
          <div className="flex flex-col gap-6 md:col-start-1 md:row-start-1">
            <p className="text-fg-muted font-mono text-xs tracking-[0.2em] uppercase">
              {t('eyebrow')}
            </p>

            <h1 className="text-fg text-[clamp(2.75rem,6vw+1rem,5rem)] leading-[0.95] font-bold tracking-tight">
              <span className="block">{t('titleLine1')}</span>
              <span className="block">{t('titleLine2')}</span>
              <span className="text-accent block">{t('titleLine3')}</span>
            </h1>

            <p className="text-fg-secondary max-w-xl text-lg md:text-xl">
              {t('description')}
            </p>

            <div className="flex flex-col gap-2.5">
              <div className="text-fg-secondary flex items-center gap-2.5 font-mono text-xs tracking-wide">
                <Code2
                  size={14}
                  className="text-fg-muted shrink-0"
                  aria-hidden="true"
                />
                {t('techRow1')}
              </div>
              <div className="text-fg-secondary flex items-center gap-2.5 font-mono text-xs tracking-wide">
                <Layers
                  size={14}
                  className="text-fg-muted shrink-0"
                  aria-hidden="true"
                />
                {t('techRow2')}
              </div>
              {siteConfig.availability.enabled && (
                <div className="text-fg-secondary flex items-center gap-2.5 font-mono text-xs tracking-wide">
                  <span
                    className="relative flex h-2 w-2 shrink-0"
                    aria-hidden="true"
                  >
                    <span className="bg-success absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 motion-reduce:animate-none" />
                    <span className="bg-success relative inline-flex h-2 w-2 rounded-full" />
                  </span>
                  {t('availabilityAvailable')}
                </div>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Button href="#projects" variant="primary">
                {t('ctaPrimary')}
                <ArrowRight size={16} aria-hidden="true" />
              </Button>
              <Button href="#contact" variant="secondary">
                {t('ctaSecondary')}
              </Button>
            </div>

            <a
              href="#calculator"
              className="group text-accent decoration-accent/40 hover:decoration-accent inline-flex w-fit items-center gap-1.5 text-sm font-medium underline underline-offset-4 transition-colors duration-200"
            >
              {t('ctaTertiary')}
              <ArrowRight
                size={14}
                className="transition-transform duration-200 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </a>
          </div>

          <CoverPlaceholder
            label="DK"
            className="rounded-card border-border bg-bg-elevated aspect-[4/5] border md:col-start-2 md:row-span-2 md:row-start-1"
            labelClassName="text-6xl md:text-8xl"
          />

          <div className="md:col-start-1 md:row-start-2 md:self-end">
            <SocialLinks />
          </div>
        </div>
      </Container>
    </section>
  );
}
