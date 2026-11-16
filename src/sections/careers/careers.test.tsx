import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CONTENT } from '@/content';
import { getDictionaryFor } from '@/i18n/getDictionaryFor';
import { CareerPathsSection } from './CareerPathsSection';
import { CareersHeroSection } from './CareersHeroSection';
import { CareersStepsSection } from './CareersStepsSection';
import { OpenRolesSection } from './OpenRolesSection';

const en = getDictionaryFor('en');
const EMAIL = 'info@asas.co.tz';
const labels = { heading: en.careers.openRoles, sendCv: en.actions.sendCv };
const { careers, about, sectors } = CONTENT.en;

describe('CareersHeroSection', () => {
  it('leads with the headline, a CV email and a jump to the paths', () => {
    render(<CareersHeroSection intro={careers.intro} team={about.team} email={EMAIL} dict={en} />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(careers.intro.title);
    expect(screen.getByRole('link', { name: en.actions.sendCv })).toHaveAttribute('href', `mailto:${EMAIL}?subject=CV`);
    expect(screen.getByRole('link', { name: en.careers.findPath })).toHaveAttribute('href', '#paths');
  });

  it('shows the real teams, each photo described', () => {
    render(<CareersHeroSection intro={careers.intro} team={about.team} email={EMAIL} dict={en} />);
    for (const member of about.team) {
      expect(screen.getByRole('img', { name: member.image!.alt })).toBeInTheDocument();
      expect(screen.getByText(member.name)).toBeInTheDocument();
    }
  });
});

describe('CareerPathsSection', () => {
  const renderPaths = () => render(<CareerPathsSection sectors={sectors} email={EMAIL} dict={en} />);

  it('opens on the first area with its companies and an area CV link', () => {
    renderPaths();
    expect(screen.getByRole('radio', { name: sectors[0].name })).toHaveAttribute('aria-checked', 'true');
    for (const company of sectors[0].companies) expect(screen.getByText(company.name)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: `${en.careers.cvFor} ${sectors[0].name}` })).toHaveAttribute(
      'href',
      `mailto:${EMAIL}?subject=${encodeURIComponent(`CV: ${sectors[0].name}`)}`,
    );
  });

  it('switching area shows that area’s companies and kinds of work', async () => {
    renderPaths();
    const logistics = sectors.find((sector) => sector.slug === 'logistics')!;
    await userEvent.click(screen.getByRole('radio', { name: logistics.name }));
    const panel = screen.getByRole('region', { name: logistics.name });
    for (const company of logistics.companies) expect(within(panel).getByText(company.name)).toBeInTheDocument();
    expect(within(panel).getByText(logistics.companies[0].services[0].title)).toBeInTheDocument();
    expect(within(panel).getByRole('link', { name: `${en.careers.cvFor} ${logistics.name}` })).toBeInTheDocument();
  });

  it('moves between areas with the arrow keys', async () => {
    renderPaths();
    screen.getByRole('radio', { name: sectors[0].name }).focus();
    await userEvent.keyboard('{ArrowRight}');
    expect(screen.getByRole('radio', { name: sectors[1].name })).toHaveAttribute('aria-checked', 'true');
    expect(screen.getByRole('radio', { name: sectors[1].name })).toHaveFocus();
  });
});

describe('CareersStepsSection', () => {
  it('lists the joining steps in order', () => {
    render(<CareersStepsSection steps={careers.steps} title={en.careers.stepsTitle} />);
    const items = within(screen.getByRole('list')).getAllByRole('listitem');
    expect(items).toHaveLength(careers.steps.length);
    expect(items[0]).toHaveTextContent(careers.steps[0].title);
  });
});

describe('OpenRolesSection', () => {
  it('careers shows the empty state with a CV mailto', () => {
    render(<OpenRolesSection roles={[]} empty={{ title: 'No open roles right now', body: en.careers.emptyBody }} email={EMAIL} labels={labels} />);
    expect(screen.getByText('No open roles right now')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /CV/ })).toHaveAttribute('href', `mailto:${EMAIL}?subject=CV`);
  });

  it('lists open roles with an application link per role', () => {
    const role = { title: 'Fleet Mechanic', location: 'Iringa', type: 'Full-time', summary: 'Keep our trucks on the road.' };
    render(<OpenRolesSection roles={[role]} empty={{ title: 'x', body: 'y' }} email={EMAIL} labels={labels} />);
    expect(screen.getByRole('heading', { name: 'Fleet Mechanic' })).toBeInTheDocument();
    expect(screen.queryByText('x')).not.toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Fleet Mechanic/ })).toHaveAttribute('href', `mailto:${EMAIL}?subject=CV%3A%20Fleet%20Mechanic`);
  });
});
