import { ArrowUpRight, Mail } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { cn } from '@/lib/cn';
import { socialLinks } from '@/config/social';

function GithubIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 .5C5.73.5.5 5.73.5 12.02c0 5.09 3.29 9.4 7.86 10.93.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.52-1.34-1.28-1.7-1.28-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.2 1.77 1.2 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.47.11-3.06 0 0 .97-.31 3.18 1.18a10.9 10.9 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.64 1.59.24 2.77.12 3.06.74.8 1.19 1.83 1.19 3.09 0 4.43-2.7 5.4-5.27 5.69.42.36.78 1.08.78 2.17 0 1.57-.01 2.83-.01 3.22 0 .31.21.68.8.56A10.53 10.53 0 0 0 23.5 12.02C23.5 5.73 18.27.5 12 .5Z" />
    </svg>
  );
}

function LinkedinIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.95v5.66H9.36V9h3.41v1.56h.05c.48-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45Z" />
    </svg>
  );
}

const items = [
  { key: 'github', href: socialLinks.github, Icon: GithubIcon },
  { key: 'linkedin', href: socialLinks.linkedin, Icon: LinkedinIcon },
  {
    key: 'email',
    href: socialLinks.email,
    Icon: () => <Mail size={18} aria-hidden="true" />,
  },
] as const;

interface SocialLinksProps {
  className?: string;
  /** 'icon' — bordered icon-only buttons (Header/Footer). 'text' — labelled row with an external-link arrow. */
  variant?: 'icon' | 'text';
}

export function SocialLinks({ className, variant = 'icon' }: SocialLinksProps) {
  const t = useTranslations('Social');

  if (variant === 'text') {
    return (
      <ul className={cn('divide-border flex items-center divide-x', className)}>
        {items.map(({ key, href, Icon }) => {
          const isMail = href.startsWith('mailto:');

          return (
            <li key={key} className="px-4 first:pl-0">
              <a
                href={href}
                {...(isMail
                  ? {}
                  : { target: '_blank', rel: 'noreferrer noopener' })}
                className="text-fg-secondary hover:text-fg focus-visible:ring-accent inline-flex items-center gap-2 text-sm font-medium transition-colors duration-200 focus-visible:rounded-sm focus-visible:ring-2 focus-visible:outline-none"
              >
                <Icon />
                {t(key)}
                <ArrowUpRight size={14} aria-hidden="true" />
              </a>
            </li>
          );
        })}
      </ul>
    );
  }

  return (
    <ul className={cn('flex items-center gap-3', className)}>
      {items.map(({ key, href, Icon }) => {
        const isMail = href.startsWith('mailto:');

        return (
          <li key={key}>
            <a
              href={href}
              aria-label={t(key)}
              {...(isMail
                ? {}
                : { target: '_blank', rel: 'noreferrer noopener' })}
              className="rounded-chip border-border text-fg-secondary hover:border-accent/60 hover:text-fg focus-visible:ring-accent flex h-10 w-10 items-center justify-center border transition-colors duration-200 focus-visible:ring-2 focus-visible:outline-none"
            >
              <Icon />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
