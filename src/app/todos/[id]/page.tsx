import Link from "next/link";
import { notFound } from "next/navigation";
import { getTodo, todos } from "@/lib/todos";

export function generateStaticParams() {
  return todos.map((todo) => ({ id: String(todo.id) }));
}

export default async function TodoPage({ params }: PageProps<"/todos/[id]">) {
  const { id } = await params;
  const todo = getTodo(Number(id));

  if (!todo) {
    notFound();
  }

  return (
    <main className="flex min-h-screen flex-col items-center bg-zinc-50 px-4 py-16 dark:bg-zinc-950">
      <div className="w-full max-w-md">
        <Link
          href="/todos"
          className="mb-6 inline-block text-sm text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
        >
          ← Back to todos
        </Link>

        <div className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            Todo #{todo.id}
          </p>
          <h1 className="font-luckiest mb-4 text-3xl tracking-wide text-zinc-900 dark:text-zinc-50">
            {todo.title}
          </h1>
          <p className="mb-6 text-zinc-600 dark:text-zinc-400">
            {todo.description}
          </p>
          <span
            className={
              todo.completed
                ? "inline-block rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800 dark:bg-green-900/40 dark:text-green-300"
                : "inline-block rounded-full bg-amber-100 px-3 py-1 text-sm font-medium text-amber-800 dark:bg-amber-900/40 dark:text-amber-300"
            }
          >
            {todo.completed ? "Completed" : "Pending"}
          </span>
        </div>
      </div>
    </main>
  );
}
