import type { MetadataRoute } from 'next';

import { locales } from '@/i18n/routing';
import { absoluteUrl, buildLanguageAlternates } from '@/lib/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = buildLanguageAlternates();

  return locales.map((locale) => ({
    url: absoluteUrl(`/${locale}`),
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: locale === 'de' ? 1 : 0.8,
    alternates: { languages },
  }));
}
