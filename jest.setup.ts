import '@testing-library/jest-dom';
import { installMatchMedia, resetMatchMedia } from '@/test-utils/mockMatchMedia';

installMatchMedia();

beforeEach(() => {
  resetMatchMedia();
  installMatchMedia();
});

class ImmediateIntersectionObserver {
  private readonly callback: IntersectionObserverCallback;
  constructor(callback: IntersectionObserverCallback) {
    this.callback = callback;
  }
  observe(target: Element): void {
    this.callback(
      [{ isIntersecting: true, target, intersectionRatio: 1 } as IntersectionObserverEntry],
      this as unknown as IntersectionObserver,
    );
  }
  unobserve(): void {}
  disconnect(): void {}
  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }
}

Object.defineProperty(globalThis, 'IntersectionObserver', {
  writable: true,
  configurable: true,
  value: ImmediateIntersectionObserver,
});

jest.mock('next/navigation', () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { getMockNavigationState } = require('@/test-utils/renderWithPath');
  return {
    usePathname: () => getMockNavigationState().pathname,
    useSearchParams: () => new URLSearchParams(getMockNavigationState().search),
    useRouter: () => ({ push: jest.fn(), replace: jest.fn(), prefetch: jest.fn(), back: jest.fn() }),
    notFound: () => {
      throw new Error('NEXT_NOT_FOUND');
    },
  };
});
