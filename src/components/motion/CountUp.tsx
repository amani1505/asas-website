'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView } from 'motion/react';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

interface CountUpProps {
  to: number;
  suffix?: string;
  durationMs?: number;
  className?: string;
}

/** Counts from 0 to `to` the first time it is visible. Server HTML and screen readers always get the final value. */
export function CountUp({ to, suffix = '', durationMs = 1200, className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const prefersReducedMotion = usePrefersReducedMotion();
  // Starts at the final value so the server HTML (no-JS, crawlers, pre-hydration) is right;
  // the count from 0 begins when the number scrolls into view.
  const [animatedValue, setAnimatedValue] = useState(to);
  const value = prefersReducedMotion ? to : animatedValue;

  useEffect(() => {
    if (prefersReducedMotion || !isInView) return;
    // A plain rAF tween (ease-out cubic) keeps motion's animation engine out of the first-load bundle.
    let frame = requestAnimationFrame(function tick(startedAt) {
      const step = (now: number) => {
        const progress = Math.min(1, (now - startedAt) / durationMs);
        setAnimatedValue(Math.round(to * (1 - (1 - progress) ** 3)));
        if (progress < 1) frame = requestAnimationFrame(step);
      };
      step(startedAt);
    });
    return () => cancelAnimationFrame(frame);
  }, [isInView, prefersReducedMotion, to, durationMs]);

  return (
    <span ref={ref} className={className} aria-label={`${to}${suffix}`} role="text">
      <span aria-hidden="true" className="tabular-nums">
        {value}
        {suffix}
      </span>
    </span>
  );
}
