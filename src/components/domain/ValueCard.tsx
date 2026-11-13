import type { ValueI } from '@/interfaces/content.interface';

export function ValueCard({ value, index }: { value: ValueI; index: number }) {
  return (
    <div className="group flex h-full flex-col gap-2 rounded-md border border-border bg-card p-[var(--space-md)] transition-colors duration-300 hover:border-primary/50">
      <span className="font-heading text-[length:var(--text-sm)] font-bold text-muted-foreground transition-colors group-hover:text-primary">
        {String(index + 1).padStart(2, '0')}
      </span>
      <h3 className="text-[length:var(--text-xl)] font-bold">{value.title}</h3>
      <p className="text-muted-foreground">{value.description}</p>
    </div>
  );
}
