import { notFound } from 'next/navigation';

/** Cache Components needs at least one param; any other path renders on request and 404s. */
export function generateStaticParams() {
  return [{ rest: ['not-found'] }];
}

/** Any unknown path under a locale renders that locale's 404 page. */
export default async function CatchAllPage({ params }: PageProps<'/[locale]/[...rest]'>) {
  await params;
  notFound();
}
