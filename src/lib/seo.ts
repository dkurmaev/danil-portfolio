import { siteConfig } from '@/config/site';
import { socialLinks } from '@/config/social';
import { locales, type AppLocale } from '@/i18n/routing';

const DEFAULT_LOCALE: AppLocale = 'de';

const OG_LOCALE_MAP: Record<AppLocale, string> = {
  de: 'de_DE',
  en: 'en_US',
  ru: 'ru_RU',
};

export function absoluteUrl(path = '/'): string {
  return new URL(path, siteConfig.url).toString();
}

export function localeHref(locale: AppLocale, path = ''): string {
  return absoluteUrl(`/${locale}${path}`);
}

export function ogLocale(locale: AppLocale): string {
  return OG_LOCALE_MAP[locale];
}

/** hreflang alternates for every locale (at `path`, e.g. "/impressum"), plus x-default pointing at the default locale. */
export function buildLanguageAlternates(path = ''): Record<string, string> {
  const languages: Record<string, string> = {};

  for (const locale of locales) {
    languages[locale] = localeHref(locale, path);
  }
  languages['x-default'] = localeHref(DEFAULT_LOCALE, path);

  return languages;
}

interface PersonJsonLdParams {
  locale: AppLocale;
  name: string;
  jobTitle: string;
}

export function buildPersonJsonLd({
  locale,
  name,
  jobTitle,
}: PersonJsonLdParams) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name,
    jobTitle,
    url: localeHref(locale),
    email: socialLinks.email.replace('mailto:', ''),
    sameAs: [socialLinks.github, socialLinks.linkedin],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Berlin',
      addressCountry: 'DE',
    },
  };
}

interface WebsiteJsonLdParams {
  locale: AppLocale;
  name: string;
  description: string;
}

export function buildWebsiteJsonLd({
  locale,
  name,
  description,
}: WebsiteJsonLdParams) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name,
    description,
    url: localeHref(locale),
    inLanguage: locale,
  };
}
