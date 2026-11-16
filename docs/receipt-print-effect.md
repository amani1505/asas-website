# Receipt print effect

On the pricing page, each plan is a till receipt. When the page loads, the receipts feed out of dark printer slots one after another, overshoot slightly like real paper, and settle. Then a green "Popular" rubber stamp thumps onto the Premium receipt.

- Pure CSS animations. No JavaScript animation library, no timers.
- Torn zig-zag paper edges on the top and bottom, made with a CSS mask.
- A drop shadow that follows the torn edge.
- A decorative barcode drawn with a repeating gradient.
- With reduced motion enabled, the receipts and stamp appear in place with no movement.

## How it works

The effect is four stacked layers:

```
<article>                         one plan
  ├── printer slot                dark pill, sits on top (z-10)
  └── clip window                 overflow: hidden, starts right under the slot
        └── .lp-print             slides from -100% to 0 (the "printing")
              └── .lp-receipt     the white paper with torn edges
                    └── .lp-stamp the Popular stamp (Premium only)
```

1. **The clip window hides the paper until it "comes out".** It has `overflow: hidden` and its top edge sits just under the slot (`-mt-1.5`). The receipt starts at `translateY(-100%)`, fully above that edge, so it is invisible.
2. **The receipt slides down.** `.lp-print` animates `translateY(-100%)` to `0`. It overshoots to `2%` at 70% of the way through, then settles, so the paper seems to have weight.
3. **The slot sits on top.** It has `z-10` and is slightly wider than the receipt (`-mx-2`), so the paper looks like it comes out from inside the printer, not from behind a line.
4. **The receipts are staggered.** Each one gets a `--delay` of `index × 220ms`, so they print left to right.
5. **The stamp lands last.** It starts 1000 ms after its own receipt's delay, scales down from 1.8× with a springy curve, and stays rotated at -12°.

### Why the shadow is on a different element

The torn edge is a CSS `mask` on `.lp-receipt`. A mask also cuts away anything drawn outside the shape, including `box-shadow`. So the shadow lives one level up, on `.lp-print`, as `filter: drop-shadow(...)`. A `drop-shadow` filter follows the visible (masked) shape, so the shadow is torn too.

The clip window has `-mx-3 px-3 pb-10`. That gives the shadow room on the sides and bottom, so `overflow: hidden` does not cut it off.

## Files

| File | Role |
|---|---|
| `src/components/pricing/plan-receipt.tsx` | The receipt markup: slot, clip window, paper, rows, stamp |
| `src/pages/Pricing.tsx` | Renders one receipt per plan and passes each its stagger delay |
| `src/styles/landing.css` | Torn edge, shadow, barcode, print and stamp animations |
| `src/constants/pricing.constants.ts` | Plan data (placeholder prices for now) |

## Code

### 1. CSS: `src/styles/landing.css`

```css
/* Torn zig-zag paper edge top and bottom. The mask removes box-shadow,
   so the drop shadow lives on the wrapper as a filter instead. */
.lp-receipt {
  background: #fff;
  color: hsl(var(--lp-ink));
  padding-block: 1.75rem;
  -webkit-mask:
    conic-gradient(from -45deg at bottom, #0000, #000 1deg 89deg, #0000 90deg) bottom / 18px 51% repeat-x,
    conic-gradient(from 135deg at top, #0000, #000 1deg 89deg, #0000 90deg) top / 18px 51% repeat-x;
  mask:
    conic-gradient(from -45deg at bottom, #0000, #000 1deg 89deg, #0000 90deg) bottom / 18px 51% repeat-x,
    conic-gradient(from 135deg at top, #0000, #000 1deg 89deg, #0000 90deg) top / 18px 51% repeat-x;
}

.lp-receipt-shadow {
  filter: drop-shadow(0 18px 24px hsl(var(--lp-ink) / 0.22));
}

.dark .lp-receipt-shadow {
  filter: drop-shadow(0 18px 30px hsl(0 0% 0% / 0.6));
}

/* Decorative barcode at the foot of each receipt. */
.lp-barcode {
  height: 2.25rem;
  background: repeating-linear-gradient(
    90deg,
    hsl(var(--lp-ink)) 0 2px, transparent 2px 4px,
    hsl(var(--lp-ink)) 4px 5px, transparent 5px 8px,
    hsl(var(--lp-ink)) 8px 11px, transparent 11px 13px
  );
}

/* The receipt feeds out of a printer slot on load. */
.lp-print {
  animation: lp-print 1100ms cubic-bezier(0.3, 0.7, 0.2, 1) both;
  animation-delay: var(--delay, 0ms);
}

@keyframes lp-print {
  0%   { transform: translateY(-100%); }
  70%  { transform: translateY(2%); }
  100% { transform: translateY(0); }
}

.lp-stamp {
  animation: lp-stamp 380ms cubic-bezier(0.2, 1.4, 0.4, 1) both;
  animation-delay: var(--delay, 0ms);
}

@keyframes lp-stamp {
  from { opacity: 0; transform: rotate(-12deg) scale(1.8); }
  to   { opacity: 1; transform: rotate(-12deg) scale(1); }
}

@media (prefers-reduced-motion: reduce) {
  .lp-print { animation: none; }
  .lp-stamp { animation: none; opacity: 1; transform: rotate(-12deg); }
}
```

`animation-fill-mode: both` (the `both` in the shorthand) matters. During the delay it holds the first keyframe, so a receipt waiting its turn stays hidden above the slot instead of flashing in place first.

#### How the torn edge mask works

Each `conic-gradient` draws one row of triangles. The opaque `#000` wedge from 1° to 89° makes a right-angled point, and `18px 51% repeat-x` tiles it every 18px across the top half or bottom half of the element. With the two rows together, the middle is fully opaque and only the very top and bottom edges are cut into teeth.

- **Bigger teeth:** change `18px` (and raise `padding-block`, so the content stays clear of the edge).
- **Only the bottom torn:** drop the second (`at top`) gradient and change `51%` to `100%` on the first.

### 2. Markup: `src/components/pricing/plan-receipt.tsx`

The structure that makes the effect, with the receipt content trimmed:

```tsx
<article aria-labelledby={`plan-${plan.code}`} className="flex flex-col">
  {/* Printer slot: on top, slightly wider than the paper */}
  <div
    className="relative z-10 -mx-2 h-3 rounded-full bg-[hsl(var(--lp-ink))] shadow-inner dark:bg-black"
    aria-hidden="true"
  />

  {/* Clip window: hides the paper above the slot; padding leaves room for the shadow */}
  <div className="-mx-3 -mt-1.5 overflow-hidden px-3 pb-10">
    {/* Moves (print animation) and casts the torn-edge shadow */}
    <div className="lp-print lp-receipt-shadow" style={{ '--delay': `${delayMs}ms` } as CSSProperties}>
      {/* The paper */}
      <div className="lp-receipt relative px-fluid-sm font-mono text-sm">
        {/* header, limits, features, total, button, thanks, barcode ... */}

        {plan.isPopular && (
          <span
            className="lp-stamp absolute right-3 top-6 rounded-md border-[3px] border-[hsl(var(--lp-mint))] px-2.5 py-1 font-sans text-sm font-black uppercase text-[hsl(153_65%_32%)]"
            style={{ '--delay': `${delayMs + 1000}ms` } as CSSProperties}
          >
            {t('pricing.receipt.popular')}
          </span>
        )}
      </div>
    </div>
  </div>
</article>
```

The dotted leader rows (`Branches ........ 3`) come from a small `Row` helper. It puts a flex-grow span with a dotted bottom border between the label and the value:

```tsx
function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <li className="flex items-baseline gap-2">
      <span>{label}</span>
      <span className="flex-1 translate-y-[-3px] border-b border-dotted border-slate-300" aria-hidden="true" />
      <span className="font-bold tabular-nums">{value}</span>
    </li>
  );
}
```

### 3. Staggering: `src/pages/Pricing.tsx`

```tsx
const PRINT_STAGGER_MS = 220;

{PRICING_PLANS.map((plan, i) => (
  <PlanReceipt key={plan.code} plan={plan} delayMs={i * PRINT_STAGGER_MS} />
))}
```

Use `items-start` on the grid so receipts of different lengths keep their natural height and the bottom edges stay ragged.

## Customising

| Change | Where |
|---|---|
| Print speed | `1100ms` in `.lp-print` |
| Gap between receipts | `PRINT_STAGGER_MS` in `Pricing.tsx` |
| Overshoot | the `70% { translateY(2%) }` keyframe; `0%` removes it, `4%` exaggerates it |
| When the stamp lands | `delayMs + 1000` in `plan-receipt.tsx` |
| Stamp angle | `-12deg` in both `lp-stamp` keyframes and the reduced-motion rule |
| Tooth size | `18px` in the `.lp-receipt` mask |
| Paper colour | `background` in `.lp-receipt`; a slightly warm off-white reads as thermal paper |

### Variation: a printing jitter

Real receipt printers feed in short bursts. To mimic that, swap the smooth keyframes for steps:

```css
@keyframes lp-print {
  0%   { transform: translateY(-100%); }
  20%  { transform: translateY(-78%); }
  35%  { transform: translateY(-60%); }
  55%  { transform: translateY(-34%); }
  75%  { transform: translateY(-10%); }
  100% { transform: translateY(0); }
}
```

Add `animation-timing-function: steps(1, end)` per keyframe for a hard stutter, or keep the ease for a softer one.

### Variation: print when scrolled into view

If the receipts sit lower on a page, they may finish printing before anyone sees them. Pause the animation until the element is visible:

```css
.lp-print { animation-play-state: paused; }
.lp-print.is-visible { animation-play-state: running; }
```

Then add `is-visible` with an `IntersectionObserver` when the receipt enters the viewport.

## Reusing it

1. Copy the CSS block above.
2. Build the four layers: slot (`z-10`, slightly wider), clip window (`overflow: hidden`, with padding for the shadow), moving wrapper (`.lp-print` plus the drop-shadow), paper (`.lp-receipt`).
3. Pass a `--delay` per item to stagger them.

It works for anything that should "print": order confirmations, invoices, a POS checkout success screen, or a "your receipt" step in an onboarding flow.
