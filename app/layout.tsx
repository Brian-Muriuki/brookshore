import type { Metadata } from "next";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import WhatsAppButton from "../components/WhatsAppButton";
import TripShapeDrawer from "../components/TripShapeDrawer";
import MobileTripBar from "../components/MobileTripBar";

export const metadata: Metadata = {
  title: {
    default: "Brookshore Safaris",
    template: "%s | Brookshore Safaris",
  },
  description:
    "Brookshore Safaris — curated Kenya safaris, beach holidays, weekend getaways, and corporate travel solutions.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  openGraph: {
    title: "Brookshore Safaris",
    description:
      "Explore Kenya with Brookshore Safaris — safari packages, coastal escapes, and corporate travel.",
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
  return (
    <html lang="en">
      <body
        className="min-h-dvh bg-background text-foreground antialiased"
      >
        <div className="flex min-h-dvh flex-col">
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <WhatsAppButton />
          <TripShapeDrawer />
          <MobileTripBar />
        </div>
      </body>
    </html>
  );
}
