import { useTranslations } from 'next-intl';

import { ProjectCard } from '@/components/projects/ProjectCard';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { projects } from '@data/projects';

export function Projects() {
  const t = useTranslations('Projects');

  return (
    <section
      id="projects"
      className="border-border scroll-mt-20 border-b py-20 md:py-28"
    >
      <Container className="flex flex-col gap-12">
        <SectionHeading
          eyebrow={t('eyebrow')}
          title={t('title')}
          description={t('description')}
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </Container>
    </section>
  );
}
