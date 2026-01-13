"use client";

import { useTranslations } from "next-intl";
import { vibes, VibeCategory, getVibeColor } from "@/data/legacy/vibes";

interface VibePillsProps {
  selectedVibe: VibeCategory | "all";
  onSelect: (vibe: VibeCategory | "all") => void;
  tourCounts?: Record<VibeCategory | "all", number>;
}

export default function VibePills({
  selectedVibe,
  onSelect,
  tourCounts,
}: VibePillsProps) {
  const t = useTranslations("vibes");

  return (
    <div className="flex flex-wrap gap-2 mb-8">
      {/* All pill */}
      <button
        type="button"
        onClick={() => onSelect("all")}
        className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
          selectedVibe === "all"
            ? "bg-brand text-white"
            : "bg-muted text-foreground hover:bg-muted/80"
        }`}
      >
        {t("all")}
        {tourCounts && tourCounts.all > 0 && (
          <span className="ml-1.5 text-xs opacity-70">({tourCounts.all})</span>
        )}
      </button>

      {/* Vibe pills */}
      {vibes.map((vibe) => {
        const isSelected = selectedVibe === vibe.id;
        const colorClasses = isSelected
          ? getVibeColor(vibe.id)
          : "bg-muted text-foreground hover:bg-muted/80";

        return (
          <button
            key={vibe.id}
            type="button"
            onClick={() => onSelect(vibe.id)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-all flex items-center gap-1.5 ${
              isSelected ? colorClasses + " border" : colorClasses
            }`}
          >
            <span>{vibe.icon}</span>
            <span>{t(vibe.id)}</span>
            {tourCounts && tourCounts[vibe.id] > 0 && (
              <span className="text-xs opacity-70">
                ({tourCounts[vibe.id]})
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
