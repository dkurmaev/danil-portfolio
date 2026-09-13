'use client';

import { motion, useReducedMotion } from 'motion/react';
import type { ReactNode } from 'react';

interface HeroRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'right' | 'none';
}

export function HeroReveal({
  children,
  className,
  delay = 0,
  direction = 'up',
}: HeroRevealProps) {
  const prefersReducedMotion = useReducedMotion();

  const offset = {
    up: { x: 0, y: 22 },
    right: { x: 36, y: 0 },
    none: { x: 0, y: 0 },
  }[direction];

  return (
    <motion.div
      className={className}
      initial={
        prefersReducedMotion
          ? false
          : {
              opacity: 0,
              scale: direction === 'right' ? 0.785 : 1,
              x: offset.x,
              y: offset.y,
            }
      }
      animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
      transition={{
        duration: prefersReducedMotion ? 0 : 0.75,
        delay: prefersReducedMotion ? 0 : 0.18 + delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
