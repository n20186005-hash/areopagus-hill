import { MetadataRoute } from 'next';

const baseUrl = 'https://areopagushillathens.com';
const defaultLocale = 'el';
const localePrefixes: Record<string, string> = {
  el: '',
  en: '/en',
  zh: '/zh',
};
const paths = ['', '/privacy-policy', '/terms-of-service', '/cookie-settings'];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const path of paths) {
    for (const [locale, prefix] of Object.entries(localePrefixes)) {
      entries.push({
        url: `${baseUrl}${prefix}${path}`,
        lastModified: new Date(),
        changeFrequency: path === '' ? 'weekly' : 'monthly',
        priority: path === '' ? 1.0 : 0.3,
        alternates: {
          languages: Object.fromEntries(
            Object.entries(localePrefixes).map(([l, p]) => [l, `${baseUrl}${p}${path}`])
          ),
        },
      });
    }
  }

  return entries;
}
