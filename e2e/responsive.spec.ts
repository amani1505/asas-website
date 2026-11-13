import { expect, test } from '@playwright/test';
import { ROUTES } from './helpers';

const WIDTHS = [320, 375, 640, 768, 1024, 1280, 1920];

test.describe('responsive', () => {
  test.skip(({ browserName, isMobile }) => browserName !== 'chromium' || Boolean(isMobile), 'sets its own viewports; one engine is enough');

  for (const route of ROUTES) {
    test(`${route} never scrolls sideways`, async ({ page }) => {
      for (const width of WIDTHS) {
        await page.setViewportSize({ width, height: 800 });
        await page.goto(route);
        const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
        expect(overflow, `${route} @ ${width}px`).toBeLessThanOrEqual(0);
      }
    });
  }

  test('header and mobile menu touch targets are at least 44×44 at 375px', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/en');
    await page.getByRole('button', { name: 'Menu' }).click();
    await expect(page.locator('#mobile-menu')).toBeVisible();
    const small = await page.evaluate(() =>
      [...document.querySelectorAll('header a, header button, #mobile-menu a, #mobile-menu button')]
        .filter((element) => {
          const rect = element.getBoundingClientRect();
          return rect.width > 0 && rect.height > 0 && getComputedStyle(element).visibility !== 'hidden';
        })
        .map((element) => ({ text: element.getAttribute('aria-label') ?? element.textContent?.trim(), ...element.getBoundingClientRect().toJSON() }))
        .filter((rect) => rect.width < 44 || rect.height < 44)
        .map((rect) => `${rect.text} ${Math.round(rect.width)}×${Math.round(rect.height)}`),
    );
    expect(small).toEqual([]);
  });
});
