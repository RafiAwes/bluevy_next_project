import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-zinc-50 px-4 py-16 dark:bg-zinc-950">
      <div className="w-full max-w-md">
        <h1 className="font-luckiest mb-6 text-4xl tracking-wide text-zinc-900 dark:text-zinc-50">
          Todos List
        </h1>
        <p className="mb-6 text-zinc-600 dark:text-zinc-400">
          A simple todos list app built with Next.js and Tailwind CSS.
        </p>
        <Link
          href="/todos"
          className="inline-block rounded-lg bg-zinc-900 px-4 py-2 font-medium text-white hover:bg-zinc-700 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-300"
        >
          View todos →
        </Link>
      </div>
    </main>
  );
}
