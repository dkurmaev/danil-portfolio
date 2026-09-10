export type ProjectStatus =
  'production' | 'active-development' | 'commercial' | 'concept';

export type ProjectCategory =
  'saas' | 'edtech' | 'commercial-website' | 'brand';

export type ProjectLayout = 'featured' | 'wide' | 'compact';

export type ProjectRole =
  'fullstack-product' | 'fullstack-development' | 'frontend-development';

export interface Project {
  slug: string;
  name: string;
  category: ProjectCategory;
  status: ProjectStatus;
  role: ProjectRole;
  layout: ProjectLayout;
  stack: string[];
  cover: string;
  caseStudyHref?: string;
}
