"use client";

import { Experience, getRegionName, Region } from "@/data/experiences";
import { TripItem } from "@/store/tripStore";
import WishlistItem from "./WishlistItem";

interface RegionGroupProps {
  region: Region;
  items: { item: TripItem; experience: Experience }[];
}

export default function RegionGroup({ region, items }: RegionGroupProps) {
  const regionName = getRegionName(region);

  return (
    <div className="space-y-3">
      <h3 className="flex items-center gap-2 text-sm font-semibold text-[color-mix(in_oklab,var(--foreground)_70%,transparent)]">
        <span className="text-base">📍</span>
        {regionName}
      </h3>
      <div className="space-y-3">
        {items.map(({ item, experience }) => (
          <WishlistItem
            key={experience.id}
            experience={experience}
            priority={item.priority}
          />
        ))}
      </div>
    </div>
  );
}
