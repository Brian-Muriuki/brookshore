import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { getTourBySlug, tours } from "@/data/tours";
import { getVibeById, getVibeColor } from "@/data/legacy/vibes";
import Container from "@/components/Container";
import TourDetailClient from "./TourDetailClient";

interface PageProps {
  params: Promise<{ slug: string; locale: string }>;
}

export async function generateStaticParams() {
  return tours.map((tour) => ({
    slug: tour.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const tour = getTourBySlug(slug);

  if (!tour) {
    return {
      title: "Tour Not Found | Brookshores Safaris",
    };
  }

  return {
    title: `${tour.title} | Brookshores Safaris`,
    description: tour.tagline,
  };
}

export default async function TourDetailPage({ params }: PageProps) {
  const { slug, locale } = await params;
  const tour = getTourBySlug(slug);

  if (!tour) {
    notFound();
  }

  const tItems = await getTranslations("tourItems");
  const tVibes = await getTranslations("vibes");

  // Get translated title and tagline, fallback to tour data
  const title = tItems.has(`${tour.slug}.title`)
    ? tItems(`${tour.slug}.title`)
    : tour.title;
  const tagline = tItems.has(`${tour.slug}.tagline`)
    ? tItems(`${tour.slug}.tagline`)
    : tour.tagline;

  // Get vibe info for badge
  const vibe = getVibeById(tour.vibe);
  const vibeColorClasses = getVibeColor(tour.vibe);

  return (
    <div className="pb-20">
      {/* Hero Section */}
      <div className="relative h-[40vh] min-h-[300px] w-full bg-muted">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${tour.image})`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute inset-0 flex items-end">
          <Container>
            <div className="pb-8 text-white">
              <div className="mb-2 flex items-center gap-2">
                <span className="inline-block rounded-full bg-brand px-3 py-1 text-xs font-medium">
                  {tour.duration}
                </span>
                {vibe && (
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium border ${vibeColorClasses}`}
                  >
                    {vibe.icon} {tVibes(vibe.id)}
                  </span>
                )}
              </div>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                {title}
              </h1>
              <p className="mt-2 text-lg text-white/90">{tagline}</p>
            </div>
          </Container>
        </div>
      </div>

      <div className="mt-8">
        <Container>
          <TourDetailClient tour={tour} />
        </Container>
      </div>
    </div>
  );
}
