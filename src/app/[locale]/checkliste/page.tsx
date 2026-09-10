import type { Metadata } from 'next';
import { Construction } from 'lucide-react';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { socialLinks } from '@/config/social';
import type { AppLocale } from '@/i18n/routing';

interface ChecklistePageProps {
  params: Promise<{ locale: AppLocale }>;
}

export async function generateMetadata({
  params,
}: ChecklistePageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Checkliste' });

  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    // Coming soon — nothing to index yet.
    robots: { index: false, follow: true },
  };
}

export default async function ChecklistePage({ params }: ChecklistePageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'Checkliste' });

  return (
    <>
      <Header />
      <main>
        <section className="border-border flex min-h-[60vh] items-center border-b py-20">
          <Container>
            <div className="mx-auto max-w-xl text-center">
              <span className="border-border bg-bg-elevated text-fg-muted mx-auto flex h-14 w-14 items-center justify-center rounded-full border">
                <Construction size={22} aria-hidden="true" />
              </span>
              <p className="text-fg-muted mt-6 font-mono text-xs tracking-[0.2em] uppercase">
                {t('eyebrow')}
              </p>
              <h1 className="text-fg mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
                {t('title')}
              </h1>
              <p className="text-fg-secondary mt-4 text-base leading-relaxed sm:text-lg">
                {t('description')}
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Button href="/" variant="primary">
                  {t('ctaHome')}
                </Button>
                <Button href={socialLinks.email} variant="secondary">
                  {t('ctaContact')}
                </Button>
              </div>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
