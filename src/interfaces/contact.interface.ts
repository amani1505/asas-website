import type { SectorSlug } from './content.interface';

export type BusinessOption = 'general' | SectorSlug;

export type ContactField = 'name' | 'contact' | 'message';
export type ContactFieldError = 'required' | 'tooShort' | 'tooLong' | 'invalidContact';

export interface ContactFormDataI {
  business: BusinessOption;
  name: string;
  contact: string;
  message: string;
}

export type ContactFormErrorsI = Partial<Record<ContactField, ContactFieldError>>;

export interface ContactMessageLabelsI {
  greeting: string;
  business: string;
  name: string;
  contact: string;
  businessNames: Record<BusinessOption, string>;
}
