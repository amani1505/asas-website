import { expect, test } from '@playwright/test';

test.use({ reducedMotion: 'reduce' });

test('reduced motion: stats show final values and the marquee is still', async ({ page }) => {
  await page.goto('/en');
  const stats = page.locator('span[role="text"][aria-label]');
  const count = await stats.count();
  expect(count).toBeGreaterThan(0);
  for (let index = 0; index < count; index += 1) {
    const stat = stats.nth(index);
    const label = await stat.getAttribute('aria-label');
    expect((await stat.innerText()).trim()).toBe(label);
  }
  const animation = await page.locator('.marquee-track').first().evaluate((element) => {
    const style = getComputedStyle(element);
    return { name: style.animationName, duration: style.animationDuration };
  });
  expect(animation.name === 'none' || animation.duration === '0s').toBe(true);
});
