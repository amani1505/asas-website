import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { buildMetadata } from '@/utils/metadata.util';
import { getDictionaryFor } from '@/i18n/getDictionaryFor';
import { hasLocale } from '@/i18n/locales';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { PageHeaderSection } from '@/sections/layout/PageHeaderSection';
import { PageTransition } from '@/components/motion/PageTransition';
import { getSectors } from '@/services/content.service';
import { SectorChaptersSection } from '@/sections/businesses/SectorChaptersSection';

export async function generateMetadata({ params }: PageProps<'/[locale]/businesses'>): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(locale)) return {};
  const dict = getDictionaryFor(locale);
  return buildMetadata({ locale, path: '/businesses', title: dict.nav.businesses, description: dict.businesses.description });
}

export default async function BusinessesPage({ params }: PageProps<'/[locale]/businesses'>) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  const dict = getDictionaryFor(locale);

  return (
    <PageTransition>
      <PageHeaderSection>
        <SectionHeading as="h1" eyebrow={dict.businesses.eyebrow} title={dict.businesses.title} highlight={dict.businesses.highlight} description={dict.businesses.description} />
      </PageHeaderSection>
      <SectorChaptersSection sectors={getSectors(locale)} locale={locale} dict={dict} />
    </PageTransition>
  );
}
