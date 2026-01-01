Brookshore Safaris website built with [Next.js](https://nextjs.org) + Tailwind.

## Getting Started

Install dependencies, then run the dev server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Environment variables (optional)

Create a `.env.local` in this folder:

```bash
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_WHATSAPP_NUMBER=2547XXXXXXXX
NEXT_PUBLIC_PHONE=+2547XXXXXXXX
NEXT_PUBLIC_EMAIL=hello@brookshoresafaris.com
```

Notes:
- `NEXT_PUBLIC_WHATSAPP_NUMBER` is used by the floating WhatsApp button and tour CTAs.
- `NEXT_PUBLIC_PHONE` and `NEXT_PUBLIC_EMAIL` are shown in the footer if set.

## Pages

- `/` homepage
- `/tours` listings + filter UI
- `/tours/[slug]` tour details (decision stack + sticky mobile CTA)
- `/corporate` corporate landing + proposal request form
- `/about` about + FAQ
- `/contact` contact + inquiry form

## Deploy (Vercel)

Push the repo to GitHub, then import it in Vercel. Set env vars in Vercel if needed.
