import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { YouTubeFacade } from '@/components/ui/YouTubeFacade';
import { Reveal } from '@/components/motion/Reveal';

interface VideoSectionProps {
  videoId: string;
  heading: string;
  playLabel: string;
}

export function VideoSection({ videoId, heading, playLabel }: VideoSectionProps) {
  return (
    <section className="py-[var(--space-2xl)]">
      <Container size="narrow" className="flex flex-col gap-[var(--space-md)]">
        <SectionHeading title={heading} align="center" />
        <Reveal>
          <YouTubeFacade videoId={videoId} title={heading} playLabel={playLabel} />
        </Reveal>
      </Container>
    </section>
  );
}
