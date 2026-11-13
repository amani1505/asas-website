import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { buildMetadata } from '@/utils/metadata.util';
import { getDictionaryFor } from '@/i18n/getDictionaryFor';
import { hasLocale } from '@/i18n/locales';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { PageTransition } from '@/components/motion/PageTransition';
import { getContent } from '@/services/content.service';
import { SustainabilityTabsSection } from '@/sections/sustainability/SustainabilityTabsSection';

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

  return (
    <PageTransition>
      <Container className="animate-rise py-[var(--space-xl)]">
        <SectionHeading
          as="h1"
          eyebrow={dict.sustainability.eyebrow}
          title={sustainability.intro.title}
          highlight={sustainability.intro.highlight}
          description={sustainability.intro.body}
        />
      </Container>
      <SustainabilityTabsSection tabs={sustainability.tabs} label={dict.sustainability.tabsLabel} />
    </PageTransition>
  );
}
