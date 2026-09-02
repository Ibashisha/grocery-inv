import { notFound } from "next/navigation";
import { and, eq, desc } from "drizzle-orm";
import { db } from "@/db";
import { products, stockMovements } from "@/db/schema";
import { StockForm } from "@/components/products/stock-form";
import { StockHistory } from "@/components/products/stock-history";

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

  const movements = await db
    .select({
      id: stockMovements.id,
      type: stockMovements.type,
      quantity: stockMovements.quantity,
      stockAfter: stockMovements.stockAfter,
      notes: stockMovements.notes,
      createdAt: stockMovements.createdAt,
    })
    .from(stockMovements)
    .where(eq(stockMovements.productId, id))
    .orderBy(desc(stockMovements.createdAt));

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

        <StockForm product={product} />

        <StockHistory movements={movements} unit={product.unit} />
      </div>
    </main>
  );
}
