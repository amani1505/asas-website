import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Bricolage_Grotesque, Geist } from 'next/font/google';
import { LOCALES, hasLocale } from '@/i18n/locales';
import { getDictionaryFor } from '@/i18n/getDictionaryFor';
import '@/styles/globals.css';

const geist = Geist({ variable: '--font-geist-sans', subsets: ['latin'], display: 'swap' });
const bricolage = Bricolage_Grotesque({ variable: '--font-bricolage', subsets: ['latin'], display: 'swap' });

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LayoutProps<'/[locale]'>): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(locale)) return {};
  const dict = getDictionaryFor(locale);
  return { title: dict.meta.siteName, description: dict.meta.description };
}

export default async function LocaleLayout({ children, params }: LayoutProps<'/[locale]'>) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();

  return (
    <html lang={locale} suppressHydrationWarning className={`${geist.variable} ${bricolage.variable}`}>
      <body className="flex min-h-dvh flex-col">{children}</body>
    </html>
  );
}
