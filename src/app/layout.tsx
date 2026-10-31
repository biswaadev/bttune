import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://biswaadev.github.io"),
  title: "BTTUNE - Modern, Ad-Free Music Streaming for Android",
  description:
    "Download BTTUNE APK. High-performance, subscription-free music streaming app engineered with Jetpack Compose, 8D Spatial DSP audio, syllable lyrics sync, and offline cache. Zero ads, zero telemetry.",
  keywords: [
    "BTTUNE",
    "BTTUNE APK",
    "BTTUNE Android",
    "YouTube Music Client",
    "Free Music Streaming",
    "Ad-free Music App",
    "Open Source Music Player",
    "Material 3",
    "Jetpack Compose",
    "Offline Music Player",
    "Biswajit Tanti",
  ],
  authors: [{ name: "Biswajit Tanti", url: "https://biswadev.vercel.app/" }],
  creator: "Biswajit Tanti",
  openGraph: {
    type: "website",
    siteName: "BTTUNE",
    url: "https://biswaadev.github.io/bttune/",
    title: "BTTUNE - Free Ad-Free Music Streaming Client for Android",
    description:
      "Download official BTTUNE APK for Android. Jetpack Compose & Material 3, Syllable Lyrics Sync, Studio Audio Quality, and Offline Cache.",
    images: [
      {
        url: "/assets/og-image.png",
        width: 512,
        height: 512,
        alt: "BTTUNE Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@biswaadev",
    creator: "@biswaadev",
    title: "BTTUNE - Free Ad-Free Music Streaming Client for Android",
    description:
      "Download official BTTUNE APK for Android. Jetpack Compose & Material 3, Syllable Lyrics Sync, Studio Audio Quality, and Offline Cache.",
    images: ["/assets/og-image.png"],
  },
  icons: {
    icon: "/assets/bttune_logo.svg",
    apple: "/assets/og-image.png",
  },
  manifest: "/site.webmanifest",
};

export const viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "BTTUNE",
    operatingSystem: "Android 8.0+",
    applicationCategory: "MultimediaApplication",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    description:
      "An open-source, subscription-free audio client engineered with Jetpack Compose, Kotlin Coroutines, 8D Spatial DSP audio, and syllable synchronized lyrics with zero advertisements.",
    softwareVersion: "v6.1.4",
    fileSize: "14.5MB",
    image: "https://biswaadev.github.io/bttune/assets/og-image.png",
    downloadUrl: "https://biswaadev.github.io/bttune/",
    author: {
      "@type": "Person",
      name: "Biswajit Tanti",
      url: "https://biswadev.vercel.app/",
    },
  };

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* DM Sans Font Family & Google Sans */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd),
          }}
        />
      </head>
      <body className="antialiased overflow-x-hidden font-dmsans selection:bg-neutral-900 selection:text-white dark:selection:bg-white dark:selection:text-black">
        {children}
      </body>
    </html>
  );
}
