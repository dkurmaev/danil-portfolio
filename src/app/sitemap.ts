import type { MetadataRoute } from 'next';

import { locales } from '@/i18n/routing';
import { absoluteUrl, buildLanguageAlternates } from '@/lib/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  const homeLanguages = buildLanguageAlternates();
  const impressumLanguages = buildLanguageAlternates('/impressum');

  return [
    ...locales.map((locale) => ({
      url: absoluteUrl(`/${locale}`),
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: locale === 'de' ? 1 : 0.8,
      alternates: { languages: homeLanguages },
    })),
    // datenschutz/checkliste are noindex until they're filled in — kept out
    // of the sitemap until then.
    ...locales.map((locale) => ({
      url: absoluteUrl(`/${locale}/impressum`),
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
      alternates: { languages: impressumLanguages },
    })),
  ];
}
