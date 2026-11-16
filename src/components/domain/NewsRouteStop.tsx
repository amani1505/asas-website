import Link from 'next/link';
import type { Locale } from '@/i18n/locales';
import type { NewsItemI } from '@/interfaces/content.interface';
import { SkeletonImage } from '@/components/skeletons/SkeletonImage';
import { formatDate } from '@/utils/format.util';

interface NewsRouteStopProps {
  item: NewsItemI;
  locale: Locale;
}

/**
 * One story as a stop on the news route: a node on the line, the date and
 * category, the headline, and a thumbnail that slides in on hover (always
 * shown on phones, where there is no hover).
 */
export function NewsRouteStop({ item, locale }: NewsRouteStopProps) {
  return (
    <li className="relative pl-[var(--space-lg)]">
      <article className="group/stop relative grid grid-cols-[1fr_auto] items-center gap-[var(--space-sm)] rounded-md p-[var(--space-sm)] transition-colors duration-300 hover:bg-muted">
        <span
          aria-hidden
          className="absolute -left-[var(--space-lg)] top-[1.6rem] size-3.5 -translate-x-1/2 rounded-full border-2 border-primary bg-card transition-colors duration-300 group-hover/stop:bg-primary"
        />
        <div className="flex min-w-0 flex-col gap-1">
          <p className="flex flex-wrap items-center gap-2 text-[length:var(--text-xs)] text-muted-foreground">
            <time dateTime={item.date} className="font-medium text-foreground">
              {formatDate(item.date, locale)}
            </time>
            <span className="rounded-md border border-border px-1.5 py-0.5">{item.category}</span>
          </p>
          <h3 className="text-[length:var(--text-lg)] font-bold leading-snug">
            <Link href={`/${locale}/news/${item.slug}`} className="after:absolute after:inset-0 after:content-['']">
              {item.title}
            </Link>
          </h3>
        </div>
        {item.image && (
          <div className="relative size-16 overflow-hidden rounded-md bg-muted transition-[opacity,transform] duration-300 sm:size-20 md:translate-x-2 md:opacity-0 md:group-hover/stop:translate-x-0 md:group-hover/stop:opacity-100">
            <SkeletonImage src={item.image.src} alt="" fill sizes="80px" className="object-cover" />
          </div>
        )}
      </article>
    </li>
  );
}
