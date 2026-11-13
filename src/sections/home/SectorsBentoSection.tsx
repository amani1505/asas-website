import type { DictionaryI } from '@/i18n/dictionary.interface';
import type { Locale } from '@/i18n/locales';
import type { SectorI } from '@/interfaces/content.interface';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { SectorCard } from '@/components/domain/SectorCard';
import { Reveal } from '@/components/motion/Reveal';

interface SectorsBentoSectionProps {
  sectors: SectorI[];
  locale: Locale;
  dict: DictionaryI;
}

/** Asymmetric grid: the first sector is a tall card, the last spans the full width on tablets and up. */
const CARD_LAYOUT = ['md:row-span-2', '', '', 'md:col-span-2'];

export function SectorsBentoSection({ sectors, locale, dict }: SectorsBentoSectionProps) {
  return (
    <section className="py-[var(--space-2xl)]">
      <Container className="flex flex-col gap-[var(--space-lg)]">
        <Reveal>
          <SectionHeading eyebrow={dict.home.sectorsEyebrow} title={dict.home.sectorsTitle} highlight={dict.home.sectorsHighlight} />
        </Reveal>
        <Reveal stagger itemClassNames={CARD_LAYOUT} className="grid gap-[var(--space-sm)] md:grid-cols-2 md:grid-rows-[repeat(2,minmax(16rem,auto))]">
          {sectors.map((sector, index) => (
            <SectorCard
              key={sector.slug}
              sector={sector}
              locale={locale}
              size={index === 0 ? 'lg' : 'md'}
              moreLabel={dict.actions.learnMore}
              companiesLabel={dict.home.companiesCount}
              companyLabel={dict.home.companyCount}
              className={`h-full ${CARD_LAYOUT[index] ?? ''}`}
            />
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
