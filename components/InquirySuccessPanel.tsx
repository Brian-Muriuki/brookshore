"use client";

import Link from "next/link";
import { useLocale } from "next-intl";

interface InquirySuccessPanelProps {
  title: string;
  tripRef: string;
  whatsappUrl: string;
}

export default function InquirySuccessPanel({
  title,
  tripRef,
  whatsappUrl,
}: InquirySuccessPanelProps) {
  const locale = useLocale();

  return (
    <div className="rounded-3xl border border-border bg-card p-6 text-center sm:p-8">
      <div className="mx-auto mb-5 flex size-14 items-center justify-center rounded-full bg-brand/10 text-2xl text-brand">
        ✓
      </div>
      <h2 className="text-2xl font-semibold tracking-tight">Inquiry received</h2>
      <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-[color-mix(in_oklab,var(--foreground)_72%,transparent)]">
        Thanks for reaching out about <span className="font-semibold text-foreground">{title}</span>. We&rsquo;ll get back to you shortly. If you&rsquo;d like a faster reply, ping us on WhatsApp.
      </p>
      <div className="mt-5 inline-flex rounded-full border border-border bg-muted px-4 py-2 text-sm font-medium">
        Reference: <span className="ml-1 text-brand">#{tripRef}</span>
      </div>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center rounded-xl bg-brand px-5 py-3 text-sm font-semibold text-brand-foreground transition hover:brightness-110"
        >
          Continue on WhatsApp
        </a>
        <Link
          href={`/${locale}`}
          className="inline-flex items-center justify-center rounded-xl border border-border px-5 py-3 text-sm font-semibold transition hover:bg-muted"
        >
          Back to home
        </Link>
      </div>
    </div>
  );
}
