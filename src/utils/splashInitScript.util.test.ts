import { SPLASH_INIT_SCRIPT, SPLASH_STORAGE_KEY } from './splashInitScript.util';

const run = () => new Function(SPLASH_INIT_SCRIPT)();

describe('SPLASH_INIT_SCRIPT', () => {
  beforeEach(() => {
    sessionStorage.clear();
    delete document.documentElement.dataset.splash;
  });

  it('lets the splash play on the first page load of a visit and remembers it', () => {
    run();
    expect(document.documentElement.dataset.splash).toBeUndefined();
    expect(sessionStorage.getItem(SPLASH_STORAGE_KEY)).toBe('1');
  });

  it('skips the splash on later loads in the same visit', () => {
    sessionStorage.setItem(SPLASH_STORAGE_KEY, '1');
    run();
    expect(document.documentElement.dataset.splash).toBe('seen');
  });

  it('skips the splash when storage is blocked, rather than replaying it every time', () => {
    const spy = jest.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('blocked');
    });
    run();
    expect(document.documentElement.dataset.splash).toBe('seen');
    spy.mockRestore();
  });
});
