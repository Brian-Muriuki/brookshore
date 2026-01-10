"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

export default function NewsletterForm() {
  const t = useTranslations("newsletter");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle",
  );
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed) {
      setError("Email is required.");
      setStatus("error");
      return;
    }
    if (!isEmail(trimmed)) {
      setError("Enter a valid email address.");
      setStatus("error");
      return;
    }

    setError(null);
    setStatus("submitting");

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          variant: "newsletter",
          email: trimmed,
          page: typeof window !== "undefined" ? window.location.pathname : undefined,
        }),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as
          | { error?: string }
          | null;
        throw new Error(data?.error || "Request failed");
      }
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Request failed");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-border bg-background px-4 py-4 text-sm">
        <div className="font-semibold">You&apos;re subscribed</div>
        <div className="mt-1 text-[color-mix(in_oklab,var(--foreground)_70%,transparent)]">
          Watch your inbox for deals and new itineraries.
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-3 sm:grid-cols-[1fr_auto]">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={t("placeholder")}
        className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-brand/35"
      />
      <button
        type="submit"
        disabled={status === "submitting"}
        className="rounded-xl bg-brand px-5 py-3 text-sm font-semibold text-brand-foreground transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {status === "submitting" ? "..." : t("button")}
      </button>
      {status === "error" && error ? (
        <div className="text-xs font-semibold text-red-600 sm:col-span-2">
          {error}
        </div>
      ) : null}
    </form>
  );
}
