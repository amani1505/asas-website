import type { ReactNode } from 'react';
import { Mail, MessageCircle, Phone } from 'lucide-react';
import { EMAIL, PHONES, SOCIAL_LINKS } from '@/constants/contact.constants';
import type { DictionaryI } from '@/i18n/dictionary.interface';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/motion/Reveal';

interface ContactChannelsSectionProps {
  dict: DictionaryI;
}

function ChannelTile({ icon, title, children }: { icon: ReactNode; title: string; children: ReactNode }) {
  return (
    <div className="group relative flex h-full flex-col gap-[var(--space-sm)] rounded-md border border-border bg-card p-[var(--space-md)] transition-[border-color,transform] duration-300 hover:-translate-y-1 hover:border-primary/50">
      <span aria-hidden className="flex size-12 items-center justify-center rounded-md bg-primary/10 text-primary [&_svg]:size-6">
        {icon}
      </span>
      <h3 className="text-[length:var(--text-sm)] font-semibold uppercase tracking-[0.14em] text-muted-foreground">{title}</h3>
      <div className="flex flex-col gap-[var(--space-2xs)]">{children}</div>
    </div>
  );
}

const valueClass = 'text-[length:var(--text-xl)] font-bold break-words';

export function ContactChannelsSection({ dict }: ContactChannelsSectionProps) {
  const whatsappPhone = PHONES.find((phone) => phone.labelKey === 'callsWhatsapp') ?? PHONES[0];

  return (
    <section aria-label={dict.contact.channelsTitle} className="pb-[var(--space-xl)]">
      <Container>
        <Reveal stagger className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,260px),1fr))] gap-[var(--space-sm)]">
          <ChannelTile icon={<MessageCircle />} title="WhatsApp">
            <a
              href={SOCIAL_LINKS.whatsapp}
              target="_blank"
              rel="noopener"
              aria-label={`${dict.actions.chatOnWhatsApp}: ${whatsappPhone.display} (${dict.common.opensInNewTab})`}
              className={`${valueClass} after:absolute after:inset-0 after:content-['']`}
            >
              {whatsappPhone.display}
            </a>
            <span className="text-muted-foreground">{dict.actions.chatOnWhatsApp}</span>
          </ChannelTile>
          <ChannelTile icon={<Phone />} title={dict.footer.calls}>
            {PHONES.map((phone) => (
              <a key={phone.tel} href={`tel:${phone.tel}`} className="flex min-h-11 flex-col justify-center hover:text-primary">
                <span className={valueClass}>{phone.display}</span>
                <span className="text-[length:var(--text-sm)] text-muted-foreground">{dict.footer[phone.labelKey]}</span>
              </a>
            ))}
          </ChannelTile>
          <ChannelTile icon={<Mail />} title={dict.footer.email}>
            <a href={`mailto:${EMAIL}`} className={`${valueClass} after:absolute after:inset-0 after:content-['']`}>
              {EMAIL}
            </a>
          </ChannelTile>
        </Reveal>
      </Container>
    </section>
  );
}
