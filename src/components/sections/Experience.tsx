import { useTranslations } from 'next-intl';

import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { cn } from '@/lib/cn';
import { experiences } from '@data/experiences';

export function Experience() {
  const t = useTranslations('Experience');

  return (
    <section
      id="experience"
      className="border-border scroll-mt-20 border-b py-20 md:py-28"
    >
      <Container className="flex flex-col gap-12">
        <SectionHeading eyebrow={t('eyebrow')} title={t('title')} />

        <ol className="flex flex-col">
          {experiences.map((entry, index) => (
            <li key={entry.id} className="grid grid-cols-[auto_1fr] gap-x-6">
              <div className="flex flex-col items-center">
                <span
                  aria-hidden="true"
                  className={cn(
                    'mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full',
                    entry.current ? 'bg-accent' : 'bg-fg-muted',
                  )}
                />
                {index < experiences.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="bg-border my-1 w-px flex-1"
                  />
                )}
              </div>

              <div className="pb-10">
                <p className="text-fg-muted font-mono text-xs tracking-[0.15em] uppercase">
                  {t(`items.${entry.id}.period`)}
                </p>
                <h3 className="text-fg mt-1 text-lg font-semibold">
                  {t(`items.${entry.id}.title`)}
                </h3>
                <p className="text-fg-secondary mt-2 max-w-2xl text-sm">
                  {t(`items.${entry.id}.description`)}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
