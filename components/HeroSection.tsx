"use client";

import Image from "next/image";
import Link from "next/link";
import Container from "./Container";
import { useTripStore } from "@/store/tripStore";

export default function HeroSection() {
  const { isResident, setIsResident } = useTripStore();

  const scrollToExperiences = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById("experiences");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=2400&q=80"
          alt="Kenya safari landscape"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/40 to-background" />
      </div>

      <Container>
        <div className="relative py-16 sm:py-24">
          <div className="max-w-2xl">
            {/* Audience toggle */}
            <div className="inline-flex rounded-full border border-white/20 bg-white/10 p-1 text-sm backdrop-blur">
              <button
                type="button"
                onClick={() => setIsResident(true)}
                className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
                  isResident
                    ? "bg-white text-black"
                    : "text-white/85 hover:text-white"
                }`}
              >
                Kenyan Resident
              </button>
              <button
                type="button"
                onClick={() => setIsResident(false)}
                className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
                  !isResident
                    ? "bg-white text-black"
                    : "text-white/85 hover:text-white"
                }`}
              >
                International Visitor
              </button>
            </div>

            {/* Headline */}
            <h1 className="mt-5 text-balance text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Design Your Dream Kenya Trip, Piece by Piece
            </h1>
            <p className="mt-4 text-pretty text-base leading-7 text-white/85">
              No fixed dates, no confusing logistics — just pick what you love,
              and we&apos;ll build the itinerary. Our experts handle the rest.
            </p>

            {/* CTA */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button
                onClick={scrollToExperiences}
                className="inline-flex items-center justify-center rounded-xl bg-brand px-6 py-3 text-sm font-semibold text-white transition hover:brightness-110"
              >
                Start Building →
              </button>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20"
              >
                Talk to an Expert
              </Link>
            </div>

            {/* Trust badges */}
            <div className="mt-6 flex flex-wrap items-center gap-2 text-xs text-white/75">
              <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1">
                ✓ Personal expert assigned
              </span>
              <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1">
                ✓ No payment to inquire
              </span>
              <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1">
                ✓ WhatsApp-first support
              </span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
