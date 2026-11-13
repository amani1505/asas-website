'use client';

import { AnimatePresence, motion } from 'motion/react';
import { Check } from 'lucide-react';
import type { SustainabilityTabI } from '@/interfaces/content.interface';
import { Container } from '@/components/ui/Container';
import { AnimatedTabs } from '@/components/motion/AnimatedTabs';
import { useLocationHash } from '@/hooks/useLocationHash';

type TabId = SustainabilityTabI['id'];

interface SustainabilityTabsSectionProps {
  tabs: SustainabilityTabI[];
  label: string;
}

const ID_PREFIX = 'sustainability';
const DEFAULT_TAB: TabId = 'approach';
const FADE = { duration: 0.2, ease: [0.22, 1, 0.36, 1] } as const;

export function SustainabilityTabsSection({ tabs, label }: SustainabilityTabsSectionProps) {
  const [hash, setHash] = useLocationHash();
  const active = tabs.find((tab) => tab.id === hash) ?? tabs.find((tab) => tab.id === DEFAULT_TAB) ?? tabs[0];

  const handleTabChange = (id: TabId) => setHash(id === DEFAULT_TAB ? '' : id);

  return (
    <section className="pb-[var(--space-2xl)]">
      <div className="sticky top-16 z-30 border-y border-border bg-background/85 py-2 backdrop-blur-xl">
        <Container className="min-w-0">
          <AnimatedTabs
            tabs={tabs.map((tab) => ({ id: tab.id, label: tab.title }))}
            active={active.id}
            onChange={handleTabChange}
            idPrefix={ID_PREFIX}
            label={label}
            className="w-fit max-w-full"
          />
        </Container>
      </div>
      <Container className="pt-[var(--space-xl)]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={active.id}
            role="tabpanel"
            id={`${ID_PREFIX}-panel-${active.id}`}
            aria-labelledby={`${ID_PREFIX}-tab-${active.id}`}
            tabIndex={0}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={FADE}
            className="grid gap-[var(--space-lg)] outline-none lg:grid-cols-[1fr_1fr]"
          >
            <div className="flex flex-col gap-[var(--space-sm)]">
              <h2 className="text-[length:var(--text-3xl)] font-bold">{active.title}</h2>
              {active.paragraphs.map((paragraph) => (
                <p key={paragraph} className="max-w-[65ch] text-[length:var(--text-lg)] text-muted-foreground">
                  {paragraph}
                </p>
              ))}
            </div>
            {active.points && active.points.length > 0 && (
              <ul className="flex flex-col gap-[var(--space-2xs)]">
                {active.points.map((point) => (
                  <li key={point} className="flex items-start gap-[var(--space-xs)] rounded-md border border-border bg-card p-[var(--space-sm)]">
                    <span aria-hidden className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                      <Check className="size-4" />
                    </span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            )}
          </motion.div>
        </AnimatePresence>
      </Container>
    </section>
  );
}
