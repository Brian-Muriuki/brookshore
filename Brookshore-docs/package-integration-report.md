# Brookshore Package Integration Report

## Purpose

This review looks at the current Brookshore site setup and how to incorporate the client's audience-based packages so they are easy to find from the home page, especially for people arriving from business cards, referrals, or direct links.

## Client Materials Reviewed

The package brief provided in `Brookshore-docs/brookshore_packages.pdf` maps to five clear offers:

1. `Scholar's Safari`
   For schools and learning institutions.
   Current brief highlights: curriculum-focused outdoor trips, `1-3 days`, `30-200 students`, `starting from KSH 2,500 per student`.

2. `Executive Retreat`
   For corporate strategic meetings.
   Current brief highlights: venue + AV + accommodation + transport, `2-4 days`, `10-80 pax`, `starting from KSH 12,000 per person per day`.

3. `Pilgrimage & Fellowship`
   For churches and faith communities.
   Current brief highlights: faith-centered group travel, `2-4 days`, `30-400 members`, `starting from KSH 4,500 per person`.

4. `Bond & Build`
   Team-building, excursions, and corporate fun days.
   Current brief highlights: high-energy group experiences, `1-3 days`, `20-300 pax`, `starting from KSh 6,500 per person`.

5. `Family Tales`
   Family getaways across Kenya.
   Current brief highlights: family-friendly holidays, `2-7 days`, `2-20 pax`, `starting from KSh 18,000 per family`.

The client also shared a new company logo, which should become the primary visible brand mark on the site.

## Verified Package Reference

The following details were verified from the package screenshots in `Brookshore-docs/packages/`.

### 1. Scholar's Safari

Subtitle:

- `Educational Tours for Schools & Learning Institutions`

What's included:

- Comfortable bus transport
- Park & reserve entry fees
- Certified nature guide & educator
- Wildlife education session
- Packed lunch & refreshments
- Participation certificates
- First aid & safety cover
- Dedicated tour coordinator

Activities & highlights:

- Guided game drives
- Animal Orphanage visit
- Nature & bird walks
- Cultural village tour
- Beach & marine education
- Team bonding games
- Photography session
- Q&A with park rangers

Destinations:

- Nairobi National Park
- Mombasa
- Naivasha
- Nanyuki
- Lake Nakuru
- Oldonyo Sabuk
- Karen Blixen Museum

Key package facts:

- Duration: `1-3 Days`
- Group size: `30-200 Students`
- Price from: `KSh 2,500/student`
- Age group: `All Levels`
- Ideal for: `Primary Schools`, `Secondary Schools`, `Universities`, `Youth Groups`

### 2. Executive Retreat

Subtitle:

- `Corporate Strategic Meetings & Leadership Conferences`

What's included:

- Conference-ready venue & setup
- LCD projector & full AV
- High-speed WiFi throughout
- Full-board accommodation
- Tea/coffee & snack breaks
- Formal team dinner
- Transport & logistics
- Dedicated event coordinator

Activities & highlights:

- Strategy & planning sessions
- Leadership workshops
- Guided nature walks (AM/PM)
- Sundowner networking
- Game drive (optional add-on)
- Wellness & yoga sessions
- Cultural evening entertainment
- Boat rides & water sports

Destinations:

- Naivasha
- Nanyuki
- Mombasa
- Brackenhurst Limuru
- Sagana
- Diani

Key package facts:

- Duration: `2-4 Days`
- Group size: `10-80 Pax`
- Price from: `KSh 12,000/pax/day`
- Best time: `Year Round`
- Ideal for: `C-Suite Retreats`, `Board Meetings`, `AGMs`, `Strategy Sessions`, `NGO Leadership`

### 3. Bond & Build

Subtitle:

- `Team Building, Excursions & Corporate Fun Days`

What's included:

- Professional facilitator
- All activity equipment
- Transport (fleet of coaches)
- Lunch & refreshments
- Group photo & video reel
- Awards & medals ceremony
- Evening bonfire (optional)
- Safety & first aid team

Activities & highlights:

- White-water rafting (Sagana)
- Zip-lining & high ropes
- Treasure hunts & relay races
- Dragon boat racing
- Cooking challenge competitions
- Go-karting & quad bikes
- Karura Forest team hike
- Paint-ball & archery

Destinations:

- Sagana
- Naivasha
- Nanyuki
- Mombasa
- Ol Pejeta
- Diani Beach

Key package facts:

- Duration: `1-3 Days`
- Group size: `20-300 Pax`
- Price from: `KSh 6,500/person`
- Style: `Indoor & Outdoor`
- Ideal for: `Corporates`, `NGOs & INGOs`, `Government Departments`, `SACCOs`, `Schools & Colleges`

### 4. Family Tales

Subtitle:

- `Unforgettable Family Getaways Across Kenya`

What's included:

- Family-friendly accommodation
- Park & reserve entry fees
- Expert guide for game drives
- Kids' activity programme
- All meals (full board)
- Comfortable transport
- Comprehensive travel insurance
- 24-hour support hotline

Activities & highlights:

- Big Five game drives
- Bush & beach walks
- Snorkelling & water sports
- Sundowner boat rides
- Cultural Maasai village visit
- Kids' wildlife quiz & games
- Camel & horse riding
- Beach BBQ & bonfires

Destinations:

- Mombasa / Diani
- Naivasha
- Nanyuki
- Amboseli
- Maasai Mara
- Tsavo East & West
- Watamu

Key package facts:

- Duration: `2-7 Days`
- Group size: `2-20 Pax`
- Price from: `KSh 18,000/family`
- Includes: `Kids Activities`
- Ideal for: `Nuclear Families`, `Extended Families`, `Anniversary Trips`, `Birthday Getaways`, `School Holiday Breaks`

### 5. Pilgrimage & Fellowship

Subtitle:

- `Spiritual Retreats for Churches & Faith Communities`

What's included:

- Transport (bus / shuttle fleet)
- Full-board accommodation
- Worship & devotion spaces
- PA system & worship equipment
- Nature walks & guided tours
- Community service activity
- Sunrise prayer at scenic viewpoints
- Group coordinator & chaplain support

Activities & highlights:

- Sunrise & sunset prayer sessions
- Campfire fellowship evenings
- Community service at local village
- Nature & creation walks
- Worship nights under the stars
- Group Bible study sessions
- Team-building & fellowship games
- Cultural & historical tours

Destinations:

- Subukia National Shrine
- Naivasha
- Nanyuki
- Mombasa
- Mt Kenya Foothills
- Brackenhurst Limuru
- Sagana

Key package facts:

- Duration: `2-4 Days`
- Group size: `30-400 Members`
- Price from: `KSh 4,500/person`
- Faith: `All Denominations`
- Ideal for: `Church Retreats`, `Choir Trips`, `Youth Camps`, `Women's & Men's Fellowships`, `Pastor Conferences`

## What Exists Today

### 1. Home page structure

The current home page in `app/[locale]/page.tsx` is organized like this:

1. General safari hero
2. Trust strip
3. Safari packages grid
4. Tours and experiences
5. Why Brookshores
6. Popular destinations
7. Testimonials
8. Newsletter

This is a solid structure for generic safari discovery, but it does not currently prioritize audience-specific packages for schools, executives, faith groups, team / bonding groups, or families.

### 2. Current package system

The current package data in `data/packages.ts` is built around fixed safari itineraries.

Existing package examples:

- `masai-mara-lake-nakuru-6-day`
- `ol-pejeta-lake-naivasha-4-day`
- `kenya-grand-tour-11-day`
- `masai-mara-fly-in-4-day`
- `ol-pejeta-nakuru-naivasha-mara-7-day`

Each package expects:

- day-by-day itinerary
- wildlife/safari highlights
- included and excluded items
- optional excursions
- destination sequence
- booking flow for a standard trip inquiry

This works well for leisure safari products, but it is not a natural fit for the five new audience-led offers.

### 3. Existing routes that matter

- `app/[locale]/page.tsx`: home page
- `app/[locale]/packages/[slug]/page.tsx`: existing safari package detail pages
- `app/[locale]/corporate/page.tsx`: existing corporate landing page
- `components/PackageGrid.tsx`: renders safari package cards on the home page
- `components/QuoteForm.tsx`: current inquiry form variants are `tour`, `corporate`, and `contact`

### 4. Existing support for one of the new audiences

There is already a `Corporate` page, which gives Brookshore a starting point for the `Executive Retreat` package.

That means:

- `Executive Retreat` can evolve from the existing corporate flow
- `Scholar's Safari`, `Pilgrimage & Fellowship`, `Bond & Build`, and `Family Tales` still need first-class entry points

### 5. Branding status

The codebase currently uses placeholder-style brand treatment in visible UI, especially in the navbar and footer.

Also, there is a naming mismatch:

- site copy mostly says `Brookshores Safaris`
- the supplied logo says `Brookshore Safaris`

This should be resolved before a broader rollout so the brand looks intentional and consistent.

## Main Gaps

### Discoverability gap

The client's biggest requirement is easy discovery from the landing page. Right now the home page leads with generic safari packages, so users arriving from a card may not immediately see:

- school trips
- executive retreats
- church / fellowship travel
- team-bonding offers
- family-friendly packages

### Content-model gap

The current package schema assumes itinerary-heavy safari content. The new client offers are audience-based packages with:

- audience labels
- group size bands
- price-from positioning
- "best for" positioning
- package inclusions
- destination options
- special add-ons

That is a different content shape.

### Form gap

The current quote form does not yet capture group-specific details like:

- school / institution name
- church / ministry name
- event type
- age group or attendee profile
- learning objective or retreat objective
- preferred venue style

## Client Format vs Current Website

This is an important contrast because the client's package sheets and the current website are solving different problems well.

### How the client arranged the packages

The client package sheets are:

- audience-first
- sales-oriented
- highly scannable
- built for offline-to-online conversion

Each package sheet follows a simple, repeatable hierarchy:

1. package name and subtitle
2. short emotional/value statement
3. `What's Included`
4. `Activities & Highlights`
5. `Destinations`
6. quick facts row
   Usually duration, group size, `price from`, and one more key label like age group, faith, best time, style, or kids activities
7. `Ideal For`
8. direct booking contact at the bottom

What this does well:

- makes the package understandable in under a minute
- matches brochure/business-card style marketing
- helps someone self-identify quickly
- avoids burying the offer inside long itinerary content

### How the current website arranged packages

The current website package system is:

- itinerary-first
- safari-product-first
- built for browsing multiple trips
- stronger for detailed exploration after initial interest

The current website flow is roughly:

1. generic safari hero
2. package cards in a grid
3. individual package detail pages
4. long-form itinerary sections
5. includes/excludes
6. booking/inquiry form

What this does well:

- supports SEO-friendly detail pages
- gives more depth for decision-making
- works well for classic safari products
- supports structured inquiry and lead capture

### The main difference

The client sheets answer:

- `Is this package for me or my group?`

The website currently answers:

- `What does this trip look like in detail?`

That is why the client's approach feels more immediate for schools, executives, churches, teams, and families, while the current website feels stronger for detailed safari planning.

### Where the client format is stronger

- stronger first impression for audience-targeted offers
- easier for direct traffic from printed materials
- clearer segmentation by group type
- better visual emphasis on quick decision information

### Where the current website is stronger

- better for longer reading and deeper trust-building
- easier to add forms, WhatsApp CTAs, and richer content
- better for routing users into specific inquiry flows
- more flexible for future SEO, analytics, and campaign landing pages

## Best of Both Worlds

The best implementation is not to choose one over the other. It is to combine them deliberately.

### Recommended hybrid model

Use the client's package-sheet logic for the top of the experience, and the website's strengths for the deeper conversion flow.

That means:

1. on the home page, present these packages the way the client framed them
2. on each package page, keep the same core sections from the client sheet
3. below those sections, add the web-specific conversion tools and richer content

### What to carry over from the client format

- package name + subtitle
- short positioning statement
- `What's Included`
- `Activities & Highlights`
- `Destinations`
- quick facts row
- `Ideal For`
- visible `price from`

These should appear near the top of each package page, in roughly that order.

### What to carry over from the website format

- strong CTA buttons
- WhatsApp integration
- inquiry form tailored to package type
- internal navigation / anchor links
- richer explanatory content when needed
- structured metadata and sharable routes

### Practical homepage recommendation

The home page should use a card format inspired by the client sheets, not the current safari itinerary cards.

Each audience-package card should show:

- package title
- subtitle
- 1-line summary
- `price from`
- duration
- group size
- 3 key inclusions
- CTA

This gives the immediate clarity of the client's materials, but in a web-appropriate format.

### Practical detail-page recommendation

Each package detail page should start like a digital version of the client's sheet, then continue with website enhancements.

Suggested order:

1. hero with title, subtitle, and audience statement
2. quick facts row
3. `What's Included`
4. `Activities & Highlights`
5. `Destinations`
6. `Ideal For`
7. tailored inquiry form
8. WhatsApp CTA
9. optional deeper notes or FAQs

### Important design note

The client layout is excellent for information hierarchy, but it should not be copied literally into the website as a dense poster-style image layout.

On the web, we should preserve:

- the client's section order
- the quick-scan logic
- the audience-first framing

But adapt it into:

- responsive cards
- readable mobile sections
- real text content instead of text embedded in images
- accessible CTAs and forms

That is the best way to keep the client's marketing logic while still building a strong web experience.

## Special Days Visibility

Yes. The cleanest way to do this is to add a lightweight campaign layer on top of the normal package structure, instead of changing the base homepage every time there is a special day or seasonal promotion.

For example, for `Mother's Day` on `Sunday, May 10, 2026`, the website can temporarily surface a relevant package like the `Mombasa Trip` without replacing the standard package experience.

### What should not happen

To avoid interfering with the normal site structure:

- do not replace the full homepage layout
- do not hard-code one-off banners directly into core sections
- do not mix special-day offers into the regular package data without labeling them clearly

### Recommended approach

Create a separate `campaign` or `special offer` layer that can be switched on and off by date.

Suggested content model:

- `slug`
- `title`
- `subtitle`
- `theme`
- `image`
- `startDate`
- `endDate`
- `priceFrom`
- `ctaLabel`
- `ctaHref`
- `targetAudience`
- `linkedPackage` or `linkedCampaignPage`
- `active`
- `placement`

Example placements:

- `top-banner`
- `hero-highlight`
- `featured-strip`
- `package-badge`

### Best homepage pattern

The safest and cleanest pattern is:

1. keep the existing homepage structure
2. insert one temporary `Seasonal Spotlight` block near the top
3. show it only when a campaign is active
4. hide it automatically when the campaign window ends

Recommended placement:

- below the hero
- above the audience-package section

Why this works:

- high visibility
- does not break the existing design
- keeps seasonal promotions clearly separated from evergreen packages

### Good UI options

#### Option 1: Seasonal spotlight card

A single prominent card or banner near the top of the homepage.

Best for:

- Mother's Day
- Easter
- Christmas
- school holiday specials
- Valentine's getaways

Content example:

- campaign title
- short emotional message
- `price from`
- what is included
- CTA like `Book Mother's Day Offer`

#### Option 2: Featured campaign strip

A small horizontal strip showing `Limited Offer`, date relevance, and CTA.

Best for:

- lighter promotions that should be seen but not dominate the page

#### Option 3: Package badges

Add temporary badges on matching cards such as:

- `Mother's Day Special`
- `Holiday Pick`
- `Weekend Offer`

This is useful as a secondary signal, but it is not enough on its own if the goal is strong visibility.

### Best combined setup

The strongest setup is:

1. seasonal spotlight block near the top of the homepage
2. badge on the related package card
3. dedicated landing page for the campaign

That gives:

- immediate visibility
- continuity with the normal browsing flow
- a focused page for paid ads, WhatsApp sharing, or QR codes

### Dedicated campaign pages

For offers like the Mother's Day Mombasa trip, it is better to create a dedicated campaign page than to force it into the standard package page structure.

Suggested route examples:

- `/specials/mothers-day-mombasa`
- `/specials/easter-family-getaway`
- `/specials/december-coast-offer`

This allows:

- a more promotional visual style
- direct use from social posts and flyers
- temporary messaging without cluttering evergreen package pages

### How this fits the existing website

The normal package system should remain the core evergreen structure.

The seasonal layer should behave like:

- temporary
- scheduled
- optional
- visually distinct

That means the site can continue working normally even when there is no active campaign.

### Practical implementation direction

A good implementation path would be:

1. create `data/campaigns.ts`
2. define active date windows for each campaign
3. render only campaigns whose dates are currently active
4. allow campaign cards to link either to a special landing page or a relevant package page

### Recommended rule for visibility

To preserve balance in the design:

- show only one primary seasonal campaign at a time on the homepage
- allow multiple secondary badges if needed
- automatically archive expired campaigns

### Best of both worlds for seasonal offers

Use the normal homepage and package system for evergreen discovery, and add a time-based spotlight layer for date-sensitive offers.

This gives Brookshore:

- flexibility for special days
- strong visibility when needed
- no disruption to the main information architecture
- easier reuse for future campaigns beyond Mother's Day

## Recommended Integration Approach

## Recommendation 1: Add a new home-page section above the current safari package grid

This is the most important change.

Add a new section directly after the hero and trust strip, before the current safari package grid.

Suggested section title:

- `Packages by Group`
- or `Find the Right Package for Your Group`

This section should contain five prominent cards:

1. `Scholar's Safari`
2. `Executive Retreat`
3. `Pilgrimage & Fellowship`
4. `Bond & Build`
5. `Family Tales`

Each card should show at a glance:

- who it is for
- duration
- group size
- price from
- 3 to 5 core inclusions
- primary CTA such as `View Package` or `Request Proposal`

Why this placement matters:

- it satisfies the client's "easy to find" requirement
- it helps direct traffic from printed material immediately
- it prevents these offers from being buried below generic safari content

## Recommendation 2: Keep the current safari packages, but reposition them as secondary

The existing safari packages should remain, but the labeling should become more explicit.

Suggested rename on the home page:

- from `Curated Kenya Safari Adventures`
- to something closer to `Popular Safari Packages`

This keeps the current leisure inventory while making room for the new group-based offers at the top of the homepage funnel.

## Recommendation 3: Create a separate content model for audience packages

Do not force these new offers into the existing `data/packages.ts` structure as-is.

Instead, create a separate audience-package model, for example:

- `data/audiencePackages.ts`

Suggested fields:

- `slug`
- `title`
- `audience`
- `subtitle`
- `summary`
- `bestFor`
- `duration`
- `groupSize`
- `priceFrom`
- `destinations`
- `inclusions`
- `specialAdditions`
- `image`
- `ctaLabel`
- `leadVariant`

Reason:

- `Scholar's Safari` does not need the same itinerary presentation as a 6-day safari
- `Executive Retreat` needs proposal-style B2B framing
- `Pilgrimage & Fellowship` needs community/faith-focused positioning
- `Bond & Build` likely needs group / team-outcome framing
- `Family Tales` needs family-friendly planning and inquiry framing

## Recommendation 4: Give each package its own detail page

Each of the five packages should have a dedicated landing page linked from the home-page cards.

Suggested routes:

- `/packages/scholars-safari`
- `/packages/executive-retreat`
- `/packages/pilgrimage-fellowship`
- `/packages/bond-and-build`
- `/packages/family-tales`

Each page should include:

- strong headline
- audience statement
- best-for chips
- inclusions
- destinations
- price-from positioning
- simple inquiry form
- WhatsApp CTA

For business-card use, these pages can also be shared directly through QR codes or printed short links later.

## Recommendation 5: Rework the corporate page into the Executive Retreat page

The existing `app/[locale]/corporate/page.tsx` is already the closest fit for `Executive Retreat`.

Recommended update:

- keep the route if needed for continuity
- update the page copy so it explicitly reflects the `Executive Retreat` package
- add the client's package-specific `price from` positioning, destinations, inclusions, and best-for framing

This reduces duplicated effort.

## Recommendation 6: Expand the form variants

`components/QuoteForm.tsx` should be extended so the new packages can collect the right inquiry details.

Suggested new variants:

- `school`
- `faith`
- `executive`
- `team`
- `family`

Suggested extra fields by segment:

For `school`:

- school / institution name
- class or student age band
- expected student count
- learning goal
- preferred trip date

For `faith`:

- church / ministry / fellowship name
- retreat type
- expected member count
- preferred destination
- special spiritual or program needs

For `executive`:

- company / organization
- retreat objective
- preferred venue type
- budget per person or total budget
- dates and attendee count

For `team`:

- company / group name
- event objective
- participant count
- preferred activity style
- budget starting point

For `family`:

- family size
- adult / child mix
- child age ranges
- preferred travel dates
- accommodation and activity preferences

## Recommendation 7: Add direct navigation to these offers

To support easy discovery:

- add a navbar link to the new home-page section, for example `Group Packages`
- update the hero CTA so one of the main buttons can jump directly to that section
- optionally link printed materials to `/#group-packages`

That gives business-card visitors an immediate path instead of making them scroll through unrelated safari inventory first.

## Package-by-Package Fit

### Scholar's Safari

Best fit:

- dedicated package page
- home-page featured card
- school-specific inquiry flow

Important content to highlight:

- educational value
- safety / first aid
- group size
- transport included
- certificates / guided learning elements

### Executive Retreat

Best fit:

- upgrade the current corporate page
- feature it in the new home-page audience-packages section

Important content to highlight:

- strategy meetings
- accommodation and venue readiness
- AV / WiFi / coordinator support
- clear `price from` positioning
- corporate proposal CTA

### Pilgrimage & Fellowship

Best fit:

- dedicated package page
- home-page featured card
- faith-community inquiry flow

Important content to highlight:

- worship/devotion spaces
- fellowship activities
- group coordination
- destination options
- special additions like sunrise prayer and campfire fellowship

### Bond & Build

Best fit:

- dedicated package page
- home-page featured card
- group / team inquiry flow

Important content to highlight:

- bonding outcomes
- team-building activity options
- group logistics
- verified starting price from `KSh 6,500 per person`
- flexible venue / destination options
- proposal-led CTA

### Family Tales

Best fit:

- dedicated package page
- home-page featured card
- family-specific inquiry flow

Important content to highlight:

- family-friendly pacing
- child-friendly activity options
- accommodation flexibility
- verified starting price from `KSh 18,000 per family`
- transport convenience
- easy inquiry CTA for parents / guardians

## Logo Integration Recommendation

The new client logo should be used consistently in these places:

1. Navbar brand area
2. Footer brand area
3. Metadata icon / favicon
4. Social preview assets later if the client wants a full branded share image

Visible brand integration is especially important now because the package flyers already use this logo style.

## Suggested Rollout Order

### Phase 1

- add the client logo to shared site branding
- add the new audience-packages section to the home page
- create cards for the 5 new package types

### Phase 2

- build dedicated package pages
- adapt the corporate page into `Executive Retreat`
- extend inquiry forms for school, faith, and executive leads

### Phase 3

- refine metadata, QR destinations, analytics, and campaign-specific links
- decide whether to standardize the brand name as `Brookshore` or `Brookshores`

## Recommended Implementation Direction

If the goal is speed and clarity, the best next build approach is:

1. keep the existing safari package system for itinerary-led leisure products
2. add a separate audience-package layer for the five client offers
3. place that new layer above the safari grid on the home page
4. reuse the current corporate page as the base for `Executive Retreat`

That gives the client exactly what she asked for without forcing the new offers into the wrong structure.

## Revisions After Peer Feedback

After reviewing additional developer feedback against the actual codebase, I would revise a few parts of the original recommendation.

### 1. Phase 0 decisions must happen before implementation

These are not late-stage cleanup items. They should be resolved before new package work starts:

- confirm whether the user-facing brand is `Brookshore Safaris` or `Brookshores Safaris`
- confirm the canonical phone number(s)
- confirm whether the Mother's Day flyer price is a temporary promotion or a base product price
- confirm whether all configured locales are truly needed for the new package rollout

This is especially important because the codebase currently contains:

- `Brookshores Safaris` in metadata, translations, and copy
- `Brookshore Safaris` in the package PDF metadata and the supplied logo
- different phone numbers across client materials

### 2. Keep one package system, not two parallel systems

The original report recommended a separate audience-package model because the content shape differs from itinerary-led safaris. That logic still stands, but I would not implement it as two disconnected top-level systems.

Better direction:

- keep one shared package domain model
- add a `kind` discriminator such as `safari`, `audience`, or `seasonal`
- render different sections depending on `kind`

This avoids:

- duplicated route logic
- duplicated metadata generation
- duplicated card/detail templates

It also fits the current codebase better because there is already an established `/packages/[slug]` route pattern.

### 3. Use structured pricing, not display strings as data

The package pricing units vary:

- per student
- per pax per day
- per person
- per family

So the underlying data should be structured, for example:

- `amount`
- `currency`
- `unit`

Display strings like `KSh 12,000/pax/day` should be generated at render time, not stored as the core data shape.

### 4. Make WhatsApp a primary conversion path

The current site already has a global floating WhatsApp button, but it is generic. The feedback is correct that the audience-package rollout should make WhatsApp much more intentional.

Recommended changes:

- add package-aware WhatsApp CTAs on each package page
- prefill the message with the package name
- place WhatsApp CTA above or alongside the inquiry form, not only after form completion

This is a strong fit for the existing codebase because:

- `components/WhatsAppButton.tsx` already exists
- package booking already generates WhatsApp follow-up URLs after submission

So this is an enhancement to the current system, not a net-new channel.

### 5. Replace multiple hardcoded form variants with one configurable inquiry form

The feedback is right that five dedicated audience-form variants would create avoidable maintenance overhead.

Better direction:

- one shared inquiry form component
- package-specific field definitions passed in as config

This is an improvement over the original recommendation and is more scalable than:

- `school`
- `faith`
- `executive`
- `team`
- `family`

as separate hardcoded branches.

### 6. Keep the campaign system minimal at first

The original report described a fuller campaign schema. That is valid longer-term, but for the immediate implementation it is more than the current site needs.

Better first step:

- a minimal active campaign config
- one top-of-homepage spotlight block
- one dedicated campaign landing page
- optional badge on the related package card

Only after Brookshore runs multiple overlapping promotions should this expand into a more generalized campaign system.

### 7. Dedicated package routes still make sense

I do not agree with deferring all audience packages into a single anchor page as the main long-term structure.

Reason:

- the existing app already has dynamic package routing
- the client explicitly needs easy discovery from business cards and direct links
- dedicated URLs are useful for QR codes, WhatsApp sharing, and future SEO

However, I do agree with the underlying concern about overbuilding.

So the practical compromise is:

- keep dedicated routes
- use one shared renderer/template
- avoid hand-building five completely different pages

### 8. Do not move to a database or CMS first

I disagree with any recommendation to make database migration or client-editable campaign management the first implementation step.

Current repo reality:

- package data is local TypeScript
- lead capture goes to Google Sheets
- there is no established content admin in this codebase

So the right order is:

1. validate the offer structure and conversion flow
2. ship the audience package experience
3. add self-serve editing only if the business cadence justifies it

That keeps the first implementation lean and aligned with the current architecture.

Practical trigger for re-evaluating a lightweight admin layer:

- if the client requests copy or pricing changes more than twice within 30 days after launch, move the package/campaign config into a small editable backend layer next

### 9. Add source tracking early

This was missing from the original report and should be added.

Recommended early additions:

- campaign/source query params
- package-aware lead source capture in form submissions
- package-aware WhatsApp prefilled messages

This will help answer:

- which flyer generated the lead
- which package page converted best
- whether special-day campaigns are worth repeating

## Revised Build Recommendation

Based on the codebase and the feedback, the strongest implementation path is:

### Phase 0

- resolve and record the user-facing brand name decision:
  `Brookshore Safaris` or `Brookshores Safaris`
- resolve and record the canonical phone number(s)
- explicitly resolve the phone mismatch between:
  `0727 256 939` on the Mother's Day flyer and
  `0722 649 700` on the package brief
- resolve and record whether the Mother's Day price is:
  a temporary campaign promotion or a base package price
- make a binary locale decision:
  keep the `[locale]` route structure and translate the new package content, or remove/simplify it before building the new package pages
- audit photography readiness for each planned package route:
  confirm whether each package has at least one usable hero image and whether any package needs additional photography before page launch

### Phase 1

Treat this as a short urgent sub-sprint because `Sunday, May 10, 2026` is close.

1. ship the Mother's Day campaign page first
2. make the Mother's Day page WhatsApp-ready with a prefilled message
3. add one seasonal spotlight slot near the top of the home page
4. standardize visible brand usage
5. add minimal source tracking for the campaign
6. define how campaign performance will be measured after the campaign window closes

Phase 1 note:

- a hardcoded or minimal-config campaign page is acceptable here
- the campaign page should ship before broader audience-package architecture if time is constrained

### Phase 2

- introduce a unified package model with `kind`
- add the five audience package cards above the safari grid
- build dedicated audience package routes using one shared renderer
- build one configurable inquiry form for audience leads
- add basic source tracking
- add structured metadata / schema at the same time the shared renderer is built

Phase 2 release gate for any individual package route:

- verified package copy is ready
- at least one strong hero image is available
- package-specific CTA and inquiry fields are defined

### Phase 3

- repurpose and refine the existing corporate page into the Executive Retreat experience where appropriate
- evaluate whether a client-editable admin layer is justified

This revised version keeps the useful parts of the original report, accepts the strongest technical feedback, and avoids overcorrecting into architecture that is heavier than this codebase currently needs.

## Google Sheets Lead Handling Note

The current codebase is already set up to use Google Sheets as the lead destination rather than Supabase for customer inquiries.

Current lead flow:

1. a website form submits to `/api/leads`
2. the Next.js API route normalizes the payload
3. the API route forwards the lead to a Google Apps Script endpoint
4. the Apps Script writes the row into Google Sheets

This is implemented in:

- `app/api/leads/route.ts`

Important operational note:

- this repo does not currently use Supabase as the active lead storage backend
- the existing lead workflow is Google Sheets based
- the Google Sheets webhook should now be configured through `GOOGLE_SHEETS_WEBHOOK_URL`, not a hardcoded personal-account script URL
- a dedicated client-owned setup guide is available in `Brookshore-docs/google-sheets-lead-setup.md`

Recommended Google Sheets structure at this stage:

- keep one master sheet as the source of truth for all inbound leads
- add a `lead_type` field so rows can be separated logically
- add a `lead_source` field for campaign and package attribution
- create filtered tabs or views inside the same spreadsheet for:
  - package bookings
  - tour bookings
  - corporate / quote requests
  - newsletter signups
  - seasonal campaign leads

Why this is better than separate sheets per package:

- easier reporting and follow-up
- easier deduplication
- easier campaign analysis
- avoids scattering leads across many documents

When separate tabs make sense:

- when the client wants different operational views for different lead types
- when one person handles package bookings and another handles corporate leads

What I would not recommend right now:

- one separate spreadsheet per package
- one separate form backend per package

That would create fragmentation too early for a business at this stage.

Best practical setup now:

- one spreadsheet
- one raw `All Leads` tab
- several filtered operational tabs
- one unified API endpoint
- package-aware form fields and lead metadata
- package and tour leads should include page/source/campaign metadata so campaign reporting remains possible without extra infrastructure
