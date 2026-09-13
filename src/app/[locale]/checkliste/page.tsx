import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import { ChecklistWizard } from '@/components/checklist/ChecklistWizard';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { Container } from '@/components/ui/Container';
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
    // Formular ist noch unvollständig (kein Versand, keine Ergebnisanzeige)
    // — noindex, bis Block G2 abgeschlossen ist.
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
        <section className="py-16 sm:py-24">
          <Container>
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-fg-muted font-mono text-xs tracking-[0.2em] uppercase">
                {t('eyebrow')}
              </p>
              <h1 className="text-fg mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
                {t('title')}
              </h1>
              <p className="text-fg-secondary mt-3 text-lg">{t('subtitle')}</p>
              <p className="text-fg-secondary mt-4 text-base leading-relaxed">
                {t('description')}
              </p>
            </div>

            <div className="mx-auto mt-10 max-w-2xl">
              <ChecklistWizard />
              <p className="text-fg-muted mt-6 text-center text-xs">
                {t('disclaimer')}
              </p>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
