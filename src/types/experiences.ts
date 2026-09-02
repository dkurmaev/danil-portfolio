export type ExperienceId =
  'freelance' | 'fullstack-development' | 'it-background';

export interface ExperienceEntry {
  id: ExperienceId;
  /** Marks the currently ongoing entry — highlighted in the timeline. */
  current: boolean;
}
