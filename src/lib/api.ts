import type { Todo } from "@/app/api/todos/route";

// Server-side fetches need an absolute URL (there is no "current origin" on
// the server). Set NEXT_PUBLIC_BASE_URL in .env.local / your host's env.
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";

// Cache API responses for up to 15 seconds (stale-while-revalidate).
const REVALIDATE_SECONDS = 15;

export async function getTodos(): Promise<Todo[]> {
  const res = await fetch(`${BASE_URL}/api/todos`, {
    next: { revalidate: REVALIDATE_SECONDS },
  });
  if (!res.ok) throw new Error(`Failed to load todos (${res.status})`);
  return res.json();
}

export async function getTodo(id: string): Promise<Todo | null> {
  const res = await fetch(`${BASE_URL}/api/todos?id=${encodeURIComponent(id)}`, {
    next: { revalidate: REVALIDATE_SECONDS },
  });
  if (res.status === 404 || res.status === 400) return null;
  if (!res.ok) throw new Error(`Failed to load todo ${id} (${res.status})`);
  return res.json();
}
