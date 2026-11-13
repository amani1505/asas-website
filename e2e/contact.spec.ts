import { expect, test } from '@playwright/test';

test('?business=energy pre-selects Energy', async ({ page }) => {
  await page.goto('/en/contact?business=energy');
  await expect(page.getByLabel('Which business?')).toHaveValue('energy');
});

test('?business=garbage falls back to General', async ({ page }) => {
  await page.goto('/en/contact?business=garbage');
  await expect(page.getByLabel('Which business?')).toHaveValue('general');
});

test('a valid form opens WhatsApp with the message', async ({ page, context }) => {
  let whatsAppUrl = '';
  await context.route('https://wa.me/**', (route) => {
    whatsAppUrl = route.request().url();
    return route.abort();
  });
  await page.goto('/en/contact?business=energy');
  await page.getByLabel('Your name').fill('Asha Mollel');
  await page.getByLabel(/Email or phone/).fill('+255 712 345 678');
  await page.getByLabel('Message').fill('Bei & punguzo? #1\nAsante 🙏');
  await Promise.all([context.waitForEvent('page'), page.getByRole('button', { name: 'Send on WhatsApp' }).click()]);
  await expect.poll(() => whatsAppUrl).not.toBe('');
  const url = whatsAppUrl;
  expect(url.startsWith('https://wa.me/255749700500?text=')).toBe(true);
  const text = decodeURIComponent(url.split('?text=')[1]);
  expect(text).toContain('Business: Energy');
  expect(text).toContain('Bei & punguzo? #1\nAsante 🙏');
});
