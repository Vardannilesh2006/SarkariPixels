import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://sarkaripixels.vercel.app";
const SITE_NAME = "SarkariPixels";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "SarkariPixels | Free Photo Editor for Govt Exam Applications",
    template: "%s | SarkariPixels",
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
        alt: "SarkariPixels - Free Exam Photo Editor",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SarkariPixels | Free Photo Editor for Govt Exam Applications",
    description:
      "88 tools to resize and compress photos for SSC, UPSC, RRB exam portals. Browser-based, zero upload.",
  },
  verification: {
    google: "98b75bc1f3bc0c44",
    other: {
      monetag: "9bcd118f7dcdd00f254abb8b7a3cae70",
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
        {/* Google Tag Manager */}
        <Script id="gtm" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-KMK8392M');`}
        </Script>

        {/* Google Analytics (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-KNQ135CJNM"
          strategy="afterInteractive"
        />
        <Script id="ga4" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-KNQ135CJNM');`}
        </Script>

        {/* Monetag Popunder */}
        <Script
          src="https://pl29794526.effectivecpmnetwork.com/5e/68/79/5e68796e38eca04c6316617039221790.js"
          strategy="afterInteractive"
        />
        <Script id="monetag-popunder" strategy="afterInteractive">
          {`(function(s){s.dataset.zone='11180255',s.src='https://al5sm.com/tag.min.js'})([document.documentElement, document.body].filter(Boolean).pop().appendChild(document.createElement('script')))`}
        </Script>

        {/* Font Awesome */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
        />

        {/* Theme init — prevents flash */}
        <Script id="theme-init" strategy="beforeInteractive">
          {`try {
            const stored = localStorage.getItem('sp-theme');
            if (stored === 'dark' || (!stored && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
              document.documentElement.classList.add('dark');
            }
          } catch(e) {}`}
        </Script>
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
