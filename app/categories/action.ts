"use server";

"use server";

import { db } from "@/db";
import { categories } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function createCategory(data: {
  name: string;
  description?: string;
}) {
  const name = data.name.trim();
  const description = data.description?.trim() || null;

  if (!name) {
    throw new Error("Category name is required");
  }

  // Check if an active category with the same name already exists
  const existingCategory = await db
    .select()
    .from(categories)
    .where(and(eq(categories.name, name), eq(categories.isDeleted, false)))
    .limit(1);

  if (existingCategory.length > 0) {
    throw new Error("A category with this name already exists");
  }

  await db.insert(categories).values({
    name,
    description,
  });

  revalidatePath("/categories");
}

export async function updateCategory(
  id: string,
  data: {
    name: string;
    description?: string;
  },
) {
  const name = data.name.trim();
  const description = data.description?.trim() || null;

  if (!name) {
    throw new Error("Category name is required");
  }

  const existingCategory = await db
    .select()
    .from(categories)
    .where(and(eq(categories.name, name), eq(categories.isDeleted, false)))
    .limit(1);

  if (existingCategory.length > 0 && existingCategory[0].id !== id) {
    throw new Error("A category with this name already exists");
  }

  await db
    .update(categories)
    .set({
      name,
      description,
      updatedAt: new Date(),
    })
    .where(and(eq(categories.id, id), eq(categories.isDeleted, false)));

  revalidatePath("/categories");
}

export async function toggleCategoryStatus(id: string, isActive: boolean) {
  await db
    .update(categories)
    .set({
      isActive,
      updatedAt: new Date(),
    })
    .where(and(eq(categories.id, id), eq(categories.isDeleted, false)));

  revalidatePath("/categories");
}
