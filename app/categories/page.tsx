import Link from "next/link";

import { db } from "@/db";
import { categories } from "@/db/schema";
import { asc, eq } from "drizzle-orm";
import { CategoryActions } from "@/components/categories/category-actions";

export default async function CategoriesPage() {
  const categoryList = await db
    .select()
    .from(categories)
    .where(eq(categories.isDeleted, false))
    .orderBy(asc(categories.name));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Categories</h1>
          <p className="text-muted-foreground">
            Manage your product categories.
          </p>
        </div>

        <Link
          href="/categories/new"
          className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-xs transition-colors hover:bg-primary/90"
        >
          Add Category
        </Link>
      </div>

      <div className="rounded-md border">
        {categoryList.length === 0 ? (
          <div className="p-6 text-center text-muted-foreground">
            No categories found.
          </div>
        ) : (
          <div className="divide-y">
            {categoryList.map((category) => (
              <div
                key={category.id}
                className="flex items-center justify-between p-4"
              >
                <div>
                  <p className="font-medium">{category.name}</p>

                  {category.description && (
                    <p className="text-sm text-muted-foreground">
                      {category.description}
                    </p>
                  )}
                </div>

                <CategoryActions
                  id={category.id}
                  isActive={category.isActive}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
