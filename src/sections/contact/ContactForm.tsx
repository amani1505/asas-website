'use client';

import { useEffect, useRef, useState, type FormEvent } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Check, Mail, MessageCircle } from 'lucide-react';
import type { DictionaryI } from '@/i18n/dictionary.interface';
import type { BusinessOption, ContactField, ContactFormDataI, ContactFormErrorsI, ContactMessageLabelsI } from '@/interfaces/contact.interface';
import { Button } from '@/components/ui/Button';
import { FormField } from '@/components/ui/FormField';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Textarea } from '@/components/ui/Textarea';
import { BUSINESS_OPTIONS, buildMailtoUrl, buildWhatsAppUrl, composeContactMessage, validateContactForm } from '@/services/contact.service';

interface ContactFormProps {
  dict: DictionaryI;
  initialBusiness: BusinessOption;
}

type SendState = 'idle' | 'opening';

const FIELD_ORDER: ContactField[] = ['name', 'contact', 'message'];
const OPENING_MS = 2500;
const SWAP = { duration: 0.2, ease: [0.22, 1, 0.36, 1] } as const;

export function ContactForm({ dict, initialBusiness }: ContactFormProps) {
  const { contact: copy } = dict;
  const [data, setData] = useState<ContactFormDataI>({ business: initialBusiness, name: '', contact: '', message: '' });
  const [errors, setErrors] = useState<ContactFormErrorsI>({});
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [sendState, setSendState] = useState<SendState>('idle');
  const fieldRefs = useRef<Partial<Record<ContactField, HTMLInputElement | HTMLTextAreaElement | null>>>({});
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  const labels: ContactMessageLabelsI = { ...copy.message, businessNames: copy.businessNames };
  const messageText = composeContactMessage(data, labels);
  const hasErrors = Object.keys(errors).length > 0;

  const update = (field: keyof ContactFormDataI, value: string) => setData((current) => ({ ...current, [field]: value }));
  const handleBlur = () => {
    if (hasSubmitted) setErrors(validateContactForm(data));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setHasSubmitted(true);
    const nextErrors = validateContactForm(data);
    setErrors(nextErrors);
    const firstInvalid = FIELD_ORDER.find((field) => nextErrors[field]);
    if (firstInvalid) {
      fieldRefs.current[firstInvalid]?.focus();
      return;
    }
    window.open(buildWhatsAppUrl(messageText), '_blank', 'noopener');
    setSendState('opening');
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setSendState('idle'), OPENING_MS);
  };

  const errorText = (field: ContactField) => (errors[field] ? copy.errors[errors[field]] : undefined);

  return (
    <form noValidate onSubmit={handleSubmit} className="flex flex-col gap-[var(--space-sm)]">
      <FormField id="contact-business" label={copy.fields.business}>
        {({ invalid, ...control }) => (
          <Select {...control} invalid={invalid} value={data.business} onChange={(event) => update('business', event.target.value)}>
            {BUSINESS_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {copy.businessNames[option]}
              </option>
            ))}
          </Select>
        )}
      </FormField>
      <FormField id="contact-name" label={copy.fields.name} error={errorText('name')}>
        {({ invalid, ...control }) => (
          <Input
            {...control}
            ref={(element) => {
              fieldRefs.current.name = element;
            }}
            invalid={invalid}
            autoComplete="name"
            value={data.name}
            onChange={(event) => update('name', event.target.value)}
            onBlur={handleBlur}
          />
        )}
      </FormField>
      <FormField id="contact-contact" label={copy.fields.contact} hint={copy.fields.contactHint} error={errorText('contact')}>
        {({ invalid, ...control }) => (
          <Input
            {...control}
            ref={(element) => {
              fieldRefs.current.contact = element;
            }}
            invalid={invalid}
            inputMode="email"
            autoComplete="email"
            value={data.contact}
            onChange={(event) => update('contact', event.target.value)}
            onBlur={handleBlur}
          />
        )}
      </FormField>
      <FormField id="contact-message" label={copy.fields.message} error={errorText('message')}>
        {({ invalid, ...control }) => (
          <Textarea
            {...control}
            ref={(element) => {
              fieldRefs.current.message = element;
            }}
            invalid={invalid}
            value={data.message}
            onChange={(event) => update('message', event.target.value)}
            onBlur={handleBlur}
          />
        )}
      </FormField>

      <p role="status" aria-live="polite" className="text-[length:var(--text-sm)] font-medium text-primary empty:hidden">
        {sendState === 'opening' ? '' : hasErrors ? copy.formHasErrors : ''}
      </p>

      <div className="flex flex-col gap-[var(--space-xs)] sm:flex-row sm:items-center sm:justify-between">
        <Button type="submit" size="lg" aria-disabled={sendState === 'opening'} aria-label={sendState === 'opening' ? copy.openingWhatsApp : dict.actions.sendOnWhatsApp}>
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={sendState}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={SWAP}
              className="inline-flex items-center gap-2"
            >
              {sendState === 'opening' ? <Check aria-hidden /> : <MessageCircle aria-hidden />}
              <span aria-hidden>{sendState === 'opening' ? copy.openingWhatsApp : dict.actions.sendOnWhatsApp}</span>
            </motion.span>
          </AnimatePresence>
        </Button>
        <a
          href={buildMailtoUrl(copy.message.emailSubject, messageText)}
          className="inline-flex min-h-11 items-center gap-2 text-[length:var(--text-sm)] font-medium text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
        >
          <Mail aria-hidden className="size-4" />
          {dict.actions.preferEmail}
        </a>
      </div>
    </form>
  );
}
