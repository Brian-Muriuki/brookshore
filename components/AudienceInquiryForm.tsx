"use client";

import { useState } from "react";
import { Button } from "./Button";
import InquirySuccessPanel from "./InquirySuccessPanel";
import { generateTripRef, generateWhatsAppUrl, WHATSAPP_NUMBER } from "@/lib/tripRef";
import { getLeadClientContext } from "@/lib/leadContext";
import type { AudiencePackage } from "@/data/audiencePackages";

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

function classNames(...values: Array<string | false | undefined>) {
  return values.filter(Boolean).join(" ");
}

function Input({
  label,
  value,
  onChange,
  error,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  placeholder?: string;
  type?: string;
}) {
  return (
    <div>
      <label className="text-xs font-semibold">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className={classNames(
          "mt-1 w-full rounded-xl border bg-background px-3 py-2 text-sm outline-none transition",
          "focus:ring-2 focus:ring-brand/35",
          error ? "border-red-500/60" : "border-border",
        )}
      />
      {error ? <div className="mt-1 text-xs text-red-600">{error}</div> : null}
    </div>
  );
}

interface AudienceInquiryFormProps {
  package: AudiencePackage;
  heading?: string;
  description?: string;
}

export default function AudienceInquiryForm({
  package: pkg,
  heading = "Request this package",
  description = "Share your dates, group size, and a few details so we can get back to you quickly.",
}: AudienceInquiryFormProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [dates, setDates] = useState("");
  const [groupSize, setGroupSize] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [tripRef, setTripRef] = useState("");
  const [whatsappUrl, setWhatsappUrl] = useState("");

  const requiresCompany = pkg.inquiryVariant === "corporate";

  function validate() {
    const next: Record<string, string> = {};

    if (!name.trim()) next.name = "Name is required.";
    if (!phone.trim()) next.phone = "Phone is required.";
    if (!email.trim()) next.email = "Email is required.";
    else if (!isEmail(email)) next.email = "Enter a valid email address.";
    if (requiresCompany && !company.trim()) next.company = "Organization is required.";
    if (!dates.trim()) next.dates = "Dates are required.";
    if (!groupSize.trim()) next.groupSize = `${pkg.groupLabel} is required.`;
    if (!message.trim()) next.message = "Message is required.";

    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!validate()) return;

    setStatus("submitting");

    try {
      const nextTripRef = generateTripRef();
      const leadContext = getLeadClientContext();
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          variant: pkg.inquiryVariant,
          subject: `Inquiry: ${pkg.title}`,
          tripReference: nextTripRef,
          tripName: pkg.title,
          tripSlug: pkg.slug,
          name,
          phone,
          email,
          company: requiresCompany ? company : undefined,
          dates,
          groupSize,
          message,
          ...leadContext,
        }),
      });

      if (!response.ok) {
        const data = (await response.json().catch(() => null)) as { error?: string } | null;
        throw new Error(data?.error || "Request failed");
      }

      const whatsappMessage = [
        `Hi Brookshores Safaris, I'm interested in ${pkg.title}.`,
        "",
        `Ref: #${nextTripRef}`,
        `Dates: ${dates}`,
        `${pkg.groupLabel}: ${groupSize}`,
        requiresCompany && company ? `Organization: ${company}` : "",
        `Name: ${name}`,
        `Phone: ${phone}`,
        `Email: ${email}`,
        "",
        `Notes: ${message}`,
      ]
        .filter(Boolean)
        .join("\n");

      setTripRef(nextTripRef);
      setWhatsappUrl(generateWhatsAppUrl(WHATSAPP_NUMBER, whatsappMessage));
      setStatus("success");
    } catch (error) {
      setStatus("error");
      setErrors({
        submit: error instanceof Error ? error.message : "Request failed",
      });
    }
  }

  if (status === "success") {
    return (
      <InquirySuccessPanel
        title={pkg.title}
        tripRef={tripRef}
        whatsappUrl={whatsappUrl}
      />
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl border border-border bg-card p-6"
    >
      <h3 className="text-lg font-semibold">{heading}</h3>
      <p className="mt-2 text-sm leading-6 text-[color-mix(in_oklab,var(--foreground)_72%,transparent)]">
        {description}
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Input
          label="Name"
          value={name}
          onChange={setName}
          error={errors.name}
          placeholder="Your full name"
        />
        <Input
          label="Phone"
          value={phone}
          onChange={setPhone}
          error={errors.phone}
          placeholder="+254 7XX XXX XXX"
        />
        <Input
          label="Email"
          type="email"
          value={email}
          onChange={setEmail}
          error={errors.email}
          placeholder="you@example.com"
        />
        <Input
          label={pkg.groupLabel}
          value={groupSize}
          onChange={setGroupSize}
          error={errors.groupSize}
          placeholder="e.g. 45"
        />
        {requiresCompany ? (
          <Input
            label={pkg.companyLabel || "Organization"}
            value={company}
            onChange={setCompany}
            error={errors.company}
            placeholder="Company / church / institution"
          />
        ) : null}
        <Input
          label="Dates"
          value={dates}
          onChange={setDates}
          error={errors.dates}
          placeholder="Preferred dates or month"
        />
      </div>

      <div className="mt-4">
        <label className="text-xs font-semibold">What do you need?</label>
        <textarea
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          rows={5}
          placeholder="Tell us where you want to go, what kind of stay you have in mind, and anything we should keep in mind for your group."
          className={classNames(
            "mt-1 w-full rounded-xl border bg-background px-3 py-2 text-sm outline-none transition",
            "focus:ring-2 focus:ring-brand/35",
            errors.message ? "border-red-500/60" : "border-border",
          )}
        />
        {errors.message ? (
          <div className="mt-1 text-xs text-red-600">{errors.message}</div>
        ) : null}
      </div>

      {errors.submit ? (
        <div className="mt-4 text-sm font-medium text-red-600">{errors.submit}</div>
      ) : null}

      <div className="mt-5">
        <Button type="submit" disabled={status === "submitting"} className="w-full">
          {status === "submitting" ? "Submitting..." : "Send inquiry"}
        </Button>
      </div>
    </form>
  );
}
