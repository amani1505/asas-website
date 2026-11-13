import type { DictionaryI } from '@/i18n/dictionary.interface';
import { ContactForm } from './ContactForm';

interface ContactFormSectionProps {
  dict: DictionaryI;
}

/** The WhatsApp enquiry form; `?business=` pre-selects the business. */
export function ContactFormSection({ dict }: ContactFormSectionProps) {
  return (
    <div className="flex flex-col gap-[var(--space-md)] rounded-md border border-border bg-card p-[var(--space-md)]">
      <div className="flex flex-col gap-[var(--space-2xs)]">
        <h2 className="text-[length:var(--text-2xl)] font-bold">{dict.contact.formTitle}</h2>
        <p className="max-w-[65ch] text-muted-foreground">{dict.contact.formDescription}</p>
      </div>
      <ContactForm dict={dict} />
    </div>
  );
}
