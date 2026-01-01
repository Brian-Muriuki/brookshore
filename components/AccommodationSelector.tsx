"use client";

import { useTripStore, AccommodationTier } from "@/store/tripStore";
import {
  accommodationTierNames,
  getAccommodationDescription,
} from "@/lib/pricing";

const tiers: AccommodationTier[] = ["budget", "midrange", "comfort", "luxury"];

export default function AccommodationSelector() {
  const { accommodationTier, setAccommodationTier } = useTripStore();

  return (
    <div>
      <label className="text-sm font-medium">Accommodation style:</label>
      <div className="mt-2 space-y-2">
        {tiers.map((tier) => (
          <label
            key={tier}
            className={`flex cursor-pointer items-start gap-3 rounded-lg border p-3 transition ${
              accommodationTier === tier
                ? "border-brand bg-brand/5"
                : "border-border hover:border-brand/50"
            }`}
          >
            <input
              type="radio"
              name="accommodationTier"
              value={tier}
              checked={accommodationTier === tier}
              onChange={() => setAccommodationTier(tier)}
              className="mt-0.5 h-4 w-4 border-border text-brand focus:ring-brand"
            />
            <div>
              <div className="text-sm font-medium">
                {accommodationTierNames[tier]}
              </div>
              <div className="text-xs text-[color-mix(in_oklab,var(--foreground)_60%,transparent)]">
                {getAccommodationDescription(tier)}
              </div>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
}
