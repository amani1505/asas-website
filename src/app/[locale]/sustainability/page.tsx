import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { buildMetadata } from '@/utils/metadata.util';
import { getDictionaryFor } from '@/i18n/getDictionaryFor';
import { hasLocale } from '@/i18n/locales';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { PageHeaderSection } from '@/sections/layout/PageHeaderSection';
import { PageTransition } from '@/components/motion/PageTransition';
import { getContent } from '@/services/content.service';
import { SustainabilityExplorerSection } from '@/sections/sustainability/SustainabilityExplorerSection';
import { SustainabilityImpactSection } from '@/sections/sustainability/SustainabilityImpactSection';
import { FOUNDING_YEAR } from '@/constants/site.constants';
import { getTodayIso } from '@/services/clock.service';
import { yearsSince } from '@/utils/years.util';

export async function generateMetadata({ params }: PageProps<'/[locale]/sustainability'>): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(locale)) return {};
  return buildMetadata({ locale, path: '/sustainability', title: getDictionaryFor(locale).nav.sustainability, description: getContent(locale).sustainability.intro.body });
}

export default async function SustainabilityPage({ params }: PageProps<'/[locale]/sustainability'>) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  const dict = getDictionaryFor(locale);
  const { sustainability } = getContent(locale);
  const years = yearsSince(FOUNDING_YEAR, new Date(await getTodayIso()));

  return (
    <PageTransition>
      <PageHeaderSection>
        <SectionHeading
          as="h1"
          eyebrow={dict.sustainability.eyebrow}
          title={sustainability.intro.title}
          highlight={sustainability.intro.highlight}
          description={sustainability.intro.body}
        />
      </PageHeaderSection>
      <SustainabilityExplorerSection tabs={sustainability.tabs} label={dict.sustainability.tabsLabel} />
      <SustainabilityImpactSection tabs={sustainability.tabs} years={years} labels={dict.sustainability.impact} />
    </PageTransition>
  );
}
