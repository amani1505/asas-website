import { expect, test } from '@playwright/test';
import { isNarrow } from './helpers';

test('language switch keeps the page and remembers the choice', async ({ page, context }) => {
  await page.goto('/en/businesses/logistics');
  if (isNarrow(page)) await page.getByRole('button', { name: 'Menu' }).click();
  await page.getByRole('link', { name: 'Kiswahili' }).first().click();
  await expect(page).toHaveURL('/sw/businesses/logistics');
  await expect(page.locator('html')).toHaveAttribute('lang', 'sw');
  const cookie = (await context.cookies()).find((item) => item.name === 'asas-locale');
  expect(cookie?.value).toBe('sw');
  await page.goto('/');
  await expect(page).toHaveURL('/sw');
});
