import Container from "./Container";

const items = [
  { label: "Rated 4.8/5", sub: "Sample reviews" },
  { label: "10+ years", sub: "Local expertise" },
  { label: "24/7 support", sub: "WhatsApp friendly" },
  { label: "M-Pesa ready", sub: "For residents" },
] as const;

export default function TrustStrip() {
  return (
    <section className="border-b border-border bg-muted">
      <Container>
        <div className="grid gap-3 py-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-border bg-background px-4 py-3"
            >
              <div className="text-sm font-semibold">{item.label}</div>
              <div className="mt-1 text-xs text-[color-mix(in_oklab,var(--foreground)_70%,transparent)]">
                {item.sub}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

