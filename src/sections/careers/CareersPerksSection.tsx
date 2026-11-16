import { Building2, GraduationCap, HeartPulse, ShieldCheck, Users, type LucideIcon } from 'lucide-react';
import type { ValueI } from '@/interfaces/content.interface';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/motion/Reveal';

interface CareersPerksSectionProps {
  title: string;
  perks: ValueI[];
}

/** Icons in the order the reasons are written: workplaces, training, wellness, safety, culture. */
const ICONS: LucideIcon[] = [Building2, GraduationCap, HeartPulse, ShieldCheck, Users];

export function CareersPerksSection({ title, perks }: CareersPerksSectionProps) {
  return (
    <section className="py-[var(--space-2xl)]">
      <Container className="flex flex-col gap-[var(--space-lg)]">
        <h2 className="text-[length:var(--text-3xl)] font-bold">{title}</h2>
        <Reveal stagger className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,13rem),1fr))] gap-[var(--space-sm)]">
          {perks.map((perk, index) => {
            const Icon = ICONS[index % ICONS.length];
            return (
              <div
                key={perk.title}
                className="group relative flex h-full flex-col gap-[var(--space-xs)] overflow-hidden rounded-md border border-border bg-card p-[var(--space-md)] transition-[transform,border-color] duration-300 hover:-translate-y-1 hover:border-primary/50"
              >
                <span aria-hidden className="absolute -right-6 -top-6 size-24 rounded-full bg-primary/5 transition-transform duration-500 group-hover:scale-150" />
                <span className="relative grid size-12 place-items-center rounded-md bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon aria-hidden className="size-6" />
                </span>
                <h3 className="relative text-[length:var(--text-xl)] font-bold">{perk.title}</h3>
                <p className="relative text-muted-foreground">{perk.description}</p>
              </div>
            );
          })}
        </Reveal>
      </Container>
    </section>
  );
}
