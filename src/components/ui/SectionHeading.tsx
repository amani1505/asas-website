import type { ReactNode } from 'react';
import { cn } from '@/utils/cn.util';
import { Eyebrow } from './Eyebrow';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  /** A substring of `title` shown in brand red. */
  highlight?: string;
  description?: ReactNode;
  as?: 'h1' | 'h2';
  align?: 'start' | 'center';
  className?: string;
}

/** Renders `title`, wrapping the first occurrence of `highlight` in a red span. */
export function HighlightedText({ text, highlight, className = 'text-primary' }: { text: string; highlight?: string; className?: string }) {
  const index = highlight ? text.indexOf(highlight) : -1;
  if (!highlight || index < 0) return <>{text}</>;
  return (
    <>
      {text.slice(0, index)}
      <span className={className}>{highlight}</span>
      {text.slice(index + highlight.length)}
    </>
  );
}

export function SectionHeading({ eyebrow, title, highlight, description, as: Tag = 'h2', align = 'start', className }: SectionHeadingProps) {
  const isCentered = align === 'center';
  return (
    <div className={cn('flex flex-col gap-[var(--space-xs)]', isCentered && 'items-center text-center', className)}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <Tag
        className={cn(
          'font-bold',
          Tag === 'h1' ? 'text-[length:var(--text-5xl)]' : 'text-[length:var(--text-3xl)]',
        )}
      >
        <HighlightedText text={title} highlight={highlight} />
      </Tag>
      {description && (
        <div className={cn('max-w-[65ch] text-[length:var(--text-lg)] text-muted-foreground', isCentered && 'mx-auto')}>
          {description}
        </div>
      )}
    </div>
  );
}
