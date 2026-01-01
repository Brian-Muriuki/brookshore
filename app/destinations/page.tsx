import Image from "next/image";
import Link from "next/link";
import Container from "../../components/Container";
import SectionHeading from "../../components/SectionHeading";

export const metadata = {
  title: "Destinations",
};

const destinations = [
  {
    name: "Maasai Mara",
    slug: "maasai-mara",
    description: "Big cats, the Great Migration (seasonal), and sweeping savannah.",
    image:
      "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1600&q=80",
  },
  {
    name: "Amboseli",
    slug: "amboseli",
    description: "Elephant herds and iconic Kilimanjaro views on clear mornings.",
    image:
      "https://images.unsplash.com/photo-1509281373149-e957c6296406?auto=format&fit=crop&w=1600&q=80",
  },
  {
    name: "Diani Beach",
    slug: "diani",
    description: "White sands, warm water, and easy coastal relaxation.",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80",
  },
  {
    name: "Naivasha",
    slug: "naivasha",
    description: "Weekend-friendly escapes, lakeside stays, and outdoor activities.",
    image:
      "https://images.unsplash.com/photo-1544986581-efac024faf62?auto=format&fit=crop&w=1600&q=80",
  },
] as const;

export default function DestinationsPage() {
  return (
    <div className="py-10 sm:py-12">
      <Container>
        <SectionHeading
          eyebrow="Destinations"
          title="Explore Kenya’s highlights"
          description="Browse popular regions and find trips that match your time, budget, and travel style."
        />

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {destinations.map((d) => (
            <Link
              key={d.slug}
              href="/tours"
              className="group overflow-hidden rounded-2xl border border-border bg-card transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/5"
            >
              <div className="relative aspect-[16/11]">
                <Image
                  src={d.image}
                  alt={d.name}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/0 to-black/0" />
                <div className="absolute left-4 bottom-4 right-4">
                  <div className="text-sm font-semibold text-white">{d.name}</div>
                  <div className="mt-1 text-xs text-white/85">{d.description}</div>
                </div>
              </div>
              <div className="p-4">
                <div className="text-sm font-semibold text-brand group-hover:underline">
                  View tours →
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10 rounded-2xl border border-border bg-muted p-6 text-sm text-[color-mix(in_oklab,var(--foreground)_75%,transparent)]">
          Want a custom itinerary for a destination not listed here? Use the quote
          form or WhatsApp to tell us what you have in mind.
        </div>
      </Container>
    </div>
  );
}
