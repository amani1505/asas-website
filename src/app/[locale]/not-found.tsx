import { getDictionaryFor } from '@/i18n/getDictionaryFor';
import { getLocale } from '@/i18n/getDictionary';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { DEFAULT_LOCALE, type Locale } from '@/i18n/locales';

async function resolveLocale(): Promise<Locale> {
  try {
    return await getLocale();
  } catch {
    return DEFAULT_LOCALE;
  }
}

export default async function NotFound() {
  const locale = await resolveLocale();
  const dict = getDictionaryFor(locale);
  return (
    <Container size="narrow" className="flex flex-col items-start gap-[var(--space-sm)] py-[var(--section-spacing)]">
      <p className="font-heading text-[length:var(--text-5xl)] font-bold text-primary">404</p>
      <h1 className="text-[length:var(--text-3xl)] font-bold">{dict.common.notFoundTitle}</h1>
      <p className="max-w-[50ch] text-[length:var(--text-lg)] text-muted-foreground">{dict.common.notFoundBody}</p>
      <Button href={`/${locale}`} size="lg" className="mt-[var(--space-xs)]">
        {dict.common.goHome}
      </Button>
    </Container>
  );
}
