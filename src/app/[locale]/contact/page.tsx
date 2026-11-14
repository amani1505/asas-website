import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { buildMetadata } from '@/utils/metadata.util';
import { getDictionaryFor } from '@/i18n/getDictionaryFor';
import { hasLocale } from '@/i18n/locales';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { PageHeaderSection } from '@/sections/layout/PageHeaderSection';
import { PageTransition } from '@/components/motion/PageTransition';
import { getContent } from '@/services/content.service';
import { ContactChannelsSection } from '@/sections/contact/ContactChannelsSection';
import { ContactFormSection } from '@/sections/contact/ContactFormSection';
import { OfficesSection } from '@/sections/contact/OfficesSection';

export async function generateMetadata({ params }: PageProps<'/[locale]/contact'>): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(locale)) return {};
  const dict = getDictionaryFor(locale);
  return buildMetadata({ locale, path: '/contact', title: dict.nav.contact, description: dict.contact.description });
}

export default async function ContactPage({ params }: PageProps<'/[locale]/contact'>) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  const dict = getDictionaryFor(locale);

  return (
    <PageTransition>
      <PageHeaderSection>
        <SectionHeading as="h1" eyebrow={dict.contact.eyebrow} title={dict.contact.title} highlight={dict.contact.highlight} description={dict.contact.description} />
      </PageHeaderSection>
      <ContactChannelsSection dict={dict} />
      <section className="pb-[var(--space-2xl)]">
        <Container className="grid items-start gap-[var(--space-lg)] lg:grid-cols-[1.3fr_1fr]">
          <ContactFormSection dict={dict} />
          <OfficesSection offices={getContent(locale).offices} dict={dict} />
        </Container>
      </section>
    </PageTransition>
  );
}
