import { expect, test } from '@playwright/test';
import { isNarrow } from './helpers';

test.use({ colorScheme: 'dark' });

test('dark OS theme is applied before first paint', async ({ page }) => {
  await page.addInitScript(() => {
    document.addEventListener('DOMContentLoaded', () => {
      (window as unknown as { __firstClass: string }).__firstClass = document.documentElement.className;
    });
  });
  await page.goto('/en');
  const firstClass = await page.evaluate(() => (window as unknown as { __firstClass: string }).__firstClass);
  expect(firstClass.split(' ')).toContain('dark');
});

test('toggle switches to light and survives a reload', async ({ page }) => {
  await page.goto('/en');
  if (isNarrow(page)) await page.getByRole('button', { name: 'Menu' }).click();
  const toggle = page.getByRole('button', { name: 'Switch to light mode' }).first();
  await expect(toggle).toBeVisible();
  await toggle.click();
  await expect(page.locator('html')).not.toHaveClass(/(^|\s)dark(\s|$)/);
  await page.reload();
  await expect(page.locator('html')).not.toHaveClass(/(^|\s)dark(\s|$)/);
});

test('during the theme reveal the header has no own view-transition name', async ({ page }) => {
  await page.goto('/en');
  const name = await page.evaluate(() => {
    document.documentElement.classList.add('theme-reveal');
    return getComputedStyle(document.querySelector('header')!).viewTransitionName;
  });
  expect(name).toBe('none');
});
