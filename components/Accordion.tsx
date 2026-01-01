"use client";

import { useId, useState } from "react";

function classNames(...values: Array<string | false | undefined>) {
  return values.filter(Boolean).join(" ");
}

export default function Accordion({
  items,
}: {
  items: Array<{ title: string; content: string; defaultOpen?: boolean }>;
}) {
  const rootId = useId();
  const [openIndex, setOpenIndex] = useState(() => {
    const idx = items.findIndex((i) => i.defaultOpen);
    return idx >= 0 ? idx : 0;
  });

  return (
    <div className="divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card">
      {items.map((item, index) => {
        const isOpen = index === openIndex;
        const buttonId = `${rootId}-button-${index}`;
        const panelId = `${rootId}-panel-${index}`;
        return (
          <div key={item.title}>
            <button
              id={buttonId}
              type="button"
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => setOpenIndex((prev) => (prev === index ? -1 : index))}
              className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left"
            >
              <span className="text-sm font-semibold">{item.title}</span>
              <span
                className={classNames(
                  "grid size-8 place-items-center rounded-full border border-border bg-background text-sm transition",
                  isOpen && "rotate-45",
                )}
                aria-hidden="true"
              >
                +
              </span>
            </button>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className={classNames("px-4 pb-4", !isOpen && "hidden")}
            >
              <p className="text-sm leading-6 text-[color-mix(in_oklab,var(--foreground)_75%,transparent)]">
                {item.content}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

