/**
 * Runs `html` synchronously while the browser parses the server HTML.
 * On the client the tag becomes inert (`text/plain`), so React doesn't warn
 * about rendering scripts. See node_modules/next/dist/docs/01-app/02-guides/preventing-flash-before-hydration.md
 */
export function InlineScript({ html }: { html: string }) {
  return (
    <script
      type={typeof window === 'undefined' ? 'text/javascript' : 'text/plain'}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
