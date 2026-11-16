import { cvMailto } from './careers.util';

describe('cvMailto', () => {
  it('opens an email with a plain CV subject', () => {
    expect(cvMailto('info@asas.co.tz')).toBe('mailto:info@asas.co.tz?subject=CV');
  });

  it('names the role or area in the subject, encoded', () => {
    expect(cvMailto('info@asas.co.tz', 'Dairy & Farms')).toBe('mailto:info@asas.co.tz?subject=CV%3A%20Dairy%20%26%20Farms');
  });
});
