import { revealThemeChange } from './themeTransition.util';
import { mockMatchMedia } from '@/test-utils/mockMatchMedia';

type StartViewTransition = (cb: () => void) => ViewTransition;

const html = document.documentElement;

afterEach(() => {
  // @ts-expect-error cleaning up a test double
  delete document.startViewTransition;
  html.classList.remove('theme-reveal');
});

describe('revealThemeChange', () => {
  it('applies instantly when startViewTransition is missing', () => {
    const apply = jest.fn();
    revealThemeChange({ x: 10, y: 10 }, apply);
    expect(apply).toHaveBeenCalledTimes(1);
    expect(html.classList.contains('theme-reveal')).toBe(false);
  });

  it('adds theme-reveal during the transition and removes it after', async () => {
    let finish!: () => void;
    const finished = new Promise<void>((resolve) => (finish = resolve));
    let hadClassDuringCapture = false;
    const start: StartViewTransition = (cb) => {
      hadClassDuringCapture = html.classList.contains('theme-reveal');
      cb();
      return { ready: Promise.resolve(), finished, updateCallbackDone: Promise.resolve(), skipTransition() {} } as unknown as ViewTransition;
    };
    document.startViewTransition = jest.fn(start) as unknown as typeof document.startViewTransition;
    html.animate = jest.fn() as unknown as typeof html.animate;

    const apply = jest.fn();
    revealThemeChange({ x: 0, y: 0 }, apply);

    expect(hadClassDuringCapture).toBe(true);
    expect(apply).toHaveBeenCalledTimes(1);
    finish();
    await finished;
    await new Promise((resolve) => setTimeout(resolve, 0));
    expect(html.classList.contains('theme-reveal')).toBe(false);
  });

  it('skips the animation when reduced motion is preferred', () => {
    mockMatchMedia({ '(prefers-reduced-motion: reduce)': true });
    const start = jest.fn();
    document.startViewTransition = start as unknown as typeof document.startViewTransition;
    const apply = jest.fn();
    revealThemeChange({ x: 0, y: 0 }, apply);
    expect(start).not.toHaveBeenCalled();
    expect(apply).toHaveBeenCalledTimes(1);
  });
});
