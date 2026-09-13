import Link from "next/link";
import TodoForm from "../TodoForm";

export default function NewTodoPage() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-zinc-50 px-4 py-16 dark:bg-zinc-950">
      <div className="w-full max-w-md">
        <Link
          href="/todos"
          className="mb-6 inline-block text-sm text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
        >
          &larr; Back to todos
        </Link>
        <h1 className="font-luckiest mb-6 text-4xl tracking-wide text-zinc-900 dark:text-zinc-50">
          New Todo
        </h1>
        <TodoForm mode="create" />
      </div>
    </main>
  );
}
