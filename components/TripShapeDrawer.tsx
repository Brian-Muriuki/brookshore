"use client";

import { useState } from "react";
import { useTripStore } from "@/store/tripStore";

const TRIP_DAYS = [3, 5, 7, 10, 14] as const;
const STARTING_CITIES = [
  { id: "nairobi", name: "Nairobi" },
  { id: "mombasa", name: "Mombasa" },
  { id: "diani", name: "Diani" },
  { id: "not-sure", name: "Not sure yet" },
] as const;

export default function TripShapeDrawer() {
  const {
    isDrawerOpen,
    setIsDrawerOpen,
    setHasSeenTripShapeDrawer,
    tripShape,
    setTripDays,
    setStartingCity,
  } = useTripStore();

  const [selectedDays, setSelectedDays] = useState<number | null>(
    tripShape.days
  );
  const [selectedCity, setSelectedCity] = useState<string | null>(
    tripShape.startingCity
  );

  if (!isDrawerOpen) return null;

  const handleSave = () => {
    if (selectedDays) setTripDays(selectedDays);
    if (selectedCity) setStartingCity(selectedCity);
    setHasSeenTripShapeDrawer(true);
    setIsDrawerOpen(false);
  };

  const handleSkip = () => {
    setHasSeenTripShapeDrawer(true);
    setIsDrawerOpen(false);
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleSkip();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <div
        className="w-full max-w-lg animate-slide-up rounded-t-3xl bg-card p-6 pb-8 shadow-xl"
        role="dialog"
        aria-modal="true"
      >
        {/* Drag handle */}
        <div className="mb-4 flex justify-center">
          <div className="h-1 w-10 rounded-full bg-border" />
        </div>

        {/* Header */}
        <h2 className="text-lg font-bold">Great start! Quick questions:</h2>

        {/* Trip length */}
        <div className="mt-6">
          <label className="text-sm font-medium text-[color-mix(in_oklab,var(--foreground)_80%,transparent)]">
            Roughly how many days do you have?
          </label>
          <div className="mt-3 flex flex-wrap gap-2">
            {TRIP_DAYS.map((days) => (
              <button
                key={days}
                onClick={() => setSelectedDays(days)}
                className={`rounded-xl border px-4 py-2.5 text-sm font-medium transition ${
                  selectedDays === days
                    ? "border-brand bg-brand text-white"
                    : "border-border bg-card hover:border-brand"
                }`}
              >
                {days === 14 ? "14+" : days} days
              </button>
            ))}
          </div>
        </div>

        {/* Starting city */}
        <div className="mt-6">
          <label className="text-sm font-medium text-[color-mix(in_oklab,var(--foreground)_80%,transparent)]">
            Where are you landing?
          </label>
          <div className="mt-3 flex flex-wrap gap-2">
            {STARTING_CITIES.map((city) => (
              <button
                key={city.id}
                onClick={() => setSelectedCity(city.id)}
                className={`rounded-xl border px-4 py-2.5 text-sm font-medium transition ${
                  selectedCity === city.id
                    ? "border-brand bg-brand text-white"
                    : "border-border bg-card hover:border-brand"
                }`}
              >
                {city.name}
              </button>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="mt-8 flex gap-3">
          <button
            onClick={handleSkip}
            className="flex-1 rounded-xl border border-border py-3 text-sm font-semibold transition hover:bg-muted"
          >
            Skip for now
          </button>
          <button
            onClick={handleSave}
            className="flex-1 rounded-xl bg-brand py-3 text-sm font-semibold text-white transition hover:brightness-110"
          >
            Save & Continue
          </button>
        </div>
      </div>

      {/* Animation keyframes */}
      <style jsx>{`
        @keyframes slide-up {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
