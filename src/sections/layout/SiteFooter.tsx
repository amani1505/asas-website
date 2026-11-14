import Link from 'next/link';
import { Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { NAV_ITEMS } from '@/constants/navigation.constants';
import { AI_TRACKER_URL, DEVELOPER_EMAIL, EMAIL, PHONES, SOCIAL_LINKS } from '@/constants/contact.constants';
import type { DictionaryI } from '@/i18n/dictionary.interface';
import type { Locale } from '@/i18n/locales';
import { Container } from '@/components/ui/Container';
import { Logo } from './Logo';

interface SiteFooterProps {
  locale: Locale;
  dict: DictionaryI;
  /** Passed in by the layout (computed in a cached function so the page can still prerender). */
  year: number;
}

function FacebookIcon() {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className="size-5" fill="currentColor">
      <path d="M13.5 21v-7.5H16l.5-3h-3V8.6c0-.9.3-1.6 1.6-1.6h1.6V4.3c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.3H8v3h2.5V21h3Z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

const linkClass = 'inline-flex min-h-11 items-center gap-2 text-muted-foreground transition-colors hover:text-foreground';

export function SiteFooter({ locale, dict, year }: SiteFooterProps) {
  const socials = [
    { href: SOCIAL_LINKS.facebook, label: 'Facebook', icon: <FacebookIcon /> },
    { href: SOCIAL_LINKS.instagram, label: 'Instagram', icon: <InstagramIcon /> },
    { href: SOCIAL_LINKS.whatsapp, label: 'WhatsApp', icon: <MessageCircle aria-hidden className="size-5" /> },
  ];

  return (
    <footer className="mt-auto border-t border-border bg-card">
      <Container className="grid gap-[var(--space-lg)] py-[var(--space-xl)] md:grid-cols-[1.4fr_1fr_1.4fr]">
        <div className="flex flex-col gap-[var(--space-sm)]">
          <Logo locale={locale} label={dict.meta.siteName} />
          <p className="max-w-[40ch] text-[length:var(--text-sm)] text-muted-foreground">{dict.meta.description}</p>
          <ul className="flex gap-1" aria-label={dict.footer.followUs}>
            {socials.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${social.label} (${dict.common.opensInNewTab})`}
                  className="inline-flex size-11 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:border-foreground/40 hover:text-foreground"
                >
                  {social.icon}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <nav aria-label={dict.footer.explore}>
          <h2 className="mb-2 font-sans text-[length:var(--text-xs)] font-semibold uppercase tracking-[0.14em] text-muted-foreground">{dict.footer.explore}</h2>
          <ul className="grid grid-cols-2 gap-x-[var(--space-sm)] md:grid-cols-1">
            {NAV_ITEMS.map((item) => (
              <li key={item.key}>
                <Link href={`/${locale}${item.path}`} className={linkClass}>
                  {dict.nav[item.key]}
                </Link>
              </li>
            ))}
            <li>
              <Link href={`/${locale}/contact`} className={linkClass}>
                {dict.nav.contact}
              </Link>
            </li>
            <li>
              <a href={AI_TRACKER_URL} target="_blank" rel="noopener noreferrer" className={linkClass}>
                {dict.footer.aiTracker}
              </a>
            </li>
          </ul>
        </nav>

        <div>
          <h2 className="mb-2 font-sans text-[length:var(--text-xs)] font-semibold uppercase tracking-[0.14em] text-muted-foreground">{dict.footer.reachUs}</h2>
          <ul className="flex flex-col">
            {PHONES.map((phone) => (
              <li key={phone.tel}>
                <a href={`tel:${phone.tel}`} className={linkClass}>
                  <Phone aria-hidden className="size-4 shrink-0" />
                  <span className="text-foreground">{phone.display}</span>
                  <span className="text-[length:var(--text-xs)]">{dict.footer[phone.labelKey]}</span>
                </a>
              </li>
            ))}
            <li>
              <a href={`mailto:${EMAIL}`} className={linkClass}>
                <Mail aria-hidden className="size-4 shrink-0" />
                <span className="text-foreground">{EMAIL}</span>
              </a>
            </li>
            <li className="flex min-h-11 items-center gap-2 text-muted-foreground">
              <MapPin aria-hidden className="size-4 shrink-0" />
              Iringa · Dar es Salaam
            </li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-border">
        <Container className="flex flex-col gap-2 py-[var(--space-sm)] text-[length:var(--text-xs)] text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} ASAS Group. {dict.footer.rights} <span className="italic">{dict.footer.tagline}</span>
          </p>
          <a href={`mailto:${DEVELOPER_EMAIL}`} className="inline-flex min-h-11 items-center hover:text-foreground">
            {dict.footer.credit}
          </a>
        </Container>
      </div>
    </footer>
  );
}
