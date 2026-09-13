"use client";

import Link from "next/link";
import { useEffect } from "react";

type Props = {
  error: Error & { digest?: string };
  retry: () => void;
  title: string;
  backHref: string;
  backLabel: string;
};

export default function ErrorCard({
  error,
  retry,
  title,
  backHref,
  backLabel,
}: Props) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-screen flex-col items-center bg-zinc-50 px-4 py-16 dark:bg-zinc-950">
      <div className="w-full max-w-md">
        <div className="rounded-lg border border-red-200 bg-white p-6 dark:border-red-900/60 dark:bg-zinc-900">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-red-600 dark:text-red-400">
            Error
          </p>
          <h1 className="font-luckiest mb-4 text-3xl tracking-wide text-zinc-900 dark:text-zinc-50">
            {title}
          </h1>
          <p className="mb-6 text-zinc-600 dark:text-zinc-400">
            {error.message || "An unexpected error occurred."}
          </p>
          {error.digest && (
            <p className="mb-6 font-mono text-xs text-zinc-400 dark:text-zinc-500">
              Digest: {error.digest}
            </p>
          )}

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => retry()}
              className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-700 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-300"
            >
              Try again
            </button>
            <Link
              href={backHref}
              className="rounded-lg px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
            >
              {backLabel}
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
