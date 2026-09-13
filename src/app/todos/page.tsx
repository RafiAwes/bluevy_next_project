import Link from "next/link";
import { getTodos } from "@/lib/api";
import DeleteTodoButton from "./DeleteTodoButton";
import ToggleTodoButton from "./ToggleTodoButton";

export default async function TodosPage() {
  const todos = await getTodos();

  return (
    <main className="flex min-h-screen flex-col items-center bg-zinc-50 px-4 py-16 dark:bg-zinc-950">
      <div className="w-full max-w-2xl">
        <h1 className="font-luckiest mb-6 text-4xl tracking-wide text-zinc-900 dark:text-zinc-50">
          My Todos
        </h1>

        <div className="overflow-x-auto rounded-lg border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-zinc-200 bg-zinc-50 text-xs uppercase tracking-wider text-zinc-500 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-400">
              <tr>
                <th scope="col" className="w-16 px-4 py-3">
                  ID
                </th>
                <th scope="col" className="px-4 py-3">
                  Title
                </th>
                <th scope="col" className="w-56 px-4 py-3 text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
              {todos.length === 0 ? (
                <tr>
                  <td
                    colSpan={3}
                    className="px-4 py-8 text-center text-zinc-500 dark:text-zinc-400"
                  >
                    No todos yet.
                  </td>
                </tr>
              ) : (
                todos.map((todo) => (
                  <tr
                    key={todo.id}
                    className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
                  >
                    <td className="px-4 py-3 font-mono text-zinc-500 dark:text-zinc-400">
                      {todo.id}
                    </td>
                    <td
                      className={`px-4 py-3 text-zinc-800 dark:text-zinc-200 ${
                        todo.completed ? "line-through opacity-60" : ""
                      }`}
                    >
                      {todo.title}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <Link
                          href={`/todos/${todo.id}`}
                          className="rounded-md px-2 py-1 text-sm font-medium text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
                        >
                          View
                        </Link>
                        <ToggleTodoButton
                          id={todo.id}
                          completed={todo.completed}
                        />
                        <DeleteTodoButton id={todo.id} />
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <p className="mt-4 text-sm text-zinc-500 dark:text-zinc-400">
          {todos.length} todo{todos.length === 1 ? "" : "s"}
        </p>
      </div>
    </main>
  );
}
