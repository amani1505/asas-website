import { stripLocale } from '@/i18n/locales';

/** True when `pathname` (with locale) is inside the section at `sectionPath` (without locale). */
export function isActivePath(pathname: string, sectionPath: string): boolean {
  const path = stripLocale(pathname).split('?')[0];
  return path === sectionPath || path.startsWith(`${sectionPath}/`);
}
