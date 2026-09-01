import { defineRouting } from 'next-intl/routing';

export const locales = ['de', 'en', 'ru'] as const;

export type AppLocale = (typeof locales)[number];

export const routing = defineRouting({
  locales,
  defaultLocale: 'de',
  localePrefix: 'always',
});
