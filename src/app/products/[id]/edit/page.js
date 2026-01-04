import { redirect } from "next/navigation";

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL;

async function getProduct(id) {
  const res = await fetch(`${BASE_URL}/api/products/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch product");

  return res.json();
}

export default async function EditProductPage({ params }) {
  const { id } = await params;
  const product = await getProduct(id);

  async function updateProduct(formData) {
    "use server";

    await fetch(`${BASE_URL}/api/products/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: formData.get("name"),
        category: formData.get("category"),
        price: Number(formData.get("price")),
        stock: Number(formData.get("stock")),
        image: formData.get("image"),
      }),
    });

    redirect("/products");
  }

  return (
    <div className="p-8 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Edit Product</h1>

      <form action={updateProduct} className="flex flex-col gap-4">
        <input name="name" defaultValue={product.name} className="border p-2" />
        <input name="category" defaultValue={product.category} className="border p-2" />
        <input name="price" type="number" defaultValue={product.price} className="border p-2" />
        <input name="stock" type="number" defaultValue={product.stock} className="border p-2" />
        <input name="image" defaultValue={product.image} className="border p-2" />

        <button className="bg-green-600 text-white py-2 rounded font-bold">
          Update Product
        </button>
      </form>
    </div>
  );
}
