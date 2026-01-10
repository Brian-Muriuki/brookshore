# Legacy Tours & Experiences System

This directory contains the shelved tours and experiences data that was used in the previous version of the website.

## Overview

The original system used a "trip builder" approach where users could:
1. Browse experiences by "vibes" (categories like Safari, Beach, Mountains, etc.)
2. Add multiple experiences to a "trip bag"
3. Set priority levels (must-do vs if-time) for each experience
4. Configure trip shape (duration, starting city)
5. Submit the wishlist to get a custom itinerary

## Shelved Files

### experiences.ts
Contains 10 experiences organized by vibes:
- **Safari & Wildlife**: Masai Mara Migration, Amboseli: Giants & Kilimanjaro, Samburu Special 5, Ol Pejeta Conservancy
- **Beach & Coast**: Diani Beach Escape, Watamu Marine & Ruins
- **Mountains & Hiking**: Mt. Kenya Hike (Sirimon)
- **Lakes & Rift Valley**: Hell's Gate & Naivasha
- **Culture & Heritage**: Nairobi City Safari
- **Adrenaline & Fun**: Sagana White Water Rafting

Each experience included:
- Detailed descriptions and taglines
- Duration (min/max days)
- Dual pricing (International USD / Kenya Resident KES)
- Includes/Excludes lists
- What to expect / What not to expect
- Tags for filtering
- Suggested pairings with other experiences
- Image gallery

### tours.ts
Contains 4 packaged tours with fixed itineraries:
1. 3-Day Maasai Mara Safari
2. 2-Day Amboseli Elephants & Kilimanjaro Views
3. 4-Day Diani Beach Escape
4. Naivasha Weekend Getaway

## Old Checkout Flow

1. User browses experiences on homepage
2. Clicks "Add to My Trip" on any experience card
3. First add triggers TripShapeDrawer asking:
   - "How many days do you have?" (3, 5, 7, 10, 14+)
   - "Where are you landing?" (Nairobi, Mombasa, Diani, Not sure)
4. User continues adding experiences to bag
5. Navigates to /my-adventure page
6. Sees all added experiences grouped by region
7. Can toggle priority (must-do/if-time)
8. Sees estimate sidebar with:
   - Experiences count
   - Price range estimate
   - Accommodation tier selector (Budget, Mid-range, Comfort, Luxury)
9. Fills out WishlistForm:
   - Name, WhatsApp, Email (required)
   - Travel month dropdown
   - Group size dropdown
   - Notes textarea
   - Kenya resident toggle
   - Budget preference radio buttons
10. Clicks "Send to Expert & Get My Itinerary"
11. Form submits to /api/leads (Google Sheets integration)
12. Success page shows:
    - Trip reference number (TRIP-YYYY-XXXXX)
    - WhatsApp link to chat with expert
    - Confetti celebration animation

## Store State (Zustand)

The tripStore.ts managed:
- `items[]` - Trip items with priority
- `tripShape` - Days and starting city
- `accommodationTier` - Budget/midrange/comfort/luxury
- `tripName` - Custom trip name
- `isResident` - Pricing toggle
- `hasSeenTripShapeDrawer` - UI state
- `isDrawerOpen` - Drawer visibility

All state was persisted to localStorage under key "brookshore-trip-storage".

## Pricing Logic

- International pricing in USD
- Resident pricing in KES
- Price ranges (from-to) per experience
- Total estimate calculated by summing all experiences
- Accommodation tier affected final quote (not displayed in estimate)

## Re-integration Notes

When bringing this system back:
1. Restore experiences.ts to /data/experiences.ts
2. Restore tours.ts to /data/tours.ts
3. Re-enable ExperienceGrid component on homepage
4. Restore /my-adventure page functionality
5. Re-enable TripShapeDrawer
6. Consider how to integrate with the new fixed-itinerary packages
7. May want hybrid approach: browse experiences OR choose fixed package

## Related Components (removed from codebase)

The following components were removed to clean up the build. They can be retrieved from git history if needed for re-integration:

- ExperienceCard.tsx - Card display for grid
- ExperienceGrid.tsx - Grid with vibe filters
- ExperienceInfoModal.tsx - Modal for experience details
- TripBag.tsx - Dropdown bag preview
- TripBagCounter.tsx - Navbar counter badge
- WishlistItem.tsx - Item in wishlist page
- WishlistForm.tsx - The wishlist submission form
- RegionGroup.tsx - Groups by region
- TripShapeDrawer.tsx - Initial setup drawer
- MobileTripBar.tsx - Mobile trip bar
- EstimateSummary.tsx - Price summary sidebar
- AccommodationSelector.tsx - Accommodation tier selector
- VibePills.tsx - Vibe category filter pills
- TourCard.tsx - Tour card display
- ToursBrowser.tsx - Tour browser with filters

To restore these components, use git to retrieve them from a previous commit.

## Removed Pages

- /my-adventure - The wishlist/checkout page
- /experiences/[slug] - Individual experience detail pages
- /tours - Tour listing page
- /tours/[slug] - Individual tour detail pages

These pages relied on the legacy components and trip store.
