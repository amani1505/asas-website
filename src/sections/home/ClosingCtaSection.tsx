import { ArrowRight, MessageCircle } from 'lucide-react';
import { SOCIAL_LINKS } from '@/constants/contact.constants';
import type { DictionaryI } from '@/i18n/dictionary.interface';
import type { Locale } from '@/i18n/locales';
import type { HomeContentI } from '@/interfaces/content.interface';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/motion/Reveal';
import { ContourLines } from '@/components/decor/ContourLines';
import { localeHref } from '@/utils/format.util';

interface ClosingCtaSectionProps {
  cta: HomeContentI['closingCta'];
  locale: Locale;
  dict: DictionaryI;
}

export function ClosingCtaSection({ cta, locale, dict }: ClosingCtaSectionProps) {
  return (
    <section className="py-[var(--space-2xl)]">
      <Container>
        <Reveal className="relative overflow-hidden rounded-md bg-brand-charcoal px-[var(--space-md)] py-[var(--space-xl)] text-white sm:px-[var(--space-xl)]">
          <ContourLines origin="right" rings={12} className="text-white/[0.12]" />
          <div aria-hidden className="absolute inset-y-0 left-0 w-1.5 bg-brand-red" />
          <div className="relative flex max-w-[52ch] flex-col gap-[var(--space-sm)]">
            <h2 className="text-[length:var(--text-4xl)] font-extrabold">{cta.title}</h2>
            <p className="text-[length:var(--text-lg)] text-white/85">{cta.body}</p>
            <div className="mt-[var(--space-xs)] flex flex-wrap gap-[var(--space-xs)]">
              <Button href={localeHref(locale, cta.cta.href)} size="lg" className="bg-brand-red text-white hover:bg-brand-red/90">
                {cta.cta.label}
                <ArrowRight aria-hidden className="transition-transform group-hover/button:translate-x-0.5" />
              </Button>
              <Button
                href={SOCIAL_LINKS.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                size="lg"
                variant="outline"
                className="border-white/40 text-white hover:border-white hover:bg-white/10"
              >
                <MessageCircle aria-hidden />
                {dict.actions.chatOnWhatsApp}
              </Button>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
