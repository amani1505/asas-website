'use client';

import { useRef } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import type { TimelineEventI } from '@/interfaces/content.interface';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { TimelineItem } from '@/components/domain/TimelineItem';

interface TimelineSectionProps {
  eyebrow: string;
  heading: string;
  events: TimelineEventI[];
}

export function TimelineSection({ eyebrow, heading, events }: TimelineSectionProps) {
  const listRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 80%', 'end 60%'] });
  const lineScale = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });
  const sortedEvents = [...events].sort((a, b) => a.year - b.year);

  return (
    <section id="history" className="scroll-mt-20 overflow-x-clip bg-card py-[var(--space-2xl)]">
      <Container className="flex flex-col gap-[var(--space-lg)]">
        <SectionHeading eyebrow={eyebrow} title={heading} />
        <ol ref={listRef} className="relative flex flex-col gap-[var(--space-md)] pl-[var(--space-md)] md:pl-0">
          <span aria-hidden className="absolute bottom-0 left-0 top-0 w-px bg-border md:left-1/2" />
          <motion.span aria-hidden style={{ scaleY: lineScale }} className="absolute bottom-0 left-0 top-0 w-0.5 origin-top bg-primary md:left-1/2 md:-ml-px" />
          {sortedEvents.map((event, index) => (
            <TimelineItem key={event.year} event={event} side={index % 2 === 0 ? 'left' : 'right'} />
          ))}
        </ol>
      </Container>
    </section>
  );
}
