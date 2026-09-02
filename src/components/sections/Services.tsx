import {
  BrainCircuit,
  Layers,
  Rocket,
  Server,
  Wrench,
  Globe,
  Workflow,
} from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Card } from '@/components/ui/Card';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import type { ServiceCategory } from '@/types/services';
import { services } from '@data/services';

const SERVICE_ICONS: Record<ServiceCategory, typeof Globe> = {
  'web-applications': Globe,
  'fullstack-development': Layers,
  'backend-api': Server,
  'saas-mvp': Rocket,
  automation: Workflow,
  'ai-integrations': BrainCircuit,
  'existing-projects': Wrench,
};

export function Services() {
  const t = useTranslations('Services');

  return (
    <section
      id="services"
      className="border-border scroll-mt-20 border-b py-20 md:py-28"
    >
      <Container className="flex flex-col gap-12">
        <SectionHeading
          eyebrow={t('eyebrow')}
          title={t('title')}
          description={t('description')}
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const Icon = SERVICE_ICONS[service.id];

            return (
              <Card key={service.id} className="flex flex-col gap-3 p-6">
                <Icon className="text-accent" size={20} aria-hidden="true" />
                <h3 className="text-fg text-base font-semibold">
                  {t(`items.${service.id}.title`)}
                </h3>
                <p className="text-fg-secondary text-sm">
                  {t(`items.${service.id}.description`)}
                </p>
              </Card>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
