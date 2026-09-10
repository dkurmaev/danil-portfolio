export type ServiceCategory =
  | 'web-applications'
  | 'fullstack-development'
  | 'backend-api'
  | 'saas-mvp'
  | 'automation'
  | 'ai-integrations'
  | 'existing-projects';

export interface Service {
  id: ServiceCategory;
  /** Visually emphasized row (accent border/background/tag) — the primary offering. */
  featured?: boolean;
}
