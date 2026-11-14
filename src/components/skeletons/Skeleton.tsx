import { cn } from '@/utils/cn.util';

interface SkeletonProps {
  className?: string;
  'data-skeleton'?: boolean;
}

/** A shimmering placeholder block. Size and shape come from `className`. */
export function Skeleton({ className, ...rest }: SkeletonProps) {
  return <div aria-hidden="true" className={cn('skeleton rounded-md', className)} {...rest} />;
}
