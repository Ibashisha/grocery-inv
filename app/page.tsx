import { db } from "@/db";
import { categories } from "@/db/schema";

export default async function Home() {
  const categoryList = await db.select().from(categories);

  return (
    <main className="min-h-screen p-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-3xl font-bold">Grocin</h1>

        <p className="mt-2 text-gray-600">Database connection test</p>

        <div className="mt-8 rounded-lg border">
          <div className="border-b p-4">
            <h2 className="font-semibold">Categories</h2>
          </div>

          {categoryList.length === 0 ? (
            <p className="p-4 text-gray-500">No categories found.</p>
          ) : (
            <div className="divide-y">
              {categoryList.map((category) => (
                <div key={category.id} className="p-4">
                  <p className="font-medium">{category.name}</p>

                  {category.description && (
                    <p className="text-sm text-gray-500">
                      {category.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
