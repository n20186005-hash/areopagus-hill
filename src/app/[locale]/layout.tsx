import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import type { Metadata } from 'next';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const messages = (await import(`@/messages/${locale}.json`)).default;
  const baseUrl = 'https://areopagushillathens.com';

  const zhUrl = `${baseUrl}/zh`;
  const enUrl = `${baseUrl}/en`;
  const elUrl = `${baseUrl}`;
  const selfUrl = locale === 'el' ? `${baseUrl}` : `${baseUrl}/${locale}`;

  return {
    metadataBase: new URL(baseUrl),
    title: messages.meta.title,
    description: messages.meta.description,
    alternates: {
      canonical: selfUrl,
      languages: {
        'zh': zhUrl,
        'en': enUrl,
        'el': elUrl,
        'x-default': elUrl,
      },
    },
    openGraph: {
      title: `${messages.meta.ogTitle || messages.meta.title}`,
      description: messages.meta.description,
      url: selfUrl,
      siteName: "Areopagus Hill",
      locale: locale === 'zh' ? 'zh_CN' : locale === 'en' ? 'en_US' : 'el_GR',
      type: 'website',
      images: [
        {
          url: '/gallery/areopagus-hill-1.jpg',
          width: 1200,
          height: 630,
          alt: 'Areopagus Hill (Mars Hill) Athens - Best free sunset viewpoint near the Acropolis',
        },
      ],
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale === 'zh' ? 'zh-CN' : locale === 'el' ? 'el-GR' : 'en'} suppressHydrationWarning>
      <head>
        <link rel="canonical" href={locale === 'el' ? 'https://areopagushillathens.com' : `https://areopagushillathens.com/${locale}`} />
        <meta property="og:image" content="https://areopagushillathens.com/gallery/areopagus-hill-1.jpg" />
        <meta property="og:image:alt" content="Areopagus Hill (Λόφος Αρείου Πάγου) in Athens, Greece" />
        <link rel="manifest" href="/manifest.webmanifest" />
        <meta name="theme-color" content="#d4a853" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-HXM22WWPKP"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-HXM22WWPKP');
            `,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (theme === 'dark') {
                    document.documentElement.setAttribute('data-theme', 'dark');
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "TouristAttraction",
                  "@id": "https://areopagushillathens.com/#attraction",
                  "name": "Areopagus Hill (Λόφος Αρείου Πάγου)",
                  "alternateName": ["Areopagus Hill", "Mars Hill Athens", "Mars Hill", "Άρειος Πάγος"],
                  "description": "Comprehensive visitor guide to Areopagus Hill in Athens, Attica, Greece. Historic rock outcropping northwest of the Acropolis, famous for the ancient court, Apostle Paul's sermon, and panoramic sunset views.",
                  "url": "https://areopagushillathens.com",
                  "image": [
                    "https://areopagushillathens.com/gallery/areopagus-hill-1.jpg",
                    "https://areopagushillathens.com/gallery/areopagus-hill-2.jpg",
                    "https://areopagushillathens.com/gallery/areopagus-hill-3.jpg"
                  ],
                  "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "Theorias 21",
                    "addressLocality": "Athens",
                    "addressRegion": "Attica",
                    "postalCode": "105 55",
                    "addressCountry": "GR"
                  },
                  "geo": {
                    "@type": "GeoCoordinates",
                    "latitude": 37.972365,
                    "longitude": 23.720657
                  },
                  "hasMap": "https://maps.app.goo.gl/Dupzqbpja8DxWKSH8",
                  "sameAs": [
                    "https://maps.app.goo.gl/Dupzqbpja8DxWKSH8",
                    "https://www.visitgreece.gr/"
                  ],
                  "isAccessibleForFree": true,
                  "publicAccess": true,
                  "openingHours": "Mo-Su 00:00-23:59",
                  "aggregateRating": {
                    "@type": "AggregateRating",
                    "ratingValue": "4.8",
                    "reviewCount": "5515"
                  }
                },
                {
                  "@type": "FAQPage",
                  "mainEntity": [
                    {
                      "@type": "Question",
                      "name": "Where is Areopagus Hill located?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Areopagus Hill is located at Theorias 21, Athens 105 55, Greece. It sits northwest of the Acropolis, near the Roman Agora, in the heart of Athens, Attica, Greece."
                      }
                    },
                    {
                      "@type": "Question",
                      "name": "Is Areopagus Hill free to visit?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Yes, Areopagus Hill (Mars Hill) is a public space and is completely free to visit year-round, open 24 hours a day. You do not need a ticket for the Acropolis to visit."
                      }
                    },
                    {
                      "@type": "Question",
                      "name": "What is the best time to visit Areopagus Hill?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "The best time to visit is during sunset for stunning panoramic views of Athens and the illuminated Acropolis. Arrive 45 minutes before sunset for the best experience."
                      }
                    },
                    {
                      "@type": "Question",
                      "name": "Is it safe to climb Areopagus Hill at night?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "There is some lighting at night, but the rocks are very slippery and there are no guardrails at the edges. Wear non-slip shoes and bring a flashlight for safety."
                      }
                    },
                    {
                      "@type": "Question",
                      "name": "How do I get to Areopagus Hill from Monastiraki?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Walk from Monastiraki or Thisseio metro stations (Lines 1 and 3). It is about a 10-15 minute walk from Plaka or Monastiraki to the hill entrance on Theorias Street."
                      }
                    },
                    {
                      "@type": "Question",
                      "name": "What is the history of Areopagus Hill?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Areopagus Hill was the seat of the aristocratic council and highest criminal court in ancient Athens. In mythology, Ares was tried here for murder. Around 51 AD, Apostle Paul delivered his famous 'Unknown God' sermon here."
                      }
                    }
                  ]
                }
              ]
            })
          }}
        />
      </head>
      <body className="min-h-screen">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
