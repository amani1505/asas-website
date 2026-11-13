import Image from 'next/image';
import Link from 'next/link';
import { IMAGES } from '@/content/images';
import type { Locale } from '@/i18n/locales';
import { cn } from '@/utils/cn.util';

/** Red logo in light mode, white logo in dark mode. width/height match the rendered size (h-9) so srcset stays small. */
export function Logo({ locale, label, className }: { locale: Locale; label: string; className?: string }) {
  return (
    <Link href={`/${locale}`} aria-label={label} className={cn('inline-flex min-h-11 items-center', className)}>
      <Image src={IMAGES.brandAsasLogoRed.src} alt="" width={180} height={36} priority className="h-8 w-auto sm:h-9 dark:hidden" />
      <Image src={IMAGES.brandAsasLogoWhite.src} alt="" width={183} height={36} priority className="hidden h-8 w-auto sm:h-9 dark:block" />
    </Link>
  );
}
