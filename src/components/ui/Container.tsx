import type { ElementType, HTMLAttributes } from 'react';
import { cn } from '@/utils/cn.util';

type ContainerSize = 'default' | 'narrow' | 'wide';

const SIZE_CLASSES: Record<ContainerSize, string> = {
  default: 'container-site',
  narrow: 'container-narrow',
  wide: 'container-wide',
};

interface ContainerProps extends HTMLAttributes<HTMLElement> {
  size?: ContainerSize;
  as?: ElementType;
}

export function Container({ size = 'default', as: Tag = 'div', className, ...props }: ContainerProps) {
  return <Tag className={cn(SIZE_CLASSES[size], className)} {...props} />;
}
