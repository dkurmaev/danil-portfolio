import { ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Card } from '@/components/ui/Card';
import { cn } from '@/lib/cn';
import type { Project, ProjectStatus } from '@/types/projects';

const STATUS_DOT_STYLES: Record<ProjectStatus, string> = {
  production: 'bg-success',
  'active-development': 'bg-accent',
  commercial: 'bg-accent-tech',
  concept: 'bg-fg-muted',
};

function getInitials(name: string) {
  return name
    .split(' ')
    .map((word) => word[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const t = useTranslations('Projects');

  return (
    <Card
      className={cn(
        'group flex flex-col overflow-hidden transition-all duration-300',
        'hover:border-accent/60 hover:shadow-accent/20 hover:-translate-y-1 hover:shadow-lg',
      )}
    >
      {/* Cover placeholder — keeps the future next/image aspect-ratio; `project.cover`
          stays unused until real project covers replace this composition. */}
      <div
        aria-hidden="true"
        className="bg-bg-elevated relative aspect-[16/10] w-full overflow-hidden"
      >
        <div className="absolute inset-0 transition-transform duration-300 group-hover:scale-[1.03]">
          <div className="bg-accent/25 absolute -top-8 -left-8 h-40 w-40 rounded-full blur-3xl" />
          <div className="bg-accent-secondary/20 absolute -right-10 -bottom-10 h-48 w-48 rounded-full blur-3xl" />
          <div
            className="absolute inset-0 opacity-[0.08]"
            style={{
              backgroundImage:
                'linear-gradient(var(--color-border) 1px, transparent 1px), linear-gradient(90deg, var(--color-border) 1px, transparent 1px)',
              backgroundSize: '28px 28px',
            }}
          />
          <span className="text-fg/10 absolute bottom-4 left-1/2 -translate-x-1/2 font-mono text-5xl font-semibold tracking-tight">
            {getInitials(project.name)}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-6">
        <div className="flex flex-col gap-1">
          <p className="text-fg-muted font-mono text-xs tracking-[0.15em] uppercase">
            {t(`categories.${project.category}`)}
          </p>
          <h3 className="text-fg text-xl font-semibold">{project.name}</h3>
        </div>

        <p className="text-fg-secondary text-sm">
          {t(`descriptions.${project.slug}`)}
        </p>

        <ul className="flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <li
              key={tech}
              className="rounded-chip border-border bg-bg-elevated text-fg-secondary border px-3 py-1.5 font-mono text-xs"
            >
              {tech}
            </li>
          ))}
        </ul>

        <div className="mt-auto flex items-center justify-between pt-2">
          <span className="inline-flex items-center gap-2 text-xs font-medium">
            <span
              aria-hidden="true"
              className={cn(
                'h-2 w-2 rounded-full',
                STATUS_DOT_STYLES[project.status],
              )}
            />
            <span className="text-fg-secondary">
              {t(`statuses.${project.status}`)}
            </span>
          </span>

          <span className="text-accent inline-flex items-center gap-1.5 text-sm font-semibold">
            {t('cta')}
            <ArrowRight size={14} aria-hidden="true" />
          </span>
        </div>
      </div>
    </Card>
  );
}
