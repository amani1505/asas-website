import { SkeletonImage } from '@/components/skeletons/SkeletonImage';
import Link from 'next/link';
import { ViewTransition } from 'react';
import type { Locale } from '@/i18n/locales';
import type { NewsItemI } from '@/interfaces/content.interface';
import { formatDate } from '@/utils/format.util';

interface NewsCardProps {
  item: NewsItemI;
  locale: Locale;
}

export function NewsCard({ item, locale }: NewsCardProps) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-md border border-border bg-card transition-transform duration-300 ease-out hover:-translate-y-1">
      {item.image && (
        <ViewTransition name={`news-${item.slug}`} share="morph" default="none">
          <div className="relative aspect-[16/10] overflow-hidden bg-muted">
            <SkeletonImage
              src={item.image.src}
              alt={item.image.alt}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            />
          </div>
        </ViewTransition>
      )}
      <div className="flex flex-1 flex-col gap-[var(--space-2xs)] p-[var(--space-sm)]">
        <p className="flex items-center gap-2 text-[length:var(--text-xs)] text-muted-foreground">
          <span className="rounded-md bg-muted px-2 py-0.5 font-medium text-foreground">{item.category}</span>
          <time dateTime={item.date}>{formatDate(item.date, locale)}</time>
        </p>
        <h3 className="text-[length:var(--text-lg)] font-bold leading-snug">
          <Link href={`/${locale}/news/${item.slug}`} className="after:absolute after:inset-0 after:content-['']">
            {item.title}
          </Link>
        </h3>
        <p className="line-clamp-2 text-[length:var(--text-sm)] text-muted-foreground">{item.excerpt}</p>
      </div>
    </article>
  );
}
