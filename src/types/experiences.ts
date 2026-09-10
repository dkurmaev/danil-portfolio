export type ExperienceId = 'freelance' | 'it-technician' | 'it-service';

export interface ExperienceEntry {
  id: ExperienceId;
  /** Marks the currently ongoing entry — highlighted with a card treatment and lit up first. */
  current: boolean;
  /** Employer name shown next to the location. Proper noun, not translated. */
  company?: string;
  /** City/location shown next to the company (or on its own). Not translated. */
  location?: string;
  /** Present only on entries that link somewhere. */
  ctaHref?: string;
}
