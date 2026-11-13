'use client';

import { useEffect, useRef, useState, type FormEvent, type MouseEvent } from 'react';
import { AnimatePresence, m } from 'motion/react';
import { Check, Mail, MessageCircle } from 'lucide-react';
import type { DictionaryI } from '@/i18n/dictionary.interface';
import type { BusinessOption, ContactField, ContactFormDataI, ContactFormErrorsI, ContactMessageLabelsI } from '@/interfaces/contact.interface';
import { Button } from '@/components/ui/Button';
import { FormField } from '@/components/ui/FormField';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Textarea } from '@/components/ui/Textarea';
import { useQueryParam } from '@/hooks/useQueryParam';
import { BUSINESS_OPTIONS, buildMailtoUrl, buildWhatsAppUrl, composeContactMessage, parseBusiness, validateContactForm } from '@/services/contact.service';

interface ContactFormProps {
  dict: DictionaryI;
}

type FormFieldsI = Omit<ContactFormDataI, 'business'>;

type SendState = 'idle' | 'opening';

const FIELD_ORDER: ContactField[] = ['name', 'contact', 'message'];
const OPENING_MS = 2500;
const SWAP = { duration: 0.2, ease: [0.22, 1, 0.36, 1] } as const;

export function ContactForm({ dict }: ContactFormProps) {
  const { contact: copy } = dict;
  // `?business=` pre-selects until the visitor picks one; read without suspending so typed input survives hydration.
  const queryBusiness = parseBusiness(useQueryParam('business'));
  const [chosenBusiness, setChosenBusiness] = useState<BusinessOption | null>(null);
  const business = chosenBusiness ?? queryBusiness;
  // Text fields are uncontrolled: the DOM keeps anything typed before hydration, and submit reads it.
  // `draft` mirrors them only to render the email link's href.
  const [draft, setDraft] = useState<FormFieldsI>({ name: '', contact: '', message: '' });
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<ContactFormErrorsI>({});
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [sendState, setSendState] = useState<SendState>('idle');
  const fieldRefs = useRef<Partial<Record<ContactField, HTMLInputElement | HTMLTextAreaElement | null>>>({});
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  const labels: ContactMessageLabelsI = { ...copy.message, businessNames: copy.businessNames };
  const hasErrors = Object.keys(errors).length > 0;

  const readData = (): ContactFormDataI => {
    const form = formRef.current ? new FormData(formRef.current) : null;
    const read = (field: keyof FormFieldsI) => String(form?.get(field) ?? draft[field]);
    return { business, name: read('name'), contact: read('contact'), message: read('message') };
  };
  const mailtoFor = (data: ContactFormDataI) => buildMailtoUrl(copy.message.emailSubject, composeContactMessage(data, labels));

  const update = (field: keyof FormFieldsI, value: string) => setDraft((current) => ({ ...current, [field]: value }));
  const handleBlur = () => {
    if (hasSubmitted) setErrors(validateContactForm(readData()));
  };
  const handleEmailClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.currentTarget.href = mailtoFor(readData());
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setHasSubmitted(true);
    const data = readData();
    const nextErrors = validateContactForm(data);
    setErrors(nextErrors);
    const firstInvalid = FIELD_ORDER.find((field) => nextErrors[field]);
    if (firstInvalid) {
      fieldRefs.current[firstInvalid]?.focus();
      return;
    }
    window.open(buildWhatsAppUrl(composeContactMessage(data, labels)), '_blank', 'noopener');
    setSendState('opening');
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setSendState('idle'), OPENING_MS);
  };

  const errorText = (field: ContactField) => (errors[field] ? copy.errors[errors[field]] : undefined);

  return (
    <form ref={formRef} noValidate onSubmit={handleSubmit} className="flex flex-col gap-[var(--space-sm)]">
      <FormField id="contact-business" label={copy.fields.business}>
        {({ invalid, ...control }) => (
          <Select {...control} invalid={invalid} value={business} onChange={(event) => setChosenBusiness(parseBusiness(event.target.value))}>
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
            name="name"
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
            name="contact"
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
            name="message"
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
            <m.span
              key={sendState}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={SWAP}
              className="inline-flex items-center gap-2"
            >
              {sendState === 'opening' ? <Check aria-hidden /> : <MessageCircle aria-hidden />}
              <span aria-hidden>{sendState === 'opening' ? copy.openingWhatsApp : dict.actions.sendOnWhatsApp}</span>
            </m.span>
          </AnimatePresence>
        </Button>
        <a
          href={mailtoFor({ business, ...draft })}
          onClick={handleEmailClick}
          className="inline-flex min-h-11 items-center gap-2 text-[length:var(--text-sm)] font-medium text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
        >
          <Mail aria-hidden className="size-4" />
          {dict.actions.preferEmail}
        </a>
      </div>
    </form>
  );
}
