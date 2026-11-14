import Image from 'next/image';
import { IMAGES } from '@/content/images';

/**
 * Brand splash on the first page load of a visit. Pure CSS: it fades out on
 * its own, never blocks clicks, and is skipped for reduced motion and on
 * later loads (see SPLASH_INIT_SCRIPT).
 */
export function SplashScreen() {
  return (
    <div
      data-splash-screen
      aria-hidden="true"
      // Own transition layer: the header has one too, and without this it would draw above the splash during the page-load view transition.
      style={{ viewTransitionName: 'splash-screen' }}
      className="splash-screen pointer-events-none fixed inset-0 z-[100] grid place-items-center bg-background"
    >
      <div className="flex flex-col items-center gap-[var(--space-md)]">
        <Image src={IMAGES.brandAsasLogoRed.src} alt="" width={300} height={60} className="splash-logo h-auto w-[min(70vw,300px)] dark:hidden" />
        <Image src={IMAGES.brandAsasLogoWhite.src} alt="" width={305} height={60} className="splash-logo hidden h-auto w-[min(70vw,300px)] dark:block" />
        <span className="h-1 w-[min(50vw,180px)] overflow-hidden rounded-md bg-muted">
          <span className="splash-progress block h-full origin-left bg-primary" />
        </span>
      </div>
    </div>
  );
}
