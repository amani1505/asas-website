import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/constants/site.constants';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: new URL('/sitemap.xml', SITE_URL).toString(),
  };
}
