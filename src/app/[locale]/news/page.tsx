import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getDictionaryFor } from '@/i18n/getDictionaryFor';
import { hasLocale } from '@/i18n/locales';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { PageTransition } from '@/components/motion/PageTransition';
import { getNews, getNewsCategories } from '@/services/content.service';
import { NewsGridSection } from '@/sections/news/NewsGridSection';

export async function generateMetadata({ params }: PageProps<'/[locale]/news'>): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(locale)) return {};
  const dict = getDictionaryFor(locale);
  return { title: dict.nav.news, description: dict.news.description };
}

export default async function NewsPage({ params }: PageProps<'/[locale]/news'>) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  const dict = getDictionaryFor(locale);

  return (
    <PageTransition>
      <Container className="animate-rise py-[var(--space-xl)]">
        <SectionHeading as="h1" eyebrow={dict.news.eyebrow} title={dict.news.title} description={dict.news.description} />
      </Container>
      <NewsGridSection items={getNews(locale)} categories={getNewsCategories(locale)} locale={locale} labels={dict.news} />
    </PageTransition>
  );
}
