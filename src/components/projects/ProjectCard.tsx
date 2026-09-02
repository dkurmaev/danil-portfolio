import { ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Card } from '@/components/ui/Card';
import { CoverPlaceholder } from '@/components/ui/CoverPlaceholder';
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
    <Card className="hover:border-accent/40 flex flex-col overflow-hidden transition-colors duration-300">
      {/* `project.cover` stays unused until real covers replace this placeholder —
          CoverPlaceholder keeps the aspect-ratio next/image will use later. */}
      <CoverPlaceholder
        label={getInitials(project.name)}
        className="bg-bg-elevated aspect-[16/10]"
        labelClassName="text-5xl"
      />

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
