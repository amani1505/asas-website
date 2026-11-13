'use client';

import type { ReactNode } from 'react';
import { LazyMotion, MotionConfig } from 'motion/react';
import { ThemeProvider } from './theme.provider';

const loadMotionFeatures = () => import('@/components/motion/motionFeatures').then((module) => module.default);

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <LazyMotion features={loadMotionFeatures} strict>
        <MotionConfig reducedMotion="user">{children}</MotionConfig>
      </LazyMotion>
    </ThemeProvider>
  );
}
