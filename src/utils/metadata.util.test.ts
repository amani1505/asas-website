import { IMAGES } from '@/content/images';
import { buildMetadata } from './metadata.util';

describe('buildMetadata', () => {
  it('buildMetadata sets canonical and hreflang alternates', () => {
    const m = buildMetadata({ locale: 'sw', path: '/news', title: 'Habari', description: 'd' });
    expect(m.alternates).toEqual({ canonical: '/sw/news', languages: { en: '/en/news', sw: '/sw/news', 'x-default': '/en/news' } });
    expect(m.title).toBe('Habari | ASAS Group');
    expect(m.description).toBe('d');
    expect(m.metadataBase?.toString()).toMatch(/^https?:\/\//);
  });

  it('home uses the full group name and the bare locale path', () => {
    const m = buildMetadata({ locale: 'en', path: '', description: 'd' });
    expect(m.title).toBe('ASAS Group of Companies');
    expect(m.alternates?.canonical).toBe('/en');
    expect(m.openGraph).toMatchObject({ locale: 'en_TZ', url: '/en', siteName: 'ASAS Group of Companies', type: 'website' });
  });

  it('falls back to the localized generated OG image when no image is given', () => {
    const m = buildMetadata({ locale: 'sw', path: '/news', title: 'Habari', description: 'd' });
    expect((m.openGraph as { images?: unknown[] }).images).toEqual([{ url: '/sw/opengraph-image', width: 1200, height: 630, alt: 'ASAS Group of Companies' }]);
  });

  it('uses sw_TZ for Swahili and adds an image when given', () => {
    const m = buildMetadata({ locale: 'sw', path: '/about', title: 'Kuhusu', description: 'd', image: IMAGES[Object.keys(IMAGES)[0] as keyof typeof IMAGES] });
    expect(m.openGraph).toMatchObject({ locale: 'sw_TZ', title: 'Kuhusu | ASAS Group' });
    expect((m.openGraph as { images?: unknown[] }).images).toHaveLength(1);
  });
});
