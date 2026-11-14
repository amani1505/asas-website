import { SkeletonImage } from '@/components/skeletons/SkeletonImage';
import Link from 'next/link';
import { ViewTransition } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import type { DictionaryI } from '@/i18n/dictionary.interface';
import type { Locale } from '@/i18n/locales';
import type { NewsItemI } from '@/interfaces/content.interface';
import { Container } from '@/components/ui/Container';
import { formatDate } from '@/utils/format.util';
import { cn } from '@/utils/cn.util';

interface NewsArticleSectionProps {
  item: NewsItemI;
  newer?: NewsItemI;
  older?: NewsItemI;
  locale: Locale;
  labels: DictionaryI['news'];
}

function AdjacentLink({ item, label, locale, direction }: { item: NewsItemI; label: string; locale: Locale; direction: 'newer' | 'older' }) {
  const isOlder = direction === 'older';
  return (
    <Link
      href={`/${locale}/news/${item.slug}`}
      className={cn(
        'group flex min-h-11 flex-col gap-1 rounded-md border border-border bg-card p-[var(--space-sm)] transition-colors hover:border-foreground/40',
        isOlder && 'sm:col-start-2 sm:items-end sm:text-right',
      )}
    >
      <span className="inline-flex items-center gap-1 text-[length:var(--text-xs)] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
        {!isOlder && <ArrowLeft aria-hidden className="size-4 transition-transform group-hover:-translate-x-0.5" />}
        {label}
        {isOlder && <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-0.5" />}
      </span>
      <span className="font-bold leading-snug">{item.title}</span>
    </Link>
  );
}

export function NewsArticleSection({ item, newer, older, locale, labels }: NewsArticleSectionProps) {
  return (
    <article className="py-[var(--space-xl)]">
      <Container size="narrow" className="flex flex-col gap-[var(--space-lg)]">
        <Link
          href={`/${locale}/news`}
          className="group inline-flex min-h-11 w-fit items-center gap-2 text-[length:var(--text-sm)] font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft aria-hidden className="size-4 transition-transform group-hover:-translate-x-0.5" />
          {labels.backToNews}
        </Link>

        <header className="animate-rise flex flex-col gap-[var(--space-sm)]">
          <p className="flex flex-wrap items-center gap-2 text-[length:var(--text-sm)] text-muted-foreground">
            <span className="rounded-md bg-muted px-2 py-0.5 font-medium text-foreground">{item.category}</span>
            <time dateTime={item.date}>{formatDate(item.date, locale)}</time>
          </p>
          <h1 className="text-[length:var(--text-4xl)] font-bold leading-tight">{item.title}</h1>
          <p className="max-w-[65ch] text-[length:var(--text-lg)] text-muted-foreground">{item.excerpt}</p>
        </header>

        {item.image && (
          <ViewTransition name={`news-${item.slug}`} share="morph" default="none">
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-md bg-muted">
              <SkeletonImage src={item.image.src} alt={item.image.alt} fill priority sizes="(min-width: 768px) 768px, 100vw" className="object-cover" />
            </div>
          </ViewTransition>
        )}

        <div data-article-body className="flex flex-col gap-[var(--space-sm)] text-[length:var(--text-base)] leading-relaxed">
          {item.body.map((paragraph) => (
            <p key={paragraph} className="max-w-[65ch]">
              {paragraph}
            </p>
          ))}
        </div>

        {(newer || older) && (
          <nav aria-label={labels.title} className="grid gap-[var(--space-sm)] border-t border-border pt-[var(--space-md)] sm:grid-cols-2">
            {newer && <AdjacentLink item={newer} label={labels.newer} locale={locale} direction="newer" />}
            {older && <AdjacentLink item={older} label={labels.older} locale={locale} direction="older" />}
          </nav>
        )}
      </Container>
    </article>
  );
}
