import { CategoryForm } from "@/components/categories/category-form";

export default function NewCategoryPage() {
  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Create Category</h1>
        <p className="text-muted-foreground">Add a new product category.</p>
      </div>

      <CategoryForm />
    </div>
  );
}
