"use client";

import { useState } from "react";
import { experiences } from "@/data/experiences";
import { VibeCategory } from "@/data/vibes";
import ExperienceCard from "./ExperienceCard";
import VibePills from "./VibePills";

interface ExperienceGridProps {
  showFilters?: boolean;
  limit?: number;
  className?: string;
}

export default function ExperienceGrid({
  showFilters = true,
  limit,
  className = "",
}: ExperienceGridProps) {
  const [selectedVibe, setSelectedVibe] = useState<VibeCategory | null>(null);

  // Filter experiences by vibe
  const filteredExperiences = selectedVibe
    ? experiences.filter((e) => e.vibe === selectedVibe)
    : experiences;

  // Apply limit if specified
  const displayedExperiences = limit
    ? filteredExperiences.slice(0, limit)
    : filteredExperiences;

  return (
    <div className={className}>
      {/* Filter pills */}
      {showFilters && (
        <div className="mb-8 overflow-x-auto pb-2">
          <VibePills selected={selectedVibe} onSelect={setSelectedVibe} />
        </div>
      )}

      {/* Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {displayedExperiences.map((experience) => (
          <ExperienceCard key={experience.id} experience={experience} />
        ))}
      </div>

      {/* Empty state */}
      {displayedExperiences.length === 0 && (
        <div className="py-12 text-center">
          <p className="text-lg font-medium text-[color-mix(in_oklab,var(--foreground)_60%,transparent)]">
            No experiences found for this category.
          </p>
          <button
            onClick={() => setSelectedVibe(null)}
            className="mt-4 text-sm font-semibold text-brand hover:underline"
          >
            View all experiences
          </button>
        </div>
      )}
    </div>
  );
}
