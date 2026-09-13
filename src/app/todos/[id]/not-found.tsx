import NotFoundCard from "@/components/NotFoundCard";

// Rendered when todos/[id]/page.tsx calls notFound() for an unknown id.
export default function TodoNotFound() {
  return (
    <NotFoundCard
      title="Todo not found"
      message="This todo does not exist. It may have been deleted."
      backHref="/todos"
      backLabel="Back to todos"
    />
  );
}
