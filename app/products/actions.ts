"use server";

import { db } from "@/db";
import { products, stockMovements } from "@/db/schema";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { generateSku } from "@/lib/sku";
import { and, eq } from "drizzle-orm";

export async function createProduct(data: {
  name: string;
  barcode?: string;
  brand?: string;
  unit: string;
  categoryId: string;
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
        categoryId: data.categoryId,
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
        stockAfter: data.initialStock,
        notes: "Initial Stock",
      });
    }

    return product;
  });
  revalidatePath("/products");
  redirect("/products");
}

export async function updateProduct(
  id: string,
  data: {
    name: string;
    barcode?: string;
    brand?: string;
    unit: string;
    categoryId: string;
    customUnit?: string;
    costPrice: string;
    sellingPrice: string;
    minimumStock: string;
    maximumStock?: string;
    expiryDate?: string;
  },
) {
  const unit =
    data.unit === "Other" ? data.customUnit?.trim().toUpperCase() : data.unit;

  if (!unit) {
    throw new Error("Custom unit is required");
  }

  await db
    .update(products)
    .set({
      name: data.name,
      barcode: data.barcode || null,
      brand: data.brand || null,
      categoryId: data.categoryId,
      unit,
      costPrice: data.costPrice,
      sellingPrice: data.sellingPrice,
      minimumStock: data.minimumStock,
      maximumStock: data.maximumStock || null,
      expiryDate: data.expiryDate || null,
      updatedAt: new Date(),
    })
    .where(and(eq(products.id, id), eq(products.isDeleted, false)));

  revalidatePath("/products");
}

export async function adjustStock(
  productId: string,
  data: {
    type: "ADD" | "REMOVE" | "SET";
    quantity: string;
    reason: string;
  },
) {
  const quantity = Number(data.quantity);

  if (!Number.isFinite(quantity) || quantity <= 0) {
    return {
      success: false as const,
      error: "Quantity must be greater than 0",
    };
  }

  const [product] = await db
    .select({
      id: products.id,
      currentStock: products.currentStock,
    })
    .from(products)
    .where(and(eq(products.id, productId), eq(products.isDeleted, false)))
    .limit(1);

  if (!product) {
    return {
      success: false as const,
      error: "Product not found",
    };
  }

  const currentStock = Number(product.currentStock);

  let newStock: number;

  if (data.type === "ADD") {
    newStock = currentStock + quantity;
  } else if (data.type === "REMOVE") {
    if (quantity > currentStock) {
      return {
        success: false as const,
        error: `Insufficient stock. Current stock: ${currentStock}`,
      };
    }

    newStock = currentStock - quantity;
  } else {
    newStock = quantity;
  }

  const movementQuantity =
    data.type === "REMOVE"
      ? `-${quantity}`
      : data.type === "SET"
        ? String(newStock - currentStock)
        : String(quantity);

  await db.transaction(async (tx) => {
    await tx
      .update(products)
      .set({
        currentStock: String(newStock),
        updatedAt: new Date(),
      })
      .where(eq(products.id, productId));

    await tx.insert(stockMovements).values({
      productId,
      type: "ADJUSTMENT",
      quantity: movementQuantity,
      stockAfter: String(newStock),
      notes: data.reason.trim() || null,
    });
  });

  revalidatePath("/products");
  revalidatePath(`/products/${productId}/stock`);

  return {
    success: true as const,
  };
}
