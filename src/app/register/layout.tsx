import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create an account",
  description: "Register a new NSP account to submit and manage your work.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      "max-snippet": -1,
      "max-image-preview": "none",
      "max-video-preview": -1,
    },
  },
  alternates: { canonical: null },
};

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
