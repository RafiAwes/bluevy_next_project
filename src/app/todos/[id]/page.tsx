"use client";

import Link from "next/link";
import { use, useEffect, useState } from "react";
import type { Todo } from "@/app/api/todos/route";

export default function TodoPage({ params }: PageProps<"/todos/[id]">) {
  const { id } = use(params);
  const [todo, setTodo] = useState<Todo | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "notfound">(
    "loading",
  );

  useEffect(() => {
    fetch(`/api/todos?id=${id}`)
      .then(async (res) => {
        if (!res.ok) {
          setStatus("notfound");
          return;
        }
        setTodo(await res.json());
        setStatus("ready");
      })
      .catch(() => setStatus("notfound"));
  }, [id]);

  return (
    <main className="flex min-h-screen flex-col items-center bg-zinc-50 px-4 py-16 dark:bg-zinc-950">
      <div className="w-full max-w-md">
        <Link
          href="/todos"
          className="mb-6 inline-block text-sm text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
        >
          &larr; Back to todos
        </Link>

        {status === "loading" && (
          <p className="text-zinc-500 dark:text-zinc-400">Loading...</p>
        )}

        {status === "notfound" && (
          <p className="text-zinc-500 dark:text-zinc-400">
            Todo #{id} not found.
          </p>
        )}

        {status === "ready" && todo && (
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
        )}
      </div>
    </main>
  );
}
