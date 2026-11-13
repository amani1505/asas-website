import { useCallback, useSyncExternalStore } from 'react';

const listeners = new Set<() => void>();

function subscribe(onChange: () => void): () => void {
  listeners.add(onChange);
  window.addEventListener('hashchange', onChange);
  return () => {
    listeners.delete(onChange);
    window.removeEventListener('hashchange', onChange);
  };
}

/**
 * Live `location.hash` without the leading `#` ('' during server rendering),
 * plus a setter that rewrites the hash with `history.replaceState` (no scroll, no history entry).
 * An empty value removes the hash.
 */
export function useLocationHash(): [string, (hash: string) => void] {
  const hash = useSyncExternalStore(
    subscribe,
    () => window.location.hash.slice(1),
    () => '',
  );

  const setHash = useCallback((next: string) => {
    const { pathname, search } = window.location;
    window.history.replaceState(window.history.state, '', next ? `#${next}` : `${pathname}${search}`);
    for (const listener of listeners) listener();
  }, []);

  return [hash, setHash];
}
