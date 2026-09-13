"use client"; // Error boundaries must be Client Components

import ErrorCard from "@/components/ErrorCard";

export default function TodoError({
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
      title="Could not load this todo"
      backHref="/todos"
      backLabel="Back to todos"
    />
  );
}
