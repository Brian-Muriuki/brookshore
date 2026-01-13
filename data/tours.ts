import { VibeCategory } from "./legacy/vibes";

export type Region =
  | "rift-valley"
  | "coast"
  | "central"
  | "northern"
  | "nairobi"
  | "western";

export interface TourItineraryDay {
  day: number;
  title: string;
  description: string;
  notes?: string[];
}

export interface TourExcursion {
  name: string;
  description: string;
  location: string;
}

export interface TourExcursions {
  enRoute: TourExcursion[];
  atDestination: TourExcursion[];
}

export interface TourPricing {
  international: {
    from: number;
    to: number;
    currency: "USD";
  };
  resident: {
    from: number;
    to: number;
    currency: "KES";
  };
  note?: string;
}

export interface Tour {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  vibe: VibeCategory;
  region: Region;
  duration: string;
  minDays: number;
  maxDays: number;
  destinations: string[];
  highlights: string[];
  itinerary: TourItineraryDay[];
  includes: string[];
  excludes: string[];
  importantNotes: string[];
  excursions: TourExcursions;
  pricing: TourPricing;
  image: string;
  gallery: string[];
}

export const tours: Tour[] = [
  // ==================== SAFARI & WILDLIFE ====================
  {
    id: "maasai-mara-3-day-safari",
    slug: "maasai-mara-3-day-safari",
    title: "3-Day Maasai Mara Safari",
    tagline: "Sunrise game drives with professional guides",
    description:
      "The Masai Mara is Kenya's most famous safari destination, home to the Great Migration where over 1.5 million wildebeest and zebras cross from Tanzania's Serengeti. Beyond the migration, the Mara offers year-round Big Five sightings, dramatic savannah landscapes, and authentic Maasai cultural experiences. This 3-day safari is perfect for travelers wanting the quintessential Kenyan safari experience.",
    vibe: "safari",
    region: "rift-valley",
    duration: "3 Days",
    minDays: 3,
    maxDays: 3,
    destinations: ["Nairobi", "Masai Mara"],
    highlights: [
      "Sunrise game drives with a professional guide",
      "Optional Maasai village visit",
      "Handpicked mid-range camp options",
      "Big Five wildlife viewing",
      "Dramatic savannah landscapes",
    ],
    itinerary: [
      {
        day: 1,
        title: "Nairobi to Masai Mara",
        description:
          "Pick up in Nairobi, drive to the Mara with a scenic stopover at Great Rift Valley. Check-in and afternoon game drive for your first sightings.",
      },
      {
        day: 2,
        title: "Full-Day Game Drives",
        description:
          "Early start for big-cat territory, picnic lunch in the reserve, and sunset drive with golden-hour views.",
      },
      {
        day: 3,
        title: "Mara to Nairobi",
        description:
          "Optional morning drive, then return to Nairobi with drop-off at your hotel or the airport.",
      },
    ],
    includes: [
      "Transport (4x4 safari vehicle)",
      "Park fees",
      "Professional driver-guide",
      "2 nights accommodation",
      "Meals as per itinerary",
      "Bottled water during drives",
    ],
    excludes: [
      "Flights",
      "Travel insurance",
      "Tips and personal expenses",
      "Optional activities",
    ],
    importantNotes: [
      "The last 1-hour drive to Masai Mara is on corrugated road and may not be comfortable for clients with back problems.",
    ],
    excursions: {
      enRoute: [
        {
          name: "Great Rift Valley Viewpoint",
          location: "Near Limuru",
          description:
            "A brief stop about an hour outside Nairobi to take in breathtaking panoramic views of the valley floor. A classic photo opportunity.",
        },
        {
          name: "Narok Town Market Visit",
          location: "Narok",
          description:
            "A stop in Narok, the last major town before the Mara, for an authentic cultural glimpse and a chance to buy Maasai crafts directly from local vendors.",
        },
      ],
      atDestination: [
        {
          name: "Hot Air Balloon Safari",
          location: "Masai Mara",
          description:
            "A premium dawn flight over the Mara plains, offering a spectacular perspective of the wildlife, followed by a bush champagne breakfast.",
        },
        {
          name: "Maasai Village Cultural Visit",
          location: "Masai Mara",
          description:
            "An immersive visit to a traditional homestead to learn about the Maasai way of life and witness their famous jumping dance.",
        },
        {
          name: "Guided Nature Walk",
          location: "Masai Mara conservancy",
          description:
            "An on-foot safari with a ranger focusing on tracking, plants, and smaller wildlife.",
        },
        {
          name: "Sundowners",
          location: "Masai Mara",
          description:
            "End-of-day drinks and snacks served at a scenic viewpoint overlooking the savannah as the sun sets.",
        },
      ],
    },
    pricing: {
      international: { from: 690, to: 950, currency: "USD" },
      resident: { from: 89000, to: 120000, currency: "KES" },
      note: "Prices spike July-Oct (Migration Season)",
    },
    image:
      "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1521651201144-634f700b36ef?auto=format&fit=crop&w=1600&q=80",
    ],
  },
  {
    id: "amboseli-2-day-elephants",
    slug: "amboseli-2-day-elephants",
    title: "2-Day Amboseli Elephants & Kilimanjaro Views",
    tagline: "Huge elephants with Mt. Kilimanjaro backdrops",
    description:
      "Amboseli National Park is famous for its large elephant herds and the stunning backdrop of Mount Kilimanjaro, Africa's highest peak. The park's open landscapes offer some of Kenya's best wildlife photography opportunities, with elephants often silhouetted against the snow-capped mountain. This quick 2-day safari is perfect for those with limited time.",
    vibe: "safari",
    region: "rift-valley",
    duration: "2 Days",
    minDays: 2,
    maxDays: 2,
    destinations: ["Nairobi", "Amboseli"],
    highlights: [
      "Iconic elephant herds",
      "Kilimanjaro backdrop photo moments",
      "Perfect quick safari from Nairobi",
      "Diverse wildlife including lions and cheetahs",
      "Bird watching at seasonal Lake Amboseli",
    ],
    itinerary: [
      {
        day: 1,
        title: "Nairobi to Amboseli",
        description:
          "Morning departure, arrival for lunch, then an afternoon game drive focused on elephant sightings.",
      },
      {
        day: 2,
        title: "Sunrise Drive to Nairobi",
        description:
          "Short early game drive, breakfast, then return to Nairobi mid/late afternoon.",
      },
    ],
    includes: [
      "Transport (tour van / 4x4 depending on group)",
      "Park fees",
      "Professional guide",
      "1 night accommodation",
      "Meals as per itinerary",
    ],
    excludes: ["Flights", "Travel insurance", "Tips and personal expenses"],
    importantNotes: [
      "Clear Kilimanjaro views are best in early morning - clouds often cover it by midday.",
    ],
    excursions: {
      enRoute: [
        {
          name: "Kitengela Hot Glass Studio",
          location: "Nairobi outskirts",
          description:
            "A fascinating stop to watch artisans create beautiful art from recycled glass and explore their unique gallery.",
        },
      ],
      atDestination: [
        {
          name: "Kilimanjaro Viewpoint Sundowners",
          location: "Amboseli",
          description:
            "Enjoying cocktails at a specially chosen spot that offers the best possible views of Mt. Kilimanjaro at sunset.",
        },
        {
          name: "Observation Hill",
          location: "Amboseli",
          description:
            "A guided walk to the top of a volcanic hill that provides a 360-degree view of the park's swamps and plains.",
        },
        {
          name: "Maasai Cultural Experience",
          location: "Amboseli",
          description:
            "A visit to a local Maasai community to learn about their culture and relationship with wildlife.",
        },
      ],
    },
    pricing: {
      international: { from: 420, to: 550, currency: "USD" },
      resident: { from: 54000, to: 70000, currency: "KES" },
    },
    image:
      "https://images.unsplash.com/photo-1509281373149-e957c6296406?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1509281373149-e957c6296406?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1549366021-9f761d040a41?auto=format&fit=crop&w=1600&q=80",
    ],
  },
  {
    id: "mara-migration",
    slug: "mara-migration",
    title: "Masai Mara Migration Safari",
    tagline: "Witness the World Cup of Wildlife in person",
    description:
      "The Masai Mara is Kenya's most famous safari destination, home to the Great Migration where over 1.5 million wildebeest and zebras cross from Tanzania's Serengeti. Beyond the migration, the Mara offers year-round Big Five sightings, dramatic savannah landscapes, and authentic Maasai cultural experiences.",
    vibe: "safari",
    region: "rift-valley",
    duration: "3-5 Days",
    minDays: 3,
    maxDays: 5,
    destinations: ["Nairobi", "Masai Mara"],
    highlights: [
      "Big Five wildlife viewing",
      "Great Migration (seasonal)",
      "Professional driver/guide",
      "Comfortable lodges or luxury tented camps",
      "Stunning sunrises and sunsets",
    ],
    itinerary: [
      {
        day: 1,
        title: "Nairobi to Masai Mara",
        description:
          "Pick up from Nairobi and drive to Masai Mara with scenic stopover at Great Rift Valley. Afternoon game drive.",
      },
      {
        day: 2,
        title: "Full Day in Masai Mara",
        description:
          "Early morning and late afternoon game drives when animals are most active. Close encounters with lions, elephants, and more.",
      },
      {
        day: 3,
        title: "Final Game Drive & Return",
        description:
          "Optional sunrise game drive, breakfast, then return to Nairobi.",
      },
    ],
    includes: [
      "Full board accommodation",
      "Comprehensive game drives",
      "Professional driver/guide",
      "Transport in 4x4 Land Cruiser",
      "Pick-up and drop-off in Nairobi",
    ],
    excludes: [
      "Travel insurance",
      "Tips and gratuities",
      "Alcoholic beverages",
      "Hot air balloon safari (available as add-on)",
      "Maasai village visit (available as add-on)",
    ],
    importantNotes: [
      "Guaranteed migration crossing sightings are not possible - timing is unpredictable.",
      "Expect bumpy dirt tracks, not paved roads.",
    ],
    excursions: {
      enRoute: [
        {
          name: "Great Rift Valley Viewpoint",
          location: "Near Limuru",
          description:
            "Breathtaking panoramic views of the valley floor. A classic photo opportunity.",
        },
      ],
      atDestination: [
        {
          name: "Hot Air Balloon Safari",
          location: "Masai Mara",
          description:
            "A quintessential Mara experience with an unparalleled perspective of the vast plains. Includes champagne breakfast.",
        },
        {
          name: "Maasai Village Visit",
          location: "Masai Mara",
          description:
            "Learn about Maasai culture and witness the famous adumu (jumping) dance.",
        },
        {
          name: "Bush Dinner",
          location: "Masai Mara",
          description:
            "A special lantern-lit meal in a private location in the wild.",
        },
      ],
    },
    pricing: {
      international: { from: 350, to: 850, currency: "USD" },
      resident: { from: 18500, to: 45000, currency: "KES" },
      note: "Prices spike July-Oct (Migration Season)",
    },
    image: "/experiences/Maasai-Mara/mara-plains.png",
    gallery: [
      "/experiences/Maasai-Mara/mara-plains.png",
      "/experiences/Maasai-Mara/mara-golden-hour.png",
      "/experiences/Maasai-Mara/mara-lodge.png",
    ],
  },
  {
    id: "samburu-safari",
    slug: "samburu-safari",
    title: "Samburu Special 5 Safari",
    tagline: "Rare wildlife you won't see anywhere else",
    description:
      "Samburu National Reserve is home to the 'Special 5' - unique species found only in northern Kenya: the Grevy's zebra, reticulated giraffe, Somali ostrich, gerenuk, and beisa oryx. The rugged landscape along the Ewaso Ng'iro River offers a distinctly different safari experience.",
    vibe: "safari",
    region: "northern",
    duration: "3 Days",
    minDays: 3,
    maxDays: 4,
    destinations: ["Nairobi", "Samburu"],
    highlights: [
      "Unique wildlife species found nowhere else in Kenya",
      "Beautiful riverine scenery and red-earth landscapes",
      "Authentic Samburu cultural experiences",
      "Fewer crowds than the Masai Mara",
      "Excellent bird watching",
    ],
    itinerary: [
      {
        day: 1,
        title: "Nairobi to Samburu",
        description:
          "Drive through central highlands with views of Mt Kenya. Afternoon game drive.",
      },
      {
        day: 2,
        title: "Full Day Game Drives",
        description:
          "Early morning and afternoon drives focusing on the Special 5 species.",
      },
      {
        day: 3,
        title: "Final Drive & Return",
        description: "Morning game drive, then return to Nairobi.",
      },
    ],
    includes: [
      "Luxury or mid-range lodge",
      "Game drives for the Special 5",
      "Cultural village visit (optional)",
      "Transport from Nairobi",
    ],
    excludes: [
      "Cultural village visit fees",
      "Drinks and personal items",
      "Tips and gratuities",
      "Travel insurance",
    ],
    importantNotes: [
      "Northern Kenya is hot - pack accordingly.",
      "Premium destination, usually higher priced than Mara.",
    ],
    excursions: {
      enRoute: [
        {
          name: "Equator Crossing Point",
          location: "Nanyuki",
          description:
            "Stand in both hemispheres and watch the famous water-draining demonstration.",
        },
      ],
      atDestination: [
        {
          name: "Samburu Cultural Village",
          location: "Samburu",
          description:
            "Visit a Samburu village to learn about their distinct culture.",
        },
        {
          name: "Camel-Back Safari",
          location: "Samburu",
          description:
            "A guided camel ride along the Ewaso Ng'iro River for a unique perspective.",
        },
      ],
    },
    pricing: {
      international: { from: 400, to: 750, currency: "USD" },
      resident: { from: 24000, to: 42000, currency: "KES" },
      note: "Premium destination, usually higher than Mara",
    },
    image:
      "https://images.unsplash.com/photo-1534177616064-ef1a74a77f95?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1534177616064-ef1a74a77f95?auto=format&fit=crop&w=800&q=80",
    ],
  },
  {
    id: "ol-pejeta",
    slug: "ol-pejeta",
    title: "Ol Pejeta Conservancy",
    tagline: "Home to the last two Northern White Rhinos",
    description:
      "Ol Pejeta Conservancy is East Africa's largest black rhino sanctuary and home to the world's last two northern white rhinos. The conservancy combines incredible Big Five viewing with meaningful conservation efforts, including a chimpanzee sanctuary.",
    vibe: "safari",
    region: "central",
    duration: "2-3 Days",
    minDays: 2,
    maxDays: 3,
    destinations: ["Nairobi", "Ol Pejeta Conservancy"],
    highlights: [
      "Meeting Najin and Fatu, the last northern white rhinos",
      "Close encounters with black rhinos",
      "Chimpanzee sanctuary visit",
      "Night game drives for nocturnal wildlife",
      "Beautiful views of Mount Kenya",
    ],
    itinerary: [
      {
        day: 1,
        title: "Nairobi to Ol Pejeta",
        description:
          "Drive to Ol Pejeta, check-in, lunch, afternoon game drive.",
      },
      {
        day: 2,
        title: "Conservation & Game Drives",
        description:
          "Visit the endangered species enclosure and chimp sanctuary. Night game drive option.",
      },
      {
        day: 3,
        title: "Final Drive & Return",
        description: "Morning game drive, then return to Nairobi.",
      },
    ],
    includes: [
      "Chimpanzee Sanctuary visit",
      "Rhino sanctuary access",
      "Game drives",
      "Full board accommodation",
    ],
    excludes: [
      "Night game drives (optional extra)",
      "Bush dinners (optional extra)",
      "Tips and gratuities",
      "Travel insurance",
    ],
    importantNotes: [
      "Chimpanzees here are rescued orphans, not wild.",
      "Conservation costs are significant, reflected in prices.",
    ],
    excursions: {
      enRoute: [
        {
          name: "Equator Crossing Point",
          location: "Nanyuki",
          description:
            "Stand with one foot in each hemisphere at this famous landmark.",
        },
        {
          name: "Trout Tree Restaurant",
          location: "Near Nanyuki",
          description:
            "A unique dining experience built around a giant fig tree, serving fresh trout.",
        },
      ],
      atDestination: [
        {
          name: "Endangered Species Enclosure",
          location: "Ol Pejeta",
          description:
            "Visit Najin and Fatu, the last two Northern White Rhinos on Earth.",
        },
        {
          name: "Sweetwaters Chimpanzee Sanctuary",
          location: "Ol Pejeta",
          description:
            "The only place to see chimpanzees in Kenya. Learn about their rescue stories.",
        },
        {
          name: "Night Game Drive",
          location: "Ol Pejeta",
          description:
            "See nocturnal animals like aardvarks, bat-eared foxes, and hunting predators.",
        },
      ],
    },
    pricing: {
      international: { from: 380, to: 600, currency: "USD" },
      resident: { from: 21000, to: 40000, currency: "KES" },
      note: "Conservancy fees reflect conservation costs",
    },
    image:
      "https://images.unsplash.com/photo-1535338454528-5c55b3c77e8c?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1535338454528-5c55b3c77e8c?auto=format&fit=crop&w=800&q=80",
    ],
  },

  // ==================== BEACH & COAST ====================
  {
    id: "diani-4-day-beach-escape",
    slug: "diani-4-day-beach-escape",
    title: "4-Day Diani Beach Escape",
    tagline: "White-sand beaches & turquoise water",
    description:
      "Diani Beach has been voted Africa's leading beach destination multiple times, and for good reason. With its powdery white sand, crystal-clear turquoise waters, and swaying palm trees, it's the perfect tropical escape. The coral reef creates calm, warm waters ideal for swimming, snorkeling, and water sports.",
    vibe: "beach",
    region: "coast",
    duration: "4 Days",
    minDays: 3,
    maxDays: 5,
    destinations: ["Nairobi", "Diani Beach"],
    highlights: [
      "White-sand beaches & turquoise water",
      "Optional dolphin cruise",
      "Flexible add-ons (Wasini, Kaya Forest)",
      "Fresh seafood and coastal cuisine",
      "Water sports and snorkeling",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival & Check-in",
        description:
          "Arrive in Diani, settle in, and enjoy a relaxed evening by the coast.",
      },
      {
        day: 2,
        title: "Beach Day / Optional Excursions",
        description:
          "Free day at the beach. Optional Wasini trip or dhow sunset cruise.",
      },
      {
        day: 3,
        title: "Explore & Unwind",
        description:
          "Choose a snorkel session, spa time, or visit nearby attractions at your own pace.",
      },
      {
        day: 4,
        title: "Departure",
        description: "Check out and transfer to the airport/SGR for departure.",
      },
    ],
    includes: [
      "Accommodation (3 nights)",
      "Breakfast daily",
      "Airport / SGR transfers (optional add-on)",
      "Local support while in Diani",
    ],
    excludes: [
      "Flights/SGR tickets",
      "Travel insurance",
      "Meals not listed",
      "Water sports and activities",
    ],
    importantNotes: [
      "Diani is popular - not secluded private beaches.",
      "It's more laid-back than Mombasa for nightlife.",
    ],
    excursions: {
      enRoute: [],
      atDestination: [
        {
          name: "Wasini Island Day Trip with Dhow Cruise",
          location: "Wasini Island",
          description:
            "A full-day sailing trip to the Kisite-Mpunguti Marine Park for snorkeling/diving, with a fresh seafood lunch.",
        },
        {
          name: "Shimoni Slave Caves",
          location: "Shimoni",
          description:
            "A historical excursion to learn about the region's history during the slave trade.",
        },
        {
          name: "Kite Surfing Lessons",
          location: "Diani",
          description:
            "Take advantage of Diani's ideal conditions with an introductory lesson.",
        },
        {
          name: "Colobus Conservation Center",
          location: "Diani",
          description:
            "An educational visit to see Colobus monkeys and learn about conservation.",
        },
        {
          name: "Ali Barbour's Cave Restaurant",
          location: "Diani",
          description:
            "A unique dining experience inside a natural coral cave open to the stars.",
        },
      ],
    },
    pricing: {
      international: { from: 560, to: 800, currency: "USD" },
      resident: { from: 72000, to: 100000, currency: "KES" },
    },
    image:
      "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80",
    ],
  },
  {
    id: "watamu-marine",
    slug: "watamu-marine",
    title: "Watamu Marine & Ruins",
    tagline: "Ancient ruins meets crystal clear marine parks",
    description:
      "Watamu combines pristine marine environments with rich Swahili history. The Watamu Marine National Park protects some of Kenya's best coral reefs, while the nearby Gede Ruins offer a glimpse into a mysterious 13th-century Swahili town abandoned centuries ago.",
    vibe: "beach",
    region: "coast",
    duration: "3-5 Days",
    minDays: 3,
    maxDays: 7,
    destinations: ["Nairobi", "Malindi", "Watamu"],
    highlights: [
      "Crystal-clear waters with excellent snorkeling",
      "Glass-bottom boat rides to view coral gardens",
      "Fascinating exploration of ancient Gede Ruins",
      "Quieter beaches compared to Diani",
      "Sea turtle conservation experiences",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Watamu",
        description: "Fly to Malindi, transfer to Watamu, settle into resort.",
      },
      {
        day: 2,
        title: "Marine Park Day",
        description:
          "Glass-bottom boat, snorkeling in coral gardens, dolphin spotting.",
      },
      {
        day: 3,
        title: "Gede Ruins & Departure",
        description:
          "Explore the ancient ruins, final beach time, then depart.",
      },
    ],
    includes: [
      "Resort accommodation",
      "Marine park fees",
      "Gede Ruins tour entry",
      "Airport transfers (Malindi)",
    ],
    excludes: [
      "Flights to Malindi",
      "Meals not specified",
      "Water sports equipment rental",
      "Tips and personal expenses",
    ],
    importantNotes: [
      "Watamu is peaceful - not a party atmosphere.",
      "Malindi flights can be pricey.",
    ],
    excursions: {
      enRoute: [],
      atDestination: [
        {
          name: "Gede Ruins Exploration",
          location: "Gede",
          description:
            "Explore the mysterious 13th-century Swahili town abandoned centuries ago.",
        },
        {
          name: "Sea Turtle Conservation",
          location: "Watamu",
          description:
            "Visit a turtle conservation project and learn about protection efforts.",
        },
        {
          name: "Bio-luminescent Kayaking",
          location: "Watamu",
          description:
            "Night kayaking experience to see bio-luminescent plankton in the water.",
        },
      ],
    },
    pricing: {
      international: { from: 300, to: 650, currency: "USD" },
      resident: { from: 25000, to: 60000, currency: "KES" },
      note: "Flight costs vary significantly",
    },
    image:
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80",
    ],
  },

  // ==================== MOUNTAINS & HIKING ====================
  {
    id: "mt-kenya-hike",
    slug: "mt-kenya-hike",
    title: "Mt. Kenya Hike (Sirimon Route)",
    tagline: "Conquer the second highest peak in Africa",
    description:
      "Mount Kenya is Africa's second-highest peak and offers one of the continent's most rewarding climbing experiences. The Sirimon route is known for its gradual ascent and stunning scenery, passing through bamboo forests, moorlands, and alpine zones before reaching Point Lenana at 4,985m.",
    vibe: "mountains",
    region: "central",
    duration: "4-5 Days",
    minDays: 4,
    maxDays: 5,
    destinations: ["Nairobi", "Mount Kenya"],
    highlights: [
      "Challenging but achievable trek for fit beginners",
      "Stunning alpine scenery and unique vegetation zones",
      "Early morning summit push to catch sunrise",
      "Sense of accomplishment reaching Point Lenana",
      "Beautiful views of central Kenya",
    ],
    itinerary: [
      {
        day: 1,
        title: "Nairobi to Old Moses Camp",
        description:
          "Drive to Sirimon gate, begin trek through bamboo forest to Old Moses Camp (3,300m).",
      },
      {
        day: 2,
        title: "Old Moses to Shipton's Camp",
        description:
          "Trek through moorland to Shipton's Camp (4,200m). Acclimatization walk.",
      },
      {
        day: 3,
        title: "Shipton's to Point Lenana",
        description:
          "Early morning summit push (2am start). Reach Point Lenana (4,985m) for sunrise.",
      },
      {
        day: 4,
        title: "Descent & Return",
        description: "Descend via Chogoria or Sirimon route, return to Nairobi.",
      },
    ],
    includes: [
      "Experienced mountain guide & porters",
      "All meals on the mountain",
      "Camping gear or hut fees",
      "Park/Conservancy fees",
    ],
    excludes: [
      "Personal hiking gear and clothing",
      "Travel insurance (mandatory)",
      "Tips for guides and porters",
      "Transport to trailhead",
    ],
    importantNotes: [
      "Cold temperatures at high altitude - can drop below freezing.",
      "This is a serious mountain trek - basic fitness required.",
      "Sirimon route is non-technical but demanding.",
    ],
    excursions: {
      enRoute: [
        {
          name: "Equator Crossing Point",
          location: "Nanyuki",
          description:
            "A fun stop to stand in both hemispheres and watch the water-draining demonstration.",
        },
        {
          name: "Trout Tree Restaurant",
          location: "Near Nanyuki",
          description:
            "A unique restaurant built around a giant fig tree, famous for fresh trout.",
        },
      ],
      atDestination: [
        {
          name: "Route Variation (Sirimon up, Chogoria down)",
          location: "Mt Kenya",
          description:
            "The most recommended way to experience the mountain - scenic descent via Chogoria.",
        },
        {
          name: "Guided Forest Walk",
          location: "Mt Kenya lower slopes",
          description:
            "Walk through the lower montane forest with a naturalist to identify birds and plants.",
        },
        {
          name: "Trout Fishing",
          location: "Lake Ellis or Lake Michaelson",
          description:
            "For longer treks, a half-day can be dedicated to trout fishing in alpine lakes.",
        },
      ],
    },
    pricing: {
      international: { from: 450, to: 700, currency: "USD" },
      resident: { from: 28000, to: 45000, currency: "KES" },
      note: "Depends on camping vs. hut accommodation",
    },
    image:
      "https://images.unsplash.com/photo-1609198092458-38a293c7ac4b?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1609198092458-38a293c7ac4b?auto=format&fit=crop&w=800&q=80",
    ],
  },

  // ==================== LAKES & RIFT VALLEY ====================
  {
    id: "naivasha-weekend-getaway",
    slug: "naivasha-weekend-getaway",
    title: "Naivasha Weekend Getaway",
    tagline: "Cycle with zebras and boat with hippos",
    description:
      "Hell's Gate is one of Kenya's most unique national parks - you can walk or cycle among wildlife. Combined with Lake Naivasha's hippo-filled waters and Crescent Island's walking safari, this makes for an action-packed weekend escape just 90 minutes from Nairobi.",
    vibe: "lakes",
    region: "rift-valley",
    duration: "2 Days",
    minDays: 1,
    maxDays: 2,
    destinations: ["Nairobi", "Lake Naivasha", "Hell's Gate"],
    highlights: [
      "Lake Naivasha boat ride (optional)",
      "Hell's Gate cycling (optional)",
      "Great for couples & small groups",
      "Walking safari on Crescent Island",
      "Easy weekend trip from Nairobi",
    ],
    itinerary: [
      {
        day: 1,
        title: "Nairobi to Naivasha",
        description:
          "Drive to Naivasha, check-in, and choose your afternoon activity: boat ride or lakeside relaxation.",
      },
      {
        day: 2,
        title: "Hell's Gate / Return",
        description:
          "Optional Hell's Gate cycling, then return to Nairobi in the afternoon.",
      },
    ],
    includes: ["Transport", "1 night accommodation", "Breakfast"],
    excludes: [
      "Park fees (if applicable)",
      "Optional activities",
      "Lunch/dinner",
    ],
    importantNotes: [
      "Popular with Nairobians on weekends - can be busy.",
      "Accommodation is mid-range quality.",
    ],
    excursions: {
      enRoute: [
        {
          name: "Great Rift Valley Viewpoint",
          location: "Near Limuru",
          description:
            "First dramatic view of the Rift Valley - perfect introduction to the region.",
        },
      ],
      atDestination: [
        {
          name: "Crescent Island Walking Safari",
          location: "Lake Naivasha",
          description:
            "Boat ride to the island for a walk among giraffes, zebras, and wildebeest with no predators.",
        },
        {
          name: "Hell's Gate Cycling Safari",
          location: "Hell's Gate National Park",
          description:
            "Rent bikes and cycle through dramatic gorges alongside zebras and gazelles.",
        },
        {
          name: "Mount Longonot Hike",
          location: "Mt Longonot",
          description:
            "A day-hike up the dormant volcano to its crater rim for spectacular views.",
        },
        {
          name: "Elsamere Conservation Centre",
          location: "Lake Naivasha",
          description:
            "Visit the former home of Joy and George Adamson (\"Born Free\") for high tea.",
        },
        {
          name: "Olkaria Geothermal Spa",
          location: "Hell's Gate",
          description:
            "Africa's largest natural geothermal spa - great way to unwind after cycling.",
        },
      ],
    },
    pricing: {
      international: { from: 190, to: 300, currency: "USD" },
      resident: { from: 24500, to: 35000, currency: "KES" },
      note: "Very affordable, popular for weekends",
    },
    image:
      "https://images.unsplash.com/photo-1544986581-efac024faf62?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1544986581-efac024faf62?auto=format&fit=crop&w=1600&q=80",
    ],
  },

  // ==================== CULTURE & HERITAGE ====================
  {
    id: "nairobi-city",
    slug: "nairobi-city",
    title: "Nairobi City Safari",
    tagline: "The only capital city with a National Park",
    description:
      "Nairobi is the only capital city in the world with a national park within its boundaries. This unique day experience combines wildlife viewing with conservation visits, perfect for travelers with limited time or as a warm-up before heading to larger parks.",
    vibe: "culture",
    region: "nairobi",
    duration: "1 Day",
    minDays: 1,
    maxDays: 1,
    destinations: ["Nairobi"],
    highlights: [
      "Wildlife against the Nairobi skyline backdrop",
      "Feeding giraffes at the Giraffe Centre",
      "Watching baby elephants at Sheldrick",
      "Convenient half-day or full-day format",
      "Great introduction to Kenyan wildlife",
    ],
    itinerary: [
      {
        day: 1,
        title: "Nairobi City Safari",
        description:
          "Morning game drive in Nairobi National Park, visit Sheldrick Elephant Orphanage at 11am, lunch, afternoon at Giraffe Centre.",
      },
    ],
    includes: [
      "Nairobi National Park game drive",
      "Giraffe Centre entry",
      "Sheldrick Elephant Orphanage (11am slot)",
      "Lunch at Carnivore (optional)",
    ],
    excludes: [
      "Hotel pickup (can be arranged)",
      "Lunch at Carnivore",
      "Kazuri Beads or other optional stops",
      "Tips and gratuities",
    ],
    importantNotes: [
      "The park is small - big cats aren't guaranteed every visit.",
      "Sheldrick requires advance booking.",
    ],
    excursions: {
      enRoute: [],
      atDestination: [
        {
          name: "Nairobi National Park Game Drive",
          location: "Nairobi",
          description: "See wildlife with the city skyline as a backdrop.",
        },
        {
          name: "David Sheldrick Elephant Orphanage",
          location: "Nairobi",
          description:
            "Watch baby elephants being cared for at feeding time (11am only).",
        },
        {
          name: "Giraffe Centre",
          location: "Karen, Nairobi",
          description:
            "Feed endangered Rothschild giraffes from an elevated platform.",
        },
        {
          name: "Karen Blixen Museum",
          location: "Karen, Nairobi",
          description:
            "Visit the home of the author of \"Out of Africa\".",
        },
        {
          name: "Carnivore Restaurant",
          location: "Nairobi",
          description:
            "Famous for its all-you-can-eat grilled meat experience.",
        },
      ],
    },
    pricing: {
      international: { from: 80, to: 150, currency: "USD" },
      resident: { from: 4500, to: 8000, currency: "KES" },
    },
    image:
      "https://images.unsplash.com/photo-1611348586804-61bf6c080437?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1611348586804-61bf6c080437?auto=format&fit=crop&w=800&q=80",
    ],
  },

  // ==================== ADRENALINE & FUN ====================
  {
    id: "sagana-rafting",
    slug: "sagana-rafting",
    title: "Sagana White Water Rafting",
    tagline: "Thrilling rapids and waterfalls near Nairobi",
    description:
      "The Sagana River offers some of East Africa's best white water rafting, with rapids ranging from Grade II to IV. Located just 2 hours from Nairobi, it's perfect for adrenaline seekers looking for a day of adventure. The camp also offers bungee jumping and kayaking.",
    vibe: "adrenaline",
    region: "central",
    duration: "1 Day",
    minDays: 1,
    maxDays: 2,
    destinations: ["Nairobi", "Sagana"],
    highlights: [
      "Exciting Class II-IV rapids",
      "Professional instruction for beginners",
      "Beautiful river scenery and waterfall stops",
      "BBQ lunch by the river",
      "Options for camping overnight",
    ],
    itinerary: [
      {
        day: 1,
        title: "Rafting Adventure",
        description:
          "Drive to Sagana, safety briefing, 4 hours of rafting with breaks at waterfalls, BBQ lunch, return to Nairobi.",
      },
    ],
    includes: [
      "Professional rafting guide",
      "Safety gear (helmets, jackets)",
      "4 hours of rafting",
      "BBQ lunch",
    ],
    excludes: [
      "Transport to Sagana",
      "Bungee jumping (optional extra)",
      "Kayaking sessions (optional extra)",
      "Overnight camping",
    ],
    importantNotes: [
      "This is active white water - you will get wet!",
      "Age limit: 16 years minimum for safety.",
      "Activity may be cancelled during heavy rains.",
    ],
    excursions: {
      enRoute: [],
      atDestination: [
        {
          name: "Bungee Jumping",
          location: "Sagana",
          description:
            "60-meter bungee jump over the Sagana River for ultimate thrill seekers.",
        },
        {
          name: "Kayaking Lessons",
          location: "Sagana",
          description:
            "Learn to kayak on calmer sections of the river.",
        },
        {
          name: "Overnight Camping",
          location: "Sagana",
          description:
            "Camp by the river and enjoy bonfires under the stars.",
        },
      ],
    },
    pricing: {
      international: { from: 100, to: 200, currency: "USD" },
      resident: { from: 8000, to: 15000, currency: "KES" },
      note: "Price is per activity/day",
    },
    image:
      "https://images.unsplash.com/photo-1530866495561-507c9faab2ed?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1530866495561-507c9faab2ed?auto=format&fit=crop&w=800&q=80",
    ],
  },
];

// Helper functions
export function getTourBySlug(slug: string): Tour | undefined {
  return tours.find((t) => t.slug === slug);
}

export function getTourById(id: string): Tour | undefined {
  return tours.find((t) => t.id === id);
}

export function getAllTours(): Tour[] {
  return tours;
}

export function getToursByVibe(vibe: VibeCategory): Tour[] {
  return tours.filter((t) => t.vibe === vibe);
}

export function getToursByRegion(region: Region): Tour[] {
  return tours.filter((t) => t.region === region);
}

// Region display names
export const regionNames: Record<Region, string> = {
  "rift-valley": "Rift Valley",
  coast: "Coast & Marine",
  central: "Central Highlands",
  northern: "Northern Kenya",
  nairobi: "Nairobi & Surrounds",
  western: "Western Kenya",
};

export function getRegionName(region: Region): string {
  return regionNames[region];
}
