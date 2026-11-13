import { getDictionary } from '@/i18n/getDictionary';

// Placeholder until Task 9 builds the home page.
export default async function HomePage() {
  const dict = await getDictionary();
  return <main id="main">{dict.meta.siteName}</main>;
}
