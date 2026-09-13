import { NextRequest } from "next/server";
import { revalidateTag } from "next/cache";
import { TODOS_TAG } from "@/lib/api";

export type Todo = {
  id: number;
  title: string;
  description: string;
  completed: boolean;
};

// In-memory data store. Resets whenever the server restarts.
const todos: Todo[] = [
  {
    id: 1,
    title: "Buy groceries",
    description: "Milk, eggs, bread, and coffee beans.",
    completed: false,
  },
  {
    id: 2,
    title: "Walk the dog",
    description: "Take Max around the park for 30 minutes.",
    completed: true,
  },
  {
    id: 3,
    title: "Finish Next.js project",
    description: "Wrap up the todos app and push it to GitHub.",
    completed: false,
  },
  {
    id: 4,
    title: "Read a chapter of a book",
    description: "Continue reading Atomic Habits.",
    completed: false,
  },
  {
    id: 5,
    title: "Call mom",
    description: "Catch up and ask about the weekend plans.",
    completed: true,
  },
];

function nextId(): number {
  return todos.length ? Math.max(...todos.map((t) => t.id)) + 1 : 1;
}

function parseId(raw: unknown): number | null {
  if (raw === null || raw === undefined) return null;
  const id = Number(raw);
  return Number.isInteger(id) && id > 0 ? id : null;
}

// GET /api/todos                      -> all todos
// GET /api/todos?completed=true|false -> filtered by status
// GET /api/todos?id=3                 -> single todo
export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;

  const rawId = searchParams.get("id");
  if (rawId !== null) {
    const id = parseId(rawId);
    if (id === null) {
      return Response.json({ error: "Invalid todo id" }, { status: 400 });
    }
    const todo = todos.find((t) => t.id === id);
    if (!todo) {
      return Response.json({ error: "Todo not found" }, { status: 404 });
    }
    return Response.json(todo);
  }

  const completed = searchParams.get("completed");
  const result =
    completed === "true" || completed === "false"
      ? todos.filter((t) => t.completed === (completed === "true"))
      : todos;

  return Response.json(result);
}

// POST /api/todos  body: { title: string, description?: string }
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { title, description } = (body ?? {}) as {
    title?: unknown;
    description?: unknown;
  };

  if (typeof title !== "string" || title.trim() === "") {
    return Response.json(
      { error: "'title' is required and must be a non-empty string" },
      { status: 400 },
    );
  }

  if (description !== undefined && typeof description !== "string") {
    return Response.json(
      { error: "'description' must be a string" },
      { status: 400 },
    );
  }

  const todo: Todo = {
    id: nextId(),
    title: title.trim(),
    description: description?.trim() ?? "",
    completed: false,
  };
  todos.push(todo);
  revalidateTag(TODOS_TAG, { expire: 0 });

  return Response.json(todo, { status: 201 });
}

// PATCH /api/todos?id=3  body: { completed?: boolean, title?: string, description?: string }
// Omit `completed` to toggle it.
export async function PATCH(request: NextRequest) {
  let body: Record<string, unknown> = {};
  try {
    body = ((await request.json()) as Record<string, unknown>) ?? {};
  } catch {
    // body is optional for a plain toggle
  }

  const id = parseId(request.nextUrl.searchParams.get("id") ?? body.id);
  if (id === null) {
    return Response.json(
      { error: "'id' is required (query ?id=1 or JSON body { id: 1 })" },
      { status: 400 },
    );
  }

  const todo = todos.find((t) => t.id === id);
  if (!todo) {
    return Response.json({ error: "Todo not found" }, { status: 404 });
  }

  const { completed, title, description } = body;

  if (completed !== undefined && typeof completed !== "boolean") {
    return Response.json(
      { error: "'completed' must be a boolean" },
      { status: 400 },
    );
  }
  if (title !== undefined && (typeof title !== "string" || !title.trim())) {
    return Response.json(
      { error: "'title' must be a non-empty string" },
      { status: 400 },
    );
  }
  if (description !== undefined && typeof description !== "string") {
    return Response.json(
      { error: "'description' must be a string" },
      { status: 400 },
    );
  }

  todo.completed = completed === undefined ? !todo.completed : completed;
  if (typeof title === "string") todo.title = title.trim();
  if (typeof description === "string") todo.description = description.trim();

  revalidateTag(TODOS_TAG, { expire: 0 });

  return Response.json(todo);
}

// DELETE /api/todos?id=3   (or body: { id: 3 })
export async function DELETE(request: NextRequest) {
  let raw: unknown = request.nextUrl.searchParams.get("id");

  if (raw === null) {
    try {
      const body = (await request.json()) as { id?: unknown };
      raw = body?.id;
    } catch {
      // no usable body; fall through to validation below
    }
  }

  const id = parseId(raw);
  if (id === null) {
    return Response.json(
      { error: "'id' is required (query ?id=1 or JSON body { id: 1 })" },
      { status: 400 },
    );
  }

  const index = todos.findIndex((t) => t.id === id);
  if (index === -1) {
    return Response.json({ error: "Todo not found" }, { status: 404 });
  }

  const [removed] = todos.splice(index, 1);
  revalidateTag(TODOS_TAG, { expire: 0 });

  return Response.json(removed);
}
