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

export async function POST(request) {
  try {
    const { name, image } = await request.json();
    if (!name) {
      return NextResponse.json({ error: "Category name is required" }, { status: 400 });
    }
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");

    try {
      const category = await prisma.category.create({
        data: {
          name,
          slug,
          image: image || null,
        },
      });
      return NextResponse.json({ success: true, category });
    } catch {
      const mockCategory = {
        id: `cat_${Date.now()}`,
        name,
        slug,
        image: image || null,
        _count: { products: 0 },
      };
      FALLBACK_CATEGORIES.push(mockCategory);
      return NextResponse.json({ success: true, category: mockCategory });
    }
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
