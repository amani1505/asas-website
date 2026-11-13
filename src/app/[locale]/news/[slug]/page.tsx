import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CONTENT } from '@/content';
import { getDictionaryFor } from '@/i18n/getDictionaryFor';
import { DEFAULT_LOCALE, hasLocale } from '@/i18n/locales';
import { PageTransition } from '@/components/motion/PageTransition';
import { getAdjacentNews, getNewsItem } from '@/services/content.service';
import { NewsArticleSection } from '@/sections/news/NewsArticleSection';

export function generateStaticParams() {
  return CONTENT[DEFAULT_LOCALE].news.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: PageProps<'/[locale]/news/[slug]'>): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!hasLocale(locale)) return {};
  const item = getNewsItem(locale, slug);
  return item ? { title: item.title, description: item.excerpt } : {};
}

export default async function NewsArticlePage({ params }: PageProps<'/[locale]/news/[slug]'>) {
  const { locale, slug } = await params;
  if (!hasLocale(locale)) notFound();
  const item = getNewsItem(locale, slug);
  if (!item) notFound();
  const { newer, older } = getAdjacentNews(locale, slug);

  return (
    <PageTransition>
      <NewsArticleSection item={item} newer={newer} older={older} locale={locale} labels={getDictionaryFor(locale).news} />
    </PageTransition>
  );
}
