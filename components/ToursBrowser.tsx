"use client";

import { useMemo, useState } from "react";
import type { Tour } from "../data/tours";
import TourCard from "./TourCard";

type DurationBucket = "Any" | "1-2" | "3-5" | "6-10";
type PriceBucket = "Any" | "under-250" | "250-750" | "750-plus";

function parseDays(duration: string): number | null {
  const match = duration.match(/(\d+)\s*days?/i);
  if (!match) return null;
  const days = Number(match[1]);
  return Number.isFinite(days) ? days : null;
}

function matchesDuration(tour: Tour, bucket: DurationBucket) {
  if (bucket === "Any") return true;
  const days = parseDays(tour.duration);
  if (days == null) return true;
  if (bucket === "1-2") return days >= 1 && days <= 2;
  if (bucket === "3-5") return days >= 3 && days <= 5;
  return days >= 6 && days <= 10;
}

function matchesPrice(tour: Tour, bucket: PriceBucket) {
  if (bucket === "Any") return true;
  const price = tour.price.usdFrom;
  if (bucket === "under-250") return price < 250;
  if (bucket === "250-750") return price >= 250 && price <= 750;
  return price > 750;
}

export default function ToursBrowser({ tours }: { tours: Tour[] }) {
  const destinations = useMemo(() => {
    const items = Array.from(new Set(tours.map((t) => t.location)));
    items.sort((a, b) => a.localeCompare(b));
    return items;
  }, [tours]);

  const types = useMemo(() => {
    const items = Array.from(new Set(tours.map((t) => t.type)));
    items.sort((a, b) => a.localeCompare(b));
    return items;
  }, [tours]);

  const [selectedDestinations, setSelectedDestinations] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [duration, setDuration] = useState<DurationBucket>("Any");
  const [price, setPrice] = useState<PriceBucket>("Any");

  const filtered = useMemo(() => {
    return tours
      .filter((tour) => {
        if (
          selectedDestinations.length > 0 &&
          !selectedDestinations.includes(tour.location)
        ) {
          return false;
        }
        if (selectedTypes.length > 0 && !selectedTypes.includes(tour.type)) {
          return false;
        }
        if (!matchesDuration(tour, duration)) return false;
        if (!matchesPrice(tour, price)) return false;
        return true;
      })
      .sort((a, b) => b.rating - a.rating);
  }, [tours, selectedDestinations, selectedTypes, duration, price]);

  const pageSize = 6;
  const [page, setPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const start = (currentPage - 1) * pageSize;
  const items = filtered.slice(start, start + pageSize);

  function toggleDestination(location: string) {
    setPage(1);
    setSelectedDestinations((prev) =>
      prev.includes(location) ? prev.filter((v) => v !== location) : [...prev, location],
    );
  }

  function toggleType(type: string) {
    setPage(1);
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((v) => v !== type) : [...prev, type],
    );
  }

  function clearAll() {
    setSelectedDestinations([]);
    setSelectedTypes([]);
    setDuration("Any");
    setPrice("Any");
    setPage(1);
  }

  return (
    <div className="mt-8 grid gap-6 lg:grid-cols-[280px_1fr]">
      <aside className="h-fit rounded-2xl border border-border bg-card p-5">
        <div className="flex items-center justify-between gap-4">
          <div className="text-sm font-semibold">Filters</div>
          <button
            type="button"
            onClick={clearAll}
            className="text-xs font-semibold text-brand hover:underline"
          >
            Clear
          </button>
        </div>

        <div className="mt-4 grid gap-4">
          <div>
            <div className="text-xs font-semibold">Destination</div>
            <div className="mt-2 grid gap-2">
              {destinations.map((d) => (
                <label key={d} className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    className="size-4"
                    checked={selectedDestinations.includes(d)}
                    onChange={() => toggleDestination(d)}
                  />
                  <span>{d}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <div className="text-xs font-semibold">Duration</div>
            <select
              value={duration}
              onChange={(e) => {
                setPage(1);
                setDuration(e.target.value as DurationBucket);
              }}
              className="mt-2 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm"
            >
              <option value="Any">Any</option>
              <option value="1-2">1–2 days</option>
              <option value="3-5">3–5 days</option>
              <option value="6-10">6–10 days</option>
            </select>
          </div>

          <div>
            <div className="text-xs font-semibold">Price Range</div>
            <select
              value={price}
              onChange={(e) => {
                setPage(1);
                setPrice(e.target.value as PriceBucket);
              }}
              className="mt-2 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm"
            >
              <option value="Any">Any</option>
              <option value="under-250">Under $250</option>
              <option value="250-750">$250–$750</option>
              <option value="750-plus">$750+</option>
            </select>
          </div>

          <div>
            <div className="text-xs font-semibold">Type</div>
            <div className="mt-2 grid gap-2">
              {types.map((t) => (
                <label key={t} className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    className="size-4"
                    checked={selectedTypes.includes(t)}
                    onChange={() => toggleType(t)}
                  />
                  <span>{t}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </aside>

      <section>
        <div className="flex flex-col items-start justify-between gap-3 rounded-2xl border border-border bg-card px-5 py-4 text-sm sm:flex-row sm:items-center">
          <div className="font-semibold">
            {filtered.length} trip{filtered.length === 1 ? "" : "s"} found
          </div>
          <div className="text-[color-mix(in_oklab,var(--foreground)_70%,transparent)]">
            Sorted by rating
          </div>
        </div>

        <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((tour) => (
            <TourCard key={tour.slug} tour={tour} />
          ))}
        </div>

        {totalPages > 1 ? (
          <div className="mt-10 flex items-center justify-between rounded-2xl border border-border bg-card px-5 py-4 text-sm">
            <div className="text-[color-mix(in_oklab,var(--foreground)_70%,transparent)]">
              Page {currentPage} of {totalPages}
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="rounded-xl border border-border bg-background px-3 py-2 text-sm font-semibold hover:bg-muted disabled:cursor-not-allowed disabled:opacity-60"
              >
                Prev
              </button>
              <button
                type="button"
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="rounded-xl border border-border bg-background px-3 py-2 text-sm font-semibold hover:bg-muted disabled:cursor-not-allowed disabled:opacity-60"
              >
                Next
              </button>
            </div>
          </div>
        ) : null}
      </section>
    </div>
  );
}

