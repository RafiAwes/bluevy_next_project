import Link from "next/link";
import { todos } from "@/lib/todos";

export default function TodosPage() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-zinc-50 px-4 py-16 dark:bg-zinc-950">
      <div className="w-full max-w-md">
        <h1 className="font-luckiest mb-6 text-4xl tracking-wide text-zinc-900 dark:text-zinc-50">
          My Todos
        </h1>

        <ul className="divide-y divide-zinc-200 rounded-lg border border-zinc-200 bg-white dark:divide-zinc-800 dark:border-zinc-800 dark:bg-zinc-900">
          {todos.map((todo) => (
            <li key={todo.id}>
              <Link
                href={`/todos/${todo.id}`}
                className="flex items-center gap-3 px-4 py-3 text-zinc-800 hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-800"
              >
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-zinc-200 text-xs font-semibold text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
                  {todo.id}
                </span>
                <span className={todo.completed ? "line-through opacity-60" : ""}>
                  {todo.title}
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <p className="mt-4 text-sm text-zinc-500 dark:text-zinc-400">
          {todos.length} todo{todos.length === 1 ? "" : "s"}
        </p>
      </div>
    </main>
  );
}
