import type { Project } from '@/types/projects';

export const projects: Project[] = [
  {
    slug: 'dev2lab',
    name: 'Dev2Lab',
    category: 'saas',
    status: 'active-development',
    role: 'fullstack-product',
    layout: 'featured',
    stack: ['React', 'NestJS', 'Prisma', 'PostgreSQL', 'Redis', 'Docker'],
    cover: '/images/projects/dev2lab/cover.webp',
  },
  {
    slug: 'italiano-daily',
    name: 'Italiano Daily',
    category: 'edtech',
    status: 'active-development',
    role: 'fullstack-development',
    layout: 'wide',
    stack: ['Node.js', 'Telegram API', 'PostgreSQL', 'OpenAI'],
    cover: '/images/projects/italiano-daily/cover.webp',
  },
  {
    slug: 'olidort-bedachungen',
    name: 'Olidort Bedachungen',
    category: 'commercial-website',
    status: 'production',
    role: 'fullstack-development',
    layout: 'compact',
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    cover: '/images/projects/olidort-bedachungen/cover.webp',
  },
  {
    slug: 'space-burger',
    name: 'Space Burger',
    category: 'brand',
    status: 'commercial',
    role: 'frontend-development',
    layout: 'compact',
    stack: ['React', 'TypeScript', 'Tailwind CSS', 'Motion'],
    cover: '/images/projects/space-burger/cover.webp',
  },
];
