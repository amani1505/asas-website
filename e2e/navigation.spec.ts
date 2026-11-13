import { expect, test } from '@playwright/test';
import { ROUTES, clickNavLink } from './helpers';

const NAV = [
  { name: 'About', path: '/en/about', h1: 'The spirit of ASAS' },
  { name: 'Businesses', path: '/en/businesses', h1: 'Built to keep Tanzania moving.' },
  { name: 'Sustainability', path: '/en/sustainability', h1: 'Good business, for people and planet.' },
  { name: 'News', path: '/en/news', h1: 'News & stories' },
  { name: 'Careers', path: '/en/careers', h1: 'Grow with ASAS.' },
];

test.describe('navigation', () => {
  for (const item of NAV) {
    test(`header link ${item.name} lands on its page`, async ({ page }) => {
      await page.goto('/en');
      await clickNavLink(page, item.name);
      await expect(page).toHaveURL(item.path);
      await expect(page.getByRole('heading', { level: 1 })).toHaveText(item.h1);
    });
  }

  for (const path of ['/fr/about', '/en/nope', '/en/businesses/unknown', '/en/news/unknown']) {
    test(`${path} shows the 404 page`, async ({ page }) => {
      await page.goto(path);
      await expect(page.getByRole('heading', { level: 1, name: 'Page not found' })).toBeVisible();
    });
  }

  test('no placeholder or javascript links on any page', async ({ page }) => {
    for (const route of ROUTES) {
      await page.goto(route);
      expect(await page.locator('a[href="#"], a[href^="javascript:"], a:not([href])').count(), route).toBe(0);
    }
  });

  test('a home sector card lands on the sector page', async ({ page }) => {
    await page.goto('/en');
    await page.locator('a[href="/en/businesses/dairy-farms"]').first().click();
    await expect(page).toHaveURL('/en/businesses/dairy-farms');
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  });
});
