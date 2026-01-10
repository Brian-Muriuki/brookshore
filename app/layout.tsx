import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Brookshores Safaris",
    template: "%s | Brookshores Safaris",
  },
  description:
    "Brookshores Safaris — curated Kenya safaris, beach holidays, weekend getaways, and corporate travel solutions.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  openGraph: {
    title: "Brookshores Safaris",
    description:
      "Explore Kenya with Brookshores Safaris — safari packages, coastal escapes, and corporate travel.",
    type: "website",
    images: [
      "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1200&q=80",
    ],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
