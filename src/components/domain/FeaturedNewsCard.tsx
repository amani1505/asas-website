import Link from 'next/link';
import { ViewTransition } from 'react';
import { ArrowRight } from 'lucide-react';
import type { Locale } from '@/i18n/locales';
import type { NewsItemI } from '@/interfaces/content.interface';
import { SkeletonImage } from '@/components/skeletons/SkeletonImage';
import { cn } from '@/utils/cn.util';
import { formatDate } from '@/utils/format.util';

interface FeaturedNewsCardProps {
  item: NewsItemI;
  locale: Locale;
  readLabel: string;
  /** Photo beside the text on wide screens (the newsroom lead), instead of above it. */
  wide?: boolean;
}

/** The lead story: a large photo, then the category, date, headline, summary and a read link. */
export function FeaturedNewsCard({ item, locale, readLabel, wide = false }: FeaturedNewsCardProps) {
  return (
    <article
      data-featured="true"
      className={cn('group relative flex flex-col gap-[var(--space-sm)]', wide && 'lg:grid lg:grid-cols-[1.25fr_1fr] lg:items-center lg:gap-[var(--space-xl)]')}
    >
      {item.image && (
        <ViewTransition name={`news-${item.slug}`} share="morph" default="none">
          <div className="relative aspect-[16/10] overflow-hidden rounded-md bg-muted">
            <SkeletonImage
              src={item.image.src}
              alt={item.image.alt}
              fill
              sizes={wide ? '(min-width: 1024px) 50vw, 100vw' : '(min-width: 1024px) 55vw, 100vw'}
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            />
          </div>
        </ViewTransition>
      )}
      <div className="flex flex-col gap-[var(--space-sm)]">
        <p className="flex flex-wrap items-center gap-2 text-[length:var(--text-sm)] text-muted-foreground">
          <span className="rounded-md bg-primary px-2.5 py-1 text-[length:var(--text-xs)] font-semibold text-primary-foreground">{item.category}</span>
          <time dateTime={item.date}>{formatDate(item.date, locale)}</time>
        </p>
        <h3 className={cn('max-w-[24ch] font-bold leading-tight', wide ? 'text-[length:var(--text-4xl)]' : 'text-[length:var(--text-3xl)]')}>
          <Link href={`/${locale}/news/${item.slug}`} className="after:absolute after:inset-0 after:content-['']">
            {item.title}
          </Link>
        </h3>
        <p className="line-clamp-3 max-w-[60ch] text-[length:var(--text-base)] text-muted-foreground">{item.excerpt}</p>
        <span aria-hidden className="inline-flex items-center gap-2 text-[length:var(--text-sm)] font-semibold text-primary">
          {readLabel}
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </article>
  );
}
