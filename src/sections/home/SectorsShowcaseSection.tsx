import type { DictionaryI } from '@/i18n/dictionary.interface';
import type { Locale } from '@/i18n/locales';
import type { SectorI } from '@/interfaces/content.interface';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { SectorPanels } from '@/components/domain/SectorPanels';
import { Reveal } from '@/components/motion/Reveal';

interface SectorsShowcaseSectionProps {
  sectors: SectorI[];
  locale: Locale;
  dict: DictionaryI;
}

export function SectorsShowcaseSection({ sectors, locale, dict }: SectorsShowcaseSectionProps) {
  return (
    <section className="py-[var(--space-2xl)]">
      <Container className="flex flex-col gap-[var(--space-lg)]">
        <Reveal>
          <SectionHeading eyebrow={dict.home.sectorsEyebrow} title={dict.home.sectorsTitle} highlight={dict.home.sectorsHighlight} />
        </Reveal>
        <Reveal>
          <SectorPanels
            sectors={sectors}
            locale={locale}
            labels={{ companies: dict.home.companiesCount, company: dict.home.companyCount, explore: dict.actions.learnMore }}
          />
        </Reveal>
      </Container>
    </section>
  );
}
