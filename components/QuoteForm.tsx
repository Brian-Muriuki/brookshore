"use client";

import { useMemo, useState } from "react";
import { Button } from "./Button";

type Variant = "tour" | "corporate" | "contact";

type FieldErrors = Partial<Record<string, string>>;

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

function classNames(...values: Array<string | false | undefined>) {
  return values.filter(Boolean).join(" ");
}

function Input({
  label,
  name,
  placeholder,
  value,
  onChange,
  error,
  type = "text",
}: {
  label: string;
  name: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  type?: string;
}) {
  return (
    <div>
      <label className="text-xs font-semibold" htmlFor={name}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={classNames(
          "mt-1 w-full rounded-xl border bg-background px-3 py-2 text-sm outline-none transition",
          "focus:ring-2 focus:ring-brand/35",
          error ? "border-red-500/60" : "border-border",
        )}
      />
      {error ? (
        <div className="mt-1 text-xs font-medium text-red-600">{error}</div>
      ) : null}
    </div>
  );
}

export default function QuoteForm({
  variant = "tour",
  subject,
}: {
  variant?: Variant;
  subject?: string;
}) {
  const title = useMemo(() => {
    if (variant === "corporate") return "Request a Proposal";
    if (variant === "contact") return "Send a Message";
    return "Request a Quote";
  }, [variant]);

  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitError, setSubmitError] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [dates, setDates] = useState("");
  const [groupSize, setGroupSize] = useState("");
  const [budgetRange, setBudgetRange] = useState("");
  const [message, setMessage] = useState("");

  function validate(): FieldErrors {
    const next: FieldErrors = {};
    if (!name.trim()) next.name = "Name is required.";
    if (!email.trim()) next.email = "Email is required.";
    else if (!isEmail(email)) next.email = "Enter a valid email address.";
    if (!phone.trim()) next.phone = "Phone is required.";
    if (variant === "corporate" && !company.trim())
      next.company = "Company is required.";
    if (variant !== "contact" && !dates.trim()) next.dates = "Dates are required.";
    if (variant !== "contact" && !groupSize.trim())
      next.groupSize = "Group size is required.";
    if (variant === "corporate" && !budgetRange.trim())
      next.budgetRange = "Budget range is required.";
    if (!message.trim()) next.message = "Message is required.";
    return next;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;
    setSubmitError(null);
    setStatus("submitting");

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          variant,
          subject,
          name,
          email,
          phone,
          company: variant === "corporate" ? company : undefined,
          dates: variant !== "contact" ? dates : undefined,
          groupSize: variant !== "contact" ? groupSize : undefined,
          budgetRange: variant === "corporate" ? budgetRange : undefined,
          message,
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
      setSubmitError(err instanceof Error ? err.message : "Request failed");
    }
  }

  function reset() {
    setStatus("idle");
    setErrors({});
    setSubmitError(null);
    setName("");
    setEmail("");
    setPhone("");
    setCompany("");
    setDates("");
    setGroupSize("");
    setBudgetRange("");
    setMessage("");
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-border bg-card p-6">
        <div className="text-base font-semibold">Thanks — message received</div>
        <p className="mt-2 text-sm leading-6 text-[color-mix(in_oklab,var(--foreground)_75%,transparent)]">
          We’ll review the details and get back to you shortly. If you need a
          faster response, use the WhatsApp button.
        </p>
        <div className="mt-5">
          <Button type="button" variant="secondary" onClick={reset}>
            Send another message
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-border bg-card p-6"
    >
      <div className="flex items-start justify-between gap-6">
        <div>
          <div className="text-base font-semibold">{title}</div>
          <div className="mt-1 text-sm text-[color-mix(in_oklab,var(--foreground)_70%,transparent)]">
            {subject ? <>Regarding: {subject}</> : "Tell us what you’re planning."}
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Input
          label="Name"
          name="name"
          value={name}
          onChange={setName}
          error={errors.name}
          placeholder="Your full name"
        />
        <Input
          label="Email"
          name="email"
          type="email"
          value={email}
          onChange={setEmail}
          error={errors.email}
          placeholder="you@example.com"
        />
        <Input
          label="Phone"
          name="phone"
          value={phone}
          onChange={setPhone}
          error={errors.phone}
          placeholder="+254 7XX XXX XXX"
        />

        {variant === "corporate" ? (
          <Input
            label="Company"
            name="company"
            value={company}
            onChange={setCompany}
            error={errors.company}
            placeholder="Company / Organization"
          />
        ) : null}

        {variant !== "contact" ? (
          <>
            <Input
              label="Dates"
              name="dates"
              value={dates}
              onChange={setDates}
              error={errors.dates}
              placeholder="e.g. 12–15 Jan"
            />
            <Input
              label="Group Size"
              name="groupSize"
              value={groupSize}
              onChange={setGroupSize}
              error={errors.groupSize}
              placeholder="e.g. 2 adults"
            />
          </>
        ) : null}

        {variant === "corporate" ? (
          <div className="sm:col-span-2">
            <Input
              label="Budget Range"
              name="budgetRange"
              value={budgetRange}
              onChange={setBudgetRange}
              error={errors.budgetRange}
              placeholder="e.g. KES 300k–600k"
            />
          </div>
        ) : null}

        <div className="sm:col-span-2">
          <label className="text-xs font-semibold" htmlFor="message">
            Message
          </label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={
              variant === "corporate"
                ? "Tell us your goals, destination preferences, and any constraints."
                : "Tell us where you want to go, your budget, and must-haves."
            }
            className={classNames(
              "mt-1 min-h-28 w-full resize-y rounded-xl border bg-background px-3 py-2 text-sm outline-none transition",
              "focus:ring-2 focus:ring-brand/35",
              errors.message ? "border-red-500/60" : "border-border",
            )}
          />
          {errors.message ? (
            <div className="mt-1 text-xs font-medium text-red-600">
              {errors.message}
            </div>
          ) : null}
        </div>
      </div>

      <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-xs text-[color-mix(in_oklab,var(--foreground)_65%,transparent)]">
          {status === "error" && submitError ? (
            <span className="font-semibold text-red-600">{submitError}</span>
          ) : (
            "For urgent requests, use WhatsApp for the fastest reply."
          )}
        </div>
        <Button type="submit" disabled={status === "submitting"}>
          {status === "submitting" ? "Sending…" : "Submit"}
        </Button>
      </div>
    </form>
  );
}
