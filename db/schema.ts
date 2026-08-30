import {
  pgTable,
  uuid,
  varchar,
  timestamp,
  numeric,
  integer,
  boolean,
  date,
  pgEnum,
} from "drizzle-orm/pg-core";

// --------------------------------------------------
// Enums
// --------------------------------------------------

export const stockMovementType = pgEnum("stock_movement_type", [
  "PURCHASE",
  "SALE",
  "RETURN",
  "DAMAGE",
  "EXPIRY",
  "ADJUSTMENT",
]);

// --------------------------------------------------
// Categories
// --------------------------------------------------

export const categories = pgTable("categories", {
  id: uuid("id").defaultRandom().primaryKey(),

  name: varchar("name", {
    length: 100,
  })
    .notNull()
    .unique(),

  description: varchar("description", {
    length: 500,
  }),

  isDeleted: boolean("is_deleted").default(false).notNull(),

  isActive: boolean("is_active").default(true).notNull(),

  createdAt: timestamp("created_at").defaultNow().notNull(),

  createdBy: uuid("created_by"),

  updatedAt: timestamp("updated_at"),

  updatedBy: uuid("updated_by"),

  deletedAt: timestamp("deleted_at"),

  deletedBy: uuid("deleted_by"),
});

// --------------------------------------------------
// Products
// --------------------------------------------------

export const products = pgTable("products", {
  id: uuid("id").defaultRandom().primaryKey(),

  name: varchar("name", {
    length: 200,
  }).notNull(),

  sku: varchar("sku", {
    length: 100,
  })
    .notNull()
    .unique(),

  barcode: varchar("barcode", {
    length: 50,
  }).unique(),

  categoryId: uuid("category_id").references(() => categories.id),

  brand: varchar("brand", {
    length: 100,
  }),

  unit: varchar("unit", {
    length: 20,
  }).notNull(),

  costPrice: numeric("cost_price", {
    precision: 12,
    scale: 2,
  }).notNull(),

  sellingPrice: numeric("selling_price", {
    precision: 12,
    scale: 2,
  }).notNull(),

  currentStock: numeric("current_stock", {
    precision: 12,
    scale: 3,
  })
    .notNull()
    .default("0"),

  minimumStock: numeric("minimum_stock", {
    precision: 12,
    scale: 3,
  })
    .notNull()
    .default("0"),

  maximumStock: numeric("maximum_stock", {
    precision: 12,
    scale: 3,
  }),

  expiryDate: date("expiry_date"),

  isDeleted: boolean("is_deleted").default(false).notNull(),

  isActive: boolean("is_active").default(true).notNull(),

  createdAt: timestamp("created_at").defaultNow().notNull(),

  createdBy: uuid("created_by"),

  updatedAt: timestamp("updated_at"),

  updatedBy: uuid("updated_by"),

  deletedAt: timestamp("deleted_at"),

  deletedBy: uuid("deleted_by"),
});

// --------------------------------------------------
// Stock Movements
// --------------------------------------------------

export const stockMovements = pgTable("stock_movements", {
  id: uuid("id").defaultRandom().primaryKey(),

  productId: uuid("product_id")
    .notNull()
    .references(() => products.id),

  type: stockMovementType("type").notNull(),

  quantity: numeric("quantity", {
    precision: 12,
    scale: 3,
  }).notNull(),

  reference: varchar("reference", {
    length: 100,
  }),

  notes: varchar("notes", {
    length: 500,
  }),

  createdBy: uuid("created_by"),

  createdAt: timestamp("created_at").defaultNow().notNull(),
});
