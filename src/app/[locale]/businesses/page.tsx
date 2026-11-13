import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getDictionaryFor } from '@/i18n/getDictionaryFor';
import { hasLocale } from '@/i18n/locales';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { PageTransition } from '@/components/motion/PageTransition';
import { getSectors } from '@/services/content.service';
import { BusinessesGridSection } from '@/sections/businesses/BusinessesGridSection';

export async function generateMetadata({ params }: PageProps<'/[locale]/businesses'>): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(locale)) return {};
  const dict = getDictionaryFor(locale);
  return { title: dict.nav.businesses, description: dict.businesses.description };
}

export default async function BusinessesPage({ params }: PageProps<'/[locale]/businesses'>) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  const dict = getDictionaryFor(locale);

  return (
    <PageTransition>
      <Container className="animate-rise py-[var(--space-xl)]">
        <SectionHeading as="h1" eyebrow={dict.businesses.eyebrow} title={dict.businesses.title} highlight={dict.businesses.highlight} description={dict.businesses.description} />
      </Container>
      <BusinessesGridSection sectors={getSectors(locale)} locale={locale} dict={dict} />
    </PageTransition>
  );
}
