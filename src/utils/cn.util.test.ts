import { cn } from './cn.util';

describe('cn', () => {
  it('merges tailwind conflicts, last wins', () => {
    const isHidden = false;
    expect(cn('px-2 rounded-md', isHidden && 'hidden', 'px-4')).toBe('rounded-md px-4');
  });
});
