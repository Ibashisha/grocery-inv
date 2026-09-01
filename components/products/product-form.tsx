"use client";

import { Controller, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createProduct } from "@/app/products/actions";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UNITS } from "./dummy-data";

const productSchema = z
  .object({
    name: z.string().min(2, "Product name must be at least 2 characters"),

    barcode: z.string().optional(),

    brand: z.string().optional(),

    unit: z.string().min(1, "Unit is required"),

    customUnit: z.string().optional(),

    costPrice: z.string().min(1, "Cost price is required"),

    sellingPrice: z.string().min(1, "Selling price is required"),

    initialStock: z.string().min(1, "Initial stock is required"),

    minimumStock: z.string().min(1, "Minimum stock is required"),

    maximumStock: z.string().optional(),

    expiryDate: z.string().optional(),
  })
  .refine((data) => data.unit !== "Other" || !!data.customUnit?.trim(), {
    message: "Please enter a custom unit",
    path: ["customUnit"],
  });

type ProductFormValues = z.infer<typeof productSchema>;

export function ProductForm() {
  const {
    register,
    handleSubmit,
    control,
    // setValue,
    formState: { errors },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      unit: "",
      customUnit: "",
    },
  });

  const onSubmit = async (data: ProductFormValues) => {
    await createProduct(data);
  };

  const selectedUnit = useWatch({
    control,
    name: "unit",
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Basic Information */}
      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Product Name</Label>

            <Input
              id="name"
              placeholder="e.g. Rice 5kg"
              {...register("name")}
            />

            {errors.name && (
              <p className="text-sm text-destructive">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="barcode">Barcode</Label>

            <Input
              id="barcode"
              placeholder="e.g. 8901234567890"
              {...register("barcode")}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="brand">Brand</Label>

            <Input
              id="brand"
              placeholder="e.g. India Gate"
              {...register("brand")}
            />
          </div>
        </CardContent>
      </Card>
      {/* Pricing */}
      <Card>
        <CardHeader>
          <CardTitle>Pricing</CardTitle>
        </CardHeader>

        <CardContent className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="costPrice">Cost Price</Label>

            <Input
              id="costPrice"
              step="0.01"
              placeholder="290.00"
              {...register("costPrice")}
            />

            {errors.costPrice && (
              <p className="text-sm text-destructive">
                {errors.costPrice.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="sellingPrice">Selling Price</Label>

            <Input
              id="sellingPrice"
              step="0.01"
              placeholder="320.00"
              {...register("sellingPrice")}
            />

            {errors.sellingPrice && (
              <p className="text-sm text-destructive">
                {errors.sellingPrice.message}
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Inventory */}
      <Card>
        <CardHeader>
          <CardTitle>Inventory</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Unit */}
          <div className="flex gap-2">
            {/* Unit Dropdown */}
            <div className="space-y-2">
              <Label htmlFor="unit">Unit</Label>

              <Controller
                name="unit"
                control={control}
                render={({ field }) => (
                  <Select
                    value={field.value}
                    onValueChange={(value) => {
                      if (value !== null) {
                        field.onChange(value);
                      }
                    }}
                  >
                    <SelectTrigger id="unit" className="w-[200px]">
                      <SelectValue placeholder="Select a unit" />
                    </SelectTrigger>

                    <SelectContent>
                      {UNITS.map((unit) => (
                        <SelectItem key={unit.value} value={unit.value}>
                          {unit.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />

              {errors.unit && (
                <p className="text-sm text-destructive">
                  {errors.unit.message}
                </p>
              )}
            </div>

            {/* Custom Unit */}
            {selectedUnit === "Other" && (
              <div className="flex-1 space-y-2">
                <Label htmlFor="customUnit">Custom Unit</Label>

                <Input
                  id="customUnit"
                  placeholder="Enter custom unit"
                  {...register("customUnit")}
                />

                {errors.customUnit && (
                  <p className="text-sm text-destructive">
                    {errors.customUnit.message}
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Initial + Minimum Stock */}
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="initialStock">Initial Stock</Label>

              <Input
                id="initialStock"
                type="number"
                step="0.001"
                placeholder="25"
                {...register("initialStock")}
              />

              {errors.initialStock && (
                <p className="text-sm text-destructive">
                  {errors.initialStock.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="minimumStock">Minimum Stock</Label>

              <Input
                id="minimumStock"
                type="number"
                step="0.001"
                placeholder="10"
                {...register("minimumStock")}
              />

              {errors.minimumStock && (
                <p className="text-sm text-destructive">
                  {errors.minimumStock.message}
                </p>
              )}
            </div>
          </div>

          {/* Maximum Stock */}
          <div className="space-y-2">
            <Label htmlFor="maximumStock">Maximum Stock</Label>

            <Input
              id="maximumStock"
              type="number"
              step="0.001"
              placeholder="100"
              {...register("maximumStock")}
            />
          </div>

          {/* Expiry Date */}
          <div className="space-y-2">
            <Label htmlFor="expiryDate">Expiry Date</Label>

            <Input id="expiryDate" type="date" {...register("expiryDate")} />
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex justify-end gap-3">
        <Button type="button" variant="outline">
          Cancel
        </Button>

        <Button type="submit">Save Product</Button>
      </div>
    </form>
  );
}
