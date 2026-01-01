export type TourPrice = {
  usdFrom: number;
  kesFrom: number;
};

export type TourItineraryDay = {
  day: string;
  title: string;
  description: string;
};

export type Tour = {
  slug: string;
  title: string;
  location: string;
  duration: string;
  groupType: "Private" | "Group";
  type: "Safari" | "Beach" | "Weekend" | "Corporate";
  rating: number;
  reviewCount: number;
  price: TourPrice;
  highlights: string[];
  images: string[];
  inclusions: string[];
  exclusions: string[];
  itinerary: TourItineraryDay[];
};

export const tours: Tour[] = [
  {
    slug: "maasai-mara-3-day-safari",
    title: "3-Day Maasai Mara Safari",
    location: "Maasai Mara",
    duration: "3 days / 2 nights",
    groupType: "Private",
    type: "Safari",
    rating: 4.8,
    reviewCount: 126,
    price: { usdFrom: 690, kesFrom: 89000 },
    highlights: [
      "Sunrise game drives with a professional guide",
      "Optional Maasai village visit",
      "Handpicked mid-range camp options",
    ],
    images: [
      "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1521651201144-634f700b36ef?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1600&q=80",
    ],
    inclusions: [
      "Transport (4x4 safari vehicle)",
      "Park fees",
      "Professional driver-guide",
      "2 nights accommodation",
      "Meals as per itinerary",
      "Bottled water during drives",
    ],
    exclusions: [
      "Flights",
      "Travel insurance",
      "Tips and personal expenses",
      "Optional activities",
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Nairobi → Maasai Mara",
        description:
          "Pick up in Nairobi, drive to the Mara, check-in and afternoon game drive for your first sightings.",
      },
      {
        day: "Day 2",
        title: "Full-Day Game Drives",
        description:
          "Early start for big-cat territory, picnic lunch in the reserve, and sunset drive with golden-hour views.",
      },
      {
        day: "Day 3",
        title: "Mara → Nairobi",
        description:
          "Optional morning drive, then return to Nairobi with drop-off at your hotel or the airport.",
      },
    ],
  },
  {
    slug: "amboseli-2-day-elephants",
    title: "2-Day Amboseli Elephants & Kilimanjaro Views",
    location: "Amboseli",
    duration: "2 days / 1 night",
    groupType: "Group",
    type: "Safari",
    rating: 4.7,
    reviewCount: 84,
    price: { usdFrom: 420, kesFrom: 54000 },
    highlights: [
      "Iconic elephant herds",
      "Kilimanjaro backdrop photo moments",
      "Perfect quick safari from Nairobi",
    ],
    images: [
      "https://images.unsplash.com/photo-1509281373149-e957c6296406?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1521412644187-c49fa049e84d?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1549366021-9f761d040a41?auto=format&fit=crop&w=1600&q=80",
    ],
    inclusions: [
      "Transport (tour van / 4x4 depending on group)",
      "Park fees",
      "Professional guide",
      "1 night accommodation",
      "Meals as per itinerary",
    ],
    exclusions: ["Flights", "Travel insurance", "Tips and personal expenses"],
    itinerary: [
      {
        day: "Day 1",
        title: "Nairobi → Amboseli",
        description:
          "Morning departure, arrival for lunch, then an afternoon game drive focused on elephant sightings.",
      },
      {
        day: "Day 2",
        title: "Sunrise Drive → Nairobi",
        description:
          "Short early game drive, breakfast, then return to Nairobi mid/late afternoon.",
      },
    ],
  },
  {
    slug: "diani-4-day-beach-escape",
    title: "4-Day Diani Beach Escape",
    location: "Diani",
    duration: "4 days / 3 nights",
    groupType: "Private",
    type: "Beach",
    rating: 4.9,
    reviewCount: 57,
    price: { usdFrom: 560, kesFrom: 72000 },
    highlights: [
      "White-sand beaches & turquoise water",
      "Optional dolphin cruise",
      "Flexible add-ons (Wasini, Kaya Forest)",
    ],
    images: [
      "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1483683804023-6ccdb62f86ef?auto=format&fit=crop&w=1600&q=80",
    ],
    inclusions: [
      "Accommodation (3 nights)",
      "Breakfast daily",
      "Airport / SGR transfers (optional add-on)",
      "Local support while in Diani",
    ],
    exclusions: ["Flights/SGR tickets", "Travel insurance", "Meals not listed"],
    itinerary: [
      {
        day: "Day 1",
        title: "Arrival & Check-in",
        description:
          "Arrive in Diani, settle in, and enjoy a relaxed evening by the coast.",
      },
      {
        day: "Day 2",
        title: "Beach Day / Optional Excursions",
        description:
          "Free day at the beach. Optional Wasini trip or dhow sunset cruise.",
      },
      {
        day: "Day 3",
        title: "Explore & Unwind",
        description:
          "Choose a snorkel session, spa time, or visit nearby attractions at your own pace.",
      },
      {
        day: "Day 4",
        title: "Departure",
        description: "Check out and transfer to the airport/SGR for departure.",
      },
    ],
  },
  {
    slug: "naivasha-weekend-getaway",
    title: "Naivasha Weekend Getaway (Resident-Friendly)",
    location: "Naivasha",
    duration: "2 days / 1 night",
    groupType: "Group",
    type: "Weekend",
    rating: 4.6,
    reviewCount: 92,
    price: { usdFrom: 190, kesFrom: 24500 },
    highlights: [
      "Lake Naivasha boat ride (optional)",
      "Hell’s Gate cycling (optional)",
      "Great for couples & small groups",
    ],
    images: [
      "https://images.unsplash.com/photo-1544986581-efac024faf62?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80",
    ],
    inclusions: ["Transport", "1 night accommodation", "Breakfast"],
    exclusions: ["Park fees (if applicable)", "Optional activities", "Lunch/dinner"],
    itinerary: [
      {
        day: "Day 1",
        title: "Nairobi → Naivasha",
        description:
          "Drive to Naivasha, check-in, and choose your afternoon activity: boat ride or relaxed lakeside time.",
      },
      {
        day: "Day 2",
        title: "Hell’s Gate / Return",
        description:
          "Optional Hell’s Gate visit, then return to Nairobi in the afternoon.",
      },
    ],
  },
];

export function getTourBySlug(slug: string): Tour | undefined {
  return tours.find((t) => t.slug === slug);
}
