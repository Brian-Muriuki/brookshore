"use client";

import { useTripItemCount } from "@/store/tripStore";

interface TripBagCounterProps {
  onClick: () => void;
}

export default function TripBagCounter({ onClick }: TripBagCounterProps) {
  const count = useTripItemCount();

  return (
    <button
      onClick={onClick}
      className="relative flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium transition hover:bg-muted"
      aria-label={`Trip bag with ${count} items`}
    >
      <span className="text-lg">🎒</span>
      <span className="hidden sm:inline">My Trip</span>
      {count > 0 && (
        <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-brand px-1.5 text-xs font-bold text-white">
          {count}
        </span>
      )}
    </button>
  );
}
