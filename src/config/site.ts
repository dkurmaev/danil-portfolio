export type AvailabilityType = 'freelance' | 'fulltime';

export interface AvailabilityConfig {
  enabled: boolean;
  type: AvailabilityType;
}

export const siteConfig = {
  name: 'Danil Kurmayev',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
  // No final OG image yet — field exists so metadata wiring doesn't change
  // once the real asset lands in /public/images/og/.
  ogImage: '/images/og/cover.jpg',
  availability: {
    enabled: true,
    type: 'freelance',
  } satisfies AvailabilityConfig,
};
