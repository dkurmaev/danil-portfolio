import { ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

import { cn } from '@/lib/cn';
import { Button } from '@/components/ui/Button';
import type { Project, ProjectStatus } from '@/types/projects';

const STATUS_DOT_STYLES: Record<ProjectStatus, string> = {
  production: 'bg-success',
  'active-development': 'bg-[#5E7186]',
  commercial: 'bg-fg-muted',
  concept: 'bg-fg-muted',
};

interface ProjectCardProps {
  project: Project;
  index: number;
}

function ProjectVisual({ project }: Pick<ProjectCardProps, 'project'>) {
  return (
    <div
      className={cn(
        'border-border group/visual bg-bg-elevated relative overflow-hidden border-b',
        project.layout === 'featured' &&
          'min-h-80 lg:min-h-[390px] lg:border-r lg:border-b-0',
        project.layout === 'wide' &&
          'min-h-72 lg:order-2 lg:min-h-[320px] lg:border-b-0 lg:border-l',
        project.layout === 'compact' && 'aspect-[16/9]',
      )}
    >
      <Image
        src={project.cover}
        alt={`${project.name} project preview`}
        fill
        className={cn(
          'object-cover transition-transform duration-500 ease-out',
          project.coverPosition === 'top' && 'object-top',
          project.coverPosition === 'left' && 'object-left',
          'group-hover/visual:scale-[1.015]',
        )}
        sizes={
          project.layout === 'compact'
            ? '(min-width: 1024px) 50vw, 100vw'
            : '(min-width: 1024px) 65vw, 100vw'
        }
      />
    </div>
  );
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const t = useTranslations('Projects');
  const ctaLabel = t(project.ctaLabelKey ?? 'cta');
  const ctaClassName =
    'w-fit bg-[#5E7186]! text-white hover:bg-[#536678]! focus-visible:ring-[#8798A9] active:bg-[#45586B]!';

  const primaryCta = project.projectHref ? (
    <Button
      href={project.projectHref}
      variant="primary"
      className={ctaClassName}
    >
      {ctaLabel} <ArrowRight size={15} aria-hidden="true" />
    </Button>
  ) : (
    <Button
      variant="primary"
      className={ctaClassName}
      disabled
      aria-label={t('ctaPending')}
    >
      {ctaLabel} <ArrowRight size={15} aria-hidden="true" />
    </Button>
  );

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

      <div
        className={cn(
          'border-border mt-6 grid gap-5 border-t pt-5',
          project.layout === 'featured'
            ? 'xl:grid-cols-[minmax(13rem,1.15fr)_minmax(11rem,0.95fr)_minmax(15rem,1.3fr)]'
            : 'sm:grid-cols-[minmax(8rem,0.8fr)_minmax(8rem,0.7fr)_minmax(0,1.5fr)]',
        )}
      >
        <div>
          <p className="text-fg-muted text-xs">{t('meta.role')}</p>
          <p className="text-fg-secondary mt-2 text-sm font-medium whitespace-nowrap">
            {t(`roles.${project.role}`)}
          </p>
        </div>
        <div>
          <p className="text-fg-muted text-xs">{t('meta.status')}</p>

          <p className="text-fg-secondary mt-2 inline-flex items-center gap-2 text-sm font-medium whitespace-nowrap">
            {project.status === 'active-development' ? (
              <span
                className="relative inline-flex size-1.5"
                aria-hidden="true"
              >
                <span className="absolute inset-0 scale-[1.8] rounded-full bg-emerald-500/30 [animation-duration:2.4s] motion-safe:animate-ping" />
                <span className="relative size-1.5 rounded-full bg-emerald-500" />
              </span>
            ) : (
              <span
                className={cn(
                  'size-1.5 rounded-full',
                  STATUS_DOT_STYLES[project.status],
                )}
                aria-hidden="true"
              />
            )}

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
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
          {primaryCta}
        </div>
        {project.previewNote && (
          <p className="text-fg-muted mt-3 text-xs italic">
            {t(`previewNotes.${project.slug}`)}
          </p>
        )}
      </div>
    </div>
  );

  return (
    <article
      className={cn(
        'border-border bg-bg-secondary hover:border-fg/20 overflow-hidden rounded-2xl border transition-colors duration-300',
        project.layout === 'featured' &&
          'lg:grid lg:grid-cols-[minmax(0,1.12fr)_minmax(29rem,0.88fr)]',
        project.layout === 'wide' &&
          'lg:grid lg:grid-cols-[minmax(0,1.2fr)_minmax(18rem,0.8fr)]',
      )}
    >
      <ProjectVisual project={project} />
      {details}
    </article>
  );
}
