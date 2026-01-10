export interface ItineraryDay {
  day: number;
  title: string;
  description: string;
  notes?: string[];
}

export interface Package {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  duration: number; // in days
  destinations: string[];
  highlights: string[];
  itinerary: ItineraryDay[];
  includes: string[];
  excludes: string[];
  importantNotes: string[];
  image: string;
  gallery: string[];
}

export const packages: Package[] = [
  {
    id: "mara-nakuru-6-day",
    slug: "masai-mara-lake-nakuru-6-day",
    title: "6 Days - Masai Mara and Lake Nakuru",
    tagline: "Big 5 wildlife and the incredible wildebeest migration",
    description:
      "Kickstart a thrilling 6-day adventure through Kenya, starting and ending in Nairobi. Your journey begins in Masai Mara, famous for its Big 5 animals. You'll see at least 4 of these amazing creatures and witness the incredible wildebeest migration if you're there at the right time of year. Next, head to Lake Nakuru, just a 5-hour scenic drive away, to spot rhinos and enjoy birdwatching. You'll love the stunning views and unforgettable wildlife encounters throughout this tour, making memories that will last a lifetime.",
    duration: 6,
    destinations: ["Nairobi", "Masai Mara", "Lake Nakuru"],
    highlights: [
      "Big 5 wildlife viewing",
      "Wildebeest migration (seasonal)",
      "Rhino spotting at Lake Nakuru",
      "Birdwatching at Lake Nakuru",
      "Scenic Great Rift Valley stopover",
    ],
    itinerary: [
      {
        day: 1,
        title: "Nairobi to Masai Mara",
        description:
          "Your tour starts with pick up at 7:30 AM from your Nairobi hotel or Airport and drive to Masai Mara. This drive will take about 5 to 6.5 hours with a scenic stopover at Great Rift Valley. Arrive in Masai Mara shortly after noon and check into your lodge/camp, have hot lunch and then depart for an afternoon game drive. After the game drive, we head back to lodge/camp to reach by around 5:30 or 6:00 PM, freshen up and enjoy a freshly prepared Dinner. Overnight at your lodge.",
        notes: [
          "The last 1-hour drive to Masai Mara is on corrugated and bumpy road and may not be comfortable for clients with back problems. Clients with back problems can consider flying directly to (and out of) Masai Mara.",
        ],
      },
      {
        day: 2,
        title: "Masai Mara",
        description:
          "Today's itinerary is flexible and you can discuss with your guide on the previous evening and plan for today's schedule. You can either have a relaxed breakfast and depart for full day game drives around 9:00 AM with packed lunch and return back to lodge late afternoon around 6:00 PM. Or you can depart at 6:00 AM on an early morning game drive (This is the best time to see the animals and a good chance to witness hunt/kill). Later return to accommodation for breakfast and relax for a bit and depart on an afternoon game drive with packed lunch. You will stop at a picnic spot for having packed lunch and later depart on a game drive till the park is closed. Around 6:00 PM return to lodge for dinner and overnight stay.",
      },
      {
        day: 3,
        title: "Masai Mara",
        description:
          "Continue exploring Masai Mara with flexible game drive options. You can either have a relaxed breakfast and depart for full day game drives around 9:00 AM with packed lunch and return back to lodge late afternoon around 6:00 PM. Or you can depart at 6:00 AM on an early morning game drive (This is the best time to see the animals and a good chance to witness hunt/kill). Later return to accommodation for breakfast and relax for a bit and depart on an afternoon game drive with packed lunch. Around 6:00 PM return to lodge for dinner and overnight stay.",
      },
      {
        day: 4,
        title: "Masai Mara",
        description:
          "Your final full day in Masai Mara. Continue with flexible game drive options as previous days. Early morning drives offer the best chances for wildlife sightings and predator activity. Around 6:00 PM return to lodge for dinner and overnight stay.",
      },
      {
        day: 5,
        title: "Masai Mara to Lake Nakuru",
        description:
          "Around 10:00 AM after a relaxed breakfast checkout and depart to Lake Nakuru National Park which is about 5 hours drive from Mara gate. Upon reaching Nakuru lodge check in, have dinner and relax for the day.",
        notes: [
          "Morning game drives in Masai Mara can be added on the last morning at the park by paying additional park fees.",
        ],
      },
      {
        day: 6,
        title: "Lake Nakuru to Nairobi",
        description:
          "After breakfast, we proceed to Lake Nakuru national park with packed lunch and do game drives till around 2:00 PM and then proceed to Nairobi where we will reach around 5:30 PM at your hotel or airport in Nairobi.",
      },
    ],
    includes: [
      "Transport in 4x4 safari vehicle",
      "Professional driver/guide",
      "Full board accommodation (5 nights)",
      "All meals as per itinerary",
      "Park entry fees",
      "Bottled water during game drives",
      "Pick-up and drop-off in Nairobi",
    ],
    excludes: [
      "International flights",
      "Travel insurance",
      "Tips and gratuities",
      "Alcoholic beverages",
      "Personal expenses",
      "Optional activities (balloon safari, village visits)",
    ],
    importantNotes: [
      "The last 1-hour drive to Masai Mara is on corrugated and bumpy road and may not be comfortable for clients with back problems.",
      "Clients with back problems can consider flying directly to (and out of) Masai Mara.",
      "Morning game drives in Masai Mara can be added on the last morning at the park by paying additional park fees.",
    ],
    image: "/packages/masai-mara-safari.jpg",
    gallery: ["/packages/masai-mara-safari.jpg"],
  },
  {
    id: "ol-pejeta-naivasha-4-day",
    slug: "ol-pejeta-lake-naivasha-4-day",
    title: "4 Days - Ol Pejeta and Lake Naivasha",
    tagline: "Big Five viewing and scenic lake activities",
    description:
      "In this itinerary you will be visiting Ol Pejeta Conservancy (2 nights) and Lake Naivasha (1 night). Ol Pejeta is home to 'Big Five' animals whereas Lake Naivasha is a beautiful freshwater lake in Kenya which lies just north-west of Nairobi and offers unique activities like boat ride, hiking, etc. You can go on a hike on Crescent Island next to giraffes, buffaloes, gazelles, topi, impalas and waterbucks.",
    duration: 4,
    destinations: ["Nairobi", "Ol Pejeta Conservancy", "Lake Naivasha"],
    highlights: [
      "Big Five wildlife at Ol Pejeta",
      "Last Northern White Rhinos sanctuary",
      "Boat ride on Lake Naivasha",
      "Walking safari on Crescent Island",
      "Diverse birdwatching opportunities",
    ],
    itinerary: [
      {
        day: 1,
        title: "Nairobi to Ol Pejeta",
        description:
          "Your tour starts with pick up at 7:30 AM from your Nairobi hotel or Airport and depart to Ol Pejeta which is about a 3.5 to 4.5 hour drive from Nairobi. Arrive in Ol Pejeta around noon, check into your lodge/camp, have hot lunch and then depart for an afternoon game drive. Begin your first game drive. Ol Pejeta is home to 'Big Five' animals (Elephants, Lions, Leopards, Rhinos, and Buffalo). After the game drive, we head back to lodge/camp to reach by around 5:30 or 6:00 PM, freshen up and enjoy a freshly prepared Dinner. Overnight at your lodge.",
      },
      {
        day: 2,
        title: "Ol Pejeta",
        description:
          "We depart at 6:30 AM after breakfast on an early morning game drive (This is the best time to see the animals and a good chance to witness a hunt/kill). Later around 10:30 AM, return to accommodation for a break and relax for a bit and after lunch, depart on an afternoon game drive around 3:00 PM till around 6:00 PM. Return to lodge for dinner and overnight stay.",
      },
      {
        day: 3,
        title: "Ol Pejeta to Lake Naivasha",
        description:
          "Wake up early in the morning and embark on a final early morning game drive to maximize your wildlife viewing opportunities. Look out for any wildlife you may have missed earlier. Continue with game drives till around 9:00 AM and then head back to camp for breakfast. After breakfast, check out from camp and proceed to Naivasha which is about 5 hours drive. Check-in to your camp/lodge in Naivasha for dinner and overnight stay.",
      },
      {
        day: 4,
        title: "Lake Naivasha to Nairobi",
        description:
          "After breakfast, proceed to Lake Naivasha for a boat ride to Crescent Island where you will be doing a nature walk next to zebras, giraffes, wildebeest, waterbucks, antelopes and many types of birds. Return by boat to Naivasha for lunch at your lodge and then proceed to Nairobi.",
      },
    ],
    includes: [
      "Transport in 4x4 safari vehicle",
      "Professional driver/guide",
      "Full board accommodation (3 nights)",
      "All meals as per itinerary",
      "Park/Conservancy entry fees",
      "Boat ride on Lake Naivasha",
      "Crescent Island walking safari",
      "Bottled water during game drives",
      "Pick-up and drop-off in Nairobi",
    ],
    excludes: [
      "International flights",
      "Travel insurance",
      "Tips and gratuities",
      "Alcoholic beverages",
      "Personal expenses",
      "Optional activities",
    ],
    importantNotes: [],
    image: "/packages/ol-pejeta-rhino.jpg",
    gallery: ["/packages/ol-pejeta-rhino.jpg"],
  },
  {
    id: "kenya-grand-11-day",
    slug: "kenya-grand-tour-11-day",
    title: "11 Days - Samburu, Ol Pejeta, Lake Nakuru, Masai Mara, Lake Naivasha and Amboseli",
    tagline: "The ultimate Kenya safari covering 6 iconic destinations",
    description:
      "In this tour we will cover the 6 most popular destinations in Kenya, combining the northern and southern parks - Samburu Reserve (2 nights), Ol Pejeta Conservancy (1 night), Lake Nakuru National Park (1 night), Masai Mara National Reserve (3 nights), Lake Naivasha (1 night) & Amboseli National Park (2 nights). Tour starts and ends at Nairobi. With our experienced driver guides, it will be a trip of a lifetime!",
    duration: 11,
    destinations: [
      "Nairobi",
      "Samburu",
      "Ol Pejeta",
      "Lake Nakuru",
      "Masai Mara",
      "Lake Naivasha",
      "Amboseli",
    ],
    highlights: [
      "Samburu Special 5 unique wildlife",
      "Big Five at multiple parks",
      "Northern White Rhinos at Ol Pejeta",
      "Flamingos at Lake Nakuru",
      "Great Migration at Masai Mara (seasonal)",
      "Mt. Kilimanjaro views at Amboseli",
      "Boat ride and walking safari at Naivasha",
    ],
    itinerary: [
      {
        day: 1,
        title: "Nairobi to Samburu",
        description:
          "Your tour starts with pick up at 7:00 AM from your Nairobi hotel or Airport and drive to Samburu. This drive will take about 6 to 7 hours with diverse views ranging from the raw countryside, the central highlands of Kenya, the equator line and views of Mt Kenya. Arrive in Samburu by lunch time and check into your lodge/camp, have a hot lunch and then depart for an afternoon game drive. After the game drive, we head back to lodge/camp to reach by around 5:30 or 6:00 PM, freshen up and enjoy a freshly prepared Dinner. Overnight at your lodge.",
        notes: [
          "Samburu eco system consists of 3 national reserves. Samburu National reserve, Buffalo springs National reserve, Shaba National reserve. Entry fees is common for Buffalo springs and Shaba but it is different for Samburu. If your accommodation is in Samburu, your game drives are included in Samburu. If your accommodation is in Buffalo springs or Shaba, your game drives are included in Buffalo springs + Shaba. In case, your accommodation is in Buffalo springs or Shaba and if you wish to enter Samburu reserve, park fees of USD 80 per adult and USD 45 per child applies.",
        ],
      },
      {
        day: 2,
        title: "Samburu",
        description:
          "We depart at 6:30 AM after breakfast on an early morning game drive (This is the best time to see the animals and a good chance to witness a hunt/kill). Later around 10:30 AM, return to accommodation for a break and relax for a bit and after lunch, depart on an afternoon game drive around 3:00 PM till around 6:00 PM. Return to lodge for dinner and overnight stay.",
      },
      {
        day: 3,
        title: "Samburu to Ol Pejeta",
        description:
          "After breakfast, check out from camp and proceed to Ol Pejeta which is about 2 to 2.5 hours drive passing through scenic landscapes of central Kenya. Arrive at Ol Pejeta Conservancy shortly before noon and check into your lodge or camp, have hot lunch and then depart for an afternoon game drive. Ol Pejeta is renowned for its diverse wildlife, including the Big Five. You can focus on spotting elephants, rhinos, and buffaloes while enjoying the varied landscapes. After the game drive, we head back to lodge/camp, freshen up and enjoy a freshly prepared Dinner. Overnight at your lodge.",
      },
      {
        day: 4,
        title: "Ol Pejeta to Nakuru",
        description:
          "After breakfast, check out from camp and proceed to Lake Nakuru which is about 3.5 hours drive from Ol Pejeta. Upon reaching Nakuru lodge check in have lunch and depart for afternoon game drives till around 6:00pm. We proceed to camp/lodge for a freshly prepared dinner and later on overnight stay.",
      },
      {
        day: 5,
        title: "Nakuru to Masai Mara",
        description:
          "After breakfast checkout and depart to Masai Mara which is about 5 hours drive from Lake Nakuru. Check into your lodge/camp at Masai Mara, have lunch and depart for afternoon game drives. After the game drive, we head back to lodge/camp to reach by around 5:30 or 6:00 PM, freshen up and enjoy a freshly prepared Dinner. Overnight at your lodge.",
      },
      {
        day: 6,
        title: "Masai Mara",
        description:
          "Today's itinerary is flexible and you can discuss with your guide on the previous evening and plan for today's schedule. You can either have a relaxed breakfast and depart for full day game drives around 9:00 AM with packed lunch and return back to lodge late afternoon around 6:00 PM. Or you can depart at 6:00 AM on an early morning game drive (This is the best time to see the animals and a good chance to witness hunt/kill). Later return to accommodation for breakfast and relax for a bit and depart on an afternoon game drive with packed lunch. You will stop at a picnic spot for having packed lunch and later depart on a game drive till the park is closed. Around 6:00 PM return to lodge for dinner and overnight stay.",
      },
      {
        day: 7,
        title: "Masai Mara",
        description:
          "Continue exploring Masai Mara with the same flexible game drive options as the previous day. Early morning drives offer the best wildlife sightings. Around 6:00 PM return to lodge for dinner and overnight stay.",
      },
      {
        day: 8,
        title: "Masai Mara to Lake Naivasha",
        description:
          "After breakfast checkout and depart to Lake Naivasha which is about 5 hours drive. Check-in to your camp/lodge and then proceed for dinner and overnight stay.",
      },
      {
        day: 9,
        title: "Lake Naivasha to Amboseli",
        description:
          "Start your day with a Boat Ride to Crescent Island where you will be doing a nature walk next to zebras, giraffes, wildebeest, waterbucks, antelopes and many types of birds. Return back to your camp/lodges in Naivasha and check out. Start your drive to Amboseli with en route lunch. Upon reaching Amboseli, you can check in to the camp/lodge and relax and unwind for the day.",
      },
      {
        day: 10,
        title: "Amboseli",
        description:
          "Today's itinerary is flexible and you can discuss with your guide on the previous evening and plan for today's schedule. You can either have a relaxed breakfast and depart for full day game drives around 9:00 AM with packed lunch and return back to lodge late afternoon around 6:00 PM. Or you can depart at 6:00 AM on an early morning game drive (This is the best time to see the animals and a good chance to witness hunt/kill). Later return to accommodation for breakfast and relax for a bit and depart on an afternoon game drive with packed lunch. You will stop at a picnic spot for having packed lunch and later depart on a game drive till the park is closed. Around 6:00 PM return to lodge for dinner and overnight stay.",
        notes: [
          "Since Amboseli is relatively hot, game drives around noon are not usually recommended but can be arranged if you are interested.",
        ],
      },
      {
        day: 11,
        title: "Amboseli to Nairobi",
        description:
          "Wake up early in the morning and proceed to Amboseli for game drives around 6:15 AM. Continue with game drives till around 9:00 AM and then head back to camp for breakfast. After breakfast, check out from camp and proceed to Nairobi to reach by around 3:00 PM.",
      },
    ],
    includes: [
      "Transport in 4x4 safari vehicle",
      "Professional driver/guide",
      "Full board accommodation (10 nights)",
      "All meals as per itinerary",
      "All park/conservancy entry fees",
      "Boat ride on Lake Naivasha",
      "Crescent Island walking safari",
      "Bottled water during game drives",
      "Pick-up and drop-off in Nairobi",
    ],
    excludes: [
      "International flights",
      "Travel insurance",
      "Tips and gratuities",
      "Alcoholic beverages",
      "Personal expenses",
      "Optional activities (balloon safari, village visits)",
    ],
    importantNotes: [
      "Samburu park fees vary depending on which reserve your accommodation is in.",
      "Since Amboseli is relatively hot, game drives around noon are not usually recommended but can be arranged.",
    ],
    image: "/packages/kenya-grand-tour.jpg",
    gallery: ["/packages/kenya-grand-tour.jpg"],
  },
  {
    id: "mara-fly-in-4-day",
    slug: "masai-mara-fly-in-4-day",
    title: "4 Days (Fly-in) - Masai Mara National Reserve",
    tagline: "Immersive fly-in safari without the long drives",
    description:
      "This 4-day fly-in tour of the Masai Mara National Reserve offers an immersive wildlife experience, including round-trip flights. Witness the spectacular Big 5 in their natural habitat and, during the season, the iconic Wildebeest Migration. Enjoy thrilling game drives each day, exploring diverse landscapes teeming with wildlife. This adventure promises unforgettable moments and stunning vistas, making it perfect for those seeking an unforgettable safari getaway without the long drives.",
    duration: 4,
    destinations: ["Nairobi", "Masai Mara"],
    highlights: [
      "Round-trip flights to Masai Mara",
      "No long road transfers",
      "Big 5 wildlife viewing",
      "Wildebeest Migration (seasonal)",
      "Maximum game drive time",
    ],
    itinerary: [
      {
        day: 1,
        title: "Nairobi to Masai Mara",
        description:
          "Your tour starts with pick up at 7 AM from your Nairobi hotel or Airport and drive to Nairobi Airport for flight to Masai Mara at 10 AM (Flight 1). The flight from Nairobi to Masai Mara will be around 1 hour. Arrive in Masai Mara & check into your lodge/camp and have hot lunch and then depart for an afternoon game drives. After the game drives, we head back to lodge/camp to reach by around 5:30 or 6:00 PM, freshen up and enjoy a freshly prepared Dinner. Overnight at your lodge.",
        notes: [
          "On Day 1, you can do enroute game drives to your accommodation as well, depending upon the location of accommodation.",
        ],
      },
      {
        day: 2,
        title: "Masai Mara",
        description:
          "Today's itinerary is flexible and you can discuss with your guide on the previous evening and plan for today's schedule. You can either have a relaxed breakfast and depart for full day game drives around 9:00 AM with packed lunch and return back to lodge late afternoon around 6:00 PM. Or you can depart at 6:00 AM on an early morning game drive (This is the best time to see the animals and a good chance to witness hunt/kill). Later return to accommodation for breakfast and relax for a bit and depart on an afternoon game drive with packed lunch. You will stop at a picnic spot for having packed lunch and later depart on a game drive till the park is closed. Around 6:00 PM return to lodge for dinner and overnight stay.",
      },
      {
        day: 3,
        title: "Masai Mara",
        description:
          "Continue exploring Masai Mara with the same flexible game drive options. Early morning drives offer the best chances for wildlife sightings and predator activity. Around 6:00 PM return to lodge for dinner and overnight stay.",
      },
      {
        day: 4,
        title: "Masai Mara to Nairobi",
        description:
          "After a relaxed breakfast head back to Nairobi. On reaching Nairobi in the evening, you will be dropped off at the airport or your hotel.",
        notes: [
          "Morning game drives in Masai Mara can be added on the last morning at the park by paying additional park fees.",
        ],
      },
    ],
    includes: [
      "Round-trip flights (Nairobi - Masai Mara - Nairobi)",
      "Airport transfers in Nairobi",
      "Transport in 4x4 safari vehicle in Mara",
      "Professional driver/guide",
      "Full board accommodation (3 nights)",
      "All meals as per itinerary",
      "Park entry fees",
      "Bottled water during game drives",
    ],
    excludes: [
      "International flights",
      "Travel insurance",
      "Tips and gratuities",
      "Alcoholic beverages",
      "Personal expenses",
      "Optional activities (balloon safari, village visits)",
    ],
    importantNotes: [
      "Flight 1: Mombasa Air Safari - Departs from Wilson, Nairobi at 10:00 and arrives in Masai Mara at 11:00 approx.",
      "Flight 2: Mombasa Air Safari - Departs from Masai Mara at 11:15 and arrives in Wilson, Nairobi at 12:15 approx.",
      "If Mombasa Air Safari flights are not available for your travel dates, we will suggest alternative flight options with change in price.",
      "Morning game drives in Masai Mara can be added on the last morning at the park by paying additional park fees.",
    ],
    image: "/packages/mara-fly-in.jpg",
    gallery: ["/packages/mara-fly-in.jpg"],
  },
  {
    id: "central-kenya-7-day",
    slug: "ol-pejeta-nakuru-naivasha-mara-7-day",
    title: "7 Days - Ol Pejeta, Lake Nakuru, Lake Naivasha and Masai Mara",
    tagline: "The 4 most popular destinations in Kenya",
    description:
      "In this tour we will cover the 4 most popular destinations in Kenya - Ol Pejeta Conservancy (1 night), Lake Nakuru National Park (1 night), Lake Naivasha (1 night) & Masai Mara National Reserve (3 nights). Tour starts and ends at Nairobi. With our experienced driver guides, it will be a trip of a lifetime!",
    duration: 7,
    destinations: [
      "Nairobi",
      "Ol Pejeta",
      "Lake Nakuru",
      "Lake Naivasha",
      "Masai Mara",
    ],
    highlights: [
      "Big Five at Ol Pejeta Conservancy",
      "Rhinos and flamingos at Lake Nakuru",
      "Boat ride and Crescent Island walk at Naivasha",
      "3 nights in Masai Mara for extensive game drives",
      "Great Migration viewing (seasonal)",
    ],
    itinerary: [
      {
        day: 1,
        title: "Nairobi to Ol Pejeta",
        description:
          "Your tour starts with pick up at 7:30 AM from your Nairobi hotel or Airport and depart to Ol Pejeta which is about a 3.5 to 4.5 hour drive from Nairobi. Arrive in Ol Pejeta around noon, check into your lodge/camp, have hot lunch and then depart for an afternoon game drive. Begin your first game drive. Ol Pejeta is home to 'Big Five' animals (Elephants, Lions, Leopards, Rhinos, and Buffalo). After the game drive, we head back to lodge/camp to reach by around 5:30 or 6:00 PM, freshen up and enjoy a freshly prepared Dinner. Overnight at your lodge.",
      },
      {
        day: 2,
        title: "Ol Pejeta to Lake Nakuru",
        description:
          "After breakfast checkout and depart to Lake Nakuru National Park which is about 3.5 to 4 hours drive from Ol Pejeta. Check into your lodge at Nakuru, have lunch and depart for afternoon game drives. After game drives till around 6:00 PM, we proceed to your camp/lodge for a freshly prepared dinner. Overnight stay at your Camp/Lodge.",
      },
      {
        day: 3,
        title: "Lake Nakuru to Lake Naivasha",
        description:
          "After breakfast, depart to Lake Naivasha which will take about 1.5 hours and then proceed for Boat Ride to Crescent Island where you will be doing a nature walk next to zebras, giraffes, wildebeest, waterbucks, antelopes and many types of birds. Return back to your camp/lodges in Naivasha for overnight stay.",
      },
      {
        day: 4,
        title: "Lake Naivasha to Masai Mara",
        description:
          "After breakfast, checkout and depart to Masai Mara which is about 5 hours drive. Arrive in Masai Mara shortly after noon and check into your lodge/camp, have hot lunch and then depart for an afternoon game drive. After the game drive, we head back to lodge/camp to reach by around 5:30 or 6:00 PM, freshen up and enjoy a freshly prepared Dinner. Overnight at your lodge.",
        notes: [
          "The last 1-hour drive to Masai Mara is on corrugated and bumpy road and may not be comfortable for clients with back problems. Clients with back problems can consider flying directly to (and out of) Masai Mara.",
        ],
      },
      {
        day: 5,
        title: "Masai Mara",
        description:
          "Today's itinerary is flexible and you can discuss with your guide on the previous evening and plan for today's schedule. You can either have a relaxed breakfast and depart for full day game drives around 9:00 AM with packed lunch and return back to lodge late afternoon around 6:00 PM. Or you can depart at 6:00 AM on an early morning game drive (This is the best time to see the animals and a good chance to witness hunt/kill). Later return to accommodation for breakfast and relax for a bit and depart on an afternoon game drive with packed lunch. You will stop at a picnic spot for having packed lunch and later depart on a game drive till the park is closed. Around 6:00 PM return to lodge for dinner and overnight stay.",
      },
      {
        day: 6,
        title: "Masai Mara",
        description:
          "Continue exploring Masai Mara with the same flexible game drive options. Early morning drives offer the best wildlife sightings. Around 6:00 PM return to lodge for dinner and overnight stay.",
      },
      {
        day: 7,
        title: "Masai Mara to Nairobi",
        description:
          "After a relaxed breakfast head back to Nairobi. On reaching Nairobi in the evening, you will be dropped off at the airport or your hotel.",
        notes: [
          "Effective from 1st November 2023, our 2024 prices have been updated to reflect the revised park fees for Masai Mara (USD 100 from Jan to Jun and USD 200 from July to Dec).",
          "Morning game drives in Masai Mara can be added on the last morning at the park by paying additional park fees.",
        ],
      },
    ],
    includes: [
      "Transport in 4x4 safari vehicle",
      "Professional driver/guide",
      "Full board accommodation (6 nights)",
      "All meals as per itinerary",
      "All park/conservancy entry fees",
      "Boat ride on Lake Naivasha",
      "Crescent Island walking safari",
      "Bottled water during game drives",
      "Pick-up and drop-off in Nairobi",
    ],
    excludes: [
      "International flights",
      "Travel insurance",
      "Tips and gratuities",
      "Alcoholic beverages",
      "Personal expenses",
      "Optional activities (balloon safari, village visits)",
    ],
    importantNotes: [
      "The last 1-hour drive to Masai Mara is on corrugated and bumpy road and may not be comfortable for clients with back problems.",
      "Effective from 1st November 2023, prices reflect the revised park fees for Masai Mara (USD 100 from Jan to Jun and USD 200 from July to Dec).",
      "Morning game drives in Masai Mara can be added on the last morning by paying additional park fees.",
    ],
    image: "/packages/central-kenya-tour.jpg",
    gallery: ["/packages/central-kenya-tour.jpg"],
  },
];

// Helper functions
export function getPackageBySlug(slug: string): Package | undefined {
  return packages.find((p) => p.slug === slug);
}

export function getPackageById(id: string): Package | undefined {
  return packages.find((p) => p.id === id);
}

export function getAllPackages(): Package[] {
  return packages;
}
