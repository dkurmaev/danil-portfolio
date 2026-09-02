export type AvailabilityType = 'freelance' | 'fulltime';

export interface AvailabilityConfig {
  enabled: boolean;
  type: AvailabilityType;
}

export const siteConfig = {
  availability: {
    enabled: true,
    type: 'freelance',
  } satisfies AvailabilityConfig,
};
