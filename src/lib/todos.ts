export type Todo = {
  id: number;
  title: string;
  description: string;
  completed: boolean;
};

export const todos: Todo[] = [
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
    description: "Continue reading 'Atomic Habits'.",
    completed: false,
  },
  {
    id: 5,
    title: "Call mom",
    description: "Catch up and ask about the weekend plans.",
    completed: true,
  },
];

export function getTodo(id: number): Todo | undefined {
  return todos.find((todo) => todo.id === id);
}
