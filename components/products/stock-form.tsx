"use client";

import { useForm, Controller, useWatch } from "react-hook-form";
import { useRouter } from "next/navigation";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { adjustStock } from "@/app/products/actions";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { STOCK_REASONS } from "./dummy-data";

const stockSchema = z
  .object({
    type: z.enum(["ADD", "REMOVE", "SET"]),
    quantity: z
      .string()
      .min(1, "Quantity is required")
      .refine((value) => Number(value) > 0, {
        message: "Quantity must be greater than 0",
      }),
    reason: z.string().min(1, "Reason is required"),
    customReason: z.string().optional(),
  })
  .refine((data) => data.reason !== "Other" || !!data.customReason?.trim(), {
    message: "Please enter a custom reason",
    path: ["customReason"],
  });

type StockFormValues = z.infer<typeof stockSchema>;

type StockFormProps = {
  product: {
    id: string;
    name: string;
    sku: string;
    unit: string;
    currentStock: string;
  };
};

export function StockForm({ product }: StockFormProps) {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<StockFormValues>({
    resolver: zodResolver(stockSchema),
    defaultValues: {
      type: "ADD",
      quantity: "",
      reason: "",
      customReason: "",
    },
  });

  const onSubmit = async (data: StockFormValues) => {
    setServerError(null);

    const reason =
      data.reason === "Other" ? (data.customReason?.trim() ?? "") : data.reason;

    const result = await adjustStock(product.id, {
      type: data.type,
      quantity: data.quantity,
      reason,
    });

    if (!result.success) {
      setServerError(result.error);
      return;
    }

    router.push("/products");
  };

  const selectedReason = useWatch({
    control,
    name: "reason",
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="rounded-lg border p-6">
        <div className="space-y-2">
          <h2 className="text-xl font-semibold">{product.name}</h2>

          <p className="text-sm text-muted-foreground">SKU: {product.sku}</p>

          <p className="text-lg font-medium">
            Current Stock: {Number(product.currentStock).toString()}{" "}
            {product.unit}
          </p>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="type">Adjustment Type</Label>

        <Controller
          name="type"
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
              <SelectTrigger id="type">
                <SelectValue placeholder="Select adjustment type" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="ADD">Add Stock</SelectItem>

                <SelectItem value="REMOVE">Remove Stock</SelectItem>

                <SelectItem value="SET">Set Stock</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="quantity">Quantity</Label>

        <Input
          id="quantity"
          type="number"
          step="0.001"
          min="0"
          placeholder="Enter quantity"
          {...register("quantity")}
        />

        {errors.quantity && (
          <p className="text-sm text-destructive">{errors.quantity.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="reason">Reason</Label>

        <Controller
          name="reason"
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
              <SelectTrigger id="reason">
                <SelectValue placeholder="Select a reason" />
              </SelectTrigger>

              <SelectContent>
                {STOCK_REASONS.map((reason) => (
                  <SelectItem key={reason.value} value={reason.value}>
                    {reason.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        {errors.reason && (
          <p className="text-sm text-destructive">{errors.reason.message}</p>
        )}
        {selectedReason === "Other" && (
          <div className="space-y-2">
            <Label htmlFor="customReason">Custom Reason</Label>

            <Input
              id="customReason"
              placeholder="Enter reason"
              {...register("customReason")}
            />
            {errors.customReason && (
              <p className="text-sm text-destructive">
                {errors.customReason.message}
              </p>
            )}
          </div>
        )}
      </div>

      {serverError && <p className="text-sm text-destructive">{serverError}</p>}

      <div className="flex justify-end gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/products")}
        >
          Cancel
        </Button>

        <Button type="submit">Update Stock</Button>
      </div>
    </form>
  );
}
