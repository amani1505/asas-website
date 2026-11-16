import type { CSSProperties } from 'react';
import { ArrowDown, Mail } from 'lucide-react';
import type { DictionaryI } from '@/i18n/dictionary.interface';
import type { CareersContentI, TeamMemberI } from '@/interfaces/content.interface';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { HighlightedText } from '@/components/ui/SectionHeading';
import { ContourLines } from '@/components/decor/ContourLines';
import { SkeletonImage } from '@/components/skeletons/SkeletonImage';
import { cvMailto } from '@/utils/careers.util';
import { cn } from '@/utils/cn.util';

interface CareersHeroSectionProps {
  intro: CareersContentI['intro'];
  team: TeamMemberI[];
  email: string;
  dict: DictionaryI;
}

/** Resting tilt of each photo card, and how far it fans out on hover. */
const FAN = [
  'left-0 top-[12%] -rotate-6 group-hover/fan:-translate-x-[6%] group-hover/fan:-rotate-[10deg]',
  'left-[26%] top-0 z-10 rotate-1 group-hover/fan:-translate-y-[4%]',
  'left-[52%] top-[14%] rotate-[7deg] group-hover/fan:translate-x-[6%] group-hover/fan:rotate-[11deg]',
];
const delay = (ms: number) => ({ '--rise-delay': `${ms}ms` }) as CSSProperties;

/** The careers opener: headline and the two ways in, beside a fan of real ASAS teams. */
export function CareersHeroSection({ intro, team, email, dict }: CareersHeroSectionProps) {
  return (
    <section className="relative overflow-hidden border-b border-border bg-muted">
      <ContourLines origin="right" rings={14} className="text-foreground/[0.08]" />
      <Container className="relative grid items-center gap-[var(--space-xl)] py-[var(--space-xl)] lg:grid-cols-[1fr_1.1fr] lg:py-[var(--space-2xl)]">
        <div className="flex flex-col items-start gap-[var(--space-sm)]">
          <div className="animate-rise" style={delay(0)}>
            <Eyebrow>{dict.careers.eyebrow}</Eyebrow>
          </div>
          <h1 className="animate-rise text-[length:var(--text-5xl)] font-extrabold leading-[1.02]" style={delay(80)}>
            <HighlightedText text={intro.title} highlight={intro.highlight} />
          </h1>
          {intro.body.map((paragraph) => (
            <p key={paragraph} className="animate-rise max-w-[52ch] text-[length:var(--text-lg)] text-muted-foreground" style={delay(160)}>
              {paragraph}
            </p>
          ))}
          <div className="animate-rise mt-[var(--space-xs)] flex flex-wrap gap-[var(--space-xs)]" style={delay(240)}>
            <Button href={cvMailto(email)} size="lg">
              <Mail aria-hidden />
              {dict.actions.sendCv}
            </Button>
            <Button href="#paths" size="lg" variant="outline">
              {dict.careers.findPath}
              <ArrowDown aria-hidden className="transition-transform group-hover/button:translate-y-0.5" />
            </Button>
          </div>
        </div>

        <div className="group/fan relative mx-auto aspect-[5/4] w-full max-w-[40rem]">
          {team.slice(0, FAN.length).map((member, index) => (
            <figure
              key={member.name}
              className={cn(
                'animate-rise absolute w-[46%] rounded-md bg-card p-1.5 pb-[var(--space-xs)] shadow-[0_24px_48px_-24px_rgb(0_0_0/0.45)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]',
                FAN[index],
              )}
              style={delay(200 + index * 120)}
            >
              {member.image && (
                <div className="relative aspect-[4/5] overflow-hidden rounded-md bg-muted">
                  <SkeletonImage src={member.image.src} alt={member.image.alt} fill priority={index === 1} sizes="(min-width: 1024px) 20vw, 45vw" className="object-cover" />
                </div>
              )}
              <figcaption className="px-1 pt-[var(--space-2xs)] font-heading text-[length:var(--text-sm)] font-bold">{member.name}</figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </section>
  );
}
