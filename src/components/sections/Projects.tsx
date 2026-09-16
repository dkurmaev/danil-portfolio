import Image from 'next/image';
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
      className="border-border bg-bg relative isolate scroll-mt-20 overflow-hidden border-b py-20 md:py-24 xl:py-28"
    >
      {/* Blueprint atmosphere */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <Image
          src="/brand/background_stack_blueprint.webp"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center opacity-40"
        />

        <div className="from-bg via-bg/94 absolute inset-x-0 top-0 h-28 bg-gradient-to-b to-transparent md:h-32" />

        <div className="from-bg via-bg/94 absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t to-transparent md:h-32" />
      </div>

      <div className="relative mx-auto w-full max-w-[1840px] px-5 md:px-8 xl:px-14">
        {/* Section heading */}
        <header className="grid gap-6 md:grid-cols-[auto_minmax(0,1fr)] md:gap-10">
          <span
            aria-hidden="true"
            className="font-sans text-[clamp(6rem,8.5vw,9.5rem)] leading-[0.78] font-light tracking-[-0.08em]"
            style={{
              WebkitTextStroke: '1.5px #6C7F93',
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

            <h2 className="text-fg mt-6 max-w-none text-[clamp(2.4rem,4vw,4.9rem)] leading-[0.96] font-semibold tracking-[-0.055em] xl:whitespace-nowrap">
              {t('headline')}
              <span className="text-[#6C7F93]">.</span>
            </h2>

            <p className="text-fg-secondary mt-5 max-w-none text-base leading-7 md:text-lg xl:whitespace-nowrap">
              {t('description')}
            </p>
          </div>
        </header>

        {/* Product showcase */}
        <div className="relative mt-16 md:mt-20">
          {/* Showcase surface */}
          <div
            aria-hidden="true"
            className="border-border/60 absolute -inset-x-3 -inset-y-5 rounded-[2rem] border bg-white/30 shadow-[0_30px_100px_rgba(35,48,62,0.04)] backdrop-blur-[2px] md:-inset-x-5 md:-inset-y-7"
          />

          {/* Small presentation marker */}
          <div
            aria-hidden="true"
            className="bg-bg text-fg-muted absolute -top-8 left-6 z-10 flex items-center gap-3 px-3 font-mono text-[0.58rem] tracking-[0.2em] uppercase md:left-8"
          >
            <span className="size-1.5 rounded-full bg-[#6C7F93]" />
            Product showcase
            <span className="bg-border h-px w-12 md:w-16" />
          </div>

          <div className="relative space-y-5">
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

            <div className="grid items-stretch gap-5 lg:grid-cols-2">
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
      </div>
    </section>
  );
}
