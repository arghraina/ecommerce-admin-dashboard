import ProductRow from "./ProductRow";
import Link from "next/link";
import { revalidatePath } from "next/cache";

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL;

async function getProducts() {
  const res = await fetch(`${BASE_URL}/api/products`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  return res.json();
}

async function deleteProduct(id) {
  "use server";

  const res = await fetch(`${BASE_URL}/api/products/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Failed to delete product");
  }

  revalidatePath("/products");
}

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className="p-8">
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Products</h1>
        <Link
          href="/products/new"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add New Product
        </Link>
      </div>

      <table className="min-w-full bg-white border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-3 text-left">Image</th>
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Category</th>
            <th className="p-3 text-left">Price</th>
            <th className="p-3 text-left">Stock</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>

        <tbody>
          {products.map((p) => (
            <ProductRow
              key={p._id}
              product={p}
              onDelete={deleteProduct}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
