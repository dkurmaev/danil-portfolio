import type { Project } from '@/types/projects';

export const projects: Project[] = [
  {
    slug: 'dev2lab',
    name: 'Dev2Lab',
    category: 'saas',
    status: 'active-development',
    stack: ['React', 'NestJS', 'Prisma', 'PostgreSQL', 'Redis', 'Docker'],
    cover: '/images/projects/dev2lab/cover.jpg',
  },
  {
    slug: 'italiano-daily',
    name: 'Italiano Daily',
    category: 'edtech',
    status: 'active-development',
    stack: ['Node.js', 'Telegram API', 'PostgreSQL', 'OpenAI'],
    cover: '/images/projects/italiano-daily/cover.jpg',
  },
  {
    slug: 'olidort-bedachungen',
    name: 'Olidort Bedachungen',
    category: 'commercial-website',
    status: 'production',
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    cover: '/images/projects/olidort-bedachungen/cover.jpg',
  },
  {
    slug: 'space-burger',
    name: 'Space Burger',
    category: 'brand',
    status: 'commercial',
    stack: ['React', 'TypeScript', 'Tailwind CSS', 'Motion'],
    cover: '/images/projects/space-burger/cover.jpg',
  },
];
