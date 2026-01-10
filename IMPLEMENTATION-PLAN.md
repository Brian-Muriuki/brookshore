# Experience Builder - Implementation Plan

## Overview

Transform the existing Brookshores Safaris website from a traditional tour listing site into an **experience-based wishlist builder** where users collect moments, not itineraries.

---

## What We're Building

### User Journey (Summary)

```
Homepage → Browse Experiences → Add to Trip Bag → Review Wishlist → Submit → WhatsApp Handoff
```

### Core Features

1. **Experience Cards** with pricing, "Add to Trip" button, and info modal
2. **Vibe Filtering** (Safari, Beach, Mountains, Lakes, Culture, Adrenaline)
3. **Trip Bag** in navbar with running estimate
4. **Trip Shape Drawer** (triggered after first add) - trip length + starting city
5. **Wishlist Page** (`/my-adventure`) with region clustering, priority toggles, accommodation tier
6. **Lead Form** with budget confirmation
7. **WhatsApp Auto-Message** generation

---

## Data Architecture

### Experience Type Definition

```typescript
// data/experiences.ts

export type VibeCategory =
  | "safari"
  | "beach"
  | "mountains"
  | "lakes"
  | "culture"
  | "adrenaline";

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
  id: string;                          // "mara-migration"
  name: string;                        // "Masai Mara Migration"
  vibe: VibeCategory;                  // "safari"
  region: Region;                      // "rift-valley"
  tagline: string;                     // "Witness the World Cup of Wildlife"

  // Duration
  duration: string;                    // "3 Days"
  minDays: number;                     // 3
  maxDays: number;                     // 5

  // Pricing
  pricing: {
    international: {
      from: number;                    // 350
      to: number;                      // 850
      currency: "USD";
    };
    resident: {
      from: number;                    // 18500
      to: number;                      // 45000
      currency: "KES";
    };
  };
  pricingNote?: string;                // "Prices spike July-Oct"

  // Details
  includes: string[];                  // ["Full board", "Game drives", ...]
  tags: Tag[];                         // ["bucket-list", "photography"]
  pairings: string[];                  // ["lake-nakuru", "diani-beach"]

  // Media
  image: string;                       // "/experiences/mara-migration.jpg"
}
```

### Vibe Category Definition

```typescript
// data/vibes.ts

export interface Vibe {
  id: VibeCategory;
  name: string;
  icon: string;           // Emoji
  description: string;
  colorAccent: string;    // Tailwind color class
}

export const vibes: Vibe[] = [
  {
    id: "safari",
    name: "Safari & Wildlife",
    icon: "🦁",
    description: "Witness the Big Five in their natural habitat",
    colorAccent: "amber"
  },
  {
    id: "beach",
    name: "Beach & Coast",
    icon: "🏖️",
    description: "White sands, turquoise waters, and island life",
    colorAccent: "teal"
  },
  {
    id: "mountains",
    name: "Mountains & Hiking",
    icon: "⛰️",
    description: "Conquer peaks and explore scenic trails",
    colorAccent: "slate"
  },
  {
    id: "lakes",
    name: "Lakes & Rift Valley",
    icon: "🌊",
    description: "Flamingos, hippos, and boat rides on the lakes",
    colorAccent: "blue"
  },
  {
    id: "culture",
    name: "Culture & Heritage",
    icon: "🏛️",
    description: "Connect with history, tribes, and ancient cities",
    colorAccent: "orange"
  },
  {
    id: "adrenaline",
    name: "Adrenaline & Fun",
    icon: "🪂",
    description: "Rafting, skydiving, and thrill-seeking adventures",
    colorAccent: "red"
  }
];
```

### Trip Store (Global State)

```typescript
// store/tripStore.ts

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Priority = "must-do" | "if-time";
export type AccommodationTier = "budget" | "midrange" | "comfort" | "luxury";

export interface TripItem {
  experienceId: string;
  priority: Priority;
  addedAt: Date;
}

export interface TripShape {
  days: number | null;           // 3, 5, 7, 10, 14
  startingCity: string | null;   // "nairobi", "mombasa", "diani", null
}

export interface TripStore {
  // Trip items
  items: TripItem[];
  addItem: (experienceId: string) => void;
  removeItem: (experienceId: string) => void;
  togglePriority: (experienceId: string) => void;
  clearItems: () => void;

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

  // Audience (for pricing)
  isResident: boolean;
  setIsResident: (resident: boolean) => void;
}
```

### Lead Submission Payload

```typescript
// types/lead.ts

export interface WishlistLead {
  // Contact
  name: string;
  email: string;
  phone: string;              // WhatsApp number

  // Trip details
  tripName: string;
  tripRef: string;            // Auto-generated: "TRIP-2024-ABC123"

  // Selected experiences
  experiences: {
    id: string;
    name: string;
    priority: "must-do" | "if-time";
  }[];

  // Trip shape
  tripDays: number | null;
  startingCity: string | null;

  // Preferences
  accommodationTier: AccommodationTier;
  budgetPreference: "works" | "prefer-lower" | "can-go-higher";
  travelMonth?: string;
  groupSize?: string;
  notes?: string;

  // Meta
  isResident: boolean;
  estimatedTotal: {
    from: number;
    to: number;
    currency: string;
  };

  // Tracking
  submittedAt: string;
  page: string;
}
```

---

## Frontend Architecture

### New Components to Build

| Component | Location | Purpose |
|-----------|----------|---------|
| `ExperienceCard` | `components/ExperienceCard.tsx` | Card with image, pricing, add button, info trigger |
| `ExperienceInfoModal` | `components/ExperienceInfoModal.tsx` | Bottom sheet with includes, tags, pairing suggestions |
| `VibePills` | `components/VibePills.tsx` | Horizontal filter pills for vibes |
| `TripBag` | `components/TripBag.tsx` | Navbar dropdown with items + estimate |
| `TripBagCounter` | `components/TripBagCounter.tsx` | Small counter badge in navbar |
| `TripShapeDrawer` | `components/TripShapeDrawer.tsx` | Bottom drawer for days + starting city |
| `TripFitIndicator` | `components/TripFitIndicator.tsx` | "Great for 7-10 days" message |
| `WishlistItem` | `components/WishlistItem.tsx` | Card in wishlist with priority toggle, remove |
| `RegionGroup` | `components/RegionGroup.tsx` | Grouped section by region |
| `AccommodationSelector` | `components/AccommodationSelector.tsx` | Radio buttons for tier |
| `EstimateSummary` | `components/EstimateSummary.tsx` | Pricing breakdown card |
| `WishlistForm` | `components/WishlistForm.tsx` | Lead capture form with budget confirmation |
| `SuccessConfirmation` | `components/SuccessConfirmation.tsx` | Post-submit success screen |

### Pages to Create/Modify

| Page | Route | Action |
|------|-------|--------|
| Homepage | `/` | **Modify**: Replace hero CTA, add VibePills, replace Featured Tours with Experience grid |
| Experiences | `/experiences` | **New**: Full browse page with filtering (optional, can be homepage) |
| My Adventure | `/my-adventure` | **New**: Wishlist review + form + submission |

### Component Hierarchy

```
Layout (layout.tsx)
├── Navbar
│   ├── Logo
│   ├── Nav Links
│   ├── TripBagCounter ← NEW
│   │   └── TripBag (dropdown) ← NEW
│   └── Mobile Menu
├── Page Content
│   ├── Homepage
│   │   ├── HeroSection (modified)
│   │   ├── VibePills ← NEW
│   │   ├── ExperienceGrid ← NEW
│   │   │   └── ExperienceCard[] ← NEW
│   │   │       └── ExperienceInfoModal ← NEW
│   │   └── (other sections...)
│   └── /my-adventure ← NEW PAGE
│       ├── WishlistHeader
│       ├── RegionGroup[] ← NEW
│       │   └── WishlistItem[] ← NEW
│       ├── EstimateSummary ← NEW
│       │   └── AccommodationSelector ← NEW
│       ├── WishlistForm ← NEW
│       └── SuccessConfirmation ← NEW
├── TripShapeDrawer (fixed, triggered) ← NEW
├── Footer
└── WhatsAppButton (hidden on /my-adventure)
```

---

## Detailed Component Specs

### 1. ExperienceCard

**File**: `components/ExperienceCard.tsx`

**Props**:
```typescript
interface ExperienceCardProps {
  experience: Experience;
  isResident: boolean;
  isInBag: boolean;
  onAdd: () => void;
  onRemove: () => void;
  onInfoClick: () => void;
}
```

**Visual Structure**:
```
┌─────────────────────────────────────┐
│  [Image - 3:2 ratio, rounded-xl]    │
│                                     │
├─────────────────────────────────────┤
│  🦁 Safari & Wildlife               │  ← Vibe pill (small)
│                                     │
│  Masai Mara Migration               │  ← Name (font-semibold)
│  Witness the World Cup of Wildlife  │  ← Tagline (text-muted)
│                                     │
│  From $350/person ⓘ                 │  ← Price + info button
│  3-5 days                           │  ← Duration
│                                     │
│  [♥ Add to My Trip] or [✓ Added]    │  ← CTA button
└─────────────────────────────────────┘
```

**Interactions**:
- Hover: Slight scale (1.02)
- `ⓘ` click: Opens ExperienceInfoModal
- Add button: Adds to store, shows toast, triggers TripShapeDrawer if first item
- If already in bag: Shows "✓ Added" with option to remove

---

### 2. ExperienceInfoModal

**File**: `components/ExperienceInfoModal.tsx`

**Props**:
```typescript
interface ExperienceInfoModalProps {
  experience: Experience;
  isOpen: boolean;
  onClose: () => void;
  isResident: boolean;
}
```

**Visual Structure** (Bottom Sheet on mobile, Modal on desktop):
```
┌─────────────────────────────────────┐
│  [Drag handle]                      │
│                                     │
│  Masai Mara Migration               │
│  Safari & Wildlife • 3-5 days       │
│                                     │
│  ─────────────────────────────────  │
│                                     │
│  💰 Pricing                         │
│  From $350 - $850 /person           │
│  ⚠️ Prices spike July-Oct           │
│                                     │
│  ─────────────────────────────────  │
│                                     │
│  ✓ What's Included                  │
│  • Full board accommodation         │
│  • Comprehensive game drives        │
│  • Professional driver/guide        │
│  • Transport in 4x4                 │
│  • Pick-up and drop-off Nairobi     │
│                                     │
│  ─────────────────────────────────  │
│                                     │
│  🔗 Pairs Well With                 │
│  [Lake Nakuru] [Diani Beach]        │ ← Clickable chips
│                                     │
│  ─────────────────────────────────  │
│                                     │
│  ℹ️ Final quote depends on dates,   │
│  group size, and availability.      │
│                                     │
│  [Add to My Trip] or [Remove]       │
└─────────────────────────────────────┘
```

---

### 3. TripBag (Navbar Dropdown)

**File**: `components/TripBag.tsx`

**Visual Structure**:
```
┌────────────────────────────────────────┐
│  My Trip Bag                     [×]   │
│  ────────────────────────────────────  │
│                                        │
│  [🦁 Mara img] Masai Mara Migration    │
│                $350-$850    [Remove]   │
│                                        │
│  [🏖️ Diani img] Diani Beach Escape    │
│                $250-$600    [Remove]   │
│                                        │
│  [⛰️ Kenya img] Mt. Kenya Hike        │
│                $450-$700    [Remove]   │
│                                        │
│  ────────────────────────────────────  │
│                                        │
│  Experiences estimate:                 │
│  $1,050 - $2,150 /person               │
│                                        │
│  Final quote adds:                     │
│  • Routing & transfers                 │
│  • Date-specific availability          │
│                                        │
│  ────────────────────────────────────  │
│                                        │
│  [  Review My Wishlist  →  ]           │
└────────────────────────────────────────┘
```

**Empty State**:
```
┌────────────────────────────────────────┐
│  My Trip Bag                           │
│  ────────────────────────────────────  │
│                                        │
│  🎒                                    │
│  Your backpack is empty!               │
│  Start adding some adventures.         │
│                                        │
│  [  Browse Experiences  ]              │
└────────────────────────────────────────┘
```

---

### 4. TripShapeDrawer

**File**: `components/TripShapeDrawer.tsx`

**Trigger**: After first item added to bag (if `!hasSeenTripShapeDrawer`)

**Visual Structure**:
```
┌─────────────────────────────────────────────────────┐
│  [Drag handle]                                      │
│                                                     │
│  Great start! Quick questions:                      │
│                                                     │
│  Roughly how many days do you have?                 │
│  [3] [5] [7] [10] [14+]                             │
│                                                     │
│  Where are you landing?                             │
│  [Nairobi] [Mombasa] [Diani] [Not sure yet]         │
│                                                     │
│  [Skip for now]              [Save & Continue]      │
└─────────────────────────────────────────────────────┘
```

**Behavior**:
- Slides up 40% of screen height
- Tap outside to dismiss
- Saving persists to store
- "Skip" also dismisses but sets `hasSeenTripShapeDrawer: true`

---

### 5. Wishlist Page (`/my-adventure`)

**File**: `app/my-adventure/page.tsx`

**Layout** (Desktop):
```
┌──────────────────────────────────────────────────────────────────┐
│  Your Kenya Adventure                                            │
│  ────────────────────────────────────────────────────────────    │
│                                                                  │
│  ┌─────────────────────────────────┐  ┌────────────────────────┐ │
│  │  Name your trip:                │  │  Trip Estimate         │ │
│  │  [Amina's Safari & Beach     ]  │  │  ──────────────────    │ │
│  │                                 │  │                        │ │
│  │  ─────────────────────────────  │  │  Experiences (3):      │ │
│  │                                 │  │  $1,050 - $2,150 pp    │ │
│  │  📍 Rift Valley                 │  │                        │ │
│  │  ┌─────────────────────────┐    │  │  Accommodation:        │ │
│  │  │ Masai Mara Migration    │    │  │  ○ Budget              │ │
│  │  │ ⭐ Must-do  [Remove]    │    │  │  ○ Mid-range           │ │
│  │  └─────────────────────────┘    │  │  ● Comfort             │ │
│  │  ┌─────────────────────────┐    │  │  ○ Luxury              │ │
│  │  │ Hell's Gate & Naivasha  │    │  │                        │ │
│  │  │ 🤍 If time  [Remove]    │    │  │  ──────────────────    │ │
│  │  └─────────────────────────┘    │  │                        │ │
│  │                                 │  │  Est. Range:           │ │
│  │  📍 Coast                       │  │  $1,050 - $2,150 pp    │ │
│  │  ┌─────────────────────────┐    │  │  (Shown for Comfort)   │ │
│  │  │ Diani Beach Escape      │    │  │                        │ │
│  │  │ ⭐ Must-do  [Remove]    │    │  │  Final quote adds:     │ │
│  │  └─────────────────────────┘    │  │  • Routing & transfers │ │
│  │                                 │  │  • Dates & availability│ │
│  │  ─────────────────────────────  │  │                        │ │
│  │                                 │  │  ──────────────────    │ │
│  │  Trip Fit:                      │  │                        │ │
│  │  Great for a 7-10 day trip ✓    │  │  [ ] I'm a Kenya       │ │
│  │                                 │  │      resident (KES)    │ │
│  └─────────────────────────────────┘  └────────────────────────┘ │
│                                                                  │
│  ────────────────────────────────────────────────────────────    │
│                                                                  │
│  [FORM SECTION - see WishlistForm]                               │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```

---

### 6. WishlistForm

**File**: `components/WishlistForm.tsx`

**Fields**:
```
┌─────────────────────────────────────────────────────────────┐
│  Almost there!                                              │
│  Tell us a bit about yourself and we'll craft your          │
│  perfect itinerary.                                         │
│                                                             │
│  ─────────────────────────────────────────────────────────  │
│                                                             │
│  Name *                                                     │
│  [                                              ]           │
│                                                             │
│  WhatsApp Number *                                          │
│  [                                              ]           │
│                                                             │
│  Email *                                                    │
│  [                                              ]           │
│                                                             │
│  When are you thinking of traveling?                        │
│  [  Select month...                          ▼  ]           │
│                                                             │
│  How many travelers?                                        │
│  [  2 adults                                 ▼  ]           │
│                                                             │
│  Anything else we should know? (optional)                   │
│  [                                              ]           │
│  [                                              ]           │
│                                                             │
│  ─────────────────────────────────────────────────────────  │
│                                                             │
│  Your estimate: $1,050 - $2,150 /person                     │
│  Does this range work for your budget?                      │
│                                                             │
│  ● Yes, this works                                          │
│  ○ I'd prefer lower options                                 │
│  ○ I can go higher for premium                              │
│                                                             │
│  ─────────────────────────────────────────────────────────  │
│                                                             │
│  [    Send to Expert & Get My Itinerary    ]                │
│                                                             │
│  ✓ Personal expert assigned to you                          │
│  ✓ No payment required to inquire                           │
│  ✓ Best price guarantee for Residents                       │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

### 7. SuccessConfirmation

**File**: `components/SuccessConfirmation.tsx`

**Visual**:
```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│                      🎉 [Confetti]                          │
│                                                             │
│           Your Wishlist is safely with us! 🇰🇪              │
│                                                             │
│  We've received your dream plan. Check your WhatsApp        │
│  shortly—our expert will send you a polished itinerary      │
│  with exact availability and flight options.                │
│                                                             │
│  ─────────────────────────────────────────────────────────  │
│                                                             │
│  What you'll receive:                                       │
│  ✓ A day-by-day itinerary                                   │
│  ✓ 2-3 price options                                        │
│  ✓ Optimized route & transfers                              │
│  ✓ Final invoice only after you confirm                     │
│                                                             │
│  ─────────────────────────────────────────────────────────  │
│                                                             │
│  [  Open WhatsApp  ]     [  Back to Homepage  ]             │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Backend/API

### Existing Endpoint (Modify)

**File**: `app/api/leads/route.ts`

**Changes**:
- Add new variant: `"wishlist"`
- Accept full `WishlistLead` payload
- Generate `tripRef` (e.g., `TRIP-${year}-${randomChars}`)
- Log structured data (future: send to email/CRM)

### New Endpoint

**File**: `app/api/whatsapp-message/route.ts`

**Purpose**: Generate pre-filled WhatsApp message URL

**Request**:
```typescript
POST /api/whatsapp-message
{
  tripName: string;
  tripRef: string;
  experiences: { name: string; priority: string }[];
  tripDays: number | null;
  startingCity: string | null;
  accommodationTier: string;
  budgetPreference: string;
}
```

**Response**:
```typescript
{
  url: string;  // https://wa.me/254...?text=...
  message: string;  // Plain text version
}
```

**Generated Message Format**:
```
Hi! I just built a Kenya wishlist on Brookshores Safaris.

Trip: "Amina's Safari & Beach Escape"
Ref: #TRIP-2024-ABC123

Experiences:
• Masai Mara Migration (Must-do)
• Diani Beach Escape (Must-do)
• Hell's Gate & Naivasha (If time)

Duration: 7 days
Starting: Nairobi
Style: Comfort
Budget: This range works

I'm ready to finalize this. What are the next steps?
```

---

## Files to Create/Modify

### New Files

| File | Type |
|------|------|
| `data/experiences.ts` | Data |
| `data/vibes.ts` | Data |
| `store/tripStore.ts` | State |
| `components/ExperienceCard.tsx` | Component |
| `components/ExperienceInfoModal.tsx` | Component |
| `components/ExperienceGrid.tsx` | Component |
| `components/VibePills.tsx` | Component |
| `components/TripBag.tsx` | Component |
| `components/TripBagCounter.tsx` | Component |
| `components/TripShapeDrawer.tsx` | Component |
| `components/TripFitIndicator.tsx` | Component |
| `components/WishlistItem.tsx` | Component |
| `components/RegionGroup.tsx` | Component |
| `components/AccommodationSelector.tsx` | Component |
| `components/EstimateSummary.tsx` | Component |
| `components/WishlistForm.tsx` | Component |
| `components/SuccessConfirmation.tsx` | Component |
| `app/my-adventure/page.tsx` | Page |
| `app/api/whatsapp-message/route.ts` | API |
| `lib/pricing.ts` | Utility |
| `lib/tripRef.ts` | Utility |

### Files to Modify

| File | Changes |
|------|---------|
| `components/Navbar.tsx` | Add TripBagCounter |
| `components/HeroSection.tsx` | New CTA, simplified hero |
| `components/WhatsAppButton.tsx` | Hide on `/my-adventure` |
| `app/page.tsx` | Replace Featured Tours with Experience Grid |
| `app/api/leads/route.ts` | Add wishlist variant handling |
| `app/layout.tsx` | Add TripShapeDrawer, Zustand provider |
| `package.json` | Add zustand dependency |

---

## Dependencies to Add

```bash
npm install zustand
npm install canvas-confetti @types/canvas-confetti
```

- **zustand**: Lightweight state management with persistence
- **canvas-confetti**: For success screen celebration

---

## Experience Data (10 Experiences)

Based on your input, here's the finalized data:

| # | Name | Vibe | Region | USD From | USD To | KES From | KES To | Days |
|---|------|------|--------|----------|--------|----------|--------|------|
| 1 | Masai Mara Migration | Safari | rift-valley | 350 | 850 | 18,500 | 45,000 | 3-5 |
| 2 | Diani Beach Escape | Beach | coast | 250 | 600 | 22,000 | 55,000 | 3-7 |
| 3 | Amboseli: Giants & Kilimanjaro | Safari | rift-valley | 320 | 550 | 19,000 | 38,000 | 2-3 |
| 4 | Mt. Kenya Hike (Sirimon) | Mountains | central | 450 | 700 | 28,000 | 45,000 | 4-5 |
| 5 | Samburu Special 5 | Safari | northern | 400 | 750 | 24,000 | 42,000 | 3-4 |
| 6 | Watamu Marine & Ruins | Beach | coast | 300 | 650 | 25,000 | 60,000 | 3-7 |
| 7 | Hell's Gate & Naivasha | Lakes | rift-valley | 150 | 300 | 9,500 | 18,000 | 1-2 |
| 8 | Ol Pejeta Conservancy | Safari | central | 380 | 600 | 21,000 | 40,000 | 2-3 |
| 9 | Nairobi City Safari | Culture | nairobi | 80 | 150 | 4,500 | 8,000 | 1 |
| 10 | Sagana White Water Rafting | Adrenaline | central | 100 | 200 | 8,000 | 15,000 | 1-2 |

---

## Images Required

| # | Experience | Filename | Status |
|---|------------|----------|--------|
| 1 | Masai Mara Migration | `mara-migration.jpg` | ⬜ Needed |
| 2 | Diani Beach Escape | `diani-beach.jpg` | ⬜ Needed |
| 3 | Amboseli | `amboseli-elephants.jpg` | ⬜ Needed |
| 4 | Mt. Kenya Hike | `mt-kenya-hike.jpg` | ⬜ Needed |
| 5 | Samburu | `samburu-safari.jpg` | ⬜ Needed |
| 6 | Watamu | `watamu-beach.jpg` | ⬜ Needed |
| 7 | Hell's Gate | `hellsgate-cycling.jpg` | ⬜ Needed |
| 8 | Ol Pejeta | `ol-pejeta-rhino.jpg` | ⬜ Needed |
| 9 | Nairobi City | `nairobi-park-skyline.jpg` | ⬜ Needed |
| 10 | Sagana Rafting | `sagana-rafting.jpg` | ⬜ Needed |

**Specs**: 1200 x 800px, JPG/WebP, landscape, no text/watermarks

**Location**: `/public/experiences/`

---

## Build Order

### Phase 1: Data & State Foundation
1. Install dependencies (zustand)
2. Create `data/vibes.ts`
3. Create `data/experiences.ts` with all 10 experiences
4. Create `store/tripStore.ts` with Zustand
5. Create `lib/pricing.ts` utility functions

### Phase 2: Core Components
6. Build `ExperienceCard` component
7. Build `ExperienceInfoModal` (bottom sheet)
8. Build `VibePills` filter component
9. Build `ExperienceGrid` wrapper

### Phase 3: Trip Bag
10. Build `TripBagCounter` (navbar badge)
11. Build `TripBag` dropdown
12. Modify `Navbar` to include TripBag
13. Build `TripShapeDrawer`

### Phase 4: Homepage Integration
14. Modify `HeroSection` with new CTA
15. Replace Featured Tours section with Experience browsing
16. Add VibePills to homepage
17. Wire up add/remove functionality

### Phase 5: Wishlist Page
18. Create `/my-adventure` page
19. Build `WishlistItem` component
20. Build `RegionGroup` component
21. Build `AccommodationSelector`
22. Build `EstimateSummary`
23. Build `TripFitIndicator`
24. Build `WishlistForm`
25. Build `SuccessConfirmation`

### Phase 6: Backend & Polish
26. Modify `/api/leads` for wishlist variant
27. Create `/api/whatsapp-message` endpoint
28. Add confetti animation
29. Hide WhatsApp button on `/my-adventure`
30. Test full flow end-to-end

---

## What I Still Need From You

### Before I Start Building

| Item | Status | Notes |
|------|--------|-------|
| ✅ Vibe categories | Done | 6 categories confirmed |
| ✅ Experience data | Done | 10 experiences with pricing |
| ⬜ Images | **NEEDED** | 10 experience images (1200x800px) |
| ✅ Copy | Done | Hero, form, success messaging |
| ⬜ WhatsApp number | **NEEDED** | Format: 254XXXXXXXXX |
| ⬜ Confirmation | **NEEDED** | Approve this plan to proceed |

---

## Questions for You

1. **Homepage approach**: Should experiences replace the current "Featured Tours" section entirely, or should we create a separate `/experiences` page and keep tours?

2. **Existing tours**: What happens to the existing 4 tours in `/data/tours.ts`? Keep them separate, or migrate to experiences?

3. **Corporate section**: Does the experience builder apply to corporate, or is that a separate flow?

4. **WhatsApp number**: Confirm the number for wishlist submissions.

---

## Ready to Proceed?

Reply with:
- ✅ **"Approved, proceed"** - I'll start building
- Or any questions/changes you want before I begin
