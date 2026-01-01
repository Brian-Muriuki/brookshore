import Link from "next/link";
import Container from "../components/Container";
import { ButtonLink } from "../components/Button";

export default function NotFound() {
  return (
    <div className="py-16 sm:py-20">
      <Container>
        <div className="rounded-3xl border border-border bg-card p-10">
          <div className="text-xs font-semibold tracking-widest text-brand uppercase">
            404
          </div>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">
            Page not found
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-6 text-[color-mix(in_oklab,var(--foreground)_75%,transparent)]">
            The page you’re looking for doesn’t exist. Try browsing tours or head
            back to the homepage.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/">Go home</ButtonLink>
            <ButtonLink href="/tours" variant="secondary">
              Browse tours
            </ButtonLink>
            <Link
              className="inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold text-brand hover:bg-muted"
              href="/contact"
            >
              Contact us
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}

