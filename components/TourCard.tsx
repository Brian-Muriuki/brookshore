import Image from "next/image";
import Link from "next/link";
import type { Tour } from "../data/tours";

export default function TourCard({ tour }: { tour: Tour }) {
  return (
    <Link
      href={`/tours/${tour.slug}`}
      className="group overflow-hidden rounded-2xl border border-border bg-card transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/5"
    >
      <div className="relative aspect-[16/10]">
        <Image
          src={tour.images[0]}
          alt={tour.title}
          fill
          className="object-cover transition duration-500 group-hover:scale-[1.03]"
        />
        <div className="absolute left-3 top-3 rounded-full bg-black/55 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
          {tour.type}
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="text-sm font-semibold">{tour.title}</div>
            <div className="mt-1 text-xs text-[color-mix(in_oklab,var(--foreground)_70%,transparent)]">
              {tour.location} • {tour.duration} • {tour.groupType}
            </div>
          </div>
          <div className="text-right">
            <div className="text-xs text-[color-mix(in_oklab,var(--foreground)_70%,transparent)]">
              From
            </div>
            <div className="text-sm font-semibold">
              ${tour.price.usdFrom}
            </div>
          </div>
        </div>
        <div className="mt-3 flex items-center justify-between text-xs text-[color-mix(in_oklab,var(--foreground)_75%,transparent)]">
          <div>
            ★ {tour.rating}{" "}
            <span className="text-[color-mix(in_oklab,var(--foreground)_55%,transparent)]">
              ({tour.reviewCount})
            </span>
          </div>
          <div className="font-semibold text-brand group-hover:underline">
            View details
          </div>
        </div>
      </div>
    </Link>
  );
}

