import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

const FALLBACK_CATEGORIES = [
  { id: "1", name: "VeggieCrush Wellness", slug: "veggiecrush-wellness", _count: { products: 6 } },
  { id: "2", name: "Leafy Greens", slug: "leafy-greens", _count: { products: 4 } },
  { id: "3", name: "Root Vegetables", slug: "root-vegetables", _count: { products: 3 } },
  { id: "4", name: "Herbs & Immunity", slug: "herbs-immunity", _count: { products: 5 } },
];

export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      include: {
        _count: {
          select: { products: true },
        },
      },
      orderBy: { name: "asc" },
    });

    return NextResponse.json({
      categories: categories.length > 0 ? categories : FALLBACK_CATEGORIES,
    });
  } catch (error) {
    console.error("Categories fetch error:", error.message);
    return NextResponse.json({ categories: FALLBACK_CATEGORIES });
  }
}
