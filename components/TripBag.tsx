"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { getExperienceById } from "@/data/experiences";
import { useTripStore, useTripItems, useIsResident } from "@/store/tripStore";
import { calculateTripEstimate, formatPriceRange } from "@/lib/pricing";

interface TripBagProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function TripBag({ isOpen, onClose }: TripBagProps) {
  const items = useTripItems();
  const isResident = useIsResident();
  const removeItem = useTripStore((state) => state.removeItem);

  // Close on escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const estimate = calculateTripEstimate(items, isResident);

  // Get experience details for each item
  const itemsWithDetails = items
    .map((item) => ({
      ...item,
      experience: getExperienceById(item.experienceId),
    }))
    .filter((item) => item.experience !== undefined);

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Dropdown */}
      <div className="absolute right-0 top-full z-50 mt-2 w-80 overflow-hidden rounded-2xl border border-border bg-card shadow-xl sm:w-96">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border p-4">
          <h3 className="font-semibold">My Trip Bag</h3>
          <button
            onClick={onClose}
            className="text-sm text-[color-mix(in_oklab,var(--foreground)_60%,transparent)] hover:text-foreground"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="max-h-80 overflow-y-auto">
          {itemsWithDetails.length === 0 ? (
            /* Empty state */
            <div className="px-4 py-8 text-center">
              <div className="text-4xl">🎒</div>
              <p className="mt-2 text-sm font-medium">
                Your backpack is empty!
              </p>
              <p className="mt-1 text-xs text-[color-mix(in_oklab,var(--foreground)_60%,transparent)]">
                Start adding some adventures.
              </p>
              <button
                onClick={onClose}
                className="mt-4 rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white hover:brightness-110"
              >
                Browse Experiences
              </button>
            </div>
          ) : (
            /* Items list */
            <div className="divide-y divide-border">
              {itemsWithDetails.map(({ experienceId, experience }) => {
                if (!experience) return null;
                const price = isResident
                  ? experience.pricing.resident
                  : experience.pricing.international;
                const currency = isResident ? "KES" : "USD";
                const symbol = isResident ? "KES " : "$";

                return (
                  <div
                    key={experienceId}
                    className="flex items-center gap-3 p-3"
                  >
                    {/* Image */}
                    <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-lg">
                      <Image
                        src={experience.image}
                        alt={experience.name}
                        fill
                        className="object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = "/images/placeholder-experience.jpg";
                        }}
                      />
                    </div>

                    {/* Details */}
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">
                        {experience.name}
                      </p>
                      <p className="text-xs text-[color-mix(in_oklab,var(--foreground)_60%,transparent)]">
                        {symbol}
                        {price.from.toLocaleString()} - {symbol}
                        {price.to.toLocaleString()}
                      </p>
                    </div>

                    {/* Remove button */}
                    <button
                      onClick={() => removeItem(experienceId)}
                      className="text-xs text-red-500 hover:text-red-600"
                    >
                      Remove
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer with estimate */}
        {itemsWithDetails.length > 0 && (
          <div className="border-t border-border p-4">
            {/* Estimate */}
            <div className="mb-1 text-xs text-[color-mix(in_oklab,var(--foreground)_60%,transparent)]">
              Experiences estimate:
            </div>
            <div className="text-lg font-bold">
              {formatPriceRange(estimate)} /person
            </div>
            <p className="mt-1 text-xs text-[color-mix(in_oklab,var(--foreground)_50%,transparent)]">
              Final quote adds: routing & transfers
            </p>

            {/* CTA */}
            <Link
              href="/my-adventure"
              onClick={onClose}
              className="mt-4 block w-full rounded-xl bg-brand py-3 text-center text-sm font-semibold text-white transition hover:brightness-110"
            >
              Review My Wishlist →
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
