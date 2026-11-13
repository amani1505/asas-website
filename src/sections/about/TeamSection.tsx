import type { TeamMemberI } from '@/interfaces/content.interface';
import { Container } from '@/components/ui/Container';
import { ImageFrame } from '@/components/ui/ImageFrame';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/motion/Reveal';

interface TeamSectionProps {
  eyebrow: string;
  heading: string;
  members: TeamMemberI[];
}

export function TeamSection({ eyebrow, heading, members }: TeamSectionProps) {
  if (members.length === 0) return null;
  return (
    <section id="team" className="scroll-mt-20 bg-card py-[var(--space-2xl)]">
      <Container className="flex flex-col gap-[var(--space-lg)]">
        <SectionHeading eyebrow={eyebrow} title={heading} />
        <Reveal stagger className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,280px),1fr))] gap-[var(--space-sm)]">
          {members.map((member) => (
            <figure key={member.name} className="group flex flex-col gap-[var(--space-xs)]">
              {member.image && (
                <ImageFrame
                  image={member.image}
                  ratio="4 / 3"
                  sizes="(min-width: 1024px) 33vw, 100vw"
                  imageClassName="transition-transform duration-700 group-hover:scale-[1.04]"
                />
              )}
              <figcaption>
                <h3 className="text-[length:var(--text-xl)] font-bold">{member.name}</h3>
                <p className="text-muted-foreground">{member.role}</p>
              </figcaption>
            </figure>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
