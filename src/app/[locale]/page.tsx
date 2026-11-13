import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CLIENTS } from '@/constants/site.constants';
import { getDictionaryFor } from '@/i18n/getDictionaryFor';
import { hasLocale } from '@/i18n/locales';
import { PageTransition } from '@/components/motion/PageTransition';
import { getTodayIso } from '@/services/clock.service';
import { getContent, getNews, getSectors, getStats } from '@/services/content.service';
import { ClientsSection } from '@/sections/home/ClientsSection';
import { ClosingCtaSection } from '@/sections/home/ClosingCtaSection';
import { HeroSection } from '@/sections/home/HeroSection';
import { LatestNewsSection } from '@/sections/home/LatestNewsSection';
import { SectorsBentoSection } from '@/sections/home/SectorsBentoSection';
import { StatsSection } from '@/sections/home/StatsSection';
import { StoryTeaserSection } from '@/sections/home/StoryTeaserSection';

export async function generateMetadata({ params }: PageProps<'/[locale]'>): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(locale)) return {};
  const dict = getDictionaryFor(locale);
  return { title: dict.meta.siteName, description: dict.meta.description };
}

export default async function HomePage({ params }: PageProps<'/[locale]'>) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();

  const dict = getDictionaryFor(locale);
  const { home } = getContent(locale);
  const stats = getStats(locale, new Date(await getTodayIso()));

  return (
    <PageTransition>
      <HeroSection hero={home.hero} locale={locale} badge={{ value: `${stats.years}`, label: dict.stats.years }} />
      <StatsSection stats={stats} labels={dict.stats} />
      <SectorsBentoSection sectors={getSectors(locale)} locale={locale} dict={dict} />
      <StoryTeaserSection story={home.storyTeaser} locale={locale} />
      <LatestNewsSection items={getNews(locale)} locale={locale} dict={dict} />
      <ClientsSection clients={CLIENTS} dict={dict} />
      <ClosingCtaSection cta={home.closingCta} locale={locale} dict={dict} />
    </PageTransition>
  );
}
