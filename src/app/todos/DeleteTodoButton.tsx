"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DeleteTodoButton({ id }: { id: number }) {
  const router = useRouter();
  const [pending, setPending] = useState(false);

  async function handleDelete() {
    if (!confirm(`Delete todo #${id}?`)) return;

    setPending(true);
    try {
      const res = await fetch(`/api/todos?id=${id}`, { method: "DELETE" });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        alert(data.error ?? "Failed to delete todo");
        return;
      }
      // Re-render the server component; the API already invalidated the cache.
      router.refresh();
    } finally {
      setPending(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={pending}
      className="rounded-md px-2 py-1 text-sm font-medium text-red-600 hover:bg-red-50 disabled:opacity-50 dark:text-red-400 dark:hover:bg-red-950/40"
    >
      {pending ? "Deleting..." : "Delete"}
    </button>
  );
}
