import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import CookieBanner from "@/components/CookieBanner";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

import { SITE_URL, SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "SarkariPixels | Free Photo Editor for Govt Exam Applications",
    template: "%s",
  },
  description:
    "Resize, compress and edit photos for SSC, UPSC, BPSC, BSSC, RRB, IBPS exam applications. 100% free, browser-based — your photos never leave your device.",
  keywords: [
    "SSC photo resize",
    "UPSC photo size",
    "passport photo maker",
    "image compressor",
    "photo resize online",
    "sarkari exam photo",
    "compress image to KB",
    "signature resize",
    "IBPS photo size",
    "government exam photo",
  ],
  authors: [{ name: "SarkariPixels" }],
  creator: "SarkariPixels",
  publisher: "SarkariPixels",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: "SarkariPixels | Free Photo Editor for Govt Exam Applications",
    description:
      "88 tools to resize, compress and edit photos for SSC, UPSC, BPSC, RRB exams. 100% free and browser-based.",
    images: [
      {
        url: `${SITE_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "SarkariPixels - Free Exam Photo Resizer for SSC UPSC BPSC RRB IBPS",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SarkariPixels | Free Photo Editor for Govt Exam Applications",
    description:
      "88 tools to resize and compress photos for SSC, UPSC, RRB exam portals. Browser-based, zero upload.",
    images: [`${SITE_URL}/og-image.jpg`],
  },
  verification: {
    google: "98b75bc1f3bc0c44",
    other: {
      monetag: "9bcd118f7dcdd00f254abb8b7a3cae70",
    },
  },
  alternates: {
    canonical: SITE_URL,
    languages: {
      "en": SITE_URL,
      "en-IN": SITE_URL,
      "x-default": SITE_URL,
    },
  },
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* GA4 Consent Mode v2 — deny-by-default until user accepts cookie banner */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              // Initialize consent mode BEFORE loading GA — deny by default
              gtag('consent', 'default', {
                analytics_storage: 'denied',
                ad_storage: 'denied',
                ad_user_data: 'denied',
                ad_personalization: 'denied',
                wait_for_update: 500
              });
              gtag('js', new Date());
              gtag('config', 'G-5EBGBRC049', { send_page_view: true });
            `,
          }}
        />
        {/* Load GA4 script */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-5EBGBRC049"
        />

        {/* Google Tag Manager */}
        <Script id="gtm" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-KMK8392M');`}
        </Script>

        {/* Monetag Popunder */}
        <Script
          src="https://pl29794526.effectivecpmnetwork.com/5e/68/79/5e68796e38eca04c6316617039221790.js"
          strategy="afterInteractive"
        />
        <Script id="monetag-popunder" strategy="afterInteractive">
          {`(function(s){s.dataset.zone='11180255',s.src='https://al5sm.com/tag.min.js'})([document.documentElement, document.body].filter(Boolean).pop().appendChild(document.createElement('script')))`}
        </Script>

        {/* Font Awesome — preconnect + async to prevent render-blocking */}
        <link rel="preconnect" href="https://cdnjs.cloudflare.com" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
          media="print"
          // @ts-expect-error — onLoad trick for async CSS loading
          onLoad="this.media='all'"
        />
        <noscript>
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
          />
        </noscript>

        {/* Organization + WebSite + SearchAction JSON-LD */}
        <Script id="org-schema" type="application/ld+json" strategy="beforeInteractive">
          {`{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "${SITE_URL}/#organization",
      "name": "SarkariPixels",
      "url": "${SITE_URL}",
      "logo": {
        "@type": "ImageObject",
        "url": "${SITE_URL}/favicon.svg",
        "width": 512,
        "height": 512
      },
      "description": "SarkariPixels is a free browser-based photo resizer that helps Indian government exam applicants compress and resize photos to exact portal specifications for SSC, UPSC, BPSC, RRB, IBPS, NTA, and state PSC exams.",
      "sameAs": [
        "https://www.instagram.com/sarkaripixcel"
      ],
      "contactPoint": {
        "@type": "ContactPoint",
        "email": "info@sarkaripixels.online",
        "contactType": "customer support",
        "availableLanguage": ["English", "Hindi"]
      }
    },
    {
      "@type": "WebSite",
      "@id": "${SITE_URL}/#website",
      "url": "${SITE_URL}",
      "name": "SarkariPixels",
      "description": "88 free tools to resize and compress photos for Indian government exam portals.",
      "publisher": { "@id": "${SITE_URL}/#organization" },
      "inLanguage": "en-IN",
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "${SITE_URL}/?q={search_term_string}"
        },
        "query-input": "required name=search_term_string"
      }
    },
    {
      "@type": "WebApplication",
      "@id": "${SITE_URL}/#webapp",
      "name": "SarkariPixels",
      "url": "${SITE_URL}",
      "applicationCategory": "UtilitiesApplication",
      "operatingSystem": "All",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "INR" },
      "description": "Free browser-based photo resizer and compressor for government exam portals."
    }
  ]
}`}
        </Script>

        {/* Theme init — prevents flash */}
        <Script id="theme-init" strategy="beforeInteractive">
          {`try {
            const stored = localStorage.getItem('sp-theme');
            if (stored === 'dark' || (!stored && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
              document.documentElement.classList.add('dark');
            }
          } catch(e) {}`}
        </Script>
        {/* Speculation Rules API for instant prefetching on Chrome/Android */}
        <script
          type="speculationrules"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              prefetch: [
                {
                  source: "document",
                  where: { href_matches: "/*" },
                  eagerness: "moderate",
                },
              ],
            }),
          }}
        />
      </head>
      <body className={`${inter.variable} font-sans`}>
        {/* GTM noscript */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-KMK8392M"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>

        {children}

        {/* GDPR/DPDP Cookie Consent Banner */}
        <CookieBanner />

        {/* Service Worker Registration for Offline PWA Support */}
        <Script id="sw-reg" strategy="lazyOnload">
          {`if ('serviceWorker' in navigator) {
            window.addEventListener('load', function() {
              navigator.serviceWorker.register('/sw.js').catch(function(err) {});
            });
          }`}
        </Script>

        {/* Effectivecpmnetwork Banner Ad */}
        <Script
          src="https://pl29794697.effectivecpmnetwork.com/7bdd7128495aad86bdf1f0a96fe0d215/invoke.js"
          data-cfasync="false"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
