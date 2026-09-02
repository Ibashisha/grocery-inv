import { notFound } from "next/navigation";

import { db } from "@/db";
import { categories } from "@/db/schema";
import { eq, and } from "drizzle-orm";

import { CategoryForm } from "@/components/categories/category-form";

type EditCategoryPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditCategoryPage({
  params,
}: EditCategoryPageProps) {
  const { id } = await params;

  const [category] = await db
    .select()
    .from(categories)
    .where(and(eq(categories.id, id), eq(categories.isDeleted, false)))
    .limit(1);

  if (!category) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Edit Category</h1>
        <p className="text-muted-foreground">
          Update the category information.
        </p>
      </div>

      <CategoryForm category={category} />
    </div>
  );
}
