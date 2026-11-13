'use client';

import { useEffect, useRef, useState } from 'react';
import { animate, useInView } from 'motion/react';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

interface CountUpProps {
  to: number;
  suffix?: string;
  durationMs?: number;
  className?: string;
}

/** Counts from 0 to `to` the first time it is visible. Screen readers always get the final value. */
export function CountUp({ to, suffix = '', durationMs = 1200, className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const prefersReducedMotion = usePrefersReducedMotion();
  const [value, setValue] = useState(prefersReducedMotion ? to : 0);

  useEffect(() => {
    if (prefersReducedMotion) {
      setValue(to);
      return;
    }
    if (!isInView) return;
    const controls = animate(0, to, {
      duration: durationMs / 1000,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => setValue(Math.round(latest)),
    });
    return () => controls.stop();
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
