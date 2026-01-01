"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useState, use } from "react";
import { useTripStore } from "@/store/tripStore";
import { getExperienceById, getRelatedExperiences, getRegionName, Experience } from "@/data/experiences";
import { getVibeById } from "@/data/vibes";
import { formatFromPrice } from "@/lib/pricing";
import Container from "@/components/Container";

export default function ExperienceDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const experience = getExperienceById(slug);

  const { addItem, removeItem } = useTripStore();
  // Reactive selector - subscribes to items changes
  const isInBag = useTripStore((state) =>
    state.items.some((item) => item.experienceId === slug)
  );

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isResident, setIsResident] = useState(false);

  if (!experience) {
    return (
      <main className="min-h-screen bg-background">
        <Container>
          <div className="py-16 text-center">
            <h1 className="text-2xl font-bold">Experience not found</h1>
            <p className="mt-2 text-[color-mix(in_oklab,var(--foreground)_70%,transparent)]">
              The experience you're looking for doesn't exist.
            </p>
            <Link
              href="/"
              className="mt-6 inline-flex items-center justify-center rounded-xl bg-brand px-6 py-3 text-sm font-semibold text-white"
            >
              Browse Experiences
            </Link>
          </div>
        </Container>
      </main>
    );
  }

  const vibe = getVibeById(experience.vibe);
  const relatedExperiences = getRelatedExperiences(experience);

  const handleToggleBag = () => {
    if (isInBag) {
      removeItem(experience.id);
    } else {
      addItem(experience.id);
    }
  };

  return (
    <main className="min-h-screen bg-background pb-24">
      {/* Hero Image Gallery */}
      <div className="relative h-[50vh] min-h-[400px] w-full overflow-hidden bg-muted">
        <Image
          src={experience.gallery[activeImageIndex]}
          alt={experience.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Back button */}
        <div className="absolute left-4 top-4 z-10">
          <Link
            href="/#experiences"
            className="inline-flex items-center gap-2 rounded-xl bg-black/30 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm transition hover:bg-black/50"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back
          </Link>
        </div>

        {/* Gallery thumbnails */}
        {experience.gallery.length > 1 && (
          <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2">
            {experience.gallery.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImageIndex(idx)}
                className={`h-2 w-8 rounded-full transition ${
                  idx === activeImageIndex ? "bg-white" : "bg-white/40"
                }`}
                aria-label={`View image ${idx + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      <Container>
        <div className="relative -mt-16 z-10">
          {/* Main content card */}
          <div className="grid gap-8 lg:grid-cols-[1fr,380px]">
            {/* Left column - Details */}
            <div className="space-y-6">
              {/* Header card */}
              <div className="rounded-2xl border border-border bg-card p-6 shadow-lg">
                {/* Vibe badge */}
                {vibe && (
                  <span
                    className="inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium"
                    style={{ backgroundColor: vibe.colorAccent + "20", color: vibe.colorAccent }}
                  >
                    {vibe.icon} {vibe.name}
                  </span>
                )}

                <h1 className="mt-3 text-2xl font-bold sm:text-3xl">{experience.name}</h1>
                <p className="mt-2 text-lg text-[color-mix(in_oklab,var(--foreground)_70%,transparent)]">
                  {experience.tagline}
                </p>

                {/* Quick info */}
                <div className="mt-4 flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">📍</span>
                    <span>{getRegionName(experience.region)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg">📅</span>
                    <span>{experience.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg">💰</span>
                    <span>From {formatFromPrice(experience, isResident)}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="mt-6 leading-relaxed text-[color-mix(in_oklab,var(--foreground)_80%,transparent)]">
                  {experience.description}
                </p>
              </div>

              {/* What to Expect */}
              <div className="rounded-2xl border border-border bg-card p-6">
                <h2 className="flex items-center gap-2 text-lg font-semibold">
                  <span className="text-green-500">✓</span>
                  What to Expect
                </h2>
                <ul className="mt-4 space-y-3">
                  {experience.whatToExpect.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm">
                      <span className="mt-0.5 text-green-500">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* What NOT to Expect */}
              <div className="rounded-2xl border border-border bg-card p-6">
                <h2 className="flex items-center gap-2 text-lg font-semibold">
                  <span className="text-amber-500">!</span>
                  Good to Know
                </h2>
                <ul className="mt-4 space-y-3">
                  {experience.whatNotToExpect.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-[color-mix(in_oklab,var(--foreground)_75%,transparent)]">
                      <span className="mt-0.5 text-amber-500">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Includes / Excludes */}
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="rounded-2xl border border-border bg-card p-6">
                  <h2 className="font-semibold text-green-600">Included</h2>
                  <ul className="mt-4 space-y-2">
                    {experience.includes.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm">
                        <span className="text-green-500">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-2xl border border-border bg-card p-6">
                  <h2 className="font-semibold text-red-600">Not Included</h2>
                  <ul className="mt-4 space-y-2">
                    {experience.excludes.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-[color-mix(in_oklab,var(--foreground)_70%,transparent)]">
                        <span className="text-red-400">✕</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Pairs well with */}
              {relatedExperiences.length > 0 && (
                <div className="rounded-2xl border border-border bg-card p-6">
                  <h2 className="font-semibold">Pairs Well With</h2>
                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    {relatedExperiences.map((related) => (
                      <Link
                        key={related.id}
                        href={`/experiences/${related.id}`}
                        className="flex items-center gap-4 rounded-xl border border-border p-3 transition hover:border-brand/50 hover:bg-muted"
                      >
                        <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg">
                          <Image
                            src={related.image}
                            alt={related.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="min-w-0">
                          <div className="font-medium truncate">{related.name}</div>
                          <div className="text-xs text-[color-mix(in_oklab,var(--foreground)_60%,transparent)]">
                            {related.duration}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right column - Sticky CTA */}
            <div className="hidden lg:block">
              <div className="sticky top-24 space-y-4">
                {/* Pricing card */}
                <div className="rounded-2xl border border-border bg-card p-6 shadow-lg">
                  <div className="text-sm text-[color-mix(in_oklab,var(--foreground)_60%,transparent)]">
                    Starting from
                  </div>
                  <div className="mt-1 text-3xl font-bold text-brand">
                    {formatFromPrice(experience, isResident)}
                  </div>
                  <div className="text-sm text-[color-mix(in_oklab,var(--foreground)_60%,transparent)]">
                    per person
                  </div>

                  {experience.pricingNote && (
                    <p className="mt-3 text-xs text-[color-mix(in_oklab,var(--foreground)_60%,transparent)]">
                      {experience.pricingNote}
                    </p>
                  )}

                  {/* Resident toggle */}
                  <label className="mt-4 flex cursor-pointer items-center gap-3 rounded-lg border border-border p-3">
                    <input
                      type="checkbox"
                      checked={isResident}
                      onChange={(e) => setIsResident(e.target.checked)}
                      className="h-4 w-4 rounded border-border text-brand focus:ring-brand"
                    />
                    <span className="text-sm">I'm a Kenya resident</span>
                  </label>

                  <hr className="my-4 border-border" />

                  {/* Add to bag button */}
                  <button
                    onClick={handleToggleBag}
                    className={`w-full rounded-xl py-4 text-sm font-semibold transition-all duration-200 active:scale-95 ${
                      isInBag
                        ? "border-2 border-brand bg-brand/10 text-brand hover:bg-brand/20"
                        : "border-2 border-transparent bg-brand text-white hover:brightness-110"
                    }`}
                  >
                    {isInBag ? "✓ Added to Trip" : "+ Add to Trip"}
                  </button>

                  {isInBag && (
                    <Link
                      href="/my-adventure"
                      className="mt-3 block w-full rounded-xl border border-border py-3 text-center text-sm font-medium transition hover:bg-muted"
                    >
                      Review My Trip
                    </Link>
                  )}

                  <p className="mt-4 text-center text-xs text-[color-mix(in_oklab,var(--foreground)_50%,transparent)]">
                    No payment required • Get a personalized quote
                  </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {experience.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-border bg-muted px-3 py-1 text-xs capitalize"
                    >
                      {tag.replace(/-/g, " ")}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* Mobile sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-30 border-t border-border bg-background p-4 lg:hidden">
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <div className="text-xs text-[color-mix(in_oklab,var(--foreground)_60%,transparent)]">From</div>
            <div className="text-lg font-bold text-brand">{formatFromPrice(experience, isResident)}</div>
          </div>
          <button
            onClick={handleToggleBag}
            className={`flex-1 rounded-xl py-3 text-sm font-semibold transition-all duration-200 active:scale-95 ${
              isInBag
                ? "border-2 border-brand bg-brand/10 text-brand"
                : "border-2 border-transparent bg-brand text-white"
            }`}
          >
            {isInBag ? "✓ In Trip" : "+ Add to Trip"}
          </button>
        </div>
      </div>
    </main>
  );
}
