import NotFoundCard from "@/components/NotFoundCard";

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
