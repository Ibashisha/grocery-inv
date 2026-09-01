import { sql } from "drizzle-orm";
import { db } from "@/db";

export async function generateSku(productName: string) {
  const prefix = productName
    .trim()
    .toUpperCase()
    .replace(/[^A-Z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 10);

  const result = await db.execute(
    sql`SELECT nextval('product_sku_seq') AS number`,
  );

  const number = Number(result[0].number);
  return `${prefix}-${String(number).padStart(6, "0")}`;
}
