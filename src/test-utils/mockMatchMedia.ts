type MediaQueryMap = Record<string, boolean>;

const state: { matches: MediaQueryMap } = { matches: {} };

/** Make `window.matchMedia(query).matches` return the given values for the rest of the test. */
export function mockMatchMedia(matches: MediaQueryMap): void {
  state.matches = matches;
}

export function resetMatchMedia(): void {
  state.matches = {};
}

export function installMatchMedia(): void {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    configurable: true,
    value: (query: string) => ({
      matches: state.matches[query] ?? false,
      media: query,
      onchange: null,
      addEventListener: () => {},
      removeEventListener: () => {},
      addListener: () => {},
      removeListener: () => {},
      dispatchEvent: () => false,
    }),
  });
}
