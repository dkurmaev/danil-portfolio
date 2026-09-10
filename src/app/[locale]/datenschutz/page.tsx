import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { Container } from '@/components/ui/Container';
import { Link } from '@/i18n/navigation';
import type { AppLocale } from '@/i18n/routing';

const SECTION_KEYS = [
  'controller',
  'hosting',
  'contactForm',
  'cookiesAnalytics',
  'externalServices',
  'rights',
] as const;

interface DatenschutzPageProps {
  params: Promise<{ locale: AppLocale }>;
}

export async function generateMetadata({
  params,
}: DatenschutzPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Datenschutz' });

  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    // Placeholder content — keep out of search results until it's filled in.
    robots: { index: false, follow: true },
  };
}

export default async function DatenschutzPage({
  params,
}: DatenschutzPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'Datenschutz' });

  return (
    <>
      <Header />
      <main>
        <section className="border-border border-b py-20 md:py-24">
          <Container>
            <div className="mx-auto max-w-2xl">
              <p className="text-fg-muted font-mono text-xs tracking-[0.2em] uppercase">
                {t('eyebrow')}
              </p>
              <h1 className="text-fg mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
                {t('title')}
              </h1>
              <p className="text-fg-secondary mt-4 text-base leading-relaxed">
                {t('intro')}
              </p>

              <div className="divide-border mt-10 divide-y">
                {SECTION_KEYS.map((key) => (
                  <div key={key} className="py-6 first:pt-0">
                    <h2 className="text-fg text-lg font-semibold tracking-tight">
                      {t(`sections.${key}.title`)}
                    </h2>
                    <p className="text-fg-muted mt-2 text-sm leading-relaxed">
                      {t(`sections.${key}.body`)}
                    </p>
                  </div>
                ))}
              </div>

              <Link
                href="/"
                className="text-accent hover:text-accent-secondary mt-8 inline-flex items-center gap-1.5 text-sm font-medium underline underline-offset-4"
              >
                {t('back')}
              </Link>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
