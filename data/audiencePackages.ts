export type AudienceInquiryVariant = "contact" | "corporate";

export interface AudiencePackage {
  slug: string;
  title: string;
  subtitle: string;
  tagline: string;
  description: string;
  image: string;
  duration: string;
  groupSize: string;
  priceFrom: string;
  priceUnit: string;
  extraLabel: string;
  extraValue: string;
  destinations: string[];
  included: string[];
  activities: string[];
  idealFor: string[];
  inquiryVariant: AudienceInquiryVariant;
  groupLabel: string;
  companyLabel?: string;
  primaryHref?: string;
}

export const audiencePackages: AudiencePackage[] = [
  {
    slug: "scholars-safari",
    title: "Scholar's Safari",
    subtitle: "Educational Tours for Schools & Learning Institutions",
    tagline: "Curriculum-focused outdoor trips that make wildlife, nature, and culture memorable for students.",
    description:
      "Take your students out of the classroom and into Kenya's wild spaces. Scholar's Safari brings learning to life through guided wildlife encounters, conservation talks, cultural visits, and team activities. We handle every detail so teachers can focus on the experience, not the spreadsheet.",
    image: "/images/audience-packages/scholar-safari.png",
    duration: "1-3 Days",
    groupSize: "30-200 Students",
    priceFrom: "KSh 2,500",
    priceUnit: "per student",
    extraLabel: "Age Group",
    extraValue: "All Levels",
    destinations: [
      "Nairobi National Park",
      "Mombasa",
      "Naivasha",
      "Nanyuki",
      "Lake Nakuru",
      "Oldonyo Sabuk",
      "Karen Blixen Museum",
    ],
    included: [
      "Comfortable bus transport",
      "Park & reserve entry fees",
      "Certified nature guide & educator",
      "Wildlife education session",
      "Packed lunch & refreshments",
      "Participation certificates",
      "First aid & safety cover",
      "Dedicated tour coordinator",
    ],
    activities: [
      "Guided game drives",
      "Animal Orphanage visit",
      "Nature & bird walks",
      "Cultural village tour",
      "Beach & marine education",
      "Team bonding games",
      "Photography session",
      "Q&A with park rangers",
    ],
    idealFor: [
      "Primary Schools",
      "Secondary Schools",
      "Universities",
      "Youth Groups",
    ],
    inquiryVariant: "contact",
    groupLabel: "Student count",
  },
  {
    slug: "executive-retreat",
    title: "Executive Retreat",
    subtitle: "Corporate Strategic Meetings & Leadership Conferences",
    tagline: "Venue, AV, accommodation, transport, and coordination for focused offsites and leadership sessions.",
    description:
      "Get your leadership team out of the office and somewhere they can actually think. Executive Retreat covers the venue, AV, accommodation, transport, and on-the-ground coordination, so your HR or admin team can plan a board session, strategy offsite, or NGO retreat with one phone call instead of twenty.",
    image: "/images/audience-packages/executive-retreat.png",
    duration: "2-4 Days",
    groupSize: "10-80 Pax",
    priceFrom: "KSh 12,000",
    priceUnit: "per person per day",
    extraLabel: "Best Time",
    extraValue: "Year Round",
    destinations: [
      "Naivasha",
      "Nanyuki",
      "Mombasa",
      "Brackenhurst Limuru",
      "Sagana",
      "Diani",
    ],
    included: [
      "Conference-ready venue & setup",
      "LCD projector & full AV",
      "High-speed WiFi throughout",
      "Full-board accommodation",
      "Tea/coffee & snack breaks",
      "Formal team dinner",
      "Transport & logistics",
      "Dedicated event coordinator",
    ],
    activities: [
      "Strategy & planning sessions",
      "Leadership workshops",
      "Guided nature walks",
      "Sundowner networking",
      "Game drive add-ons",
      "Wellness & yoga sessions",
      "Cultural evening entertainment",
      "Boat rides & water sports",
    ],
    idealFor: [
      "C-Suite Retreats",
      "Board Meetings",
      "AGMs",
      "Strategy Sessions",
      "NGO Leadership Teams",
    ],
    inquiryVariant: "corporate",
    groupLabel: "Expected attendees",
    companyLabel: "Organization",
    primaryHref: "/corporate",
  },
  {
    slug: "bond-and-build",
    title: "Bond & Build",
    subtitle: "Team Building, Excursions & Corporate Fun Days",
    tagline: "High-energy team experiences with facilitators, transport, activity gear, and structured group outcomes.",
    description:
      "Pull your team out of the meeting room for a day that actually brings people together. Bond & Build runs energetic, well-paced team activities with proper facilitation, equipment, and transport. Great for companies, NGOs, schools, and any group ready for something more memorable than another boardroom retreat.",
    image: "/images/audience-packages/bond-and-build.png",
    duration: "1-3 Days",
    groupSize: "20-300 Pax",
    priceFrom: "KSh 6,500",
    priceUnit: "per person",
    extraLabel: "Style",
    extraValue: "Indoor & Outdoor",
    destinations: [
      "Sagana",
      "Naivasha",
      "Nanyuki",
      "Mombasa",
      "Ol Pejeta",
      "Diani Beach",
    ],
    included: [
      "Professional facilitator",
      "All activity equipment",
      "Transport fleet coordination",
      "Lunch & refreshments",
      "Group photo & video reel",
      "Awards & medals ceremony",
      "Evening bonfire option",
      "Safety & first aid team",
    ],
    activities: [
      "White-water rafting",
      "Zip-lining & high ropes",
      "Treasure hunts & relay races",
      "Dragon boat racing",
      "Cooking challenges",
      "Go-karting & quad bikes",
      "Karura Forest team hike",
      "Paint-ball & archery",
    ],
    idealFor: [
      "Corporates",
      "NGOs & INGOs",
      "Government Departments",
      "SACCOs",
      "Schools & Colleges",
    ],
    inquiryVariant: "contact",
    groupLabel: "Group size",
  },
  {
    slug: "family-tales",
    title: "Family Tales",
    subtitle: "Unforgettable Family Getaways Across Kenya",
    tagline: "Family-friendly coast, bush, and countryside escapes with kids' activities and simple planning support.",
    description:
      "Plan a family escape without the planning stress. Family Tales is built for school holidays, birthdays, anniversaries, and big multi-generation trips where everyone, from the toddlers to the grandparents, needs to be looked after. Comfortable accommodation, kid-friendly activities, and a steady hand on the logistics from start to finish.",
    image: "/images/audience-packages/family-tales.png",
    duration: "2-7 Days",
    groupSize: "2-20 Pax",
    priceFrom: "KSh 18,000",
    priceUnit: "per family",
    extraLabel: "Includes",
    extraValue: "Kids Activities",
    destinations: [
      "Mombasa / Diani",
      "Naivasha",
      "Nanyuki",
      "Amboseli",
      "Maasai Mara",
      "Tsavo East & West",
      "Watamu",
    ],
    included: [
      "Family-friendly accommodation",
      "Park & reserve entry fees",
      "Expert guide for game drives",
      "Kids' activity programme",
      "All meals (full board)",
      "Comfortable transport",
      "Comprehensive travel support",
      "24-hour assistance line",
    ],
    activities: [
      "Big Five game drives",
      "Bush & beach walks",
      "Snorkelling & water sports",
      "Sundowner boat rides",
      "Cultural Maasai village visit",
      "Kids' wildlife quiz & games",
      "Camel & horse riding",
      "Beach BBQ & bonfires",
    ],
    idealFor: [
      "Nuclear Families",
      "Extended Families",
      "Anniversary Trips",
      "Birthday Getaways",
      "School Holiday Breaks",
    ],
    inquiryVariant: "contact",
    groupLabel: "Travelers",
  },
  {
    slug: "pilgrimage-and-fellowship",
    title: "Pilgrimage & Fellowship",
    subtitle: "Spiritual Retreats for Churches & Faith Communities",
    tagline: "Faith-centered group travel with worship spaces, full-board accommodation, transport, and group coordination.",
    description:
      "Take your church or fellowship somewhere quiet, beautiful, and made for being together in prayer. Pilgrimage & Fellowship is for retreats, prayer weekends, choir trips, and youth ministry getaways. We sort the buses, beds, worship space, and meals so your leaders can focus on people, not logistics.",
    image: "/images/audience-packages/pilgrimage-and-fellowship.png",
    duration: "2-4 Days",
    groupSize: "30-400 Members",
    priceFrom: "KSh 4,500",
    priceUnit: "per person",
    extraLabel: "Focus",
    extraValue: "Faith & Fellowship",
    destinations: [
      "Subukia National Shrine",
      "Naivasha",
      "Nanyuki",
      "Mombasa",
      "Mt Kenya Foothills",
      "Brackenhurst Limuru",
      "Sagana",
    ],
    included: [
      "Transport fleet coordination",
      "Full-board accommodation",
      "Worship & devotion spaces",
      "PA system & worship equipment",
      "Nature walks & guided tours",
      "Community service activity",
      "Sunrise prayer viewpoints",
      "Group coordinator & chaplain support",
    ],
    activities: [
      "Sunrise & sunset prayer sessions",
      "Campfire fellowship evenings",
      "Community service visits",
      "Nature & creation walks",
      "Worship nights under the stars",
      "Group Bible study sessions",
      "Fellowship games",
      "Cultural & historical tours",
    ],
    idealFor: [
      "Church Fellowships",
      "Youth Ministries",
      "Prayer Groups",
      "Choirs",
      "Christian Conferences",
    ],
    inquiryVariant: "contact",
    groupLabel: "Group size",
  },
];

export function getAudiencePackageBySlug(slug: string) {
  return audiencePackages.find((pkg) => pkg.slug === slug);
}
