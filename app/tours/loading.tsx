import Container from "../../components/Container";

export default function Loading() {
  return (
    <div className="py-10 sm:py-12">
      <Container>
        <div className="h-7 w-56 rounded-lg bg-muted" />
        <div className="mt-4 h-4 w-[420px] max-w-full rounded-lg bg-muted" />

        <div className="mt-8 grid gap-6 lg:grid-cols-[280px_1fr]">
          <div className="h-96 rounded-2xl border border-border bg-card" />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-[260px] rounded-2xl border border-border bg-card"
              />
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}

