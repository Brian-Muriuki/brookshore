import Link from "next/link";
import type { ComponentProps } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";

function classNames(...values: Array<string | false | undefined>) {
  return values.filter(Boolean).join(" ");
}

export function Button({
  variant = "primary",
  className,
  ...props
}: ComponentProps<"button"> & { variant?: ButtonVariant }) {
  return (
    <button
      className={classNames(
        "inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold transition",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        variant === "primary" &&
          "bg-brand text-brand-foreground hover:brightness-110",
        variant === "secondary" &&
          "bg-muted text-foreground hover:bg-[color-mix(in_oklab,var(--muted)_88%,black)]",
        variant === "ghost" && "text-foreground hover:bg-muted",
        "disabled:cursor-not-allowed disabled:opacity-60",
        className,
      )}
      {...props}
    />
  );
}

export function ButtonLink({
  variant = "primary",
  className,
  ...props
}: ComponentProps<typeof Link> & { variant?: ButtonVariant }) {
  return (
    <Link
      className={classNames(
        "inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold transition",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        variant === "primary" &&
          "bg-brand text-brand-foreground hover:brightness-110",
        variant === "secondary" &&
          "bg-muted text-foreground hover:bg-[color-mix(in_oklab,var(--muted)_88%,black)]",
        variant === "ghost" && "text-foreground hover:bg-muted",
        className,
      )}
      {...props}
    />
  );
}

