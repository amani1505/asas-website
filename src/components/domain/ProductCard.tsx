import Image from 'next/image';
import type { ProductI } from '@/interfaces/content.interface';

export function ProductCard({ product, sizesLabel }: { product: ProductI; sizesLabel: string }) {
  return (
    <article
      data-testid="product-card"
      data-category={product.category}
      className="group flex h-full flex-col overflow-hidden rounded-md border border-border bg-card transition-colors duration-300 hover:border-foreground/30"
    >
      <div className="relative aspect-square overflow-hidden bg-white">
        <Image
          src={product.image.src}
          alt={product.image.alt}
          fill
          sizes="(min-width: 1024px) 20vw, (min-width: 640px) 33vw, 50vw"
          className="object-contain p-[var(--space-xs)] transition-transform duration-500 group-hover:scale-[1.05]"
        />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-[var(--space-xs)]">
        <h4 className="font-heading text-[length:var(--text-base)] font-bold leading-snug">{product.name}</h4>
        <ul aria-label={sizesLabel} className="mt-auto flex flex-wrap gap-1">
          {product.sizes.map((size) => (
            <li key={size} className="rounded-md bg-muted px-1.5 py-0.5 text-[length:var(--text-xs)] text-muted-foreground">
              {size}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
