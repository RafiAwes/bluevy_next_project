import Link from "next/link";

type Props = {
  title: string;
  message: string;
  backHref: string;
  backLabel: string;
};

// Shared UI for the not-found.tsx files. Server component: not-found pages
// receive no props, so each one passes its own copy here.
export default function NotFoundCard({
  title,
  message,
  backHref,
  backLabel,
}: Props) {
  return (
    <main className="flex min-h-screen flex-col items-center bg-zinc-50 px-4 py-16 dark:bg-zinc-950">
      <div className="w-full max-w-md">
        <div className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            404
          </p>
          <h1 className="font-luckiest mb-4 text-3xl tracking-wide text-zinc-900 dark:text-zinc-50">
            {title}
          </h1>
          <p className="mb-6 text-zinc-600 dark:text-zinc-400">{message}</p>
          <Link
            href={backHref}
            className="inline-block rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-700 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-300"
          >
            {backLabel}
          </Link>
        </div>
      </div>
    </main>
  );
}
