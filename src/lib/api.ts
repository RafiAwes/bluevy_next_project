import type { Todo } from "@/app/api/todos/route";

// Cache tag attached to every server-side fetch of /api/todos. The API's
// POST/DELETE handlers call revalidateTag(TODOS_TAG) so pages update at once.
export const TODOS_TAG = "todos";

// Server-side fetches need an absolute URL (there is no "current origin" on
// the server). Set NEXT_PUBLIC_BASE_URL in .env.local / your host's env.
// Read at call time so dev env reloads take effect without a restart.
function baseUrl(): string {
  return process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";
}

// Cache API responses for up to 15 seconds (stale-while-revalidate), and
// tag them so POST/DELETE handlers can invalidate immediately.
const REVALIDATE_SECONDS = 15;

export async function getTodos(): Promise<Todo[]> {
  const res = await fetch(`${baseUrl()}/api/todos`, {
    next: { revalidate: REVALIDATE_SECONDS, tags: [TODOS_TAG] },
  });
  if (!res.ok) throw new Error(`Failed to load todos (${res.status})`);
  return res.json();
}

export async function getTodo(id: string): Promise<Todo | null> {
  const res = await fetch(`${baseUrl()}/api/todos?id=${encodeURIComponent(id)}`, {
    next: { revalidate: REVALIDATE_SECONDS, tags: [TODOS_TAG] },
  });
  if (res.status === 404 || res.status === 400) return null;
  if (!res.ok) throw new Error(`Failed to load todo ${id} (${res.status})`);
  return res.json();
}
