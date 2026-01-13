"use client";

import { useState, useMemo } from "react";
import { tours, getToursByVibe } from "@/data/tours";
import { VibeCategory } from "@/data/legacy/vibes";
import TourCard from "./TourCard";
import VibePills from "./VibePills";

interface TourGridProps {
  showFilters?: boolean;
  limit?: number;
  initialVibe?: VibeCategory | "all";
}

export default function TourGrid({
  showFilters = false,
  limit,
  initialVibe = "all",
}: TourGridProps) {
  const [selectedVibe, setSelectedVibe] = useState<VibeCategory | "all">(
    initialVibe
  );

  const filteredTours = useMemo(() => {
    let result =
      selectedVibe === "all" ? tours : getToursByVibe(selectedVibe);
    if (limit) {
      result = result.slice(0, limit);
    }
    return result;
  }, [selectedVibe, limit]);

  // Calculate tour counts per vibe for the pills
  const tourCounts = useMemo(() => {
    const counts: Record<VibeCategory | "all", number> = {
      all: tours.length,
      safari: getToursByVibe("safari").length,
      beach: getToursByVibe("beach").length,
      mountains: getToursByVibe("mountains").length,
      lakes: getToursByVibe("lakes").length,
      culture: getToursByVibe("culture").length,
      adrenaline: getToursByVibe("adrenaline").length,
    };
    return counts;
  }, []);

  return (
    <div>
      {showFilters && (
        <VibePills
          selectedVibe={selectedVibe}
          onSelect={setSelectedVibe}
          tourCounts={tourCounts}
        />
      )}

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredTours.map((tour) => (
          <TourCard key={tour.id} tour={tour} />
        ))}
      </div>

      {filteredTours.length === 0 && (
        <div className="text-center py-12 text-[color-mix(in_oklab,var(--foreground)_60%,transparent)]">
          No tours found for this category.
        </div>
      )}
    </div>
  );
}
