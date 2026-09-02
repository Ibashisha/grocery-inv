import { ProductForm } from "@/components/products/product-form";

import { db } from "@/db";
import { categories } from "@/db/schema";
import { asc, eq } from "drizzle-orm";

export default async function NewProductPage() {
  const categoryList = await db
    .select({
      id: categories.id,
      name: categories.name,
    })
    .from(categories)
    .where(eq(categories.isActive, true))
    .orderBy(asc(categories.name));

  return (
    <main className="min-h-screen p-8">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Add Product</h1>
          <p className="mt-1 text-muted-foreground">
            Add a new product to your inventory.
          </p>
        </div>

        <ProductForm categories={categoryList} />
      </div>
    </main>
  );
}
