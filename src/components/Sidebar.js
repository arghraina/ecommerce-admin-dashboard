import Link from "next/link";

export default function Sidebar() {
  return (
    <div className="w-64 bg-slate-900 text-white min-h-screen p-6 flex flex-col gap-4">
      <h2 className="text-xl font-bold mb-6 text-blue-400">Admin Panel</h2>
      <Link href="/" className="hover:text-blue-300 transition">Dashboard</Link>
      <Link href="/products" className="hover:text-blue-300 transition">Products List</Link>
      <Link href="/products/new" className="hover:text-blue-300 transition">Add Product</Link>
    </div>
  );
}