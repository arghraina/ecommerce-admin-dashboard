"use client";

import Image from "next/image";
import Link from "next/link";

export default function ProductRow({ product, onDelete }) {
  return (
    <tr className="border-t">
      <td className="p-3">
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            width={50}
            height={50}
            className="rounded object-cover"
          />
        ) : (
          <div className="w-12 h-12 bg-gray-200 flex items-center justify-center text-xs">
            No Image
          </div>
        )}
      </td>

      <td className="p-3">{product.name}</td>
      <td className="p-3">{product.category}</td>
      <td className="p-3">₹ {product.price}</td>

      <td
        className={`p-3 ${
          product.stock <= 5 ? "text-red-600 font-bold" : ""
        }`}
      >
        {product.stock}
      </td>

      <td className="p-3 flex gap-3">
        <Link
          href={`/products/${product._id}/edit`}
          className="bg-yellow-500 text-white px-3 py-1 rounded"
        >
          Edit
        </Link>

        <button
          onClick={() => onDelete(product._id)}
          className="bg-red-600 text-white px-3 py-1 rounded"
        >
          Delete
        </button>
      </td>
    </tr>
  );
}
