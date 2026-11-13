import type { Page } from '@playwright/test';

export const ROUTES = [
  '/en',
  '/en/about',
  '/en/businesses',
  '/en/businesses/dairy-farms',
  '/en/businesses/logistics',
  '/en/sustainability',
  '/en/careers',
  '/en/news',
  '/en/news/brand-buzz',
  '/en/contact',
  '/sw',
  '/sw/contact',
];

export const isNarrow = (page: Page) => (page.viewportSize()?.width ?? 1280) < 1024;

/** Clicks a primary nav link, opening the mobile menu first on narrow screens. */
export async function clickNavLink(page: Page, name: string) {
  if (isNarrow(page)) {
    await page.getByRole('button', { name: 'Menu' }).click();
    await page.locator('#mobile-menu').getByRole('link', { name, exact: true }).click();
  } else {
    await page.getByRole('navigation', { name: 'Main' }).first().getByRole('link', { name, exact: true }).click();
  }
}
