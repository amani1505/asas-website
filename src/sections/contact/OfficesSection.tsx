import type { DictionaryI } from '@/i18n/dictionary.interface';
import type { OfficeI } from '@/interfaces/content.interface';
import { OfficeCard } from '@/components/domain/OfficeCard';

interface OfficesSectionProps {
  offices: OfficeI[];
  dict: DictionaryI;
}

export function OfficesSection({ offices, dict }: OfficesSectionProps) {
  const labels = { headquarters: dict.contact.headquarters, getDirections: dict.actions.getDirections, opensInNewTab: dict.common.opensInNewTab };
  return (
    <section aria-labelledby="offices-title" className="flex flex-col gap-[var(--space-sm)]">
      <h2 id="offices-title" className="text-[length:var(--text-2xl)] font-bold">
        {dict.contact.officesTitle}
      </h2>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,240px),1fr))] gap-[var(--space-sm)]">
        {offices.map((office) => (
          <OfficeCard key={office.id} office={office} labels={labels} />
        ))}
      </div>
    </section>
  );
}
