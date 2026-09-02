import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { SocialLinks } from '@/components/ui/SocialLinks';
import { socialLinks } from '@/config/social';

export function Contact() {
  const t = useTranslations('Contact');

  return (
    <section id="contact" className="scroll-mt-20 py-20 md:py-28">
      <Container className="flex flex-col items-start gap-8">
        <SectionHeading
          eyebrow={t('eyebrow')}
          title={t('title')}
          description={t('description')}
        />

        <div className="flex flex-wrap items-center gap-6">
          <Button href={socialLinks.email} variant="primary">
            {t('cta')}
          </Button>
          <SocialLinks />
        </div>
      </Container>
    </section>
  );
}
