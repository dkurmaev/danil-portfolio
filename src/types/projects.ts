export type ProjectStatus =
  'production' | 'active-development' | 'commercial' | 'concept';

export type ProjectCategory =
  'saas' | 'edtech' | 'commercial-website' | 'brand';

export interface Project {
  slug: string;
  name: string;
  category: ProjectCategory;
  status: ProjectStatus;
  stack: string[];
  /**
   * Future next/image source, e.g. `/images/projects/<slug>/cover.jpg`.
   * No real assets yet — cards render a CSS/SVG placeholder instead (see
   * ProjectCard) and this field stays unused until real covers land.
   */
  cover: string;
}
