"use client"; // Error boundaries must be Client Components

import ErrorCard from "@/components/ErrorCard";

export default function RootError({
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
      title="Something went wrong"
      backHref="/"
      backLabel="Go home"
    />
  );
}
