import { ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { SocialLinks } from '@/components/ui/SocialLinks';
import { siteConfig } from '@/config/site';

export function Hero() {
  const t = useTranslations('Hero');
  const stack = t.raw('stack') as string[];

  return (
    <section
      id="hero"
      className="border-border relative flex min-h-[90svh] scroll-mt-20 items-center border-b py-20 md:min-h-[95svh] md:py-28"
    >
      <Container>
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[minmax(0,45%)_minmax(0,55%)] md:grid-rows-[auto_auto] md:gap-x-16 md:gap-y-10">
          <div className="flex flex-col gap-6 md:col-start-1 md:row-start-1">
            {siteConfig.availability.enabled && (
              <Badge className="self-start">{t('availabilityAvailable')}</Badge>
            )}

            <p className="text-fg-muted font-mono text-xs tracking-[0.2em] uppercase">
              {t('eyebrow')}
            </p>

            <h1 className="text-fg text-[clamp(2.75rem,6vw+1rem,5rem)] leading-[0.95] font-bold tracking-tight">
              <span className="block">{t('titleLine1')}</span>
              <span className="text-accent block">{t('titleLine2')}</span>
            </h1>

            <div className="flex flex-col gap-4">
              <p className="text-fg-secondary font-mono text-sm tracking-wider uppercase">
                {t('subtitle')}
              </p>
              <p className="text-fg-secondary max-w-xl text-lg md:text-xl">
                {t('description')}
              </p>
            </div>

            <ul className="flex flex-wrap gap-2">
              {stack.map((tech) => (
                <li
                  key={tech}
                  className="rounded-chip border-border bg-bg-card text-fg-secondary border px-3 py-1.5 font-mono text-xs"
                >
                  {tech}
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Button href="#projects" variant="primary">
                {t('ctaPrimary')}
                <ArrowRight size={16} aria-hidden="true" />
              </Button>
              <Button href="#contact" variant="secondary">
                {t('ctaSecondary')}
              </Button>
              <Button href="#calculator" variant="ghost">
                {t('ctaTertiary')}
              </Button>
            </div>
          </div>

          <div
            aria-hidden="true"
            className="rounded-card border-border bg-bg-card relative aspect-[4/5] w-full overflow-hidden border md:col-start-2 md:row-span-2 md:row-start-1"
          >
            <div className="bg-accent/30 absolute -top-10 -left-10 h-56 w-56 rounded-full blur-3xl" />
            <div className="bg-accent-secondary/20 absolute -right-12 -bottom-12 h-64 w-64 rounded-full blur-3xl" />
            <div
              className="absolute inset-0 opacity-[0.08]"
              style={{
                backgroundImage:
                  'linear-gradient(var(--color-border) 1px, transparent 1px), linear-gradient(90deg, var(--color-border) 1px, transparent 1px)',
                backgroundSize: '32px 32px',
              }}
            />
            <span className="text-fg/10 absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-6xl font-semibold tracking-tight md:text-8xl">
              DK
            </span>
          </div>

          <div className="md:col-start-1 md:row-start-2 md:self-end">
            <SocialLinks />
          </div>
        </div>
      </Container>
    </section>
  );
}
