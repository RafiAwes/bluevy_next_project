"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import type { Todo } from "@/app/api/todos/route";

type Props =
  | { mode: "create"; todo?: undefined }
  | { mode: "edit"; todo: Todo };

export default function TodoForm({ mode, todo }: Props) {
  const router = useRouter();
  const [title, setTitle] = useState(todo?.title ?? "");
  const [description, setDescription] = useState(todo?.description ?? "");
  const [completed, setCompleted] = useState(todo?.completed ?? false);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  const cancelHref = mode === "edit" ? `/todos/${todo.id}` : "/todos";

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    if (!title.trim()) {
      setError("Title is required.");
      return;
    }

    setPending(true);
    try {
      const res =
        mode === "create"
          ? await fetch("/api/todos", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ title, description }),
            })
          : await fetch(`/api/todos?id=${todo.id}`, {
              method: "PATCH",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ title, description, completed }),
            });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error ?? "Something went wrong. Please try again.");
        return;
      }

      router.push(`/todos/${data.id}`);
      router.refresh();
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setPending(false);
    }
  }

  const inputClass =
    "w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-300 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50 dark:placeholder:text-zinc-600 dark:focus:border-zinc-400 dark:focus:ring-zinc-700";

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900"
    >
      <div>
        <label
          htmlFor="title"
          className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300"
        >
          Title
        </label>
        <input
          id="title"
          name="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="What needs doing?"
          required
          autoFocus
          className={inputClass}
        />
      </div>

      <div>
        <label
          htmlFor="description"
          className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300"
        >
          Description{" "}
          <span className="font-normal text-zinc-400">(optional)</span>
        </label>
        <textarea
          id="description"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Any extra details..."
          rows={4}
          className={inputClass}
        />
      </div>

      {mode === "edit" && (
        <label className="flex items-center gap-2 text-sm text-zinc-700 dark:text-zinc-300">
          <input
            type="checkbox"
            name="completed"
            checked={completed}
            onChange={(e) => setCompleted(e.target.checked)}
            className="h-4 w-4 rounded border-zinc-300 accent-zinc-900 dark:border-zinc-700 dark:accent-zinc-50"
          />
          Mark as completed
        </label>
      )}

      {error && (
        <p
          role="alert"
          className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700 dark:bg-red-950/40 dark:text-red-300"
        >
          {error}
        </p>
      )}

      <div className="flex items-center gap-2 pt-1">
        <button
          type="submit"
          disabled={pending}
          className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-700 disabled:opacity-50 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-300"
        >
          {pending
            ? "Saving..."
            : mode === "create"
              ? "Add todo"
              : "Save changes"}
        </button>
        <Link
          href={cancelHref}
          className="rounded-lg px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}
