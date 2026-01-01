"use client";

import { useEffect } from "react";
import { Experience, getExperienceById } from "@/data/experiences";
import { getVibeById } from "@/data/vibes";
import { formatPriceRange, getExperiencePrice } from "@/lib/pricing";
import { useTripStore } from "@/store/tripStore";

interface ExperienceInfoModalProps {
  experience: Experience;
  isOpen: boolean;
  onClose: () => void;
}

export default function ExperienceInfoModal({
  experience,
  isOpen,
  onClose,
}: ExperienceInfoModalProps) {
  const { addItem, removeItem, isInBag, isResident } = useTripStore();
  const inBag = isInBag(experience.id);
  const vibe = getVibeById(experience.vibe);
  const priceRange = getExperiencePrice(experience, isResident);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleToggle = () => {
    if (inBag) {
      removeItem(experience.id);
    } else {
      addItem(experience.id);
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Get pairing experiences
  const pairings = experience.pairings
    .map((id) => getExperienceById(id))
    .filter(Boolean) as Experience[];

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 backdrop-blur-sm sm:items-center"
      onClick={handleBackdropClick}
    >
      {/* Modal */}
      <div
        className="relative max-h-[85vh] w-full max-w-lg overflow-auto rounded-t-3xl bg-card sm:rounded-3xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Drag handle (mobile) */}
        <div className="sticky top-0 z-10 flex justify-center bg-card pt-3 sm:hidden">
          <div className="h-1 w-10 rounded-full bg-border" />
        </div>

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-muted text-foreground transition hover:bg-border"
          aria-label="Close"
        >
          ✕
        </button>

        {/* Content */}
        <div className="p-6 pt-4 sm:pt-6">
          {/* Header */}
          <div className="pr-8">
            <h2 id="modal-title" className="text-xl font-bold">
              {experience.name}
            </h2>
            <p className="mt-1 text-sm text-[color-mix(in_oklab,var(--foreground)_65%,transparent)]">
              {vibe?.icon} {vibe?.name} • {experience.duration}
            </p>
          </div>

          {/* Divider */}
          <hr className="my-4 border-border" />

          {/* Pricing section */}
          <div>
            <h3 className="flex items-center gap-2 text-sm font-semibold">
              <span>💰</span> Pricing
            </h3>
            <p className="mt-2 text-lg font-semibold">
              {formatPriceRange(priceRange)} /person
            </p>
            {experience.pricingNote && (
              <p className="mt-1 flex items-start gap-1.5 text-xs text-amber-600">
                <span>⚠️</span>
                <span>{experience.pricingNote}</span>
              </p>
            )}
          </div>

          {/* Divider */}
          <hr className="my-4 border-border" />

          {/* What's included */}
          <div>
            <h3 className="flex items-center gap-2 text-sm font-semibold">
              <span>✓</span> What&apos;s Included
            </h3>
            <ul className="mt-2 space-y-1.5">
              {experience.includes.map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-sm text-[color-mix(in_oklab,var(--foreground)_80%,transparent)]"
                >
                  <span className="text-brand">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Pairs well with */}
          {pairings.length > 0 && (
            <>
              <hr className="my-4 border-border" />
              <div>
                <h3 className="flex items-center gap-2 text-sm font-semibold">
                  <span>🔗</span> Pairs Well With
                </h3>
                <div className="mt-2 flex flex-wrap gap-2">
                  {pairings.map((pairing) => (
                    <span
                      key={pairing.id}
                      className="rounded-full bg-muted px-3 py-1 text-xs font-medium"
                    >
                      {pairing.name}
                    </span>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Disclaimer */}
          <hr className="my-4 border-border" />
          <p className="text-xs text-[color-mix(in_oklab,var(--foreground)_55%,transparent)]">
            ℹ️ Final quote depends on dates, group size, and availability. Your
            expert will confirm exact pricing.
          </p>

          {/* Action button */}
          <button
            onClick={handleToggle}
            className={`mt-6 w-full rounded-xl py-3 text-sm font-semibold transition ${
              inBag
                ? "bg-red-50 text-red-600 hover:bg-red-100"
                : "bg-brand text-white hover:brightness-110"
            }`}
          >
            {inBag ? "Remove from My Trip" : "♥ Add to My Trip"}
          </button>
        </div>
      </div>
    </div>
  );
}
