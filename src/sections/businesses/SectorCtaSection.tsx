import { ArrowRight, MessageCircle } from 'lucide-react';
import { SOCIAL_LINKS } from '@/constants/contact.constants';
import type { DictionaryI } from '@/i18n/dictionary.interface';
import type { Locale } from '@/i18n/locales';
import type { SectorI } from '@/interfaces/content.interface';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';

interface SectorCtaSectionProps {
  sector: SectorI;
  locale: Locale;
  dict: DictionaryI;
}

export function SectorCtaSection({ sector, locale, dict }: SectorCtaSectionProps) {
  return (
    <section className="pb-[var(--space-2xl)] pt-[var(--space-lg)]">
      <Container>
        <div className="flex flex-col gap-[var(--space-md)] rounded-md bg-charcoal p-[var(--space-lg)] text-background md:flex-row md:items-center md:justify-between">
          <div className="flex max-w-[46ch] flex-col gap-2">
            <h2 className="text-[length:var(--text-3xl)] font-bold">{dict.businesses.ctaTitle}</h2>
            <p className="opacity-80">{dict.businesses.ctaBody}</p>
          </div>
          <div className="flex flex-wrap gap-[var(--space-xs)]">
            <Button href={`/${locale}/contact?business=${sector.slug}`} size="lg">
              {dict.actions.contactUs}
              <ArrowRight aria-hidden />
            </Button>
            <Button
              href={SOCIAL_LINKS.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              size="lg"
              variant="outline"
              className="border-background/30 text-background hover:border-background hover:bg-background/10"
            >
              <MessageCircle aria-hidden />
              {dict.actions.chatOnWhatsApp}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
