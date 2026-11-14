import type { AboutContentI } from '@/interfaces/content.interface';
import { ContourLines } from '@/components/decor/ContourLines';
import { Container } from '@/components/ui/Container';
import { ImageFrame } from '@/components/ui/ImageFrame';
import { SectionHeading } from '@/components/ui/SectionHeading';

interface AboutIntroSectionProps {
  intro: AboutContentI['intro'];
  eyebrow: string;
}

export function AboutIntroSection({ intro, eyebrow }: AboutIntroSectionProps) {
  return (
    <section className="relative overflow-hidden py-[var(--space-xl)]">
      <ContourLines origin="left" rings={14} className="text-foreground/[0.08]" />
      <Container className="relative grid items-center gap-[var(--space-lg)] lg:grid-cols-[1.1fr_1fr]">
        <div className="animate-rise flex flex-col gap-[var(--space-sm)]">
          <SectionHeading
            as="h1"
            eyebrow={eyebrow}
            title={intro.title}
            highlight={intro.highlight}
            description={
              <div className="flex flex-col gap-[var(--space-xs)]">
                {intro.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            }
          />
        </div>
        <div className="animate-rise" style={{ ['--rise-delay' as string]: '150ms' }}>
          <ImageFrame image={intro.image} ratio="2 / 1" sizes="(min-width: 1024px) 45vw, 100vw" priority />
        </div>
      </Container>
    </section>
  );
}
