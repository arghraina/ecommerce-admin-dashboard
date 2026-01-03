"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewProduct() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(0);
  const [imageUrl, setImageUrl] = useState("");
  const [uploading, setUploading] = useState(false); // track upload
  const router = useRouter();

  // Cloudinary upload
  const handleUpload = () => {
    setUploading(true);
    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: "your_cloud_name", // REPLACE
        uploadPreset: "my_unsigned_preset", // REPLACE
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          setImageUrl(result.info.secure_url);
          setUploading(false);
        }
      }
    );
    widget.open();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure price and stock are numbers
    const payload = {
      name,
      description,
      price: Number(price),
      category,
      stock: Number(stock),
      image: imageUrl,
    };

    console.log("Submitting product:", payload); // debug

    const response = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      // Ensure ProductsPage fetches updated data
      router.push("/products");
      router.refresh();
    } else {
      alert("Failed to save product");
    }
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Add New Product</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-black">
        <input
          type="text"
          placeholder="Product Name"
          className="border p-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          className="border p-2"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="number"
          placeholder="Price"
          className="border p-2"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Category"
          className="border p-2"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Stock Quantity"
          className="border p-2"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          required
        />

        {/* Cloudinary Upload */}
        <button
          type="button"
          onClick={handleUpload}
          className="bg-gray-200 p-2 rounded border border-dashed border-gray-400"
        >
          {imageUrl ? "Image Uploaded! ✅" : uploading ? "Uploading..." : "Upload Product Image"}
        </button>

        {/* Submit button disabled until image is uploaded */}
        <button
          type="submit"
          className={`bg-green-600 text-white py-2 rounded font-bold ${
            uploading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={uploading}
        >
          Save Product
        </button>
      </form>
    </div>
  );
}
