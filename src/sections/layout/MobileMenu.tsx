'use client';

import Link from 'next/link';
import { useEffect, useRef, type KeyboardEvent, type RefObject } from 'react';
import { AnimatePresence, m } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { NAV_ITEMS } from '@/constants/navigation.constants';
import type { DictionaryI } from '@/i18n/dictionary.interface';
import type { Locale } from '@/i18n/locales';
import { Button } from '@/components/ui/Button';
import { cn } from '@/utils/cn.util';
import { isActivePath } from '@/utils/navigation.util';
import { LanguageSwitch } from './LanguageSwitch';
import { ThemeToggleConnected } from './ThemeToggleConnected';

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  locale: Locale;
  dict: DictionaryI;
  pathname: string;
  triggerRef: RefObject<HTMLButtonElement | null>;
}

const FOCUSABLE = 'a[href], button:not([disabled])';

export function MobileMenu({ open, onClose, locale, dict, pathname, triggerRef }: MobileMenuProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  // Lock page scroll and move focus into the menu while it is open.
  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    panelRef.current?.querySelector<HTMLElement>(FOCUSABLE)?.focus();
    const trigger = triggerRef.current;
    return () => {
      document.body.style.overflow = previousOverflow;
      trigger?.focus();
    };
  }, [open, triggerRef]);

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Escape') {
      event.stopPropagation();
      onClose();
      return;
    }
    if (event.key !== 'Tab' || !panelRef.current) return;
    const focusable = [...panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)];
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last?.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first?.focus();
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <m.div
          ref={panelRef}
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label={dict.nav.primary}
          onKeyDown={handleKeyDown}
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-0 bottom-0 top-16 z-40 flex flex-col overflow-y-auto bg-background px-[var(--space-md)] pb-[var(--space-lg)] pt-[var(--space-md)] lg:hidden"
        >
          <m.ul
            className="flex flex-col"
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.05, delayChildren: 0.05 } } }}
          >
            {NAV_ITEMS.map((item) => {
              const isActive = isActivePath(pathname, item.path);
              return (
                <m.li
                  key={item.key}
                  variants={{ hidden: { opacity: 0, x: -16 }, visible: { opacity: 1, x: 0 } }}
                  className="border-b border-border"
                >
                  <Link
                    href={`/${locale}${item.path}`}
                    onClick={onClose}
                    aria-current={isActive ? 'page' : undefined}
                    className={cn(
                      'flex min-h-16 items-center justify-between font-heading text-[length:var(--text-2xl)] font-bold',
                      isActive && 'text-primary',
                    )}
                  >
                    {dict.nav[item.key]}
                    <ArrowUpRight aria-hidden className="size-6 text-muted-foreground" />
                  </Link>
                </m.li>
              );
            })}
          </m.ul>
          <div className="mt-auto flex flex-col gap-[var(--space-sm)] pt-[var(--space-lg)]">
            <Button href={`/${locale}/contact`} size="lg" onClick={onClose} className="w-full">
              {dict.nav.contact}
            </Button>
            <div className="flex items-center justify-between">
              <LanguageSwitch locale={locale} labels={dict.language} />
              <ThemeToggleConnected labels={dict.theme} />
            </div>
          </div>
        </m.div>
      )}
    </AnimatePresence>
  );
}
