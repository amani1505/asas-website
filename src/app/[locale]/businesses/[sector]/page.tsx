import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { buildMetadata } from '@/utils/metadata.util';
import { CONTENT } from '@/content';
import { DEFAULT_LOCALE, hasLocale } from '@/i18n/locales';
import { getDictionaryFor } from '@/i18n/getDictionaryFor';
import { PageTransition } from '@/components/motion/PageTransition';
import { getProducts, getSector } from '@/services/content.service';
import { CompanyJumpBar } from '@/sections/businesses/CompanyJumpBar';
import { CompanySection } from '@/sections/businesses/CompanySection';
import { ProductCatalogueSection } from '@/sections/businesses/ProductCatalogueSection';
import { SectorCtaSection } from '@/sections/businesses/SectorCtaSection';
import { SectorHeroSection } from '@/sections/businesses/SectorHeroSection';

const CATALOGUE_COMPANY = 'asas-dairy';

export function generateStaticParams() {
  return CONTENT[DEFAULT_LOCALE].sectors.map((sector) => ({ sector: sector.slug }));
}

export async function generateMetadata({ params }: PageProps<'/[locale]/businesses/[sector]'>): Promise<Metadata> {
  const { locale, sector: slug } = await params;
  if (!hasLocale(locale)) return {};
  const sector = getSector(locale, slug);
  return sector ? buildMetadata({ locale, path: `/businesses/${sector.slug}`, title: sector.name, description: sector.summary, image: sector.image }) : {};
}

export default async function SectorPage({ params }: PageProps<'/[locale]/businesses/[sector]'>) {
  const { locale, sector: slug } = await params;
  if (!hasLocale(locale)) notFound();
  const sector = getSector(locale, slug);
  if (!sector) notFound();
  const dict = getDictionaryFor(locale);

  return (
    <PageTransition>
      <SectorHeroSection sector={sector} locale={locale} dict={dict} />
      {sector.companies.length > 1 && <CompanyJumpBar companies={sector.companies} label={dict.businesses.jumpTo} />}
      {sector.companies.map((company, index) => (
        <CompanySection key={company.slug} company={company} index={index} servicesLabel={dict.businesses.services}>
          {company.slug === CATALOGUE_COMPANY && <ProductCatalogueSection products={getProducts(locale)} labels={dict.products} />}
        </CompanySection>
      ))}
      <SectorCtaSection sector={sector} locale={locale} dict={dict} />
    </PageTransition>
  );
}
