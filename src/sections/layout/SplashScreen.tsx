import type { CSSProperties } from 'react';
import Image from 'next/image';
import { Building2, Fuel, Milk, Truck, type LucideIcon } from 'lucide-react';
import { FOUNDING_YEAR } from '@/constants/site.constants';
import { IMAGES } from '@/content/images';
import { ContourLines } from '@/components/decor/ContourLines';
import { SplashSkipButton } from './SplashSkipButton';

interface SplashScreenProps {
  /** Sector names in route order: energy, logistics, dairy, real estate. */
  sectors: string[];
  year: number;
  skipLabel: string;
}

const STOP_ICONS: LucideIcon[] = [Fuel, Truck, Milk, Building2];
const at = (index: number, total: number) => `${(index / Math.max(total - 1, 1)) * 100}%`;

/**
 * Brand intro on the first page load of a visit: the logo wipes in, contour
 * lines draw, and a truck drives the route past each sector while the years
 * count up from 1936. Pure CSS timing; never blocks clicks; skipped for
 * reduced motion and on later loads (see SPLASH_INIT_SCRIPT).
 */
export function SplashScreen({ sectors, year, skipLabel }: SplashScreenProps) {
  return (
    <div
      data-splash-screen
      aria-hidden="true"
      // Own transition layer: the header has one too, and without this it would draw above the splash during a view transition.
      style={{ viewTransitionName: 'splash-screen' }}
      className="splash-screen pointer-events-none fixed inset-0 z-[100] grid place-items-center overflow-hidden bg-background"
    >
      <ContourLines origin="center" rings={18} drawIn className="text-foreground/[0.09]" />

      <div className="relative flex w-[min(86vw,560px)] flex-col items-center gap-[var(--space-lg)]">
        <div className="splash-logo">
          <Image src={IMAGES.brandAsasLogoRed.src} alt="" width={320} height={64} priority className="h-auto w-[min(72vw,320px)] dark:hidden" />
          <Image src={IMAGES.brandAsasLogoWhite.src} alt="" width={325} height={64} priority className="hidden h-auto w-[min(72vw,320px)] dark:block" />
        </div>

        <div className="relative h-24 w-full">
          <span className="absolute inset-x-0 top-10 h-0.5 rounded-md bg-border" />
          <span className="splash-route absolute inset-x-0 top-10 h-0.5 origin-left rounded-md bg-primary" />

          {sectors.map((name, index) => {
            const Icon = STOP_ICONS[index] ?? Building2;
            return (
              <span
                key={name}
                data-splash-stop
                className="splash-stop absolute top-0 flex -translate-x-1/2 flex-col items-center gap-1.5"
                style={{ left: at(index, sectors.length), '--stop-delay': `${0.75 + index * 0.33}s` } as CSSProperties}
              >
                <span className="grid size-8 place-items-center rounded-md border border-border bg-card text-primary shadow-sm">
                  <Icon aria-hidden className="size-4" />
                </span>
                <span className="mt-3 hidden whitespace-nowrap text-[length:var(--text-xs)] font-medium text-muted-foreground sm:block">{name}</span>
              </span>
            );
          })}

          <span className="splash-truck absolute inset-x-0 top-[1.85rem]">
            <span data-splash-truck className="absolute left-0 grid size-6 -translate-x-1/2 place-items-center rounded-md bg-primary text-primary-foreground shadow-md">
              <Truck aria-hidden className="size-3.5" />
            </span>
          </span>
        </div>

        <span
          data-splash-year
          className="splash-year font-heading text-[length:var(--text-3xl)] font-bold tabular-nums"
          style={{ '--splash-year': year, '--splash-from': FOUNDING_YEAR } as CSSProperties}
        />
      </div>

      <div className="absolute bottom-[var(--space-lg)]">
        <SplashSkipButton label={skipLabel} />
      </div>
    </div>
  );
}
