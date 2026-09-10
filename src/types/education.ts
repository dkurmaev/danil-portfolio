export type EducationEntryId = 'engineering' | 'fullstack';

export interface EducationEntry {
  id: EducationEntryId;
  /** Institution name, proper noun — not translated. */
  institution: string;
  /** City (and country, where relevant) — proper noun, not translated. */
  location: string;
}

export type CertificateId = 'englishB2' | 'founding' | 'itSeminar';

export interface CertificateEntry {
  id: CertificateId;
  /** Issuing institution — proper noun, not translated. */
  institution: string;
}
