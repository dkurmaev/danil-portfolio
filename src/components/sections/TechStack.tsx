import { useTranslations } from 'next-intl';

import { Card } from '@/components/ui/Card';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { technologyGroups } from '@data/technologies';

export function TechStack() {
  const t = useTranslations('TechStack');

  return (
    <section
      id="stack"
      className="border-border scroll-mt-20 border-b py-20 md:py-28"
    >
      <Container className="flex flex-col gap-12">
        <SectionHeading
          eyebrow={t('eyebrow')}
          title={t('title')}
          description={t('description')}
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {technologyGroups.map((group) => (
            <Card key={group.id} className="flex flex-col gap-4 p-6">
              <h3 className="text-fg text-sm font-semibold tracking-wide uppercase">
                {t(`categories.${group.id}`)}
              </h3>
              <ul className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-chip border-border bg-bg-elevated text-fg-secondary border px-3 py-1.5 font-mono text-xs"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
