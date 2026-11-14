import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { getDictionaryFor } from '@/i18n/getDictionaryFor';
import { renderWithPath } from '@/test-utils/renderWithPath';
import { LanguageSwitch } from './LanguageSwitch';
import { PageHeaderSection } from './PageHeaderSection';
import { SiteFooter } from './SiteFooter';
import { SiteHeader } from './SiteHeader';

const en = getDictionaryFor('en');
const swDict = getDictionaryFor('sw');

describe('SiteHeader', () => {
  it('nav links are locale-prefixed', () => {
    renderWithPath('/sw/news', <SiteHeader locale="sw" dict={swDict} />);
    expect(screen.getAllByRole('link', { name: swDict.nav.about })[0]).toHaveAttribute('href', '/sw/about');
  });

  it('marks the current section', () => {
    renderWithPath('/en/news/tanga-lpg-terminal', <SiteHeader locale="en" dict={en} />);
    expect(screen.getAllByRole('link', { name: en.nav.news })[0]).toHaveAttribute('aria-current', 'page');
    expect(screen.getAllByRole('link', { name: en.nav.about })[0]).not.toHaveAttribute('aria-current');
  });
});

describe('LanguageSwitch', () => {
  it('keeps the current page', () => {
    renderWithPath('/en/businesses/logistics', <LanguageSwitch locale="en" labels={en.language} />);
    expect(screen.getByRole('link', { name: /Kiswahili/ })).toHaveAttribute('href', '/sw/businesses/logistics');
    expect(screen.getByRole('link', { name: /English/ })).toHaveAttribute('aria-current', 'true');
  });

  it('keeps the query string', () => {
    renderWithPath('/en/contact?business=energy', <LanguageSwitch locale="en" labels={en.language} />);
    expect(screen.getByRole('link', { name: /Kiswahili/ })).toHaveAttribute('href', '/sw/contact?business=energy');
  });

  it('remembers the choice in a cookie', async () => {
    renderWithPath('/en', <LanguageSwitch locale="en" labels={en.language} />);
    await userEvent.click(screen.getByRole('link', { name: /Kiswahili/ }));
    expect(document.cookie).toContain('asas-locale=sw');
  });
});

describe('MobileMenu', () => {
  it('opens from the header and closes on Escape, returning focus to the trigger', async () => {
    renderWithPath('/en', <SiteHeader locale="en" dict={en} />);
    const trigger = screen.getByRole('button', { name: en.nav.menu });
    await userEvent.click(trigger);
    const dialog = await screen.findByRole('dialog');
    expect(within(dialog).getByRole('link', { name: en.nav.careers })).toHaveAttribute('href', '/en/careers');
    await userEvent.keyboard('{Escape}');
    expect(trigger).toHaveFocus();
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    // The panel plays its exit animation before it unmounts.
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
  });
});

describe('SiteFooter', () => {
  it('lists both phones with labels and correct tel links', () => {
    renderWithPath('/en', <SiteFooter locale="en" dict={en} year={2026} />);
    expect(screen.getByRole('link', { name: /\+255 749 700 500/ })).toHaveAttribute('href', 'tel:+255749700500');
    expect(screen.getByRole('link', { name: /\+255 793 600 600/ })).toHaveAttribute('href', 'tel:+255793600600');
    expect(screen.getByText(en.footer.callsWhatsapp)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /info@asas.co.tz/ })).toHaveAttribute('href', 'mailto:info@asas.co.tz');
  });

  it('has no dead links', () => {
    const { container } = renderWithPath('/en', <SiteFooter locale="en" dict={en} year={2026} />);
    for (const link of container.querySelectorAll('a')) {
      expect(link.getAttribute('href')).toMatch(/^(\/en|https?:|tel:|mailto:)/);
    }
  });
});

describe('PageHeaderSection', () => {
  it('wraps the page heading with decorative contour lines', () => {
    const { container } = render(
      <PageHeaderSection>
        <h1>Title</h1>
      </PageHeaderSection>,
    );
    expect(screen.getByRole('heading', { level: 1, name: 'Title' })).toBeInTheDocument();
    expect(container.querySelector('svg[aria-hidden="true"]')).toBeInTheDocument();
  });
});
