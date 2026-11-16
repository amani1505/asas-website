import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { buildMetadata } from '@/utils/metadata.util';
import { getDictionaryFor } from '@/i18n/getDictionaryFor';
import { hasLocale } from '@/i18n/locales';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { PageHeaderSection } from '@/sections/layout/PageHeaderSection';
import { PageTransition } from '@/components/motion/PageTransition';
import { getNews, getNewsCategories } from '@/services/content.service';
import { NewsroomSection } from '@/sections/news/NewsroomSection';

export async function generateMetadata({ params }: PageProps<'/[locale]/news'>): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(locale)) return {};
  const dict = getDictionaryFor(locale);
  return buildMetadata({ locale, path: '/news', title: dict.nav.news, description: dict.news.description });
}

export default async function NewsPage({ params }: PageProps<'/[locale]/news'>) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  const dict = getDictionaryFor(locale);

  return (
    <PageTransition>
      <PageHeaderSection>
        <SectionHeading as="h1" eyebrow={dict.news.eyebrow} title={dict.news.title} description={dict.news.description} />
      </PageHeaderSection>
      <NewsroomSection items={getNews(locale)} categories={getNewsCategories(locale)} locale={locale} labels={dict.news} readLabel={dict.home.readArticle} />
    </PageTransition>
  );
}
