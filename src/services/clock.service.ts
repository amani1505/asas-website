import { cacheLife } from 'next/cache';

/**
 * The current date as an ISO string. Cached (refreshed daily) so pages can
 * still be prerendered with Cache Components, which forbids `new Date()`
 * in the prerendered shell.
 */
export async function getTodayIso(): Promise<string> {
  'use cache';
  cacheLife('days');
  return new Date().toISOString();
}

export async function getCurrentYear(): Promise<number> {
  return new Date(await getTodayIso()).getFullYear();
}
