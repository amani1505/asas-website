'use client';

import { Children, type ReactNode } from 'react';
import { motion, type Variants } from 'motion/react';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

type RevealTag = 'div' | 'section' | 'li' | 'ul' | 'ol';

interface RevealProps {
  children: ReactNode;
  /** Seconds before the reveal starts. */
  delay?: number;
  as?: RevealTag;
  /** Animate direct children one after another (50 ms apart). */
  stagger?: boolean;
  /** With `stagger`, classes for each child's wrapper (e.g. grid spans), by index. */
  itemClassNames?: readonly string[];
  className?: string;
}

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

const item: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_OUT } },
};

const MOTION_TAGS = { div: motion.div, section: motion.section, li: motion.li, ul: motion.ul, ol: motion.ol };

/** Fades content up the first time it scrolls into view. Renders static under reduced motion. */
export function Reveal({ children, delay = 0, as = 'div', stagger = false, itemClassNames, className }: RevealProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const Tag = MOTION_TAGS[as];

  if (prefersReducedMotion) {
    const Static = as;
    return <Static className={className}>{children}</Static>;
  }

  const container: Variants = {
    hidden: stagger ? {} : item.hidden,
    visible: stagger
      ? { transition: { staggerChildren: 0.05, delayChildren: delay } }
      : { ...item.visible, transition: { duration: 0.5, ease: EASE_OUT, delay } },
  };

  return (
    <Tag className={className} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '0px 0px -10% 0px' }} variants={container}>
      {stagger
        ? Children.map(children, (child, index) =>
            child === null || child === undefined || child === false ? (
              child
            ) : (
              <motion.div variants={item} className={itemClassNames?.[index]}>
                {child}
              </motion.div>
            ),
          )
        : children}
    </Tag>
  );
}

/** One staggered item, for grids where the wrapper must be a specific element (e.g. `li`). */
export const RevealItem = motion.div;
export const revealItemVariants = item;
