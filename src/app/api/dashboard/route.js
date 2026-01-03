import connectDB from "@/lib/mongodb";
import Product from "@/models/Product";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDB();

  // Total products
  const totalProducts = await Product.countDocuments();

  // Products grouped by category
  const categoryStats = await Product.aggregate([
    {
      $group: {
        _id: "$category",
        stock: { $sum: 1 }
      }
    }
  ]);

  // Total categories
  const totalCategories = categoryStats.length;

  return NextResponse.json({
    totalProducts,
    totalCategories,
    categoryStats
  });
}
