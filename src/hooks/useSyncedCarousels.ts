'use client';

import { useCallback, useEffect, useState } from 'react';
import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';
import { usePrefersReducedMotion } from './usePrefersReducedMotion';

interface SyncedCarouselsOptions {
  /** Milliseconds between automatic slides. */
  autoplayDelay?: number;
}

/**
 * Three Embla carousels (main, thumbnails, captions) that always show the same
 * slide, whichever one moves. The main one auto-plays unless the visitor
 * prefers reduced motion or pauses it.
 */
export function useSyncedCarousels({ autoplayDelay = 4500 }: SyncedCarouselsOptions = {}) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [autoplay] = useState(() => Autoplay({ delay: autoplayDelay, stopOnInteraction: false, playOnInit: false }));
  const [mainRef, mainApi] = useEmblaCarousel({ loop: true }, [autoplay]);
  // The thumbnail strip only scrolls when its thumbnails don't all fit; it never wraps around.
  const [thumbsRef, thumbsApi] = useEmblaCarousel({ align: 'start', containScroll: 'keepSnaps', dragFree: true });
  const [captionsRef, captionsApi] = useEmblaCarousel({ loop: true, watchDrag: false });
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const isPlaying = !isPaused && !prefersReducedMotion;

  // The main carousel leads (swipes, autoplay, thumbnail clicks); the others follow it.
  useEffect(() => {
    if (!mainApi) return;
    const onSelect = () => {
      const index = mainApi.selectedScrollSnap();
      setCurrent(index);
      captionsApi?.scrollTo(index);
      thumbsApi?.scrollTo(index);
    };
    mainApi.on('select', onSelect);
    return () => {
      mainApi.off('select', onSelect);
    };
  }, [mainApi, thumbsApi, captionsApi]);

  // Run or stop the autoplay to match the visitor's choice.
  useEffect(() => {
    if (!mainApi) return;
    if (isPlaying) autoplay.play();
    else autoplay.stop();
  }, [mainApi, autoplay, isPlaying]);

  const goTo = useCallback(
    (index: number) => {
      setCurrent(index);
      mainApi?.scrollTo(index);
    },
    [mainApi],
  );

  const togglePlaying = useCallback(() => setIsPaused((paused) => !paused), []);

  return { mainRef, thumbsRef, captionsRef, current, goTo, isPlaying, togglePlaying, canPlay: !prefersReducedMotion };
}
