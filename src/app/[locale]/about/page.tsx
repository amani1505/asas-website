import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getDictionaryFor } from '@/i18n/getDictionaryFor';
import { hasLocale } from '@/i18n/locales';
import { PageTransition } from '@/components/motion/PageTransition';
import { getContent } from '@/services/content.service';
import { AboutIntroSection } from '@/sections/about/AboutIntroSection';
import { TeamSection } from '@/sections/about/TeamSection';
import { TimelineSection } from '@/sections/about/TimelineSection';
import { ValuesSection } from '@/sections/about/ValuesSection';
import { VideoSection } from '@/sections/about/VideoSection';

export async function generateMetadata({ params }: PageProps<'/[locale]/about'>): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(locale)) return {};
  const { about } = getContent(locale);
  return { title: getDictionaryFor(locale).nav.about, description: about.intro.body[0] };
}

export default async function AboutPage({ params }: PageProps<'/[locale]/about'>) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  const dict = getDictionaryFor(locale);
  const { about } = getContent(locale);

  return (
    <PageTransition>
      <AboutIntroSection intro={about.intro} eyebrow={dict.about.eyebrow} />
      <TimelineSection eyebrow={dict.about.historyEyebrow} heading={dict.about.historyTitle} events={about.timeline} />
      <ValuesSection eyebrow={dict.about.valuesEyebrow} heading={dict.about.valuesTitle} values={about.values} />
      <TeamSection eyebrow={dict.about.teamEyebrow} heading={dict.about.teamTitle} members={about.team} />
      <VideoSection videoId={about.videoId} heading={dict.about.videoTitle} playLabel={dict.about.playVideo} />
    </PageTransition>
  );
}
