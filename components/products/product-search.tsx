"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type ProductSearchProps = {
  categories: {
    id: string;
    name: string;
  }[];
};

export function ProductSearch({ categories }: ProductSearchProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const search = searchParams.get("search") ?? "";
  const category = searchParams.get("category") ?? "";

  const handleSearch = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value.trim()) {
      params.set("search", value);
    } else {
      params.delete("search");
    }

    router.replace(`${pathname}?${params.toString()}`);
  };

  const handleCategoryChange = (value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set("category", value);
    } else {
      params.delete("category");
    }

    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      <Input
        placeholder="Search products..."
        value={search}
        onChange={(event) => handleSearch(event.target.value)}
        className="max-w-sm"
      />

      <Select value={category} onValueChange={handleCategoryChange}>
        <SelectTrigger className="w-48">
          <SelectValue placeholder="All Categories">
            {categories.find((item) => item.id === category)?.name}
          </SelectValue>
        </SelectTrigger>

        <SelectContent>
          {categories.map((item) => (
            <SelectItem key={item.id} value={item.id}>
              {item.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
