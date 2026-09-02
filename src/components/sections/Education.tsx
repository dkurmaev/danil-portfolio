import { Award, GraduationCap } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';

const ITEMS = [
  { key: 'engineering', Icon: GraduationCap },
  { key: 'fullstack', Icon: Award },
] as const;

export function Education() {
  const t = useTranslations('Education');

  return (
    <section
      id="education"
      className="border-border scroll-mt-20 border-b py-20 md:py-28"
    >
      <Container className="flex flex-col gap-12">
        <SectionHeading eyebrow={t('eyebrow')} title={t('title')} />

        <div className="flex flex-col gap-8">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {ITEMS.map(({ key, Icon }) => (
              <Card key={key} className="flex flex-col gap-3 p-6">
                <Icon className="text-accent" size={20} aria-hidden="true" />
                <h3 className="text-fg text-base font-semibold">
                  {t(`items.${key}.title`)}
                </h3>
                <p className="text-fg-secondary text-sm">
                  {t(`items.${key}.description`)}
                </p>
              </Card>
            ))}
          </div>

          {/* Stub — certificate modal / page land in a later block. */}
          <Button
            type="button"
            variant="secondary"
            disabled
            className="self-start"
          >
            {t('cta')}
          </Button>
        </div>
      </Container>
    </section>
  );
}
