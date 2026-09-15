'use client';

import type { LucideIcon } from 'lucide-react';
import { Box, Database, Monitor, Plug, Server, Smartphone } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';

import { cn } from '@/lib/cn';
import { technologyGroups } from '@data/technologies';

const BACKGROUND_SIZES = '100vw';

// The blueprint background carries its own baked-in corner labels
// ("Architecture connects ideas", "Build / Integrate / Deploy",
// "Scalable / Reliable / Solutions") that sit almost on top of this
// component's own translated micro-copy in the same corners. A soft,
// blurred patch in the page background color over each spot fades the
// baked label out while leaving the rest of the image (lines, dots,
// planes) untouched. Positions are percentages measured from the
// source file, one patch per baked label.
const BLUEPRINT_TEXT_PATCHES = [
  { left: '87%', top: '21%' }, // "Build / Integrate / Deploy"
  { left: '18%', top: '63%' }, // "Architecture connects ideas"
  { left: '87%', top: '82%' }, // "Scalable / Reliable / Solutions"
];

const ARCHITECTURE_NODES = [
  {
    id: 'frontend',
    Icon: Monitor,
    limit: 4,
  },
  {
    id: 'mobile',
    Icon: Smartphone,
    limit: 2,
  },
  {
    id: 'backend',
    Icon: Box,
    limit: 3,
  },
  {
    id: 'database',
    Icon: Database,
    limit: 3,
  },
  {
    id: 'services',
    Icon: Plug,
    limit: 4,
  },
  {
    id: 'infrastructure',
    Icon: Server,
    limit: 4,
  },
] as const;

interface ArchitectureCardProps {
  Icon: LucideIcon;
  title: string;
  items: string[];
  isVisible: boolean;
  delay: number;
  className?: string;
}

function ArchitectureCard({
  Icon,
  title,
  items,
  isVisible,
  delay,
  className,
}: ArchitectureCardProps) {
  return (
    <div
      style={{ transitionDelay: isVisible ? `${delay}ms` : '0ms' }}
      className={cn(
        'relative z-10 flex min-h-[92px] items-center gap-4 rounded-2xl',
        'border border-[#6C7F93]/18 bg-white/58 px-5 py-4',
        'shadow-[0_18px_40px_rgba(67,83,101,0.055)] backdrop-blur-[2px]',
        'transition-[opacity,transform,border-color,box-shadow] duration-700',
        'ease-[cubic-bezier(0.22,1,0.36,1)]',
        'hover:border-[#6C7F93]/32 hover:shadow-[0_20px_42px_rgba(67,83,101,0.09)]',
        'motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none',
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0',
        className,
      )}
    >
      <div className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-[#6C7F93]/20 bg-white/65">
        <Icon
          aria-hidden="true"
          className="size-5 stroke-[1.45] text-[#5E7186]"
        />
      </div>

      <div className="min-w-0">
        <p className="text-fg text-sm font-semibold tracking-[-0.02em] md:text-[0.95rem]">
          {title}
        </p>

        <p className="mt-1.5 line-clamp-2 text-[0.7rem] leading-relaxed text-[#53616E]">
          {items.join(' · ')}
        </p>
      </div>
    </div>
  );
}

export function TechStack() {
  const t = useTranslations('TechStack');
  const locale = useLocale();

  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        setIsVisible(true);
        observer.disconnect();
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -6% 0px',
      },
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  const headlineSize = {
    de: 'text-[clamp(2.5rem,3.35vw,4rem)]',
    en: 'text-[clamp(2.55rem,3.45vw,4.1rem)]',
    ru: 'text-[clamp(2.35rem,3.2vw,3.85rem)]',
  }[locale];

  const architecture = ARCHITECTURE_NODES.map((node) => {
    const group = technologyGroups.find((item) => item.id === node.id);

    return {
      ...node,
      items: group?.items.slice(0, node.limit) ?? [],
    };
  });

  const getArchitectureNode = (id: (typeof ARCHITECTURE_NODES)[number]['id']) =>
    architecture.find((node) => node.id === id)!;

  const headerReveal = isVisible
    ? 'translate-x-0 opacity-100'
    : 'translate-x-8 opacity-0';

  const copyReveal = isVisible
    ? 'translate-y-0 opacity-100'
    : 'translate-y-5 opacity-0';

  return (
    <section
      ref={sectionRef}
      id="stack"
      className="bg-bg relative isolate scroll-mt-20 overflow-hidden border-b border-[#6C7F93]/14"
    >
      {/* Technical / blueprint atmosphere. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <Image
          src="/brand/background_stack_blueprint.webp"
          alt=""
          fill
          sizes={BACKGROUND_SIZES}
          className="object-cover object-center opacity-60"
        />

        {BLUEPRINT_TEXT_PATCHES.map((patch) => (
          <div
            key={`${patch.left}-${patch.top}`}
            className="bg-bg absolute h-32 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-90 blur-2xl"
            style={{ left: patch.left, top: patch.top }}
          />
        ))}

        <div className="from-bg via-bg/94 absolute inset-x-0 top-0 h-28 bg-gradient-to-b to-transparent md:h-32" />
      </div>

      <div className="relative mx-auto w-full max-w-[1760px] px-5 py-16 md:px-8 md:py-20 lg:px-12 xl:px-16 xl:py-24">
        <div className="grid gap-14 xl:grid-cols-[minmax(0,1.08fr)_minmax(520px,0.92fr)] xl:gap-16 2xl:gap-20">
          {/* Left / architecture */}
          <div className="min-w-0">
            <header>
              <div
                className={cn(
                  'transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]',
                  'motion-reduce:translate-x-0 motion-reduce:opacity-100 motion-reduce:transition-none',
                  headerReveal,
                )}
              >
                <div className="flex items-end gap-5">
                  <span
                    aria-hidden="true"
                    className="text-[clamp(4.4rem,7vw,7.7rem)] leading-[0.72] font-light tracking-[-0.08em] text-transparent [-webkit-text-stroke:1px_#6C7F93]"
                  >
                    02
                  </span>

                  <span
                    aria-hidden="true"
                    className={cn(
                      'mb-2 h-px w-14 origin-left bg-[#6C7F93]/45 transition-transform delay-200 duration-700 md:w-20',
                      'motion-reduce:scale-x-100 motion-reduce:transition-none',
                      isVisible ? 'scale-x-100' : 'scale-x-0',
                    )}
                  />
                </div>

                <div className="mt-6 flex items-center gap-5">
                  <p className="text-fg-muted font-mono text-[10px] tracking-[0.24em] uppercase sm:text-xs">
                    {t('eyebrow')}
                  </p>

                  <span
                    aria-hidden="true"
                    className={cn(
                      'bg-border h-px max-w-48 flex-1 origin-left transition-transform delay-300 duration-700',
                      'motion-reduce:scale-x-100 motion-reduce:transition-none',
                      isVisible ? 'scale-x-100' : 'scale-x-0',
                    )}
                  />
                </div>
              </div>

              <h2
                className={cn(
                  'text-fg mt-7 max-w-[720px] leading-[0.98] font-semibold tracking-[-0.052em]',
                  headlineSize,
                )}
              >
                <span
                  className={cn(
                    'block transition-[opacity,transform] delay-100 duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]',
                    'motion-reduce:translate-x-0 motion-reduce:opacity-100 motion-reduce:transition-none',
                    headerReveal,
                  )}
                >
                  {t('headlineLine1')}
                </span>

                <span
                  className={cn(
                    'mt-1 block text-[#6C7F93]',
                    'transition-[opacity,transform] delay-180 duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]',
                    'motion-reduce:translate-x-0 motion-reduce:opacity-100 motion-reduce:transition-none',
                    headerReveal,
                  )}
                >
                  {t('headlineLine2')}.
                </span>
              </h2>

              <p
                className={cn(
                  'text-fg-secondary mt-6 max-w-[710px] text-[0.98rem] leading-[1.65] md:text-[1.04rem]',
                  'transition-[opacity,transform] delay-250 duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]',
                  'motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none',
                  copyReveal,
                )}
              >
                {t('description')}
              </p>
            </header>

            {/* Desktop / tablet architecture */}
            <div
              className="relative mt-10 hidden min-h-[500px] md:block"
              aria-label={t('architectureAriaLabel')}
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute top-0 left-0 hidden flex-col gap-1.5 font-mono text-[9px] leading-relaxed tracking-[0.22em] whitespace-pre-line text-[#6C7F93]/40 uppercase xl:flex"
              >
                {t('architectureTagline')}
              </div>

              <svg
                aria-hidden="true"
                className="absolute inset-0 h-full w-full overflow-visible"
                viewBox="0 0 1000 600"
                fill="none"
                preserveAspectRatio="none"
              >
                <path
                  d="M280 105 C360 105 420 175 500 220"
                  stroke="rgba(108,127,147,0.22)"
                />
                <path
                  d="M720 105 C640 105 580 175 500 220"
                  stroke="rgba(108,127,147,0.22)"
                />

                <path d="M500 280 L500 340" stroke="rgba(108,127,147,0.28)" />

                <path
                  d="M500 340 C420 370 370 385 300 410"
                  stroke="rgba(108,127,147,0.22)"
                />
                <path
                  d="M500 340 C580 370 630 385 700 410"
                  stroke="rgba(108,127,147,0.22)"
                />

                <path
                  d="M300 470 C380 500 420 515 500 540"
                  stroke="rgba(108,127,147,0.22)"
                />
                <path
                  d="M700 470 C620 500 580 515 500 540"
                  stroke="rgba(108,127,147,0.22)"
                />

                {[105, 220, 340, 410, 540].map((y, index) => (
                  <circle
                    key={y}
                    cx="500"
                    cy={y}
                    r={index === 0 ? 0 : 5}
                    fill="#6C7F93"
                    opacity={index === 0 ? 0 : 0.62}
                  />
                ))}
              </svg>

              {/* subtle architectural planes */}
              <div
                aria-hidden="true"
                className="absolute top-[13%] left-[7%] h-[22%] w-[86%] rotate-[1deg] rounded-[42%] border border-[#6C7F93]/10"
              />

              <div
                aria-hidden="true"
                className="absolute top-[38%] left-[14%] h-[21%] w-[72%] -rotate-[1deg] rounded-[42%] border border-[#6C7F93]/10"
              />

              <div
                aria-hidden="true"
                className="absolute top-[64%] left-[7%] h-[23%] w-[86%] rotate-[0.7deg] rounded-[42%] border border-[#6C7F93]/10"
              />

              <div className="absolute inset-x-0 top-3 grid grid-cols-2 gap-8 px-[7%]">
                {(['frontend', 'mobile'] as const).map((id, index) => {
                  const node = getArchitectureNode(id);

                  return (
                    <ArchitectureCard
                      key={node.id}
                      Icon={node.Icon}
                      title={t(`categories.${node.id}`)}
                      items={node.items}
                      delay={380 + index * 90}
                      isVisible={isVisible}
                    />
                  );
                })}
              </div>

              <div className="absolute top-[34%] left-1/2 w-[48%] -translate-x-1/2">
                {(() => {
                  const node = getArchitectureNode('backend');

                  return (
                    <ArchitectureCard
                      Icon={node.Icon}
                      title={t(`categories.${node.id}`)}
                      items={node.items}
                      delay={560}
                      isVisible={isVisible}
                    />
                  );
                })()}
              </div>

              <div className="absolute inset-x-0 top-[59%] grid grid-cols-2 gap-8 px-[5%]">
                {(['database', 'services'] as const).map((id, index) => {
                  const node = getArchitectureNode(id);

                  return (
                    <ArchitectureCard
                      key={node.id}
                      Icon={node.Icon}
                      title={t(`categories.${node.id}`)}
                      items={node.items}
                      delay={660 + index * 90}
                      isVisible={isVisible}
                    />
                  );
                })}
              </div>

              <div className="absolute bottom-0 left-1/2 w-[52%] -translate-x-1/2">
                {(() => {
                  const node = getArchitectureNode('infrastructure');

                  return (
                    <ArchitectureCard
                      Icon={node.Icon}
                      title={t(`categories.${node.id}`)}
                      items={node.items}
                      delay={840}
                      isVisible={isVisible}
                    />
                  );
                })()}
              </div>

              <p className="absolute top-[50%] left-0 hidden max-w-20 -translate-y-1/2 font-mono text-[9px] leading-[1.55] tracking-[0.18em] text-[#6C7F93] uppercase lg:block">
                {t('flowStart')}
              </p>

              <p className="absolute top-[50%] right-0 hidden max-w-24 -translate-y-1/2 text-right font-mono text-[9px] leading-[1.55] tracking-[0.18em] text-[#6C7F93] uppercase lg:block">
                {t('flowEnd')}
              </p>
            </div>

            {/* Mobile architecture */}
            <div
              className="relative mt-9 md:hidden"
              aria-label={t('architectureAriaLabel')}
            >
              <span
                aria-hidden="true"
                className="absolute top-8 bottom-8 left-6 w-px bg-[#6C7F93]/22"
              />

              <div className="relative space-y-4">
                {architecture.map((node, index) => (
                  <ArchitectureCard
                    key={node.id}
                    Icon={node.Icon}
                    title={t(`categories.${node.id}`)}
                    items={node.items}
                    delay={360 + index * 80}
                    isVisible={isVisible}
                    className="ml-10 min-h-[84px]"
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right / grouped technologies */}
          <div className="min-w-0 xl:pt-[5.2rem]">
            <div
              className={cn(
                'flex items-center gap-4 border-y border-[#6C7F93]/16 py-4',
                'transition-[opacity,transform] delay-300 duration-700',
                'motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none',
                copyReveal,
              )}
            >
              <span
                aria-hidden="true"
                className="h-px flex-1 bg-[#6C7F93]/18"
              />

              <span className="font-mono text-[9px] tracking-[0.22em] text-[#53616E] uppercase">
                {t('process')}
              </span>

              <span aria-hidden="true" className="text-xs text-[#6C7F93]">
                +
              </span>
            </div>

            <ol className="relative">
              <span
                aria-hidden="true"
                className="absolute top-0 bottom-0 left-[0.34rem] hidden w-px bg-[#6C7F93]/18 sm:block"
              />

              {technologyGroups.map((group, index) => (
                <li
                  key={group.id}
                  style={{
                    transitionDelay: isVisible
                      ? `${480 + index * 85}ms`
                      : '0ms',
                  }}
                  className={cn(
                    'grid gap-4 border-b border-[#6C7F93]/16 py-6',
                    'transition-[opacity,transform] duration-600 ease-[cubic-bezier(0.22,1,0.36,1)]',
                    'motion-reduce:translate-x-0 motion-reduce:opacity-100 motion-reduce:transition-none',
                    'sm:grid-cols-[0.8rem_2.1rem_9rem_minmax(0,1fr)]',
                    isVisible
                      ? 'translate-x-0 opacity-100'
                      : 'translate-x-5 opacity-0',
                  )}
                >
                  <span
                    aria-hidden="true"
                    className="bg-bg mt-[6px] hidden size-2 rounded-full border-2 border-[#6C7F93] sm:block"
                  />

                  <span className="font-mono text-[0.68rem] text-[#6C7F93]">
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  <h3 className="text-fg font-mono text-[0.7rem] leading-5 tracking-[0.08em] uppercase">
                    {t(`categories.${group.id}`)}
                  </h3>

                  <div className="min-w-0">
                    <p className="mb-3 text-[0.77rem] leading-[1.55] text-[#53616E]">
                      {t(`categoryDescriptions.${group.id}`)}
                    </p>

                    <ul className="flex flex-wrap gap-2">
                      {group.items.map((item) => (
                        <li
                          key={item}
                          className="rounded-md border border-[#6C7F93]/16 bg-white/46 px-3 py-1.5 font-mono text-[0.66rem] text-[#53616E] transition-[border-color,background-color,transform] duration-200 hover:-translate-y-px hover:border-[#6C7F93]/30 hover:bg-white/70"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* bridge to Projects */}
        <div
          className={cn(
            'mt-14 flex items-center gap-4 border-t border-[#6C7F93]/16 pt-6',
            'font-mono text-[9px] tracking-[0.2em] uppercase',
            'transition-[opacity,transform] delay-[950ms] duration-700',
            'motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none',
            copyReveal,
          )}
        >
          <span aria-hidden="true" className="text-[#6C7F93]">
            •
          </span>

          <span className="text-[#53616E]">{t('outroLeft')}</span>

          <span aria-hidden="true" className="h-px flex-1 bg-[#6C7F93]/16" />

          <span className="hidden text-right text-[#53616E] sm:block">
            {t('outroRight')}
          </span>

          <span aria-hidden="true" className="hidden text-[#6C7F93] sm:inline">
            •
          </span>
        </div>
      </div>
    </section>
  );
}
