"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface SuccessConfirmationProps {
  tripRef: string;
  whatsappUrl: string;
}

export default function SuccessConfirmation({
  tripRef,
  whatsappUrl,
}: SuccessConfirmationProps) {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    // Trigger confetti animation
    setShowConfetti(true);

    // Dynamic import of canvas-confetti
    import("canvas-confetti").then((confetti) => {
      confetti.default({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#0f766e", "#f59e0b", "#14b8a6"],
      });
    });
  }, []);

  return (
    <div className="py-12 text-center">
      {/* Celebration icon */}
      <div className="mx-auto mb-6 text-6xl">🎉</div>

      {/* Heading */}
      <h1 className="text-2xl font-bold sm:text-3xl">
        Your Wishlist is safely with us!
      </h1>
      <p className="mx-auto mt-3 max-w-md text-sm text-[color-mix(in_oklab,var(--foreground)_70%,transparent)]">
        We&apos;ve received your dream plan. Keep an eye on WhatsApp shortly. One
        of our travel experts will send through a polished itinerary with
        availability and options.
      </p>

      {/* Trip reference */}
      <div className="mx-auto mt-6 inline-block rounded-xl bg-muted px-4 py-2 text-sm font-medium">
        Reference: <span className="font-bold text-brand">#{tripRef}</span>
      </div>

      {/* What you'll receive */}
      <div className="mx-auto mt-8 max-w-sm rounded-2xl border border-border bg-card p-6 text-left">
        <h3 className="font-semibold">What you&apos;ll receive:</h3>
        <ul className="mt-3 space-y-2 text-sm text-[color-mix(in_oklab,var(--foreground)_75%,transparent)]">
          <li className="flex items-start gap-2">
            <span className="text-brand">✓</span>
            <span>A day-by-day itinerary</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-brand">✓</span>
            <span>2-3 price options</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-brand">✓</span>
            <span>Optimized route & transfers</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-brand">✓</span>
            <span>Final invoice only after you confirm</span>
          </li>
        </ul>
      </div>

      {/* Actions */}
      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand px-6 py-3 text-sm font-semibold text-white transition hover:brightness-110"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M20.52 3.48A11.91 11.91 0 0 0 12.02 0C5.43.01.07 5.37.08 11.96c0 2.11.55 4.17 1.6 5.99L0 24l6.2-1.63a11.88 11.88 0 0 0 5.82 1.48h.01c6.59 0 11.95-5.36 11.95-11.95 0-3.19-1.24-6.19-3.46-8.42Zm-8.5 18.33h-.01a9.9 9.9 0 0 1-5.04-1.38l-.36-.21-3.68.97.98-3.59-.23-.37a9.92 9.92 0 0 1-1.51-5.27C2.17 6.47 6.54 2.1 12.03 2.1c2.65 0 5.14 1.03 7.02 2.9a9.87 9.87 0 0 1 2.9 7.01c0 5.49-4.37 9.8-9.93 9.8Zm5.44-7.41c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.66.15-.2.3-.76.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.14-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.66-1.6-.9-2.19-.24-.58-.48-.5-.66-.5h-.56c-.2 0-.52.07-.8.37-.27.3-1.05 1.03-1.05 2.52 0 1.48 1.08 2.92 1.23 3.12.15.2 2.12 3.24 5.14 4.54.72.31 1.29.5 1.73.64.73.23 1.39.2 1.91.12.58-.09 1.77-.72 2.02-1.41.25-.69.25-1.28.17-1.41-.07-.13-.27-.2-.57-.35Z" />
          </svg>
          Open WhatsApp
        </a>
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-xl border border-border px-6 py-3 text-sm font-semibold transition hover:bg-muted"
        >
          Back to Homepage
        </Link>
      </div>
    </div>
  );
}
