import { NextResponse, type NextRequest } from 'next/server';
import { LOCALE_COOKIE, hasLocale, localizePath, negotiateLocale } from '@/i18n/locales';

/** Sends any path without a locale prefix to the visitor's best locale. */
export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const firstSegment = pathname.split('/')[1];
  if (hasLocale(firstSegment)) return;

  const locale = negotiateLocale(request.headers.get('accept-language'), request.cookies.get(LOCALE_COOKIE)?.value);
  const url = request.nextUrl.clone();
  url.pathname = localizePath(pathname, locale);
  url.search = search;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ['/((?!_next|api|.*\\..*).*)'],
};
