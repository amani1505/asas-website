import { act, render, screen } from '@testing-library/react';
import { useActiveSection } from './useActiveSection';

type ObserverCallback = (entries: Partial<IntersectionObserverEntry>[]) => void;
let trigger: ObserverCallback = () => {};

class FakeIntersectionObserver {
  constructor(callback: ObserverCallback) {
    trigger = callback;
  }
  observe() {}
  disconnect() {}
}

function Probe() {
  const [active] = useActiveSection(['one', 'two', 'three']);
  return (
    <>
      <p data-testid="active">{active}</p>
      <section id="one" />
      <section id="two" />
      <section id="three" />
    </>
  );
}

describe('useActiveSection', () => {
  const original = window.IntersectionObserver;
  beforeEach(() => {
    window.IntersectionObserver = FakeIntersectionObserver as unknown as typeof IntersectionObserver;
  });
  afterEach(() => {
    window.IntersectionObserver = original;
  });

  it('starts on the first section', () => {
    render(<Probe />);
    expect(screen.getByTestId('active')).toHaveTextContent('one');
  });

  it('follows the section that crosses the middle of the screen', () => {
    render(<Probe />);
    act(() => trigger([{ isIntersecting: true, target: document.getElementById('three')! }]));
    expect(screen.getByTestId('active')).toHaveTextContent('three');
  });

  it('ignores sections leaving the middle', () => {
    render(<Probe />);
    act(() => trigger([{ isIntersecting: false, target: document.getElementById('two')! }]));
    expect(screen.getByTestId('active')).toHaveTextContent('one');
  });
});
