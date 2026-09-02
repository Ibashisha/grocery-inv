import { db } from "@/db";
import { categories, products } from "@/db/schema";
import { eq, ilike, and, or } from "drizzle-orm";
import Link from "next/link";
import { ProductSearch } from "@/components/products/product-search";

type ProductsPageProps = {
  searchParams: Promise<{
    search?: string;
    category?: string;
  }>;
};

export default async function ProductsPage({
  searchParams,
}: ProductsPageProps) {
  const { search, category } = await searchParams;

  const categoryList = await db
    .select({
      id: categories.id,
      name: categories.name,
    })
    .from(categories)
    .where(eq(categories.isActive, true));

  const productList = await db
    .select({
      id: products.id,
      name: products.name,
      sku: products.sku,
      categoryName: categories.name,
      unit: products.unit,
      currentStock: products.currentStock,
      sellingPrice: products.sellingPrice,
      minimumStock: products.minimumStock,
    })
    .from(products)
    .leftJoin(categories, eq(products.categoryId, categories.id))
    .where(
      and(
        eq(products.isDeleted, false),

        search
          ? or(
              ilike(products.name, `%${search}%`),
              ilike(products.sku, `%${search}%`),
            )
          : undefined,

        category ? eq(products.categoryId, category) : undefined,
      ),
    );

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

        <Link
          href="/products/new"
          className="mt-6 inline-flex rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          + Add Product
        </Link>
      </div>

      <div className="mt-8 rounded-lg border">
        <div className="mt-6">
          <ProductSearch categories={categoryList} />
        </div>

        {productList.length === 0 ? (
          search || category ? (
            <div className="p-12 text-center">
              <h2 className="text-lg font-semibold">No Products Found</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                No products match your current search or filter.
              </p>

              <Link
                href="/products"
                className="mt-4 inline-flex rounded-md border px-4 py-2 text-sm font-medium hover:bg-muted"
              >
                Clear Filters
              </Link>
            </div>
          ) : (
            <div className="p-12 text-center">
              <h2 className="text-lg font-semibold">No Products Yet</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Add your first product to start managing your inventory.
              </p>
              <Link
                href="/products/new"
                className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
              >
                + Add Product
              </Link>
            </div>
          )
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
                    Category
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium">
                    Unit
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium">
                    Stock
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium">
                    Selling Price
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium">
                    Actions
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
                    <td className="px-4 py-4 text-sm">
                      {product.categoryName ?? "-"}
                    </td>
                    <td className="px-4 py-4 text-sm">{product.unit}</td>
                    <td className="px-4 py-4 text-sm">
                      {Number(product.currentStock).toString()}
                    </td>
                    <td className="px-4 py-4 text-sm">
                      {Number(product.currentStock) === 0 ? (
                        <span className="w-fit rounded-full bg-destructive/10 px-2.5 py-1 text-xs font-medium text-destructive">
                          Out of Stock
                        </span>
                      ) : Number(product.currentStock) <=
                        Number(product.minimumStock) ? (
                        <span className="w-fit rounded-full bg-yellow-500/10 px-2.5 py-1 text-xs font-medium text-yellow-600">
                          Low Stock
                        </span>
                      ) : (
                        <span className="w-fit rounded-full bg-green-500/10 px-2.5 py-1 text-xs font-medium text-green-600">
                          In Stock
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-4 text-sm">
                      ₹{product.sellingPrice}
                    </td>
                    <td className="px-4 py-4 text-sm">
                      <div className="flex items-center gap-3">
                        <Link
                          href={`/products/${product.id}/stock`}
                          className="text-sm font-medium text-primary hover:underline"
                        >
                          Update Stock
                        </Link>

                        <Link
                          href={`/products/${product.id}/edit`}
                          className="text-sm font-medium text-primary hover:underline"
                        >
                          Edit
                        </Link>
                      </div>
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
