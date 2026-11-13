import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { ImageResponse } from 'next/og';
import { DEFAULT_LOCALE, hasLocale } from '@/i18n/locales';
import { getDictionaryFor } from '@/i18n/getDictionaryFor';
import { getSectors } from '@/services/content.service';
import { SITE_URL } from '@/constants/site.constants';

export const alt = 'ASAS Group of Companies';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const CHARCOAL = '#373435';
const RED = '#BE0F0D';
const CREAM = '#FAF8F5';
const MUTED = '#5F5A5B';

/** Reads a file from /public and inlines it, so the image needs no network at render time. */
async function publicImage(path: string, mime: string): Promise<string> {
  const data = await readFile(join(process.cwd(), 'public', path));
  return `data:${mime};base64,${data.toString('base64')}`;
}

export default async function OpenGraphImage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: requested } = await params;
  const locale = hasLocale(requested) ? requested : DEFAULT_LOCALE;
  const dict = getDictionaryFor(locale);
  const sectors = getSectors(locale).map((sector) => sector.name);
  const [logo, photo] = await Promise.all([
    publicImage('images/brand/asas-logo-red.png', 'image/png'),
    publicImage('images/home/driver.jpg', 'image/jpeg'),
  ]);

  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', background: CREAM }}>
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '0 64px',
            gap: 36,
          }}
        >
          <img src={logo} alt="" width={600} height={120} />
          <div style={{ display: 'flex', fontSize: 32, lineHeight: 1.35, color: CHARCOAL }}>{dict.meta.description}</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
            {sectors.map((name) => (
              <div
                key={name}
                style={{
                  display: 'flex',
                  padding: '8px 18px',
                  borderRadius: 6,
                  border: `2px solid ${RED}`,
                  color: RED,
                  fontSize: 24,
                  fontWeight: 700,
                }}
              >
                {name}
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', fontSize: 22, color: MUTED }}>{new URL(SITE_URL).host}</div>
        </div>
        <div style={{ width: 460, height: '100%', display: 'flex', position: 'relative' }}>
          <img src={photo} alt="" width={460} height={630} style={{ objectFit: 'cover' }} />
          <div style={{ position: 'absolute', left: 0, top: 0, width: 14, height: '100%', background: RED }} />
        </div>
      </div>
    ),
    size,
  );
}
