'use client';

import { AnimatePresence, m } from 'motion/react';
import { BadgeCheck, Compass, HeartHandshake, Scale, ShieldCheck, type LucideIcon } from 'lucide-react';
import type { SustainabilityTabI } from '@/interfaces/content.interface';
import { Container } from '@/components/ui/Container';
import { ContourLines } from '@/components/decor/ContourLines';
import { CommitmentWheel } from '@/components/domain/CommitmentWheel';
import { BadgesView, BalanceView, ChecklistView, ImpactView, PillarsView } from '@/components/domain/SustainabilityTopicViews';
import { useLocationHash } from '@/hooks/useLocationHash';

type TopicId = SustainabilityTabI['id'];

interface SustainabilityExplorerSectionProps {
  tabs: SustainabilityTabI[];
  label: string;
}

const ID_PREFIX = 'sustainability';
const DEFAULT_TOPIC: TopicId = 'approach';
const FADE = { duration: 0.25, ease: [0.22, 1, 0.36, 1] } as const;
const ICONS: Record<TopicId, LucideIcon> = {
  approach: Compass,
  hse: ShieldCheck,
  compliance: BadgeCheck,
  community: HeartHandshake,
  equality: Scale,
};

function TopicView({ topic }: { topic: SustainabilityTabI }) {
  const points = topic.points ?? [];
  switch (topic.id) {
    case 'approach':
      return <PillarsView points={points} />;
    case 'hse':
      return <ChecklistView points={points} image={topic.image} />;
    case 'compliance':
      return <BadgesView points={points} />;
    case 'community':
      return <ImpactView points={points} image={topic.image} />;
    case 'equality':
      return <BalanceView />;
  }
}

/** The sustainability topics on a dial, with a view made for each topic. The hash keeps the choice linkable. */
export function SustainabilityExplorerSection({ tabs, label }: SustainabilityExplorerSectionProps) {
  const [hash, setHash] = useLocationHash();
  const active = tabs.find((tab) => tab.id === hash) ?? tabs.find((tab) => tab.id === DEFAULT_TOPIC) ?? tabs[0];

  const handleSelect = (id: TopicId) => setHash(id === DEFAULT_TOPIC ? '' : id);

  return (
    <section className="relative overflow-hidden pb-[var(--space-2xl)]">
      <ContourLines origin="left" rings={14} className="text-foreground/[0.06]" />
      <Container className="relative grid items-start gap-[var(--space-xl)] lg:grid-cols-[minmax(18rem,26rem)_1fr]">
        <div className="lg:sticky lg:top-24">
          <CommitmentWheel
            items={tabs.map((tab) => ({ id: tab.id, title: tab.title, icon: ICONS[tab.id] }))}
            activeId={active.id}
            onSelect={handleSelect}
            idPrefix={ID_PREFIX}
            label={label}
          />
        </div>

        <AnimatePresence mode="wait" initial={false}>
          <m.div
            key={active.id}
            role="tabpanel"
            id={`${ID_PREFIX}-panel-${active.id}`}
            aria-labelledby={`${ID_PREFIX}-tab-${active.id}`}
            tabIndex={0}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={FADE}
            className="flex min-w-0 flex-col gap-[var(--space-md)] outline-none"
          >
            <div className="flex flex-col gap-[var(--space-sm)]">
              <h2 className="text-[length:var(--text-3xl)] font-bold">{active.title}</h2>
              {active.paragraphs.map((paragraph) => (
                <p key={paragraph} className="max-w-[65ch] text-[length:var(--text-lg)] text-muted-foreground">
                  {paragraph}
                </p>
              ))}
            </div>
            <TopicView topic={active} />
          </m.div>
        </AnimatePresence>
      </Container>
    </section>
  );
}
