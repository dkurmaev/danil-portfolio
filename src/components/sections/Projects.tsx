import { useTranslations } from 'next-intl';

import { ProjectCard } from '@/components/projects/ProjectCard';
import { projects } from '@data/projects';

export function Projects() {
  const t = useTranslations('Projects');
  const featuredProject = projects.find(
    (project) => project.layout === 'featured',
  );
  const wideProject = projects.find((project) => project.layout === 'wide');
  const compactProjects = projects.filter(
    (project) => project.layout === 'compact',
  );

  return (
    <section
      id="projects"
      className="border-border scroll-mt-20 overflow-hidden border-b py-20 md:py-24 xl:py-28"
    >
      <div className="mx-auto w-full max-w-[1840px] px-5 md:px-8 xl:px-14">
        <header className="grid gap-6 md:grid-cols-[auto_minmax(0,1fr)] md:gap-10">
          <span
            aria-hidden="true"
            className="font-sans text-[clamp(6rem,8.5vw,9.5rem)] leading-[0.78] font-light tracking-[-0.08em]"
            style={{
              WebkitTextStroke: '1.5px var(--color-fg-muted)',
              color: 'transparent',
            }}
          >
            03
          </span>
          <div className="min-w-0 pt-1">
            <div className="flex items-center gap-5">
              <p className="text-fg-muted shrink-0 font-mono text-[0.65rem] tracking-[0.22em] uppercase">
                {t('eyebrow')} / {t('selection')}
              </p>
              <span className="bg-border h-px flex-1" aria-hidden="true" />
            </div>
            <h2 className="text-fg mt-6 max-w-4xl text-[clamp(2.75rem,4.2vw,4.8rem)] leading-[0.96] font-semibold tracking-[-0.055em]">
              {t('headline')}
              <span className="text-accent">.</span>
            </h2>
            <p className="text-fg-secondary mt-5 max-w-2xl text-base leading-7 md:text-lg">
              {t('description')}
            </p>
          </div>
        </header>

        <div className="mt-14 space-y-5">
          {featuredProject && (
            <ProjectCard
              project={featuredProject}
              index={projects.indexOf(featuredProject)}
            />
          )}
          {wideProject && (
            <ProjectCard
              project={wideProject}
              index={projects.indexOf(wideProject)}
            />
          )}
          <div className="grid gap-5 lg:grid-cols-2">
            {compactProjects.map((project) => (
              <ProjectCard
                key={project.slug}
                project={project}
                index={projects.indexOf(project)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
