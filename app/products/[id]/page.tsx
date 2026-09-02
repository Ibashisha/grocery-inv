import { notFound } from "next/navigation";
import { and, eq } from "drizzle-orm";
import { db } from "@/db";
import { products } from "@/db/schema";

type StockPageProps = {
  params: Promise<{ id: string }>;
};

export default async function StockPage({ params }: StockPageProps) {
  const { id } = await params;

  const [product] = await db
    .select({
      id: products.id,
      name: products.name,
      sku: products.sku,
      unit: products.unit,
      currentStock: products.currentStock,
    })
    .from(products)
    .where(and(eq(products.id, id), eq(products.isDeleted, false)))
    .limit(1);

  if (!product) {
    notFound();
  }

  return (
    <main className="min-h-screen p-8">
      <div className="mx-auto max-w-2xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Update Stock</h1>
          <p className="mt-1 text-muted-foreground">
            Update the inventory stock for this product.
          </p>
        </div>

        <div className="rounded-lg border p-6">
          <h2 className="text-xl font-semibold">{product.name}</h2>

          <div className="mt-4 space-y-2 text-sm">
            <p>
              <span className="font-medium">SKU:</span> {product.sku}
            </p>

            <p>
              <span className="font-medium">Current Stock:</span>{" "}
              {Number(product.currentStock).toString()} {product.unit}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
