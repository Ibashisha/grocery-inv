"use client";

import Link from "next/link";
import { useTransition } from "react";

import { Button } from "@/components/ui/button";
import { toggleCategoryStatus } from "@/app/categories/action";

type CategoryActionsProps = {
  id: string;
  isActive: boolean;
};

export function CategoryActions({ id, isActive }: CategoryActionsProps) {
  const [isPending, startTransition] = useTransition();

  const handleToggle = () => {
    startTransition(async () => {
      await toggleCategoryStatus(id, !isActive);
    });
  };

  return (
    <div className="flex items-center gap-2">
      <Link
        href={`/categories/${id}/edit`}
        className="inline-flex h-8 items-center justify-center rounded-md border px-3 text-sm font-medium transition-colors hover:bg-muted"
      >
        Edit
      </Link>

      <Button
        variant={isActive ? "outline" : "default"}
        size="sm"
        onClick={handleToggle}
        disabled={isPending}
      >
        {isPending ? "Saving..." : isActive ? "Deactivate" : "Activate"}
      </Button>
    </div>
  );
}
