import { Languages, MapPin, Target, UserRound } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Card } from '@/components/ui/Card';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';

const CARD_ITEMS = [
  { key: 'location', Icon: MapPin },
  { key: 'role', Icon: UserRound },
  { key: 'focus', Icon: Target },
  { key: 'languages', Icon: Languages },
] as const;

export function About() {
  const t = useTranslations('About');
  const paragraphs = t.raw('paragraphs') as string[];

  return (
    <section
      id="about"
      className="border-border scroll-mt-20 border-b py-20 md:py-28"
    >
      <Container>
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] md:gap-16">
          <div className="flex flex-col gap-6">
            <SectionHeading eyebrow={t('eyebrow')} title={t('title')} />
            <div className="text-fg-secondary flex flex-col gap-4 text-lg">
              {paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:self-start">
            {CARD_ITEMS.map(({ key, Icon }) => (
              <Card key={key} className="flex flex-col gap-3 p-6">
                <Icon className="text-accent" size={20} aria-hidden="true" />
                <div className="flex flex-col gap-1">
                  <p className="text-fg-muted font-mono text-xs tracking-[0.15em] uppercase">
                    {t(`cards.${key}.label`)}
                  </p>
                  <p className="text-fg text-sm font-medium">
                    {t(`cards.${key}.value`)}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
