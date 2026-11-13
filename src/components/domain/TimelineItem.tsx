'use client';

import { motion } from 'motion/react';
import type { TimelineEventI } from '@/interfaces/content.interface';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { cn } from '@/utils/cn.util';

interface TimelineItemProps {
  event: TimelineEventI;
  side: 'left' | 'right';
}

function TimelineItemBody({ event, isLeft }: { event: TimelineEventI; isLeft: boolean }) {
  return (
    <>
      <span
        aria-hidden
        className={cn(
          'absolute top-2 size-3 rounded-full border-2 border-primary bg-background',
          '-left-[calc(var(--space-md)+6px)]',
          isLeft ? 'md:left-auto md:-right-[6px]' : 'md:-left-[6px]',
        )}
      />
      <p data-testid="timeline-year" className="font-heading text-[length:var(--text-3xl)] font-bold leading-none text-primary">
        {event.year}
      </p>
      <h3 className="mt-2 text-[length:var(--text-xl)] font-bold">{event.title}</h3>
      <p className={cn('mt-1 max-w-[46ch] text-muted-foreground', isLeft && 'md:ml-auto')}>{event.description}</p>
    </>
  );
}

export function TimelineItem({ event, side }: TimelineItemProps) {
  const isLeft = side === 'left';
  const prefersReducedMotion = usePrefersReducedMotion();
  const className = cn('relative md:w-1/2', isLeft ? 'md:pr-[var(--space-lg)] md:text-right' : 'md:ml-auto md:pl-[var(--space-lg)]');

  // A plain element (not motion) so a server-rendered hidden state is replaced, not kept.
  if (prefersReducedMotion) {
    return (
      <li className={className}>
        <TimelineItemBody event={event} isLeft={isLeft} />
      </li>
    );
  }

  return (
    <motion.li
      initial={{ opacity: 0, x: isLeft ? -24 : 24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '0px 0px -15% 0px' }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      <TimelineItemBody event={event} isLeft={isLeft} />
    </motion.li>
  );
}
