import { ArrowUpRight, MapPin } from 'lucide-react';
import type { OfficeI } from '@/interfaces/content.interface';

interface OfficeCardProps {
  office: OfficeI;
  labels: { headquarters: string; getDirections: string; opensInNewTab: string };
}

export function OfficeCard({ office, labels }: OfficeCardProps) {
  return (
    <article className="flex h-full flex-col gap-[var(--space-xs)] rounded-md border border-border bg-card p-[var(--space-md)]">
      <div className="flex flex-wrap items-center gap-2">
        <h3 className="text-[length:var(--text-xl)] font-bold">{office.name}</h3>
        {office.isHeadquarters && (
          <span className="rounded-md bg-primary/10 px-2 py-0.5 text-[length:var(--text-xs)] font-semibold uppercase tracking-[0.1em] text-primary">
            {labels.headquarters}
          </span>
        )}
      </div>
      <p className="flex items-start gap-2 text-muted-foreground">
        <MapPin aria-hidden className="mt-1 size-4 shrink-0" />
        <span>{office.address}</span>
      </p>
      <a
        href={office.mapUrl}
        target="_blank"
        rel="noopener"
        aria-label={`${labels.getDirections}: ${office.name} (${labels.opensInNewTab})`}
        className="group mt-auto inline-flex min-h-11 w-fit items-center gap-1 font-medium text-foreground underline-offset-4 hover:underline"
      >
        {labels.getDirections}
        <ArrowUpRight aria-hidden className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </a>
    </article>
  );
}
