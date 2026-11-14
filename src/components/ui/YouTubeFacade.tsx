'use client';

import { SkeletonImage } from '@/components/skeletons/SkeletonImage';
import { useState } from 'react';
import { Play } from 'lucide-react';

interface YouTubeFacadeProps {
  videoId: string;
  title: string;
  playLabel: string;
}

/** Shows the video thumbnail; the YouTube player (and its scripts) load only after a click. */
export function YouTubeFacade({ videoId, title, playLabel }: YouTubeFacadeProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-md border border-border bg-charcoal">
      {isPlaying ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 size-full"
        />
      ) : (
        <button type="button" onClick={() => setIsPlaying(true)} aria-label={playLabel} className="group absolute inset-0">
          <SkeletonImage
            src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`}
            alt=""
            fill
            sizes="(min-width: 1024px) 60vw, 100vw"
            className="object-cover opacity-90 transition-transform duration-700 group-hover:scale-[1.03]"
          />
          <span aria-hidden className="absolute inset-0 bg-black/25" />
          <span
            aria-hidden
            className="absolute left-1/2 top-1/2 inline-flex size-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-md bg-primary text-white shadow-lg transition-transform duration-300 group-hover:scale-110 sm:size-20"
          >
            <Play className="size-7 fill-current" />
          </span>
        </button>
      )}
    </div>
  );
}
