import { yearsSince } from './years.util';

describe('yearsSince', () => {
  it('counts whole calendar years', () => expect(yearsSince(1936, new Date('2026-11-13'))).toBe(90));
});
