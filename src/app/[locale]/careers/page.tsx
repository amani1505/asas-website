import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { buildMetadata } from '@/utils/metadata.util';
import { EMAIL } from '@/constants/contact.constants';
import { getDictionaryFor } from '@/i18n/getDictionaryFor';
import { hasLocale } from '@/i18n/locales';
import { PageTransition } from '@/components/motion/PageTransition';
import { getContent, getSectors } from '@/services/content.service';
import { CareerPathsSection } from '@/sections/careers/CareerPathsSection';
import { CareersHeroSection } from '@/sections/careers/CareersHeroSection';
import { CareersPerksSection } from '@/sections/careers/CareersPerksSection';
import { CareersStepsSection } from '@/sections/careers/CareersStepsSection';
import { OpenRolesSection } from '@/sections/careers/OpenRolesSection';

export async function generateMetadata({ params }: PageProps<'/[locale]/careers'>): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(locale)) return {};
  return buildMetadata({ locale, path: '/careers', title: getDictionaryFor(locale).nav.careers, description: getContent(locale).careers.intro.body[0] });
}

export default async function CareersPage({ params }: PageProps<'/[locale]/careers'>) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  const dict = getDictionaryFor(locale);
  const { careers, about } = getContent(locale);

  return (
    <PageTransition>
      <CareersHeroSection intro={careers.intro} team={about.team} email={EMAIL} dict={dict} />
      <CareersPerksSection title={dict.careers.whyTitle} perks={careers.reasons} />
      <CareerPathsSection sectors={getSectors(locale)} email={EMAIL} dict={dict} />
      <CareersStepsSection title={dict.careers.stepsTitle} steps={careers.steps} />
      <OpenRolesSection
        roles={careers.roles}
        empty={{ title: dict.careers.emptyTitle, body: dict.careers.emptyBody }}
        email={EMAIL}
        labels={{ heading: dict.careers.openRoles, sendCv: dict.actions.sendCv }}
      />
    </PageTransition>
  );
}
