"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Priority = "must-do" | "if-time";
export type AccommodationTier = "budget" | "midrange" | "comfort" | "luxury";

export interface TripItem {
  experienceId: string;
  priority: Priority;
  addedAt: string; // ISO string for serialization
}

export interface TripShape {
  days: number | null;
  startingCity: string | null;
}

interface TripStore {
  // Trip items
  items: TripItem[];
  addItem: (experienceId: string) => void;
  removeItem: (experienceId: string) => void;
  togglePriority: (experienceId: string) => void;
  clearItems: () => void;
  isInBag: (experienceId: string) => boolean;

  // Trip shape
  tripShape: TripShape;
  setTripDays: (days: number) => void;
  setStartingCity: (city: string) => void;

  // Accommodation
  accommodationTier: AccommodationTier;
  setAccommodationTier: (tier: AccommodationTier) => void;

  // Trip name
  tripName: string;
  setTripName: (name: string) => void;

  // UI state
  hasSeenTripShapeDrawer: boolean;
  setHasSeenTripShapeDrawer: (seen: boolean) => void;
  isDrawerOpen: boolean;
  setIsDrawerOpen: (open: boolean) => void;

  // Audience (for pricing)
  isResident: boolean;
  setIsResident: (resident: boolean) => void;

  // Reset entire store
  resetTrip: () => void;
}

const initialState = {
  items: [] as TripItem[],
  tripShape: { days: null, startingCity: null } as TripShape,
  accommodationTier: "comfort" as AccommodationTier,
  tripName: "",
  hasSeenTripShapeDrawer: false,
  isDrawerOpen: false,
  isResident: false,
};

export const useTripStore = create<TripStore>()(
  persist(
    (set, get) => ({
      ...initialState,

      // Trip items
      addItem: (experienceId: string) => {
        const { items, hasSeenTripShapeDrawer, setIsDrawerOpen } = get();
        const exists = items.some((item) => item.experienceId === experienceId);
        if (exists) return;

        const newItem: TripItem = {
          experienceId,
          priority: "must-do",
          addedAt: new Date().toISOString(),
        };

        set({ items: [...items, newItem] });

        // Show drawer after first item if not seen
        if (items.length === 0 && !hasSeenTripShapeDrawer) {
          // Small delay to let the add animation complete
          setTimeout(() => {
            setIsDrawerOpen(true);
          }, 500);
        }
      },

      removeItem: (experienceId: string) => {
        set((state) => ({
          items: state.items.filter(
            (item) => item.experienceId !== experienceId
          ),
        }));
      },

      togglePriority: (experienceId: string) => {
        set((state) => ({
          items: state.items.map((item) =>
            item.experienceId === experienceId
              ? {
                  ...item,
                  priority: item.priority === "must-do" ? "if-time" : "must-do",
                }
              : item
          ),
        }));
      },

      clearItems: () => {
        set({ items: [] });
      },

      isInBag: (experienceId: string) => {
        return get().items.some((item) => item.experienceId === experienceId);
      },

      // Trip shape
      setTripDays: (days: number) => {
        set((state) => ({
          tripShape: { ...state.tripShape, days },
        }));
      },

      setStartingCity: (city: string) => {
        set((state) => ({
          tripShape: { ...state.tripShape, startingCity: city },
        }));
      },

      // Accommodation
      setAccommodationTier: (tier: AccommodationTier) => {
        set({ accommodationTier: tier });
      },

      // Trip name
      setTripName: (name: string) => {
        set({ tripName: name });
      },

      // UI state
      setHasSeenTripShapeDrawer: (seen: boolean) => {
        set({ hasSeenTripShapeDrawer: seen });
      },

      setIsDrawerOpen: (open: boolean) => {
        set({ isDrawerOpen: open });
      },

      // Audience
      setIsResident: (resident: boolean) => {
        set({ isResident: resident });
      },

      // Reset
      resetTrip: () => {
        set({
          ...initialState,
          hasSeenTripShapeDrawer: true, // Don't show drawer again after reset
        });
      },
    }),
    {
      name: "brookshore-trip-storage",
      // Only persist these fields
      partialize: (state) => ({
        items: state.items,
        tripShape: state.tripShape,
        accommodationTier: state.accommodationTier,
        tripName: state.tripName,
        hasSeenTripShapeDrawer: state.hasSeenTripShapeDrawer,
        isResident: state.isResident,
      }),
    }
  )
);

// Selector hooks for common operations
export const useTripItems = () => useTripStore((state) => state.items);
export const useTripItemCount = () =>
  useTripStore((state) => state.items.length);
export const useIsResident = () => useTripStore((state) => state.isResident);
export const useAccommodationTier = () =>
  useTripStore((state) => state.accommodationTier);
