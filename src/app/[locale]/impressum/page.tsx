import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { Container } from '@/components/ui/Container';
import { socialLinks } from '@/config/social';
import { Link } from '@/i18n/navigation';
import type { AppLocale } from '@/i18n/routing';
import { buildLanguageAlternates, localeHref } from '@/lib/seo';

const PATH = '/impressum';

interface ImpressumPageProps {
  params: Promise<{ locale: AppLocale }>;
}

export async function generateMetadata({
  params,
}: ImpressumPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Impressum' });

  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    alternates: {
      canonical: localeHref(locale, PATH),
      languages: buildLanguageAlternates(PATH),
    },
  };
}

// Content is pinned to German in every locale — this is a legal document
// (§5 TMG), not marketing copy, and must stay identical to the source PDF
// regardless of which locale the visitor is browsing. Only the nav/footer
// label that links here is translated (see messages/*.json Footer).
export default async function ImpressumPage({ params }: ImpressumPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'Impressum' });
  const phoneHref = `tel:+49${socialLinks.phone.slice(1)}`;
  const email = socialLinks.email.replace('mailto:', '');

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

              <div className="text-fg-secondary mt-8 text-base leading-relaxed">
                <p>{t('identity.name')}</p>
                <p>{t('identity.company')}</p>
                <p>{t('identity.street')}</p>
                <p>{t('identity.city')}</p>
              </div>

              <h2 className="text-fg mt-10 text-xl font-semibold tracking-tight">
                {t('contactHeading')}
              </h2>
              <div className="text-fg-secondary mt-4 space-y-1 text-base leading-relaxed">
                <p>
                  {t('phoneLabel')}:{' '}
                  <a
                    href={phoneHref}
                    className="text-accent hover:text-accent-secondary underline underline-offset-2"
                  >
                    {socialLinks.phone}
                  </a>
                </p>
                <p>
                  {t('emailLabel')}:{' '}
                  <a
                    href={socialLinks.email}
                    className="text-accent hover:text-accent-secondary underline underline-offset-2"
                  >
                    {email}
                  </a>
                </p>
              </div>

              <h2 className="text-fg mt-10 text-xl font-semibold tracking-tight">
                {t('disputeHeading')}
              </h2>
              <p className="text-fg-secondary mt-4 text-base leading-relaxed">
                {t('disputeText')}
              </p>

              <Link
                href="/"
                className="text-accent hover:text-accent-secondary mt-12 inline-flex items-center gap-1.5 text-sm font-medium underline underline-offset-4"
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
