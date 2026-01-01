"use client";

import { vibes, VibeCategory } from "@/data/vibes";

interface VibePillsProps {
  selected: VibeCategory | null;
  onSelect: (vibe: VibeCategory | null) => void;
}

export default function VibePills({ selected, onSelect }: VibePillsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {/* All pill */}
      <button
        onClick={() => onSelect(null)}
        className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
          selected === null
            ? "border-brand bg-brand text-white"
            : "border-border bg-card text-foreground hover:border-brand hover:text-brand"
        }`}
      >
        All Experiences
      </button>

      {/* Vibe pills */}
      {vibes.map((vibe) => (
        <button
          key={vibe.id}
          onClick={() => onSelect(vibe.id)}
          className={`flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-medium transition ${
            selected === vibe.id
              ? "border-brand bg-brand text-white"
              : "border-border bg-card text-foreground hover:border-brand hover:text-brand"
          }`}
        >
          <span>{vibe.icon}</span>
          <span>{vibe.name}</span>
        </button>
      ))}
    </div>
  );
}
