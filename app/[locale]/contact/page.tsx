import Link from "next/link";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import QuoteForm from "@/components/QuoteForm";
import { getWhatsAppNumber } from "@/lib/phone";
import { getContactEmail } from "@/lib/contact";

export const metadata = {
  title: "Contact",
};

function buildWhatsAppHref(message: string) {
  const number = getWhatsAppNumber();
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export default function ContactPage() {
  const email = getContactEmail();

  return (
    <div className="py-10 sm:py-12">
      <Container>
        <SectionHeading
          eyebrow="Contact"
          title="Talk to Brookshores Safaris"
          description="Use WhatsApp for quick help, email us directly, or send a message via the form."
        />

        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_520px] lg:items-start">
          <div className="space-y-4">
            <div className="rounded-2xl border border-border bg-card p-6">
              <div className="text-sm font-semibold">Office info</div>
              <div className="mt-3 space-y-2 text-sm text-[color-mix(in_oklab,var(--foreground)_78%,transparent)]">
                <div>Nairobi, Kenya</div>
                <div>
                  <a
                    href={`mailto:${email}`}
                    className="font-semibold text-brand hover:underline"
                  >
                    {email}
                  </a>
                </div>
                <div className="pt-2">
                  <Link
                    href={buildWhatsAppHref(
                      "Hi Brookshores Safaris! I’d like help planning a trip in Kenya.",
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand font-semibold hover:underline"
                  >
                    Chat on WhatsApp →
                  </Link>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-muted p-6">
              <div className="text-sm font-semibold">Map</div>
              <div className="mt-3 overflow-hidden rounded-2xl border border-border bg-background">
                <iframe
                  title="Brookshores Safaris location map"
                  className="h-56 w-full"
                  src="https://www.openstreetmap.org/export/embed.html?bbox=36.738%2C-1.339%2C37.005%2C-1.163&layer=mapnik&marker=-1.286%2C36.8219"
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          <QuoteForm variant="contact" />
        </div>
      </Container>
    </div>
  );
}
