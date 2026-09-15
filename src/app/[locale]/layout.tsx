import type { Metadata } from 'next';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Caveat, JetBrains_Mono, Manrope } from 'next/font/google';
import { notFound } from 'next/navigation';

import { siteConfig } from '@/config/site';
import { locales } from '@/i18n/routing';
import {
  buildLanguageAlternates,
  buildPersonJsonLd,
  buildWebsiteJsonLd,
  localeHref,
  ogLocale,
} from '@/lib/seo';

import '../globals.css';

const manrope = Manrope({
  subsets: ['latin', 'latin-ext', 'cyrillic'],
  variable: '--font-manrope',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin', 'latin-ext', 'cyrillic'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

const caveat = Caveat({
  subsets: ['latin'],
  variable: '--font-caveat',
  display: 'swap',
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: Pick<LocaleLayoutProps, 'params'>): Promise<Metadata> {
  const { locale } = await params;

  if (!hasLocale(locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'Metadata' });
  const title = t('title');
  const description = t('description');

  return {
    metadataBase: new URL(siteConfig.url),
    title,
    description,
    alternates: {
      canonical: localeHref(locale),
      languages: buildLanguageAlternates(),
    },
    openGraph: {
      type: 'website',
      title,
      description,
      url: localeHref(locale),
      siteName: siteConfig.name,
      locale: ogLocale(locale),
      images: [{ url: siteConfig.ogImage, width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [siteConfig.ogImage],
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<LocaleLayoutProps>) {
  const { locale } = await params;

  if (!hasLocale(locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const [tHeader, tMetadata] = await Promise.all([
    getTranslations({ locale, namespace: 'Header' }),
    getTranslations({ locale, namespace: 'Metadata' }),
  ]);

  const personJsonLd = buildPersonJsonLd({
    locale,
    name: tHeader('brandName'),
    jobTitle: tHeader('brandRole'),
  });
  const websiteJsonLd = buildWebsiteJsonLd({
    locale,
    name: siteConfig.name,
    description: tMetadata('description'),
  });

  return (
    <html
      lang={locale}
      className={`${manrope.variable} ${jetbrainsMono.variable} ${caveat.variable}`}
    >
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}
