"use client";

import { useTripItems, useIsResident, useAccommodationTier } from "@/store/tripStore";
import {
  calculateTripEstimate,
  formatPriceRange,
  accommodationTierNames,
} from "@/lib/pricing";
import AccommodationSelector from "./AccommodationSelector";

export default function EstimateSummary() {
  const items = useTripItems();
  const isResident = useIsResident();
  const tier = useAccommodationTier();

  const estimate = calculateTripEstimate(items, isResident);

  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <h3 className="font-semibold">Trip Estimate</h3>

      <hr className="my-4 border-border" />

      {/* Experiences count */}
      <div className="flex items-center justify-between text-sm">
        <span className="text-[color-mix(in_oklab,var(--foreground)_70%,transparent)]">
          Experiences ({items.length}):
        </span>
        <span className="font-medium">{formatPriceRange(estimate)} pp</span>
      </div>

      <hr className="my-4 border-border" />

      {/* Accommodation selector */}
      <AccommodationSelector />

      <hr className="my-4 border-border" />

      {/* Total estimate */}
      <div>
        <div className="text-xs text-[color-mix(in_oklab,var(--foreground)_60%,transparent)]">
          Estimated Range:
        </div>
        <div className="mt-1 text-xl font-bold">
          {formatPriceRange(estimate)} /person
        </div>
        <div className="mt-1 text-xs text-[color-mix(in_oklab,var(--foreground)_55%,transparent)]">
          (Shown for {accommodationTierNames[tier]} tier)
        </div>
      </div>

      <hr className="my-4 border-border" />

      {/* What's added in quote */}
      <div className="space-y-1 text-xs text-[color-mix(in_oklab,var(--foreground)_60%,transparent)]">
        <p className="font-medium text-foreground">Final quote adds:</p>
        <p>• Routing & transfers</p>
        <p>• Date-specific availability</p>
        <p>• Accommodation tier adjustments</p>
      </div>

      <hr className="my-4 border-border" />

      {/* Disclaimer */}
      <p className="text-xs text-[color-mix(in_oklab,var(--foreground)_50%,transparent)]">
        ℹ️ Your expert confirms exact pricing based on dates and availability.
      </p>
    </div>
  );
}
