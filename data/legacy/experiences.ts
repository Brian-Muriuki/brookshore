import { VibeCategory } from "./vibes";

export type Region =
  | "rift-valley"
  | "coast"
  | "central"
  | "northern"
  | "nairobi"
  | "western";

export type Tag =
  | "family-friendly"
  | "romantic"
  | "solo-friendly"
  | "adventure"
  | "relaxation"
  | "bucket-list"
  | "off-the-beaten-path"
  | "photography"
  | "cultural-immersion"
  | "eco-friendly"
  | "short-trip";

export interface Experience {
  id: string;
  name: string;
  vibe: VibeCategory;
  region: Region;
  tagline: string;
  description: string;

  // Duration
  duration: string;
  minDays: number;
  maxDays: number;

  // Pricing
  pricing: {
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
  };
  pricingNote?: string;

  // Details
  includes: string[];
  excludes: string[];
  whatToExpect: string[];
  whatNotToExpect: string[];
  tags: Tag[];
  pairings: string[];

  // Media
  image: string;
  gallery: string[];
}

export const experiences: Experience[] = [
  {
    id: "mara-migration",
    name: "Masai Mara Migration",
    vibe: "safari",
    region: "rift-valley",
    tagline: "Witness the World Cup of Wildlife in person",
    description: "The Masai Mara is Kenya's most famous safari destination, home to the Great Migration where over 1.5 million wildebeest and zebras cross from Tanzania's Serengeti. Beyond the migration, the Mara offers year-round Big Five sightings, dramatic savannah landscapes, and authentic Maasai cultural experiences.",
    duration: "3 Days",
    minDays: 3,
    maxDays: 5,
    pricing: {
      international: { from: 350, to: 850, currency: "USD" },
      resident: { from: 18500, to: 45000, currency: "KES" },
    },
    pricingNote: "Prices spike July-Oct (Migration Season)",
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
    whatToExpect: [
      "Early morning and late afternoon game drives when animals are most active",
      "Close encounters with lions, elephants, leopards, buffalo, and rhinos",
      "Stunning sunrises and sunsets over the African savannah",
      "Comfortable lodges or luxury tented camps with excellent food",
      "Professional guides with deep knowledge of wildlife behavior",
    ],
    whatNotToExpect: [
      "Guaranteed migration crossing sightings (timing is unpredictable)",
      "Wi-Fi or phone signal in remote areas of the reserve",
      "Paved roads - expect bumpy dirt tracks",
      "Getting out of the vehicle except at designated spots",
    ],
    tags: ["bucket-list", "photography", "adventure", "family-friendly"],
    pairings: ["hellsgate-naivasha", "diani-beach"],
    image: "/experiences/Maasai-Mara/mara-plains.png",
    gallery: [
      "/experiences/Maasai-Mara/mara-plains.png",
      "/experiences/Maasai-Mara/mara-golden-hour.png",
      "/experiences/Maasai-Mara/mara-lodge.png",
    ],
  },
  {
    id: "diani-beach",
    name: "Diani Beach Escape",
    vibe: "beach",
    region: "coast",
    tagline: "Voted Africa's leading beach destination",
    description: "Diani Beach has been voted Africa's leading beach destination multiple times, and for good reason. With its powdery white sand, crystal-clear turquoise waters, and swaying palm trees, it's the perfect tropical escape. The coral reef creates calm, warm waters ideal for swimming, snorkeling, and water sports.",
    duration: "3-5 Days",
    minDays: 3,
    maxDays: 7,
    pricing: {
      international: { from: 250, to: 600, currency: "USD" },
      resident: { from: 22000, to: 55000, currency: "KES" },
    },
    pricingNote: "Includes return SGR train or flight",
    includes: [
      "Half-board accommodation (Breakfast & Dinner)",
      "Return SGR or flight tickets",
      "Hotel transfers",
      "Use of hotel amenities (pools, beach)",
    ],
    excludes: [
      "Lunch and drinks",
      "Water sports and activities",
      "Day trips and excursions",
      "Spa treatments",
      "Travel insurance",
    ],
    whatToExpect: [
      "Pristine white sand beaches with warm Indian Ocean waters",
      "Beautiful sunsets and dhow sailing experiences",
      "Fresh seafood and coastal Swahili cuisine",
      "Options for snorkeling, diving, and kite surfing",
      "Relaxed beach atmosphere with friendly local culture",
    ],
    whatNotToExpect: [
      "Secluded private beaches (Diani is popular)",
      "Cool weather - it's tropical year-round",
      "Wild nightlife (it's more laid-back than Mombasa)",
      "Rough seas - the reef keeps waters calm",
    ],
    tags: ["relaxation", "romantic", "family-friendly"],
    pairings: ["watamu-marine", "amboseli-kilimanjaro"],
    image: "/experiences/Diani/Diani-aerial-view.png",
    gallery: [
      "/experiences/Diani/Diani-aerial-view.png",
      "/experiences/Diani/Diani-Dhow-Sunset.png",
      "/experiences/Diani/Diverse-Beach-Stroll.png",
    ],
  },
  {
    id: "amboseli-kilimanjaro",
    name: "Amboseli: Giants & Kilimanjaro",
    vibe: "safari",
    region: "rift-valley",
    tagline: "Huge elephants with Mt. Kilimanjaro backdrops",
    description: "Amboseli National Park is famous for its large elephant herds and the stunning backdrop of Mount Kilimanjaro, Africa's highest peak. The park's open landscapes offer some of Kenya's best wildlife photography opportunities, with elephants often silhouetted against the snow-capped mountain.",
    duration: "3 Days",
    minDays: 2,
    maxDays: 3,
    pricing: {
      international: { from: 320, to: 550, currency: "USD" },
      resident: { from: 19000, to: 38000, currency: "KES" },
    },
    pricingNote: "Park fees included",
    includes: [
      "Park entry fees",
      "Full board accommodation",
      "Daily game drives",
      "Transport from Nairobi",
    ],
    excludes: [
      "Tips for guides and staff",
      "Personal items and souvenirs",
      "Travel insurance",
      "Maasai village visits (available as add-on)",
    ],
    whatToExpect: [
      "Close encounters with large elephant families",
      "Iconic views of Mt. Kilimanjaro (best in early morning)",
      "Diverse wildlife including lions, cheetahs, and hippos",
      "Bird watching at the seasonal Lake Amboseli",
      "Cultural interaction with local Maasai communities",
    ],
    whatNotToExpect: [
      "Clear Kilimanjaro views every day (clouds often cover it by midday)",
      "Dense forest - it's open savannah and swampland",
      "Cool weather - it can get quite hot and dusty",
      "Crowds during peak migration season (Mara draws them away)",
    ],
    tags: ["photography", "family-friendly", "bucket-list"],
    pairings: ["mara-migration", "nairobi-city"],
    image: "/experiences/Amboseli/Amboseli-elephants.png",
    gallery: [
      "/experiences/Amboseli/Amboseli-elephants.png",
      "/experiences/Amboseli/Amboseli-drive.png",
    ],
  },
  {
    id: "mt-kenya-hike",
    name: "Mt. Kenya Hike (Sirimon)",
    vibe: "mountains",
    region: "central",
    tagline: "Conquer the second highest peak in Africa",
    description: "Mount Kenya is Africa's second-highest peak and offers one of the continent's most rewarding climbing experiences. The Sirimon route is known for its gradual ascent and stunning scenery, passing through bamboo forests, moorlands, and alpine zones before reaching Point Lenana at 4,985m.",
    duration: "4 Days",
    minDays: 4,
    maxDays: 5,
    pricing: {
      international: { from: 450, to: 700, currency: "USD" },
      resident: { from: 28000, to: 45000, currency: "KES" },
    },
    pricingNote: "Depends on camping vs. hut accommodation",
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
    whatToExpect: [
      "Challenging but achievable trek suitable for fit beginners",
      "Stunning alpine scenery and unique vegetation zones",
      "Cold temperatures at high altitude (can drop below freezing)",
      "Early morning summit push to catch sunrise",
      "Sense of accomplishment reaching Point Lenana",
    ],
    whatNotToExpect: [
      "Comfortable sleeping - conditions are basic",
      "Easy walk - this is a serious mountain trek",
      "Warm weather - it gets very cold at altitude",
      "Technical climbing - Sirimon route is non-technical",
    ],
    tags: ["adventure", "bucket-list", "solo-friendly"],
    pairings: ["ol-pejeta", "samburu-safari"],
    image: "https://images.unsplash.com/photo-1609198092458-38a293c7ac4b?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1609198092458-38a293c7ac4b?auto=format&fit=crop&w=800&q=80",
    ],
  },
  {
    id: "samburu-safari",
    name: "Samburu Special 5",
    vibe: "safari",
    region: "northern",
    tagline: "Rare wildlife you won't see anywhere else",
    description: "Samburu National Reserve is home to the 'Special 5' - unique species found only in northern Kenya: the Grevy's zebra, reticulated giraffe, Somali ostrich, gerenuk, and beisa oryx. The rugged landscape along the Ewaso Ng'iro River offers a distinctly different safari experience.",
    duration: "3 Days",
    minDays: 3,
    maxDays: 4,
    pricing: {
      international: { from: 400, to: 750, currency: "USD" },
      resident: { from: 24000, to: 42000, currency: "KES" },
    },
    pricingNote: "Premium destination, usually higher than Mara",
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
    whatToExpect: [
      "Unique wildlife species found nowhere else in Kenya",
      "Beautiful riverine scenery and red-earth landscapes",
      "Authentic Samburu cultural experiences",
      "Fewer crowds than the Masai Mara",
      "Excellent bird watching opportunities",
    ],
    whatNotToExpect: [
      "The Great Migration (that's the Mara)",
      "Lush green landscapes - it's semi-arid terrain",
      "Cold weather - Northern Kenya is hot",
      "Big crowds - Samburu is off the beaten path",
    ],
    tags: ["off-the-beaten-path", "cultural-immersion", "photography"],
    pairings: ["ol-pejeta", "mt-kenya-hike"],
    image: "https://images.unsplash.com/photo-1534177616064-ef1a74a77f95?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1534177616064-ef1a74a77f95?auto=format&fit=crop&w=800&q=80",
    ],
  },
  {
    id: "watamu-marine",
    name: "Watamu Marine & Ruins",
    vibe: "beach",
    region: "coast",
    tagline: "Ancient ruins meets crystal clear marine parks",
    description: "Watamu combines pristine marine environments with rich Swahili history. The Watamu Marine National Park protects some of Kenya's best coral reefs, while the nearby Gede Ruins offer a glimpse into a mysterious 13th-century Swahili town abandoned centuries ago.",
    duration: "3-5 Days",
    minDays: 3,
    maxDays: 7,
    pricing: {
      international: { from: 300, to: 650, currency: "USD" },
      resident: { from: 25000, to: 60000, currency: "KES" },
    },
    pricingNote: "Flight costs vary significantly",
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
    whatToExpect: [
      "Crystal-clear waters with excellent snorkeling and diving",
      "Glass-bottom boat rides to view coral gardens",
      "Fascinating exploration of ancient Gede Ruins",
      "Quieter beaches compared to Diani",
      "Sea turtle conservation experiences",
    ],
    whatNotToExpect: [
      "Party atmosphere (Watamu is peaceful)",
      "Big hotel chains (more boutique properties)",
      "Guaranteed turtle sightings",
      "Cheap flights (Malindi flights can be pricey)",
    ],
    tags: ["relaxation", "eco-friendly", "cultural-immersion"],
    pairings: ["diani-beach", "mara-migration"],
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80",
    ],
  },
  {
    id: "hellsgate-naivasha",
    name: "Hell's Gate & Naivasha",
    vibe: "lakes",
    region: "rift-valley",
    tagline: "Cycle with zebras and boat with hippos",
    description: "Hell's Gate is one of Kenya's most unique national parks - you can walk or cycle among wildlife. Combined with Lake Naivasha's hippo-filled waters and Crescent Island's walking safari, this makes for an action-packed weekend escape just 90 minutes from Nairobi.",
    duration: "2 Days",
    minDays: 1,
    maxDays: 2,
    pricing: {
      international: { from: 150, to: 300, currency: "USD" },
      resident: { from: 9500, to: 18000, currency: "KES" },
    },
    pricingNote: "Very affordable, popular for weekends",
    includes: [
      "Boat ride on Lake Naivasha",
      "Bike hire at Hell's Gate",
      "Crescent Island walk",
      "1 night accommodation",
    ],
    excludes: [
      "Transport from Nairobi",
      "Meals not specified",
      "Rock climbing guide (optional)",
      "Tips and personal expenses",
    ],
    whatToExpect: [
      "Cycling through dramatic gorges alongside zebras and giraffes",
      "Boat rides among hippos on Lake Naivasha",
      "Walking safari on Crescent Island with no predators",
      "Spectacular volcanic scenery and cliffs",
      "Easy accessibility from Nairobi for a weekend trip",
    ],
    whatNotToExpect: [
      "Big predators (no lions in Hell's Gate)",
      "Luxury lodges (accommodation is mid-range)",
      "Quiet weekends - it's popular with Nairobians",
      "Air-conditioned comfort - you'll be active outdoors",
    ],
    tags: ["adventure", "family-friendly", "short-trip"],
    pairings: ["mara-migration", "nairobi-city"],
    image: "https://images.unsplash.com/photo-1682686581580-d99b0a30b5b8?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1682686581580-d99b0a30b5b8?auto=format&fit=crop&w=800&q=80",
    ],
  },
  {
    id: "ol-pejeta",
    name: "Ol Pejeta Conservancy",
    vibe: "safari",
    region: "central",
    tagline: "Home to the last two Northern White Rhinos",
    description: "Ol Pejeta Conservancy is East Africa's largest black rhino sanctuary and home to the world's last two northern white rhinos. The conservancy combines incredible Big Five viewing with meaningful conservation efforts, including a chimpanzee sanctuary.",
    duration: "2-3 Days",
    minDays: 2,
    maxDays: 3,
    pricing: {
      international: { from: 380, to: 600, currency: "USD" },
      resident: { from: 21000, to: 40000, currency: "KES" },
    },
    pricingNote: "Conservancy fees reflect conservation costs",
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
    whatToExpect: [
      "Meeting Najin and Fatu, the last northern white rhinos",
      "Close encounters with black rhinos in the sanctuary",
      "Chimpanzee sanctuary visit (rescued chimps)",
      "Night game drives to spot nocturnal wildlife",
      "Beautiful views of Mount Kenya",
    ],
    whatNotToExpect: [
      "Wild chimpanzees (they're rescued orphans)",
      "Cheap prices - conservation costs are significant",
      "Massive herds like in the Mara",
      "Remote wilderness - it's well-managed conservancy",
    ],
    tags: ["eco-friendly", "family-friendly", "bucket-list"],
    pairings: ["samburu-safari", "mt-kenya-hike"],
    image: "https://images.unsplash.com/photo-1535338454528-5c55b3c77e8c?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1535338454528-5c55b3c77e8c?auto=format&fit=crop&w=800&q=80",
    ],
  },
  {
    id: "nairobi-city",
    name: "Nairobi City Safari",
    vibe: "culture",
    region: "nairobi",
    tagline: "The only capital city with a National Park",
    description: "Nairobi is the only capital city in the world with a national park within its boundaries. This unique day experience combines wildlife viewing with conservation visits, perfect for travelers with limited time or as a warm-up before heading to larger parks.",
    duration: "1 Day",
    minDays: 1,
    maxDays: 1,
    pricing: {
      international: { from: 80, to: 150, currency: "USD" },
      resident: { from: 4500, to: 8000, currency: "KES" },
    },
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
    whatToExpect: [
      "Wildlife against the Nairobi skyline backdrop",
      "Feeding giraffes at the Giraffe Centre",
      "Watching baby elephants at Sheldrick",
      "Convenient half-day or full-day format",
      "Great introduction to Kenyan wildlife",
    ],
    whatNotToExpect: [
      "Big cats on every visit (the park is small)",
      "Remote wilderness feeling - it's urban adjacent",
      "All-day safari - this is a compact experience",
      "Advance booking not needed (except Sheldrick)",
    ],
    tags: ["family-friendly", "short-trip", "photography"],
    pairings: ["mara-migration", "amboseli-kilimanjaro"],
    image: "https://images.unsplash.com/photo-1611348586804-61bf6c080437?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1611348586804-61bf6c080437?auto=format&fit=crop&w=800&q=80",
    ],
  },
  {
    id: "sagana-rafting",
    name: "Sagana White Water Rafting",
    vibe: "adrenaline",
    region: "central",
    tagline: "Thrilling rapids and waterfalls near Nairobi",
    description: "The Sagana River offers some of East Africa's best white water rafting, with rapids ranging from Grade II to IV. Located just 2 hours from Nairobi, it's perfect for adrenaline seekers looking for a day of adventure. The camp also offers bungee jumping and kayaking.",
    duration: "1 Day",
    minDays: 1,
    maxDays: 2,
    pricing: {
      international: { from: 100, to: 200, currency: "USD" },
      resident: { from: 8000, to: 15000, currency: "KES" },
    },
    pricingNote: "Price is per activity/day",
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
    whatToExpect: [
      "Exciting Class II-IV rapids depending on water levels",
      "Professional instruction for beginners",
      "Beautiful river scenery and waterfall stops",
      "BBQ lunch by the river",
      "Options for camping overnight",
    ],
    whatNotToExpect: [
      "Calm floating - this is active white water",
      "Staying completely dry",
      "Age limits below 16 for safety",
      "Activity during heavy rains (cancelled for safety)",
    ],
    tags: ["adventure", "solo-friendly", "short-trip"],
    pairings: ["mt-kenya-hike", "ol-pejeta"],
    image: "https://images.unsplash.com/photo-1530866495561-507c9faab2ed?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1530866495561-507c9faab2ed?auto=format&fit=crop&w=800&q=80",
    ],
  },
];

// Helper functions
export function getExperienceById(id: string): Experience | undefined {
  return experiences.find((e) => e.id === id);
}

export function getExperiencesByVibe(vibe: VibeCategory): Experience[] {
  return experiences.filter((e) => e.vibe === vibe);
}

export function getExperiencesByRegion(region: Region): Experience[] {
  return experiences.filter((e) => e.region === region);
}

export function getRelatedExperiences(experience: Experience): Experience[] {
  return experience.pairings
    .map((id) => getExperienceById(id))
    .filter((e): e is Experience => e !== undefined);
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
