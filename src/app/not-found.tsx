import NotFoundCard from "@/components/NotFoundCard";

// Root not-found: handles every unmatched URL in the app, plus any
// notFound() call in a segment without its own not-found.tsx.
export default function NotFound() {
  return (
    <NotFoundCard
      title="Page not found"
      message="The page you are looking for does not exist or has been moved."
      backHref="/"
      backLabel="Go home"
    />
  );
}
