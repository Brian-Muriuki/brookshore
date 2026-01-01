"use client";

import Image from "next/image";
import { Experience } from "@/data/experiences";
import { getVibeById } from "@/data/vibes";
import { formatPriceRange, getExperiencePrice } from "@/lib/pricing";
import { useTripStore, Priority } from "@/store/tripStore";

interface WishlistItemProps {
  experience: Experience;
  priority: Priority;
}

export default function WishlistItem({
  experience,
  priority,
}: WishlistItemProps) {
  const { removeItem, togglePriority, isResident } = useTripStore();
  const vibe = getVibeById(experience.vibe);
  const priceRange = getExperiencePrice(experience, isResident);

  return (
    <div className="flex items-start gap-4 rounded-xl border border-border bg-card p-4">
      {/* Image */}
      <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg sm:h-20 sm:w-20">
        <Image
          src={experience.image}
          alt={experience.name}
          fill
          className="object-cover"
        />
      </div>

      {/* Content */}
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            <h3 className="truncate text-sm font-semibold">{experience.name}</h3>
            <p className="mt-0.5 text-xs text-[color-mix(in_oklab,var(--foreground)_60%,transparent)]">
              {vibe?.icon} {vibe?.name} • {experience.duration}
            </p>
          </div>
          <button
            onClick={() => removeItem(experience.id)}
            className="text-xs text-red-500 hover:text-red-600"
          >
            Remove
          </button>
        </div>

        {/* Price */}
        <p className="mt-2 text-sm font-medium">
          {formatPriceRange(priceRange)} /person
        </p>

        {/* Priority toggle */}
        <div className="mt-3 flex gap-2">
          <button
            onClick={() => priority === "if-time" && togglePriority(experience.id)}
            className={`rounded-full px-3 py-1 text-xs font-medium transition ${
              priority === "must-do"
                ? "bg-amber-100 text-amber-800"
                : "bg-muted text-[color-mix(in_oklab,var(--foreground)_60%,transparent)] hover:bg-amber-50"
            }`}
          >
            ⭐ Must-do
          </button>
          <button
            onClick={() => priority === "must-do" && togglePriority(experience.id)}
            className={`rounded-full px-3 py-1 text-xs font-medium transition ${
              priority === "if-time"
                ? "bg-slate-100 text-slate-800"
                : "bg-muted text-[color-mix(in_oklab,var(--foreground)_60%,transparent)] hover:bg-slate-50"
            }`}
          >
            🤍 If time
          </button>
        </div>
      </div>
    </div>
  );
}
