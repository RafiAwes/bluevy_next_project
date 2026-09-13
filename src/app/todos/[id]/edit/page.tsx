import Link from "next/link";
import { notFound } from "next/navigation";
import { getTodo } from "@/lib/api";
import TodoForm from "../../TodoForm";

export default async function EditTodoPage({
  params,
}: PageProps<"/todos/[id]/edit">) {
  const { id } = await params;
  const todo = await getTodo(id);

  if (!todo) {
    notFound();
  }

  return (
    <main className="flex min-h-screen flex-col items-center bg-zinc-50 px-4 py-16 dark:bg-zinc-950">
      <div className="w-full max-w-md">
        <Link
          href={`/todos/${todo.id}`}
          className="mb-6 inline-block text-sm text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
        >
          &larr; Back to todo
        </Link>
        <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
          Todo #{todo.id}
        </p>
        <h1 className="font-luckiest mb-6 text-4xl tracking-wide text-zinc-900 dark:text-zinc-50">
          Edit Todo
        </h1>
        <TodoForm mode="edit" todo={todo} />
      </div>
    </main>
  );
}
