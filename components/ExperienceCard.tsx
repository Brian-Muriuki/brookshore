"use client";

import Image from "next/image";
import Link from "next/link";
import { Experience } from "@/data/experiences";
import { getVibeById, getVibeColor } from "@/data/vibes";
import { formatFromPrice } from "@/lib/pricing";
import { useTripStore, useTripItems } from "@/store/tripStore";

interface ExperienceCardProps {
  experience: Experience;
}

export default function ExperienceCard({ experience }: ExperienceCardProps) {
  const { addItem, removeItem, isResident } = useTripStore();
  const items = useTripItems();

  // Reactive check - subscribes to items changes
  const inBag = items.some((item) => item.experienceId === experience.id);
  const vibe = getVibeById(experience.vibe);
  const vibeColorClass = getVibeColor(experience.vibe);

  const handleAddClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (inBag) {
      removeItem(experience.id);
    } else {
      addItem(experience.id);
    }
  };

  return (
    <Link
      href={`/experiences/${experience.id}`}
      className="group block overflow-hidden rounded-2xl border border-border bg-card transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/5"
    >
      {/* Image */}
      <div className="relative aspect-[3/2]">
        <Image
          src={experience.image}
          alt={experience.name}
          fill
          className="object-cover transition duration-500 group-hover:scale-[1.03]"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          onError={(e) => {
            // Fallback to placeholder if image not found
            const target = e.target as HTMLImageElement;
            target.src = "/images/placeholder-experience.jpg";
          }}
        />
        {/* Vibe pill */}
        {vibe && (
          <div
            className={`absolute left-3 top-3 flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium backdrop-blur-sm ${vibeColorClass}`}
          >
            <span>{vibe.icon}</span>
            <span>{vibe.name}</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Title and tagline */}
        <h3 className="text-base font-semibold leading-tight">
          {experience.name}
        </h3>
        <p className="mt-1 text-sm text-[color-mix(in_oklab,var(--foreground)_65%,transparent)]">
          {experience.tagline}
        </p>

        {/* Price and duration row */}
        <div className="mt-3 flex items-center justify-between">
          <span className="text-sm font-semibold">
            {formatFromPrice(experience, isResident)}
          </span>
          <span className="text-xs text-[color-mix(in_oklab,var(--foreground)_60%,transparent)]">
            {experience.duration}
          </span>
        </div>

        {/* Add to trip button */}
        <button
          onClick={handleAddClick}
          className={`mt-4 w-full rounded-xl py-2.5 text-sm font-semibold transition-all duration-200 active:scale-95 ${
            inBag
              ? "border-2 border-brand bg-brand/10 text-brand hover:bg-brand/20"
              : "border-2 border-transparent bg-brand text-white hover:brightness-110"
          }`}
        >
          {inBag ? "✓ Added to My Trip" : "+ Add to My Trip"}
        </button>
      </div>
    </Link>
  );
}
