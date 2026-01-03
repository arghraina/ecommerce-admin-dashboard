"use client";
import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";

export default function Dashboard() {
  const [data, setData] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalCategories, setTotalCategories] = useState(0);
  const [lowStockItems, setLowStockItems] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/products");
      const products = await res.json();

      setTotalProducts(products.length);
      const categoriesSet = new Set(products.map(p => p.category));
      setTotalCategories(categoriesSet.size);

      const lowStock = products.filter(p => p.stock <= 5).length;
      setLowStockItems(lowStock);

      // Aggregate data for chart
      const categoryMap = {};
      products.forEach(p => {
        if (!categoryMap[p.category]) categoryMap[p.category] = 0;
        categoryMap[p.category] += 1;
      });
      const chartData = Object.keys(categoryMap).map(key => ({
        name: key,
        stock: categoryMap[key]
      }));
      setData(chartData);
    };

    fetchData();
  }, []);

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <p className="text-gray-500">Total Products</p>
          <h2 className="text-3xl font-bold text-blue-600">{totalProducts}</h2>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <p className="text-gray-500">Total Categories</p>
          <h2 className="text-3xl font-bold text-green-600">{totalCategories}</h2>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <p className="text-gray-500">Low Stock Items</p>
          <h2 className="text-3xl font-bold text-red-600">{lowStockItems}</h2>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border h-96">
        <h2 className="text-xl font-semibold mb-6 text-gray-700">Products by Category</h2>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="stock" fill="#3b82f6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
