import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CONTENT } from '@/content';
import { getDictionaryFor } from '@/i18n/getDictionaryFor';
import { SustainabilityTabsSection } from './SustainabilityTabsSection';

const { tabs } = CONTENT.en.sustainability;
const label = getDictionaryFor('en').sustainability.tabsLabel;
const titleOf = (id: string) => tabs.find((tab) => tab.id === id)!.title;

afterEach(() => {
  window.history.replaceState(null, '', '/');
});

describe('SustainabilityTabsSection', () => {
  it('sustainability opens the tab named in the hash', () => {
    window.location.hash = '#hse';
    render(<SustainabilityTabsSection tabs={tabs} label={label} />);
    expect(screen.getByRole('tab', { selected: true })).toHaveTextContent(titleOf('hse'));
  });

  it('sustainability ignores an unknown hash', () => {
    window.location.hash = '#zzz';
    render(<SustainabilityTabsSection tabs={tabs} label={label} />);
    expect(screen.getByRole('tab', { selected: true })).toHaveTextContent(titleOf('approach'));
  });

  it('changing tabs updates the hash and the panel', async () => {
    render(<SustainabilityTabsSection tabs={tabs} label={label} />);
    await userEvent.click(screen.getByRole('tab', { name: titleOf('compliance') }));
    expect(window.location.hash).toBe('#compliance');
    expect(await screen.findByRole('tabpanel', { name: titleOf('compliance') })).toBeInTheDocument();
  });

  it('follows a hash change made by a link on the page', () => {
    render(<SustainabilityTabsSection tabs={tabs} label={label} />);
    act(() => {
      window.location.hash = '#community';
      window.dispatchEvent(new HashChangeEvent('hashchange'));
    });
    expect(screen.getByRole('tab', { selected: true })).toHaveTextContent(titleOf('community'));
  });
});
