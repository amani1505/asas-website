import { useSyncExternalStore } from 'react';

function subscribe(onChange: () => void): () => void {
  window.addEventListener('popstate', onChange);
  return () => window.removeEventListener('popstate', onChange);
}

/**
 * Reads one query parameter from `location.search` without suspending (unlike
 * `useSearchParams` under Cache Components), so the component keeps its state through
 * hydration. `null` during server rendering and when the parameter is absent.
 */
export function useQueryParam(name: string): string | null {
  return useSyncExternalStore(
    subscribe,
    () => new URLSearchParams(window.location.search).get(name),
    () => null,
  );
}
