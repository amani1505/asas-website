import { render, screen } from '@testing-library/react';
import { CONTENT } from '@/content';
import { getDictionaryFor } from '@/i18n/getDictionaryFor';
import { OpenRolesSection } from './OpenRolesSection';

const en = getDictionaryFor('en');
const labels = { heading: en.careers.openRoles, sendCv: en.actions.sendCv };

describe('OpenRolesSection', () => {
  it('careers shows the empty state with a CV mailto', () => {
    render(<OpenRolesSection roles={[]} empty={{ title: 'No open roles right now', body: en.careers.emptyBody }} email="info@asas.co.tz" labels={labels} />);
    expect(screen.getByText('No open roles right now')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /CV/ })).toHaveAttribute('href', 'mailto:info@asas.co.tz?subject=CV');
  });

  it('lists open roles with an application link per role', () => {
    const role = { title: 'Fleet Mechanic', location: 'Iringa', type: 'Full-time', summary: 'Keep our trucks on the road.' };
    render(<OpenRolesSection roles={[role]} empty={{ title: 'x', body: 'y' }} email="info@asas.co.tz" labels={labels} />);
    expect(screen.getByRole('heading', { name: 'Fleet Mechanic' })).toBeInTheDocument();
    expect(screen.queryByText('x')).not.toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Fleet Mechanic/ })).toHaveAttribute('href', 'mailto:info@asas.co.tz?subject=CV%3A%20Fleet%20Mechanic');
  });

  it('uses the content bundle careers roles shape', () => {
    expect(Array.isArray(CONTENT.en.careers.roles)).toBe(true);
  });
});
