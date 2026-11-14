import { SkeletonImage } from '@/components/skeletons/SkeletonImage';
import type { ImageI } from '@/interfaces/content.interface';
import { cn } from '@/utils/cn.util';

interface ImageFrameProps {
  image: ImageI;
  /** CSS aspect ratio, e.g. "4 / 3". */
  ratio: string;
  sizes: string;
  priority?: boolean;
  className?: string;
  imageClassName?: string;
}

export function ImageFrame({ image, ratio, sizes, priority, className, imageClassName }: ImageFrameProps) {
  return (
    <div className={cn('relative w-full overflow-hidden rounded-md bg-muted', className)} style={{ aspectRatio: ratio }}>
      <SkeletonImage
        src={image.src}
        alt={image.alt}
        fill
        sizes={sizes}
        priority={priority}
        className={cn('object-cover', imageClassName)}
      />
    </div>
  );
}
