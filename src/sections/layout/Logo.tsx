import Image from 'next/image';
import Link from 'next/link';
import { IMAGES } from '@/content/images';
import type { Locale } from '@/i18n/locales';
import { cn } from '@/utils/cn.util';

/** Red logo in light mode, white logo in dark mode. */
export function Logo({ locale, label, className }: { locale: Locale; label: string; className?: string }) {
  return (
    <Link href={`/${locale}`} aria-label={label} className={cn('inline-flex min-h-11 items-center', className)}>
      <Image src={IMAGES.brandAsasLogoRed.src} alt="" width={1000} height={200} priority className="h-8 w-auto sm:h-9 dark:hidden" />
      <Image src={IMAGES.brandAsasLogoWhite.src} alt="" width={954} height={188} priority className="hidden h-8 w-auto sm:h-9 dark:block" />
    </Link>
  );
}
