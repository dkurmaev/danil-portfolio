export type TechnologyGroupId =
  | 'frontend'
  | 'mobile'
  | 'backend'
  | 'database'
  | 'infrastructure'
  | 'services';

export interface TechnologyGroup {
  id: TechnologyGroupId;
  items: string[];
}
