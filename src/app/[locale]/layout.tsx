import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Bricolage_Grotesque, Geist } from 'next/font/google';
import { SITE_URL } from '@/constants/site.constants';
import { LOCALES, hasLocale } from '@/i18n/locales';
import { getDictionaryFor } from '@/i18n/getDictionaryFor';
import { AppProviders } from '@/providers/AppProviders';
import { InlineScript } from '@/components/ui/InlineScript';
import { SiteFooter } from '@/sections/layout/SiteFooter';
import { SiteHeader } from '@/sections/layout/SiteHeader';
import { SkipLink } from '@/sections/layout/SkipLink';
import { getCurrentYear } from '@/services/clock.service';
import { THEME_INIT_SCRIPT } from '@/utils/themeInitScript.util';
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
  return { metadataBase: new URL(SITE_URL), title: dict.meta.siteName, description: dict.meta.description };
}

export default async function LocaleLayout({ children, params }: LayoutProps<'/[locale]'>) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  const dict = getDictionaryFor(locale);
  const year = await getCurrentYear();

  return (
    <html lang={locale} suppressHydrationWarning className={`${geist.variable} ${bricolage.variable}`}>
      <head>
        <InlineScript html={THEME_INIT_SCRIPT} />
      </head>
      <body className="flex min-h-dvh flex-col">
        <AppProviders>
          <SkipLink label={dict.common.skipToContent} />
          <SiteHeader locale={locale} dict={dict} />
          <main id="main" tabIndex={-1} className="flex-1 outline-none">
            {children}
          </main>
          <SiteFooter locale={locale} dict={dict} year={year} />
        </AppProviders>
      </body>
    </html>
  );
}
