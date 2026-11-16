import Link from 'next/link';
import { ViewTransition } from 'react';
import { ArrowRight } from 'lucide-react';
import type { Locale } from '@/i18n/locales';
import type { NewsItemI } from '@/interfaces/content.interface';
import { SkeletonImage } from '@/components/skeletons/SkeletonImage';
import { formatDate } from '@/utils/format.util';

interface FeaturedNewsCardProps {
  item: NewsItemI;
  locale: Locale;
  readLabel: string;
}

/** The lead story: a large photo, then the headline, summary and a read link. */
export function FeaturedNewsCard({ item, locale, readLabel }: FeaturedNewsCardProps) {
  return (
    <article data-featured="true" className="group relative flex flex-col gap-[var(--space-sm)]">
      {item.image && (
        <ViewTransition name={`news-${item.slug}`} share="morph" default="none">
          <div className="relative aspect-[16/10] overflow-hidden rounded-md bg-muted">
            <SkeletonImage
              src={item.image.src}
              alt={item.image.alt}
              fill
              sizes="(min-width: 1024px) 55vw, 100vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            />
            <span className="absolute left-[var(--space-sm)] top-[var(--space-sm)] rounded-md bg-primary px-2.5 py-1 text-[length:var(--text-xs)] font-semibold text-primary-foreground">
              {item.category}
            </span>
          </div>
        </ViewTransition>
      )}
      <time dateTime={item.date} className="text-[length:var(--text-sm)] text-muted-foreground">
        {formatDate(item.date, locale)}
      </time>
      <h3 className="max-w-[24ch] text-[length:var(--text-3xl)] font-bold leading-tight">
        <Link href={`/${locale}/news/${item.slug}`} className="after:absolute after:inset-0 after:content-['']">
          {item.title}
        </Link>
      </h3>
      <p className="line-clamp-3 max-w-[60ch] text-[length:var(--text-base)] text-muted-foreground">{item.excerpt}</p>
      <span aria-hidden className="inline-flex items-center gap-2 text-[length:var(--text-sm)] font-semibold text-primary">
        {readLabel}
        <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
      </span>
    </article>
  );
}
