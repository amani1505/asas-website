import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { EMAIL } from '@/constants/contact.constants';
import { getDictionaryFor } from '@/i18n/getDictionaryFor';
import { hasLocale } from '@/i18n/locales';
import { PageTransition } from '@/components/motion/PageTransition';
import { getContent } from '@/services/content.service';
import { CareersIntroSection } from '@/sections/careers/CareersIntroSection';
import { OpenRolesSection } from '@/sections/careers/OpenRolesSection';

export async function generateMetadata({ params }: PageProps<'/[locale]/careers'>): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(locale)) return {};
  return { title: getDictionaryFor(locale).nav.careers, description: getContent(locale).careers.intro.body[0] };
}

export default async function CareersPage({ params }: PageProps<'/[locale]/careers'>) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  const dict = getDictionaryFor(locale);
  const { careers } = getContent(locale);

  return (
    <PageTransition>
      <CareersIntroSection intro={careers.intro} eyebrow={dict.careers.eyebrow} reasonsTitle={dict.careers.whyTitle} reasons={careers.reasons} />
      <OpenRolesSection
        roles={careers.roles}
        empty={{ title: dict.careers.emptyTitle, body: dict.careers.emptyBody }}
        email={EMAIL}
        labels={{ heading: dict.careers.openRoles, sendCv: dict.actions.sendCv }}
      />
    </PageTransition>
  );
}
