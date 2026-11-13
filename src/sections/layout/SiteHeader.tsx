'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { motion } from 'motion/react';
import { NAV_ITEMS } from '@/constants/navigation.constants';
import type { DictionaryI } from '@/i18n/dictionary.interface';
import type { Locale } from '@/i18n/locales';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { cn } from '@/utils/cn.util';
import { isActivePath } from '@/utils/navigation.util';
import { LanguageSwitch } from './LanguageSwitch';
import { Logo } from './Logo';
import { MobileMenu } from './MobileMenu';
import { ThemeToggleConnected } from './ThemeToggleConnected';

interface SiteHeaderProps {
  locale: Locale;
  dict: DictionaryI;
}

const UNDERLINE_SPRING = { type: 'spring', stiffness: 500, damping: 40 } as const;

export function SiteHeader({ locale, dict }: SiteHeaderProps) {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [menuPath, setMenuPath] = useState(pathname);
  const menuTriggerRef = useRef<HTMLButtonElement>(null);

  // Close the mobile menu whenever the route changes.
  if (menuPath !== pathname) {
    setMenuPath(pathname);
    setIsMenuOpen(false);
  }

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 8);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      style={{ viewTransitionName: 'site-header' }}
      className={cn(
        'sticky top-0 z-50 border-b transition-[background-color,border-color,backdrop-filter] duration-300',
        // No backdrop-filter while the menu is open: it would trap the fixed menu panel inside the header.
        isMenuOpen
          ? 'border-border bg-background'
          : isScrolled
            ? 'border-border bg-background/80 backdrop-blur-xl'
            : 'border-transparent bg-background',
      )}
    >
      <Container className="flex h-16 items-center justify-between gap-[var(--space-sm)]">
        <Logo locale={locale} label={dict.meta.siteName} />

        <nav aria-label={dict.nav.primary} className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {NAV_ITEMS.map((item) => {
              const isActive = isActivePath(pathname, item.path);
              return (
                <li key={item.key} className="relative">
                  <Link
                    href={`/${locale}${item.path}`}
                    aria-current={isActive ? 'page' : undefined}
                    className={cn(
                      'inline-flex min-h-11 items-center rounded-md px-3 text-[length:var(--text-sm)] font-medium transition-colors hover:text-foreground',
                      isActive ? 'text-foreground' : 'text-muted-foreground',
                    )}
                  >
                    {dict.nav[item.key]}
                  </Link>
                  {isActive && (
                    <motion.span layoutId="nav-underline" transition={UNDERLINE_SPRING} className="absolute inset-x-3 -bottom-px h-0.5 rounded-md bg-primary" />
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <LanguageSwitch locale={locale} labels={dict.language} />
          <ThemeToggleConnected labels={dict.theme} />
          <Button href={`/${locale}/contact`} size="sm">
            {dict.nav.contact}
          </Button>
        </div>

        <button
          ref={menuTriggerRef}
          type="button"
          className="relative inline-flex size-11 items-center justify-center rounded-md hover:bg-muted lg:hidden"
          aria-label={isMenuOpen ? dict.nav.close : dict.nav.menu}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          <span aria-hidden className="relative block h-3.5 w-5">
            <span className={cn('absolute left-0 top-0 h-0.5 w-5 rounded-md bg-current transition-transform duration-300', isMenuOpen && 'translate-y-[6px] rotate-45')} />
            <span className={cn('absolute left-0 top-[6px] h-0.5 w-5 rounded-md bg-current transition-opacity duration-200', isMenuOpen && 'opacity-0')} />
            <span className={cn('absolute left-0 top-3 h-0.5 w-5 rounded-md bg-current transition-transform duration-300', isMenuOpen && '-translate-y-[6px] -rotate-45')} />
          </span>
        </button>
      </Container>

      <MobileMenu
        open={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        locale={locale}
        dict={dict}
        pathname={pathname}
        triggerRef={menuTriggerRef}
      />
    </header>
  );
}
