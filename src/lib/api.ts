import type { Todo } from "@/app/api/todos/route";

export const TODOS_TAG = "todos";

function baseUrl(): string {
  return process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";
}

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
