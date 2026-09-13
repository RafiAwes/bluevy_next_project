"use client"; // Error boundaries must be Client Components

import ErrorCard from "@/components/ErrorCard";

export default function TodosError({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  return (
    <ErrorCard
      error={error}
      retry={retry}
      title="Could not load todos"
      backHref="/"
      backLabel="Go home"
    />
  );
}
