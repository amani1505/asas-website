'use client';

import Image, { type ImageProps } from 'next/image';
import { useCallback, useState } from 'react';
import { Skeleton } from './Skeleton';

/**
 * next/image with a shimmering placeholder behind it until the photo loads.
 * Same props as next/image. The ref check covers images that finished loading
 * before React hydrated, when no load event will fire.
 */
export function SkeletonImage({ alt, onLoad, ...props }: ImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const markIfComplete = useCallback((img: HTMLImageElement | null) => {
    if (img?.complete && img.naturalWidth > 0) setIsLoaded(true);
  }, []);

  return (
    <>
      {!isLoaded && <Skeleton data-skeleton className="absolute inset-0 rounded-none" />}
      <Image
        {...props}
        alt={alt}
        ref={markIfComplete}
        onLoad={(event) => {
          setIsLoaded(true);
          onLoad?.(event);
        }}
      />
    </>
  );
}
