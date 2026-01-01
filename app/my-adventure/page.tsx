"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useTripStore, useTripItems, TripItem } from "@/store/tripStore";
import { getExperienceById, Experience, Region } from "@/data/experiences";
import RegionGroup from "@/components/RegionGroup";
import EstimateSummary from "@/components/EstimateSummary";
import WishlistForm from "@/components/WishlistForm";
import SuccessConfirmation from "@/components/SuccessConfirmation";

interface GroupedItem {
  item: TripItem;
  experience: Experience;
}

export default function MyAdventurePage() {
  const items = useTripItems();
  const { tripName, tripShape } = useTripStore();

  const [successData, setSuccessData] = useState<{
    tripRef: string;
    whatsappUrl: string;
  } | null>(null);

  // Group items by region
  const groupedItems = useMemo(() => {
    const groups: Record<Region, GroupedItem[]> = {
      "rift-valley": [],
      "coast": [],
      "central": [],
      "northern": [],
      "nairobi": [],
      "western": [],
    };

    items.forEach((item) => {
      const experience = getExperienceById(item.experienceId);
      if (experience) {
        groups[experience.region].push({ item, experience });
      }
    });

    // Filter out empty regions and return as array
    return Object.entries(groups)
      .filter(([, regionItems]) => regionItems.length > 0)
      .map(([region, regionItems]) => ({
        region: region as Region,
        items: regionItems,
      }));
  }, [items]);

  const handleSuccess = (tripRef: string, whatsappUrl: string) => {
    setSuccessData({ tripRef, whatsappUrl });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Success state
  if (successData) {
    return (
      <main className="min-h-screen bg-background">
        <div className="mx-auto max-w-2xl px-4 py-12">
          <SuccessConfirmation
            tripRef={successData.tripRef}
            whatsappUrl={successData.whatsappUrl}
          />
        </div>
      </main>
    );
  }

  // Empty state
  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-background">
        <div className="mx-auto max-w-2xl px-4 py-16 text-center">
          <div className="text-6xl">🎒</div>
          <h1 className="mt-6 text-2xl font-bold">Your Trip Bag is Empty</h1>
          <p className="mx-auto mt-3 max-w-md text-[color-mix(in_oklab,var(--foreground)_70%,transparent)]">
            Start building your dream Kenya adventure by adding experiences you love.
          </p>
          <Link
            href="/"
            className="mt-8 inline-flex items-center justify-center rounded-xl bg-brand px-6 py-3 text-sm font-semibold text-white transition hover:brightness-110"
          >
            Browse Experiences
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background pb-32 sm:pb-12">
      <div className="mx-auto max-w-6xl px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-[color-mix(in_oklab,var(--foreground)_60%,transparent)] transition hover:text-foreground"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back to experiences
          </Link>
          <h1 className="mt-4 text-2xl font-bold sm:text-3xl">
            {tripName || "My Kenya Adventure"}
          </h1>
          <p className="mt-2 text-[color-mix(in_oklab,var(--foreground)_70%,transparent)]">
            {items.length} experience{items.length !== 1 ? "s" : ""} selected
            {tripShape.days && ` • ${tripShape.days} days`}
            {tripShape.startingCity && ` • Starting from ${tripShape.startingCity}`}
          </p>
        </div>

        {/* Main content grid */}
        <div className="grid gap-8 lg:grid-cols-[1fr,380px]">
          {/* Left: Wishlist items grouped by region */}
          <div className="space-y-8">
            <div className="rounded-2xl border border-border bg-card p-6">
              <h2 className="mb-6 flex items-center gap-2 text-lg font-semibold">
                <span>🎒</span>
                Your Wishlist
              </h2>
              <div className="space-y-8">
                {groupedItems.map(({ region, items }) => (
                  <RegionGroup key={region} region={region} items={items} />
                ))}
              </div>
            </div>

            {/* Form section */}
            <div className="rounded-2xl border border-border bg-card p-6">
              <WishlistForm onSuccess={handleSuccess} />
            </div>
          </div>

          {/* Right: Estimate summary - sticky on desktop */}
          <div className="hidden lg:block">
            <div className="sticky top-24">
              <EstimateSummary />
            </div>
          </div>
        </div>

        {/* Mobile estimate summary */}
        <div className="mt-8 lg:hidden">
          <EstimateSummary />
        </div>
      </div>
    </main>
  );
}
