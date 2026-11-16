'use client';

import { useEffect, useState } from 'react';

/**
 * Which of the sections (by element id) is crossing the middle of the screen.
 * Starts on the first. The setter lets a click jump ahead of the scroll.
 */
export function useActiveSection<T extends string>(ids: T[]): [T, (id: T) => void] {
  const [active, setActive] = useState<T>(ids[0]);
  const key = ids.join('|');

  useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id as T);
        }
      },
      // A thin band across the middle of the viewport.
      { rootMargin: '-45% 0px -45% 0px' },
    );
    for (const id of key.split('|')) {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    }
    return () => observer.disconnect();
  }, [key]);

  return [active, setActive];
}
