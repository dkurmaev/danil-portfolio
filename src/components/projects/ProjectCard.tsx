import { ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { cn } from '@/lib/cn';
import { CoverPlaceholder } from '@/components/ui/CoverPlaceholder';
import type { Project, ProjectStatus } from '@/types/projects';

const STATUS_DOT_STYLES: Record<ProjectStatus, string> = {
  production: 'bg-success',
  'active-development': 'bg-accent',
  commercial: 'bg-fg-muted',
  concept: 'bg-fg-muted',
};

interface ProjectCardProps {
  project: Project;
  index: number;
}

function ProjectVisual({ project }: Pick<ProjectCardProps, 'project'>) {
  return (
    <CoverPlaceholder
      label={project.name}
      labelClassName="text-2xl sm:text-3xl md:text-4xl"
      className={cn(
        'border-border shrink-0 border-b',
        project.layout === 'featured' &&
          'min-h-80 lg:min-h-[390px] lg:border-r lg:border-b-0',
        project.layout === 'wide' &&
          'min-h-64 lg:order-2 lg:min-h-[300px] lg:border-b-0 lg:border-l',
        project.layout === 'compact' && 'aspect-[16/9]',
      )}
    />
  );
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const t = useTranslations('Projects');

  const details = (
    <div
      className={cn(
        'flex min-w-0 flex-1 flex-col p-6 md:p-8',
        project.layout === 'wide' && 'lg:order-1',
      )}
    >
      <div className="flex items-start justify-between gap-5">
        <div>
          <p className="text-fg-muted font-mono text-[0.65rem] tracking-[0.17em] uppercase">
            {t(`categories.${project.category}`)}
          </p>
          <h3 className="text-fg mt-2 text-2xl font-semibold tracking-[-0.035em] md:text-3xl">
            {project.name}
          </h3>
        </div>
        <span className="text-fg-muted font-mono text-xs">
          / {String(index + 1).padStart(2, '0')}
        </span>
      </div>

      <p className="text-fg-secondary mt-4 max-w-2xl text-sm leading-6 md:text-base">
        {t(`descriptions.${project.slug}`)}
      </p>

      <div className="border-border mt-6 grid gap-5 border-t pt-5 sm:grid-cols-[minmax(8rem,0.8fr)_minmax(8rem,0.7fr)_minmax(0,1.5fr)]">
        <div>
          <p className="text-fg-muted text-xs">{t('meta.role')}</p>
          <p className="text-fg-secondary mt-2 text-sm font-medium">
            {t(`roles.${project.role}`)}
          </p>
        </div>
        <div>
          <p className="text-fg-muted text-xs">{t('meta.status')}</p>
          <p className="text-fg-secondary mt-2 inline-flex items-center gap-2 text-sm font-medium">
            <span
              className={cn(
                'size-1.5 rounded-full',
                STATUS_DOT_STYLES[project.status],
              )}
              aria-hidden="true"
            />
            {t(`statuses.${project.status}`)}
          </p>
        </div>
        <div>
          <p className="text-fg-muted text-xs">{t('meta.technologies')}</p>
          <ul className="mt-2 flex flex-wrap gap-2">
            {project.stack.map((technology) => (
              <li
                key={technology}
                className="border-border bg-bg-elevated text-fg-secondary rounded-md border px-2.5 py-1 font-mono text-[0.66rem]"
              >
                {technology}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-auto pt-6">
        {project.caseStudyHref ? (
          <a
            href={project.caseStudyHref}
            className="text-accent focus-visible:outline-accent inline-flex items-center gap-2 text-sm font-semibold underline-offset-4 hover:underline focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4"
          >
            {t('cta')} <ArrowRight size={15} aria-hidden="true" />
          </a>
        ) : (
          <span
            className="text-accent inline-flex items-center gap-2 text-sm font-semibold"
            aria-label={t('caseStudyPending')}
          >
            {t('cta')} <ArrowRight size={15} aria-hidden="true" />
          </span>
        )}
      </div>
    </div>
  );

  return (
    <article
      className={cn(
        'border-border bg-bg-secondary hover:border-fg/20 overflow-hidden rounded-2xl border transition-colors duration-300',
        project.layout === 'featured' &&
          'lg:grid lg:grid-cols-[minmax(0,1.25fr)_minmax(25rem,0.75fr)]',
        project.layout === 'wide' &&
          'lg:grid lg:grid-cols-[minmax(0,1.2fr)_minmax(18rem,0.8fr)]',
      )}
    >
      <ProjectVisual project={project} />
      {details}
    </article>
  );
}
