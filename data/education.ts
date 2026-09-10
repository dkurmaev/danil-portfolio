import type { CertificateEntry, EducationEntry } from '@/types/education';

export const educationEntries: EducationEntry[] = [
  {
    id: 'engineering',
    institution:
      'Turkmenisches Staatliches Institut für Verkehrswesen und Fernmeldewesen',
    location: 'Aschgabat, Turkmenistan',
  },
  {
    id: 'fullstack',
    institution: 'AIT-TR GmbH',
    location: 'Berlin',
  },
];

export const certificates: CertificateEntry[] = [
  { id: 'englishB2', institution: 'WBS Training' },
  { id: 'founding', institution: 'Works gGmbH' },
  { id: 'itSeminar', institution: 'TÜV Rheinland' },
];
