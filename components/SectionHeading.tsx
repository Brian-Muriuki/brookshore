import type { ReactNode } from "react";

export default function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
}) {
  return (
    <div className="max-w-2xl">
      {eyebrow ? (
        <div className="text-xs font-semibold tracking-widest text-brand uppercase">
          {eyebrow}
        </div>
      ) : null}
      <h2 className="mt-2 text-balance text-2xl font-semibold tracking-tight sm:text-3xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-3 text-pretty text-sm leading-6 text-[color-mix(in_oklab,var(--foreground)_70%,transparent)]">
          {description}
        </p>
      ) : null}
    </div>
  );
}

