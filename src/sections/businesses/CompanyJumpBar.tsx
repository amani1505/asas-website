'use client';

import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import type { CompanyI } from '@/interfaces/content.interface';
import { Container } from '@/components/ui/Container';
import { cn } from '@/utils/cn.util';

interface CompanyJumpBarProps {
  companies: Pick<CompanyI, 'slug' | 'name'>[];
  label: string;
}

/** Sticky in-page links to each company section; highlights the one in view. */
export function CompanyJumpBar({ companies, label }: CompanyJumpBarProps) {
  const [activeSlug, setActiveSlug] = useState(companies[0]?.slug);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveSlug(visible[0].target.id);
      },
      { rootMargin: '-35% 0px -55% 0px' },
    );
    for (const company of companies) {
      const section = document.getElementById(company.slug);
      if (section) observer.observe(section);
    }
    return () => observer.disconnect();
  }, [companies]);

  return (
    <nav aria-label={label} className="sticky top-16 z-30 mt-[var(--space-lg)] border-y border-border bg-background/85 backdrop-blur-xl">
      <Container className="flex items-center gap-[var(--space-xs)] overflow-x-auto py-2 [scrollbar-width:none]">
        <span className="shrink-0 text-[length:var(--text-xs)] font-semibold uppercase tracking-[0.14em] text-muted-foreground">{label}</span>
        {companies.map((company) => {
          const isActive = company.slug === activeSlug;
          return (
            <a
              key={company.slug}
              href={`#${company.slug}`}
              aria-current={isActive ? 'location' : undefined}
              className={cn(
                'relative inline-flex min-h-10 shrink-0 items-center rounded-md px-3 text-[length:var(--text-sm)] font-medium transition-colors',
                isActive ? 'text-background' : 'text-muted-foreground hover:text-foreground',
              )}
            >
              {isActive && <motion.span layoutId="company-jump" className="absolute inset-0 rounded-md bg-foreground" transition={{ type: 'spring', stiffness: 500, damping: 40 }} />}
              <span className="relative">{company.name}</span>
            </a>
          );
        })}
      </Container>
    </nav>
  );
}
