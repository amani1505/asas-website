import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { getDictionaryFor } from '@/i18n/getDictionaryFor';
import { ContactFormSection } from './ContactFormSection';

const en = getDictionaryFor('en');

const setSearch = (search: string) => window.history.replaceState(null, '', search ? `/en/contact?${search}` : '/en/contact');

afterEach(() => {
  setSearch('');
  jest.restoreAllMocks();
});

async function fillValidForm() {
  await userEvent.type(screen.getByLabelText(en.contact.fields.name), 'Asha Mollel');
  await userEvent.type(screen.getByLabelText(new RegExp(en.contact.fields.contact)), '+255 712 345 678');
  await userEvent.type(screen.getByLabelText(en.contact.fields.message), 'Habari & asante? #1 🙏');
}

describe('ContactFormSection', () => {
  it('pre-selects business from the query and opens WhatsApp on valid submit', async () => {
    setSearch('business=dairy-farms');
    const open = jest.spyOn(window, 'open').mockReturnValue(null);
    render(<ContactFormSection dict={en} />);
    expect(await screen.findByRole('combobox')).toHaveValue('dairy-farms');
    await fillValidForm();
    await userEvent.click(screen.getByRole('button', { name: en.actions.sendOnWhatsApp }));
    expect(open).toHaveBeenCalledWith(expect.stringContaining('https://wa.me/255749700500?text='), '_blank', 'noopener');
    const text = decodeURIComponent(String(open.mock.calls[0][0]).split('?text=')[1]);
    expect(text).toContain('Business: Dairy & Farms');
    expect(text).toContain('Habari & asante? #1 🙏');
    expect(await screen.findByText(en.contact.openingWhatsApp)).toBeInTheDocument();
  });

  it('falls back to general for an unknown business', async () => {
    setSearch('business=garbage');
    render(<ContactFormSection dict={en} />);
    expect(await screen.findByRole('combobox')).toHaveValue('general');
  });

  it('shows errors and does not open WhatsApp when invalid', async () => {
    const open = jest.spyOn(window, 'open').mockReturnValue(null);
    render(<ContactFormSection dict={en} />);
    await userEvent.click(screen.getByRole('button', { name: en.actions.sendOnWhatsApp }));
    await waitFor(() => expect(document.querySelectorAll('[aria-invalid="true"]')).toHaveLength(3));
    expect(open).not.toHaveBeenCalled();
    const name = screen.getByLabelText(en.contact.fields.name);
    expect(name).toHaveAttribute('aria-invalid', 'true');
    expect(document.getElementById(name.getAttribute('aria-describedby')!.split(' ').pop()!)).toHaveTextContent(en.contact.errors.required);
    expect(screen.getByRole('status')).toHaveTextContent(en.contact.formHasErrors);
    expect(name).toHaveFocus();
  });

  it('re-validates on blur after the first submit', async () => {
    render(<ContactFormSection dict={en} />);
    await userEvent.click(screen.getByRole('button', { name: en.actions.sendOnWhatsApp }));
    await userEvent.type(screen.getByLabelText(en.contact.fields.name), 'Asha');
    await userEvent.tab();
    await waitFor(() => expect(document.querySelectorAll('[aria-invalid="true"]')).toHaveLength(2));
  });

  it('submits text that reached the DOM without a React change event (typed before hydration)', async () => {
    const open = jest.spyOn(window, 'open').mockReturnValue(null);
    render(<ContactFormSection dict={en} />);
    (screen.getByLabelText(en.contact.fields.name) as HTMLInputElement).value = 'Asha Mollel';
    await userEvent.type(screen.getByLabelText(new RegExp(en.contact.fields.contact)), 'asha@example.co.tz');
    await userEvent.type(screen.getByLabelText(en.contact.fields.message), 'Naomba bei ya mafuta.');
    await userEvent.click(screen.getByRole('button', { name: en.actions.sendOnWhatsApp }));
    expect(decodeURIComponent(String(open.mock.calls[0][0]))).toContain('Name: Asha Mollel');
  });

  it('an explicit choice wins over the query', async () => {
    setSearch('business=energy');
    render(<ContactFormSection dict={en} />);
    await userEvent.selectOptions(screen.getByRole('combobox'), 'logistics');
    expect(screen.getByRole('combobox')).toHaveValue('logistics');
  });

  it('offers an email alternative with the same text', async () => {
    render(<ContactFormSection dict={en} />);
    await fillValidForm();
    const link = screen.getByRole('link', { name: en.actions.preferEmail });
    expect(link.getAttribute('href')).toMatch(/^mailto:info@asas\.co\.tz\?subject=/);
    expect(decodeURIComponent(link.getAttribute('href')!)).toContain('Habari & asante? #1 🙏');
  });
});
