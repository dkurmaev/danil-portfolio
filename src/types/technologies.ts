export type TechnologyGroupId =
  | 'frontend'
  | 'design'
  | 'mobile'
  | 'backend'
  | 'database'
  | 'infrastructure'
  | 'tools'
  | 'services';

export interface TechnologyGroup {
  id: TechnologyGroupId;
  items: string[];
}
