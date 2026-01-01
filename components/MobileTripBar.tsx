"use client";

import Link from "next/link";
import { useTripItems, useIsResident, useTripStore } from "@/store/tripStore";
import { calculateTripEstimate, formatPriceRange } from "@/lib/pricing";

export default function MobileTripBar() {
  const items = useTripItems();
  const isResident = useIsResident();
  const isDrawerOpen = useTripStore((state) => state.isDrawerOpen);

  // Don't show if no items or if drawer is open
  if (items.length === 0 || isDrawerOpen) return null;

  const estimate = calculateTripEstimate(items, isResident);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-card p-3 shadow-lg sm:hidden">
      <div className="flex items-center justify-between gap-3">
        {/* Summary */}
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 text-sm font-medium">
            <span>🎒</span>
            <span>{items.length} saved</span>
            <span className="text-[color-mix(in_oklab,var(--foreground)_50%,transparent)]">
              •
            </span>
            <span className="truncate text-[color-mix(in_oklab,var(--foreground)_70%,transparent)]">
              Est. {formatPriceRange(estimate)} pp
            </span>
          </div>
        </div>

        {/* CTA */}
        <Link
          href="/my-adventure"
          className="flex-shrink-0 rounded-xl bg-brand px-4 py-2 text-sm font-semibold text-white transition hover:brightness-110"
        >
          Review →
        </Link>
      </div>
    </div>
  );
}
