import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Container from "../../../components/Container";
import Accordion from "../../../components/Accordion";
import QuoteForm from "../../../components/QuoteForm";
import { ButtonLink } from "../../../components/Button";
import { getTourBySlug, tours } from "../../../data/tours";

export function generateStaticParams() {
  return tours.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const tour = getTourBySlug(slug);
  if (!tour) return { title: "Tour not found" };
  return {
    title: tour.title,
    description: `Brookshore Safaris — ${tour.title} in ${tour.location}. ${tour.duration}. From $${tour.price.usdFrom} per person.`,
    openGraph: {
      title: `${tour.title} | Brookshore Safaris`,
      images: tour.images.slice(0, 1),
    },
  };
}

function buildWhatsAppHref(message: string) {
  const number =
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/[^\d]/g, "") ||
    "254700000000";
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export default async function TourDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tour = getTourBySlug(slug);
  if (!tour) notFound();

  return (
    <div className="pb-24 pt-8 sm:pb-10 sm:pt-10">
      <Container>
        <div className="flex flex-col gap-3">
          <div className="text-xs font-semibold tracking-widest text-brand uppercase">
            {tour.type} • {tour.location}
          </div>
          <h1 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            {tour.title}
          </h1>
          <div className="flex flex-wrap items-center gap-2 text-sm text-[color-mix(in_oklab,var(--foreground)_70%,transparent)]">
            <span>{tour.duration}</span>
            <span>•</span>
            <span>{tour.groupType}</span>
            <span>•</span>
            <span>
              ★ {tour.rating} ({tour.reviewCount} reviews)
            </span>
          </div>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px] lg:items-start">
          <div>
            <div className="grid gap-3 sm:grid-cols-2">
              {tour.images.slice(0, 4).map((src, idx) => (
                <div
                  key={`${src}-${idx}`}
                  className="relative overflow-hidden rounded-2xl border border-border bg-muted"
                >
                  <div className="relative aspect-[16/11]">
                    <Image
                      src={src}
                      alt={`${tour.title} photo ${idx + 1}`}
                      fill
                      className="object-cover"
                      priority={idx === 0}
                    />
                  </div>
                </div>
              ))}
            </div>

            <section className="mt-10">
              <div className="text-sm font-semibold">Why this trip</div>
              <ul className="mt-3 grid gap-2 text-sm text-[color-mix(in_oklab,var(--foreground)_78%,transparent)]">
                {tour.highlights.map((h) => (
                  <li key={h} className="flex gap-2">
                    <span className="mt-2 size-1.5 rounded-full bg-brand" />
                    <span className="leading-6">{h}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="mt-10">
              <div className="flex items-end justify-between gap-4">
                <div className="text-sm font-semibold">Day-by-day itinerary</div>
              </div>
              <div className="mt-4">
                <Accordion
                  items={tour.itinerary.map((d, idx) => ({
                    title: `${d.day}: ${d.title}`,
                    content: d.description,
                    defaultOpen: idx === 0,
                  }))}
                />
              </div>
            </section>

            <section className="mt-10 grid gap-4 lg:grid-cols-2">
              <div className="rounded-2xl border border-border bg-card p-5">
                <div className="text-sm font-semibold">Inclusions</div>
                <ul className="mt-3 grid gap-2 text-sm text-[color-mix(in_oklab,var(--foreground)_78%,transparent)]">
                  {tour.inclusions.map((i) => (
                    <li key={i} className="flex gap-2">
                      <span className="mt-2 size-1.5 rounded-full bg-brand" />
                      <span className="leading-6">{i}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-border bg-card p-5">
                <div className="text-sm font-semibold">Exclusions</div>
                <ul className="mt-3 grid gap-2 text-sm text-[color-mix(in_oklab,var(--foreground)_78%,transparent)]">
                  {tour.exclusions.map((i) => (
                    <li key={i} className="flex gap-2">
                      <span className="mt-2 size-1.5 rounded-full bg-[color-mix(in_oklab,var(--foreground)_28%,transparent)]" />
                      <span className="leading-6">{i}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            <section className="mt-10 rounded-2xl border border-border bg-muted p-5">
              <div className="text-sm font-semibold">Accommodation options</div>
              <div className="mt-3 grid gap-2 text-sm text-[color-mix(in_oklab,var(--foreground)_75%,transparent)]">
                <div>
                  <span className="font-semibold text-foreground">Budget:</span>{" "}
                  comfortable essentials and great value.
                </div>
                <div>
                  <span className="font-semibold text-foreground">Mid-range:</span>{" "}
                  strong comfort, great locations, and reliable service.
                </div>
                <div>
                  <span className="font-semibold text-foreground">Luxury:</span>{" "}
                  premium camps/lodges with top-tier amenities.
                </div>
              </div>
            </section>
          </div>

          <aside className="space-y-4">
            <div className="rounded-2xl border border-border bg-card p-5">
              <div className="text-xs font-semibold tracking-widest text-brand uppercase">
                From
              </div>
              <div className="mt-1 text-3xl font-semibold">
                ${tour.price.usdFrom}
              </div>
              <div className="mt-1 text-sm text-[color-mix(in_oklab,var(--foreground)_70%,transparent)]">
                per person • KES {tour.price.kesFrom.toLocaleString()}
              </div>

              <div className="mt-5 grid gap-2">
                <ButtonLink href="#quote" className="w-full justify-center">
                  Request Quote
                </ButtonLink>
                <Link
                  href={buildWhatsAppHref(
                    `Hi Brookshore Safaris! I’m interested in: ${tour.title}. Can you share availability and a quote?`,
                  )}
                  className="inline-flex w-full items-center justify-center rounded-xl border border-border bg-background px-4 py-2 text-sm font-semibold transition hover:bg-muted"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WhatsApp this itinerary
                </Link>
              </div>

            </div>

            <div id="quote">
              <QuoteForm variant="tour" subject={tour.title} />
            </div>
          </aside>
        </div>
      </Container>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-[color-mix(in_oklab,var(--background)_90%,transparent)] backdrop-blur lg:hidden">
        <Container>
          <div className="flex items-center justify-between gap-3 py-3">
            <div className="min-w-0">
              <div className="truncate text-sm font-semibold">{tour.title}</div>
              <div className="text-xs text-[color-mix(in_oklab,var(--foreground)_70%,transparent)]">
                From ${tour.price.usdFrom} • {tour.duration}
              </div>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <ButtonLink href="#quote" className="px-3 py-2">
                Quote
              </ButtonLink>
              <Link
                href={buildWhatsAppHref(
                  `Hi Brookshore Safaris! I’m interested in: ${tour.title}.`,
                )}
                className="rounded-xl border border-border bg-background px-3 py-2 text-sm font-semibold hover:bg-muted"
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp
              </Link>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}
