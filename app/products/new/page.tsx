import { ProductForm } from "@/components/products/product-form";

export default function NewProductPage() {
  return (
    <main className="min-h-screen p-8">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Add Product</h1>
          <p className="mt-1 text-muted-foreground">
            Add a new product to your inventory.
          </p>
        </div>

        <ProductForm />
      </div>
    </main>
  );
}
