"use client";

import Image from "next/image";
import Link from "next/link";
import { useLocale } from "next-intl";
import Container from "./Container";
import SectionHeading from "./SectionHeading";

const posters = [
  {
    title: "Conference Bookings",
    description:
      "For meetings, strategy sessions, and team gatherings that need the right venue, connectivity, and catering in one place.",
    image: "/images/posters/conference-bookings.jpeg",
    href: "/corporate?source=conference-poster",
    cta: "Plan a Conference Booking",
  },
  {
    title: "Accommodation Bookings",
    description:
      "For room blocks, overnight stays, and flexible accommodation support when comfort and convenience matter most.",
    image: "/images/posters/accommodation-bookings.jpeg",
    href: "/contact?source=accommodation-poster",
    cta: "Ask About Accommodation",
  },
];

export default function BookingPostersSection() {
  const locale = useLocale();

  return (
    <section className="border-y border-border bg-muted py-14 sm:py-18">
      <Container>
        <SectionHeading
          eyebrow="More Booking Options"
          title="Conference and accommodation support, in one place"
          description="If you need a venue for a meeting or help arranging where your team or guests will stay, these are the quickest routes to start with."
        />

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          {posters.map((poster) => (
            <div
              key={poster.title}
              className="overflow-hidden rounded-[28px] border border-border bg-card shadow-lg shadow-black/5"
            >
              <Link href={`/${locale}${poster.href}`} className="block">
                <div className="relative aspect-[4/5] bg-[#f6efe3]">
                  <Image
                    src={poster.image}
                    alt={poster.title}
                    fill
                    className="object-contain"
                  />
                </div>
              </Link>

              <div className="p-5 sm:p-6">
                <h3 className="text-xl font-semibold tracking-tight">{poster.title}</h3>
                <p className="mt-3 text-sm leading-6 text-[color-mix(in_oklab,var(--foreground)_74%,transparent)]">
                  {poster.description}
                </p>
                <div className="mt-5">
                  <Link
                    href={`/${locale}${poster.href}`}
                    className="inline-flex items-center justify-center rounded-xl bg-brand px-5 py-3 text-sm font-semibold text-brand-foreground transition hover:brightness-110"
                  >
                    {poster.cta}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
