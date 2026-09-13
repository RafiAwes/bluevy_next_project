"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ToggleTodoButton({
  id,
  completed,
}: {
  id: number;
  completed: boolean;
}) {
  const router = useRouter();
  const [pending, setPending] = useState(false);

  async function handleToggle() {
    setPending(true);
    try {
      const res = await fetch(`/api/todos?id=${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: !completed }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        alert(data.error ?? "Failed to update todo");
        return;
      }
      router.refresh();
    } finally {
      setPending(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleToggle}
      disabled={pending}
      className={
        completed
          ? "rounded-md px-2 py-1 text-sm font-medium text-zinc-500 hover:bg-zinc-100 disabled:opacity-50 dark:text-zinc-400 dark:hover:bg-zinc-800"
          : "rounded-md px-2 py-1 text-sm font-medium text-green-600 hover:bg-green-50 disabled:opacity-50 dark:text-green-400 dark:hover:bg-green-950/40"
      }
    >
      {pending ? "Saving..." : completed ? "Undo" : "Complete"}
    </button>
  );
}
