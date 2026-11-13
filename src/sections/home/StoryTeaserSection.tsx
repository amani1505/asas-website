import { ArrowRight } from 'lucide-react';
import type { Locale } from '@/i18n/locales';
import type { HomeContentI } from '@/interfaces/content.interface';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { ImageFrame } from '@/components/ui/ImageFrame';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/motion/Reveal';
import { localeHref } from '@/utils/format.util';

interface StoryTeaserSectionProps {
  story: HomeContentI['storyTeaser'];
  locale: Locale;
}

export function StoryTeaserSection({ story, locale }: StoryTeaserSectionProps) {
  return (
    <section className="py-[var(--space-2xl)]">
      <Container className="grid items-center gap-[var(--space-lg)] md:grid-cols-2">
        <Reveal>
          <ImageFrame image={story.image} ratio="5 / 4" sizes="(min-width: 768px) 50vw, 100vw" className="grayscale-[30%]" />
        </Reveal>
        <Reveal delay={0.1} className="flex flex-col items-start gap-[var(--space-sm)]">
          <SectionHeading eyebrow={story.eyebrow} title={story.title} description={<p>{story.body}</p>} />
          <Button href={localeHref(locale, story.cta.href)} variant="secondary" size="lg">
            {story.cta.label}
            <ArrowRight aria-hidden className="transition-transform group-hover/button:translate-x-0.5" />
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
