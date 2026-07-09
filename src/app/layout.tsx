import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import layout from "@/data/layout.json";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.ns-press.com";

const SITE_NAME = "Natural Science Press";
const SITE_DESCRIPTION =
  "Hong Kong Natural Science Press — a global open access publisher of peer-reviewed academic journals and books across natural, engineering, and biomedical sciences.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | Open Access Journals & Books`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    "Natural Science Press",
    "NSP",
    "open access",
    "academic journals",
    "peer-reviewed",
    "scientific publishing",
    "Hong Kong",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: `${SITE_NAME} | Open Access Journals & Books`,
    description: SITE_DESCRIPTION,
    url: "/",
    locale: "en_US",
    images: [layout.brand.logo],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} | Open Access Journals & Books`,
    description: SITE_DESCRIPTION,
    images: [layout.brand.logo],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: layout.brand.favicon,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      // Browser extensions (e.g. dark-mode toggles) commonly stamp
      // `data-theme` / `color-scheme` onto <html> before React hydrates,
      // producing a spurious mismatch on this element's attributes only.
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
