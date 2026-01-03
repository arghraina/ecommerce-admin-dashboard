import connectDB from "@/lib/mongodb";
import Category from "@/models/Category";
import { NextResponse } from "next/server";

// GET all categories
export async function GET() {
  await connectDB();
  const categories = await Category.find().sort({ name: 1 });
  return NextResponse.json(categories);
}

// CREATE category
export async function POST(request) {
  await connectDB();
  const body = await request.json();

  const category = await Category.create(body);
  return NextResponse.json(category, { status: 201 });
}
