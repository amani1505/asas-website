import { act, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CONTENT } from '@/content';
import { getDictionaryFor } from '@/i18n/getDictionaryFor';
import { SustainabilityExplorerSection } from './SustainabilityExplorerSection';
import { SustainabilityImpactSection } from './SustainabilityImpactSection';

const { tabs } = CONTENT.en.sustainability;
const dict = getDictionaryFor('en');
const label = dict.sustainability.tabsLabel;
const topic = (id: string) => tabs.find((tab) => tab.id === id)!;
const renderExplorer = () => render(<SustainabilityExplorerSection tabs={tabs} label={label} />);
const ring = (container: HTMLElement) => container.querySelector<HTMLElement>('[data-wheel-ring]')!;

afterEach(() => {
  window.history.replaceState(null, '', '/');
});

describe('SustainabilityExplorerSection', () => {
  it('opens the topic named in the hash', () => {
    window.location.hash = '#hse';
    renderExplorer();
    expect(screen.getByRole('tab', { selected: true })).toHaveAccessibleName(topic('hse').title);
  });

  it('ignores an unknown hash', () => {
    window.location.hash = '#zzz';
    renderExplorer();
    expect(screen.getByRole('tab', { selected: true })).toHaveAccessibleName(topic('approach').title);
  });

  it('choosing a topic updates the hash and the panel', async () => {
    renderExplorer();
    await userEvent.click(screen.getByRole('tab', { name: topic('compliance').title }));
    expect(window.location.hash).toBe('#compliance');
    expect(await screen.findByRole('tabpanel', { name: topic('compliance').title })).toBeInTheDocument();
  });

  it('follows a hash change made by a link on the page', () => {
    renderExplorer();
    act(() => {
      window.location.hash = '#community';
      window.dispatchEvent(new HashChangeEvent('hashchange'));
    });
    expect(screen.getByRole('tab', { selected: true })).toHaveAccessibleName(topic('community').title);
  });

  it('moves between topics with the arrow keys', async () => {
    renderExplorer();
    screen.getByRole('tab', { selected: true }).focus();
    await userEvent.keyboard('{ArrowRight}');
    const next = screen.getByRole('tab', { name: topic('hse').title });
    expect(next).toHaveAttribute('aria-selected', 'true');
    expect(next).toHaveFocus();
  });

  it('turns the wheel the short way round to bring the chosen topic to the top', async () => {
    const { container } = renderExplorer();
    await userEvent.click(screen.getByRole('tab', { name: topic('compliance').title }));
    expect(ring(container).style.transform).toBe('rotate(-144deg)');
    await userEvent.click(screen.getByRole('tab', { name: topic('approach').title }));
    await userEvent.click(screen.getByRole('tab', { name: topic('equality').title }));
    expect(ring(container).style.transform).toBe('rotate(72deg)');
  });

  it('shows each compliance standard as a seal', async () => {
    window.location.hash = '#compliance';
    renderExplorer();
    const panel = await screen.findByRole('tabpanel');
    const seals = within(panel).getAllByTestId('seal');
    expect(seals).toHaveLength(topic('compliance').points!.length);
    expect(seals[0]).toHaveTextContent('ISO 9001');
  });

  it('shows the community photo with its description', async () => {
    window.location.hash = '#community';
    renderExplorer();
    const panel = await screen.findByRole('tabpanel');
    expect(within(panel).getByRole('img', { name: topic('community').image!.alt })).toBeInTheDocument();
    expect(within(panel).getAllByRole('listitem')).toHaveLength(topic('community').points!.length);
  });
});

describe('SustainabilityImpactSection', () => {
  it('counts standards, programmes and commitments from the content', () => {
    render(<SustainabilityImpactSection tabs={tabs} years={90} labels={dict.sustainability.impact} />);
    expect(screen.getByLabelText('90+')).toBeInTheDocument();
    expect(screen.getByLabelText('3')).toBeInTheDocument();
    expect(screen.getByLabelText(String(topic('community').points!.length))).toBeInTheDocument();
    expect(screen.getByLabelText(String(topic('hse').points!.length))).toBeInTheDocument();
    expect(screen.getByText(dict.sustainability.impact.standards)).toBeInTheDocument();
  });
});
