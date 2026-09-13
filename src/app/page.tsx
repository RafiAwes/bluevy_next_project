export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-zinc-50 px-4 py-16 dark:bg-zinc-950">
      <div className="w-full max-w-md">
        <h1 className="mb-6 text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          Todos List
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          Your Next.js + Tailwind CSS project is ready. Start building in{" "}
          <code className="rounded bg-zinc-200 px-1 py-0.5 font-mono text-sm dark:bg-zinc-800">
            src/app/page.tsx
          </code>
          .
        </p>
      </div>
    </main>
  );
}
