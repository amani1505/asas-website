/**
 * Old asas.co.tz URLs → their new homes. Imported by next.config.ts, so keep this
 * file free of `@/` imports. Query strings (`?u=…&pids=none&b=`) pass through harmlessly.
 */
export interface RedirectI {
  source: string;
  destination: string;
  permanent: true;
}

const OLD_TO_NEW: [string, string][] = [
  ['/about', '/en/about'],
  ['/history', '/en/about#history'],
  ['/team', '/en/about#team'],
  ['/sustainability', '/en/sustainability'],
  ['/health-safety', '/en/sustainability#hse'],
  ['/compliance', '/en/sustainability#compliance'],
  ['/csr', '/en/sustainability#community'],
  ['/ASAS-energies', '/en/businesses/energy'],
  ['/transfuel-logistics', '/en/businesses/logistics#transfuel-logistics'],
  ['/ASAS-transporters', '/en/businesses/logistics#asas-transporters'],
  ['/clearing-forwarding', '/en/businesses/logistics#universal-clearing-forwarding'],
  ['/ASAS-dairy', '/en/businesses/dairy-farms#asas-dairy'],
  ['/ASAS-dairies-farm', '/en/businesses/dairy-farms#asas-dairies-farm'],
  ['/afrifarm', '/en/businesses/dairy-farms#afri-farm'],
  ['/ASAS-real-estate', '/en/businesses/real-estate'],
  ['/careers', '/en/careers'],
  ['/news', '/en/news'],
  ['/serviceDetails', '/en/news'],
  ['/contact', '/en/contact'],
];

export const OLD_URL_REDIRECTS: RedirectI[] = OLD_TO_NEW.map(([source, destination]) => ({ source, destination, permanent: true }));
