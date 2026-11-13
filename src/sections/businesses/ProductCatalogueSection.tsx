'use client';

import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import type { DictionaryI } from '@/i18n/dictionary.interface';
import type { ProductCategory, ProductI } from '@/interfaces/content.interface';
import { FilterChips } from '@/components/motion/FilterChips';
import { ProductCard } from '@/components/domain/ProductCard';

type ProductFilter = 'all' | ProductCategory;

interface ProductCatalogueSectionProps {
  products: ProductI[];
  labels: DictionaryI['products'];
}

const CATEGORY_ORDER: ProductCategory[] = ['milk', 'yogurt', 'mtindi', 'butter', 'powder'];

export function ProductCatalogueSection({ products, labels }: ProductCatalogueSectionProps) {
  const [filter, setFilter] = useState<ProductFilter>('all');

  const options = useMemo(
    () => [
      { id: 'all' as const, label: labels.all, count: products.length },
      ...CATEGORY_ORDER.map((category) => ({
        id: category,
        label: labels[category],
        count: products.filter((product) => product.category === category).length,
      })).filter((option) => option.count > 0),
    ],
    [products, labels],
  );

  const visible = filter === 'all' ? products : products.filter((product) => product.category === filter);

  return (
    <div className="flex flex-col gap-[var(--space-md)] rounded-md border border-border bg-background p-[var(--space-sm)] sm:p-[var(--space-md)]">
      <div className="flex flex-col gap-[var(--space-xs)]">
        <p className="text-[length:var(--text-xs)] font-semibold uppercase tracking-[0.14em] text-muted-foreground">{labels.eyebrow}</p>
        <h3 className="text-[length:var(--text-2xl)] font-bold">{labels.title}</h3>
      </div>
      <FilterChips label={labels.filterLabel} options={options} active={filter} onChange={setFilter} />
      <motion.ul layout className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,150px),1fr))] gap-[var(--space-xs)]">
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map((product) => (
            <motion.li
              key={product.slug}
              layout
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            >
              <ProductCard product={product} sizesLabel={labels.sizes} />
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
    </div>
  );
}
