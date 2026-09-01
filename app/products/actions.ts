"use server";

import { db } from "@/db";
import { products, stockMovements } from "@/db/schema";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { generateSku } from "@/lib/sku";

export async function createProduct(data: {
  name: string;
  barcode?: string;
  brand?: string;
  unit: string;
  customUnit?: string;
  costPrice: string;
  sellingPrice: string;
  initialStock: string;
  minimumStock: string;
  maximumStock?: string;
  expiryDate?: string;
}) {
  const sku = await generateSku(data.name);

  const unit =
    data.unit === "Other" ? data.customUnit?.trim().toUpperCase() : data.unit;

  if (!unit) {
    throw new Error("Custom unit is required");
  }

  await db.transaction(async (tx) => {
    const [product] = await tx
      .insert(products)
      .values({
        name: data.name,
        sku,
        barcode: data.barcode || null,
        brand: data.brand || null,
        unit,
        costPrice: data.costPrice,
        sellingPrice: data.sellingPrice,
        currentStock: data.initialStock,
        minimumStock: data.minimumStock,
        maximumStock: data.maximumStock || null,
        expiryDate: data.expiryDate || null,
      })
      .returning();

    if (Number(data.initialStock) !== 0) {
      await tx.insert(stockMovements).values({
        productId: product.id,
        type: "ADJUSTMENT",
        quantity: data.initialStock,
        notes: "Initial Stock",
      });
    }

    console.log("Generated SKU:", product.sku);

    return product;
  });
  revalidatePath("/products");
  redirect("/products");
}
