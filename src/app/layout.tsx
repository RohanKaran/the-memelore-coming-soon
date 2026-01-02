import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "dark",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://thememelore.com"),
  title: {
    default: "The Meme Lore - Archive of Internet Culture",
    template: "%s | The Meme Lore",
  },
  description:
    "The most comprehensive library of internet culture. Explore the history, meaning, and evolution of memes from their origins to modern day viral sensations. Featuring AI-powered search, detailed origin stories, comprehensive analytics, and a community-driven archive of global digital trends.",
  keywords: [
    "memes",
    "internet culture",
    "meme history",
    "viral trends",
    "internet archive",
    "meme encyclopedia",
    "digital culture",
  ],
  authors: [{ name: "The Meme Lore Team" }],
  creator: "The Meme Lore",
  publisher: "The Meme Lore",
  applicationName: "The Meme Lore",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://thememelore.com",
    title: "The Meme Lore - Archive of Internet Culture",
    description:
      "Join the waitlist for the most comprehensive library of internet culture. Explore the history, meaning, and evolution of memes. Featuring AI-powered search, detailed origin stories, and comprehensive analytics.",
    siteName: "The Meme Lore",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "The Meme Lore - Archive of Internet Culture",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Meme Lore - Archive of Internet Culture",
    description:
      "The archive is opening soon. Featuring AI-powered search, detailed origin stories, and comprehensive analytics. Join us to explore the history and meaning behind internet culture.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        name: "The Meme Lore",
        url: "https://thememelore.com",
        description: "The most comprehensive library of internet culture.",
        sameAs: [
          // Add social profiles here when available
          // "https://twitter.com/thememelore",
        ],
      },
      {
        "@type": "Organization",
        name: "The Meme Lore",
        url: "https://thememelore.com",
        logo: {
          "@type": "ImageObject",
          url: "https://thememelore.com/logo.png",
        },
        description: "The most comprehensive library of internet culture.",
      },
    ],
  };

  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <Script
          id="json-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          strategy="beforeInteractive"
        />
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
