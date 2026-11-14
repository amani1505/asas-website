import type { ReactNode } from 'react';
import { Container } from '@/components/ui/Container';
import { ContourLines } from '@/components/decor/ContourLines';

interface PageHeaderSectionProps {
  children: ReactNode;
}

/** The band at the top of inner pages: a muted ground with contour lines. */
export function PageHeaderSection({ children }: PageHeaderSectionProps) {
  return (
    <section className="relative mb-[var(--space-lg)] overflow-hidden border-b border-border bg-muted">
      <ContourLines origin="right" rings={14} className="text-foreground/[0.1]" />
      <Container className="animate-rise relative py-[var(--space-xl)]">{children}</Container>
    </section>
  );
}
