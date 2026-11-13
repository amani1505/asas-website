import { ImageResponse } from 'next/og';
import { DEFAULT_LOCALE, hasLocale } from '@/i18n/locales';
import { getDictionaryFor } from '@/i18n/getDictionaryFor';
import { getSectors } from '@/services/content.service';

export const alt = 'ASAS Group of Companies';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const CHARCOAL = '#373435';
const RED = '#BE0F0D';
const LIGHT = '#FAF8F5';

export default async function OpenGraphImage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: requested } = await params;
  const locale = hasLocale(requested) ? requested : DEFAULT_LOCALE;
  const dict = getDictionaryFor(locale);
  const sectors = getSectors(locale).map((sector) => sector.name).join('  ·  ');

  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', background: CHARCOAL, color: LIGHT }}>
        <div style={{ width: 24, height: '100%', background: RED }} />
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 96px', gap: 28 }}>
          <div style={{ display: 'flex', width: 96, height: 8, background: RED }} />
          <div style={{ fontSize: 112, fontWeight: 800, letterSpacing: -3, lineHeight: 1 }}>ASAS Group</div>
          <div style={{ fontSize: 44, opacity: 0.85 }}>{dict.footer.tagline}</div>
          <div style={{ fontSize: 28, opacity: 0.6 }}>{sectors}</div>
        </div>
      </div>
    ),
    size,
  );
}
