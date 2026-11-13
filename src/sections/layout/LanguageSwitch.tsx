'use client';

import Link from 'next/link';
import { Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { LOCALES, LOCALE_COOKIE, localizePath, type Locale } from '@/i18n/locales';
import type { DictionaryI } from '@/i18n/dictionary.interface';
import { cn } from '@/utils/cn.util';

interface LanguageSwitchProps {
  locale: Locale;
  labels: DictionaryI['language'];
  className?: string;
}

const ONE_YEAR_SECONDS = 60 * 60 * 24 * 365;

function rememberLocale(locale: Locale): void {
  document.cookie = `${LOCALE_COOKIE}=${locale}; path=/; max-age=${ONE_YEAR_SECONDS}; samesite=lax`;
}

function LanguageLinks({ locale, labels, className, search }: LanguageSwitchProps & { search: string }) {
  const pathname = usePathname();
  const current = search ? `${pathname}?${search}` : pathname;

  return (
    <nav aria-label={labels.label} className={cn('inline-flex rounded-md border border-border p-0.5', className)}>
      {LOCALES.map((target) => {
        const isCurrent = target === locale;
        return (
          <Link
            key={target}
            href={localizePath(current, target)}
            hrefLang={target}
            lang={target}
            aria-label={labels[target]}
            aria-current={isCurrent ? 'true' : undefined}
            onClick={() => rememberLocale(target)}
            className={cn(
              'inline-flex min-h-11 min-w-11 items-center justify-center rounded-[calc(var(--radius)-2px)] px-2 text-[length:var(--text-xs)] font-semibold uppercase tracking-wider transition-colors',
              isCurrent ? 'bg-foreground text-background' : 'text-muted-foreground hover:text-foreground',
            )}
          >
            {target}
          </Link>
        );
      })}
    </nav>
  );
}

function LanguageLinksWithSearch(props: LanguageSwitchProps) {
  const search = useSearchParams().toString();
  return <LanguageLinks {...props} search={search} />;
}

/** EN / SW switch that keeps the visitor on the same page and remembers the choice. */
export function LanguageSwitch(props: LanguageSwitchProps) {
  return (
    <Suspense fallback={<LanguageLinks {...props} search="" />}>
      <LanguageLinksWithSearch {...props} />
    </Suspense>
  );
}
