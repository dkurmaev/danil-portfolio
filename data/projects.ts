import type { Project } from '@/types/projects';

export const projects: Project[] = [
  {
    slug: 'dklab',
    name: 'DK Lab',
    category: 'saas',
    status: 'active-development',
    role: 'fullstack-product',
    layout: 'featured',
    stack: ['React', 'NestJS', 'Prisma', 'PostgreSQL', 'Redis', 'Docker'],
    cover: '/images/projects/dklab/cover.webp',
    coverPosition: 'top',
    previewNote: true,
  },

  {
    slug: 'italiano-daily',
    name: 'Italiano Daily',
    category: 'edtech',
    status: 'active-development',
    role: 'fullstack-development',
    layout: 'wide',
    stack: ['Node.js', 'Telegram API', 'Hetzner', 'Coolify', 'OpenAI'],
    cover: '/images/projects/italiano-daily/cover.webp',
    projectHref: 'https://t.me/italiano_daily_bot',
    ctaLabelKey: 'tryBotCta',
  },

  {
    slug: 'olidort-bedachungen',
    name: 'Olidort Bedachungen',
    category: 'commercial-website',
    status: 'production',
    role: 'fullstack-development',
    layout: 'compact',
    stack: ['Vite', 'TypeScript', 'Tailwind CSS', 'EmailJS'],
    cover: '/images/projects/olidort-bedachungen/cover.webp',
    coverPosition: 'left',
    projectHref: 'https://bedachungen.olidort.de/',
  },

  {
    slug: 'spacebox-burger',
    name: 'SpaceBox Burger',
    category: 'brand',
    status: 'commercial',
    role: 'design-to-deploy',
    layout: 'compact',
    stack: ['Express', 'TypeScript', 'MongoDB', 'Stripe'],
    cover: '/images/projects/spacebox-burger/cover.webp',
    projectHref: 'https://space-burger-six.vercel.app/',
  },
];
