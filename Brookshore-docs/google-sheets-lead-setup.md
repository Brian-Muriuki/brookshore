# Google Sheets Lead Setup

This project should use a **client-owned Google Spreadsheet** in the client's Google Workspace account, not a spreadsheet inside a personal account.

## Final workbook tabs

Create **one spreadsheet** with these tabs:

- `Lead Key`
- `Leads`

How they should be used:

- `Leads`: the client's main and only working tab
- `Lead Key`: simple permanent reference for what each field means

Important operational rule:

- hide the old reporting tabs from normal use
- keep one editable `Leads` tab instead of a read-only query view
- reporting views stay future-optional and are not part of this sprint

Why this is the right starting setup:

- one obvious tab for day-to-day use
- less horizontal scrolling on phone
- less bottom-tab clutter in Google Sheets mobile
- operational fields stay leftmost
- metadata still exists to the right, but can stay hidden unless needed

## Exact columns for `Leads`

Create the header row in `Leads` with these columns in this order:

```text
name
phone
status
leadType
tripName
startDate
endDate
adults
kids
groupSize
notes
email
company
message
assignedTo
leadSource
timestamp
variant
campaignSlug
dates
budgetRange
tripDays
travelMonth
startingCity
airportTransfers
accommodationTier
isResident
experiences
budgetPreference
estimateFrom
estimateTo
currency
pagePath
pageUrl
subject
tripReference
tripSlug
packageId
packageSlug
tourId
tourSlug
```

These columns match the normalized payload now sent by the website.

## Final client workflow

This workbook should use a **single editable `Leads` tab**.

Operational columns should stay on the left:

- `name`
- `phone`
- `status`
- `leadType`
- `tripName`
- `startDate`
- `endDate`
- `adults`
- `kids`
- `groupSize`
- `notes`

Supporting contact columns can stay visible after those:

- `email`
- `company`
- `message`
- `assignedTo`
- `leadSource`
- `timestamp`

Everything else can stay hidden to the right unless needed.

Workbook behavior:

- freeze row `1`
- freeze columns `A:B`
- keep the status dropdown on the `status` column
- keep status conditional formatting on the `status` column
- keep lead-type and other operational dropdowns on the same tab
- do not make the client work from a query-generated sheet

## What key columns mean

- `leadType`: top-level classification such as `package-booking`, `tour-booking`, `corporate`, `contact`, `newsletter`, `wishlist`
- `leadSource`: where the lead came from, for example `website`, `mothersday-2026`, `instagram`, `business-card`
- `campaignSlug`: campaign identifier such as `mothers-day-mombasa-2026`
- `tripSlug`: shared slug field used for filtering package and tour pages together
- `status`: operational state, for example `New`, `Contacted`, `Qualified`, `Booked`, `Lost`
- `assignedTo`: who owns follow-up

## Why not separate spreadsheets per package

Do **not** start with:

- one spreadsheet per package
- one Apps Script per package
- one webhook per package

That becomes harder to maintain very quickly. It also makes reporting worse because the client cannot easily answer:

- which source generated the most leads
- which package converts best
- which campaigns actually produce bookings

If the client wants reporting separation later, create it then. Do not build that complexity into the default mobile workflow now.

## Apps Script setup

Open the client-owned spreadsheet, then go to `Extensions -> Apps Script` and replace the default code with:

```javascript
function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Leads");
    if (!sheet) {
      return jsonResponse({ ok: false, error: "Leads sheet not found" });
    }

    const payload = JSON.parse(e.postData.contents || "{}");
    const headers = sheet
      .getRange(1, 1, 1, sheet.getLastColumn())
      .getValues()[0]
      .map(String);

    const row = headers.map((header) => {
      const value = payload[header];
      return value === undefined || value === null ? "" : value;
    });

    sheet.appendRow(row);
    return jsonResponse({ ok: true });
  } catch (error) {
    return jsonResponse({
      ok: false,
      error: error && error.message ? error.message : "Unknown error",
    });
  }
}

function jsonResponse(data) {
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
```

Notes:

- this script writes rows based on the header names already present in `Leads`
- if you add a new column later, the script will start filling it automatically when the website sends that field
- the website now expects a JSON webhook endpoint, which this provides
- the website checks the JSON body for `ok: true`, so logical script failures are caught even if Apps Script still replies with HTTP 200

## Deploy the Apps Script

1. Click `Deploy`
2. Choose `New deployment`
3. Select `Web app`
4. Execute as: the client Workspace account
5. Who has access: use the most permissive option your Workspace policy allows for incoming website requests
6. Deploy
7. Copy the web app URL

## Website configuration

Set this environment variable in the project:

```bash
GOOGLE_SHEETS_WEBHOOK_URL=https://script.google.com/macros/s/your-client-web-app-id/exec
```

This is now required by the API route. The old hardcoded personal-sheet URL should not be used anymore.

## Current website behavior

The site now sends lead metadata along with the form payload:

- `leadSource`
- `campaignSlug`
- `pagePath`
- `pageUrl`
- `packageSlug` for package bookings
- `tourSlug` for tour bookings

This makes it possible to filter leads by:

- campaign
- page
- package
- tour
- form type

## Practical recommendation for this client

At this stage, the best setup is:

- one spreadsheet
- one visible editable `Leads` tab
- one visible `Lead Key` reference tab
- hidden reporting tabs kept out of the client workflow
- one webhook
- one normalized lead schema

That keeps the system simple for launch, phone-friendly for the client, and operationally clear without forcing the client into read-only query views.
