import type { TechnologyGroup } from '@/types/technologies';

export const technologyGroups: TechnologyGroup[] = [
  {
    id: 'frontend',
    items: [
      'React',
      'TypeScript',
      'JavaScript',
      'Next.js',
      'Tailwind CSS',
      'HTML',
      'CSS',
    ],
  },
  {
    id: 'mobile',
    items: ['React Native', 'Expo'],
  },
  {
    id: 'backend',
    items: ['Node.js', 'NestJS', 'Express', 'REST API', 'WebSocket'],
  },
  {
    id: 'database',
    items: ['PostgreSQL', 'Prisma', 'MongoDB', 'Redis'],
  },
  {
    id: 'infrastructure',
    items: ['Docker', 'Linux', 'GitHub Actions', 'CI/CD', 'Hetzner', 'Coolify'],
  },
  {
    id: 'services',
    items: [
      'OpenAI',
      'Stripe',
      'Firebase',
      'Twilio',
      'DeepL',
      'Telegram API',
      'Google APIs',
    ],
  },
];
