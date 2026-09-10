import type { ExperienceEntry } from '@/types/experiences';

export const experiences: ExperienceEntry[] = [
  { id: 'freelance', current: true, ctaHref: '#projects' },
  {
    id: 'it-technician',
    current: false,
    company: 'Stel Multimedia GmbH',
    location: 'Berlin',
  },
  { id: 'it-service', current: false, location: 'Berlin' },
];
