import { db } from "@/db";
import { products } from "@/db/schema";

export default async function ProductsPage() {
  const productList = await db.select().from(products);

  return (
    <main className="min-h-screen p-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Products</h1>
            <p className="mt-1 text-muted-foreground">
              Manage your grocery products and inventory.
            </p>
          </div>
        </div>

        <button className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
          + Add Product
        </button>
      </div>

      <div className="mt-8 rounded-lg border">
        {productList.length === 0 ? (
          <div className="p-12 text-center">
            <h2 className="text-lg font-semibold">No Products Yet</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Add your first product to start managing your inventory.
            </p>
            <button className="mt-6 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
              + Add Product
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b bg-muted/50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium">
                    Product
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium">
                    SKU
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium">
                    Unit
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium">
                    Stock
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium">
                    Selling Price
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y">
                {productList.map((product) => (
                  <tr key={product.id}>
                    <td className="px-4 py-3 text-sm font-medium">
                      {product.name}
                    </td>
                    <td className="px-4 py-4 text-sm text-muted-foreground">
                      {product.sku}
                    </td>
                    <td className="px-4 py-4 text-sm">{product.unit}</td>
                    <td className="px-4 py-4 text-sm">
                      {product.currentStock}
                    </td>
                    <td className="px-4 py-4 text-sm">
                      ₹{product.sellingPrice}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}
