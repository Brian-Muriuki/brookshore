export type VibeCategory =
  | "safari"
  | "beach"
  | "mountains"
  | "lakes"
  | "culture"
  | "adrenaline";

export interface Vibe {
  id: VibeCategory;
  name: string;
  icon: string;
  description: string;
  colorAccent: string;
}

export const vibes: Vibe[] = [
  {
    id: "safari",
    name: "Safari & Wildlife",
    icon: "🦁",
    description: "Witness the Big Five in their natural habitat",
    colorAccent: "amber",
  },
  {
    id: "beach",
    name: "Beach & Coast",
    icon: "🏖️",
    description: "White sands, turquoise waters, and island life",
    colorAccent: "teal",
  },
  {
    id: "mountains",
    name: "Mountains & Hiking",
    icon: "⛰️",
    description: "Conquer peaks and explore scenic trails",
    colorAccent: "slate",
  },
  {
    id: "lakes",
    name: "Lakes & Rift Valley",
    icon: "🌊",
    description: "Flamingos, hippos, and boat rides on the lakes",
    colorAccent: "blue",
  },
  {
    id: "culture",
    name: "Culture & Heritage",
    icon: "🏛️",
    description: "Connect with history, tribes, and ancient cities",
    colorAccent: "orange",
  },
  {
    id: "adrenaline",
    name: "Adrenaline & Fun",
    icon: "🪂",
    description: "Rafting, skydiving, and thrill-seeking adventures",
    colorAccent: "red",
  },
];

export function getVibeById(id: VibeCategory): Vibe | undefined {
  return vibes.find((v) => v.id === id);
}

export function getVibeColor(id: VibeCategory): string {
  const colorMap: Record<VibeCategory, string> = {
    safari: "bg-amber-100 text-amber-800 border-amber-200",
    beach: "bg-teal-100 text-teal-800 border-teal-200",
    mountains: "bg-slate-100 text-slate-800 border-slate-200",
    lakes: "bg-blue-100 text-blue-800 border-blue-200",
    culture: "bg-orange-100 text-orange-800 border-orange-200",
    adrenaline: "bg-red-100 text-red-800 border-red-200",
  };
  return colorMap[id] || "bg-gray-100 text-gray-800 border-gray-200";
}
