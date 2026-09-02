import { ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { CoverPlaceholder } from '@/components/ui/CoverPlaceholder';
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

          <CoverPlaceholder
            label="DK"
            className="rounded-card border-border bg-bg-card aspect-[4/5] border md:col-start-2 md:row-span-2 md:row-start-1"
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
