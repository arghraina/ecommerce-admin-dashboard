import connectDB from "@/lib/mongodb";
import Product from "@/models/Product";
import { NextResponse } from "next/server";

// GET all products
export async function GET() {
  await connectDB();
  const products = await Product.find().sort({ createdAt: -1 });
  return NextResponse.json(products);
}

// POST new product
export async function POST(request) {
  await connectDB();
  const body = await request.json();
  const newProduct = await Product.create(body);
  return NextResponse.json(newProduct, { status: 201 });
}
