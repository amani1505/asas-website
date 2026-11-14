'use client';

/**
 * Ends the splash at once. The splash is decorative (aria-hidden) and plays
 * by itself, so the button is mouse/touch only and out of the tab order.
 */
export function SplashSkipButton({ label }: { label: string }) {
  return (
    <button
      type="button"
      tabIndex={-1}
      onClick={() => {
        document.documentElement.dataset.splash = 'seen';
      }}
      className="splash-skip pointer-events-auto min-h-11 rounded-md px-[var(--space-sm)] text-[length:var(--text-sm)] font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
    >
      {label}
    </button>
  );
}
