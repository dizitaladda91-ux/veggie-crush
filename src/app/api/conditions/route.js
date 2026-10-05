import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

const FALLBACK_CONDITIONS = [
  { id: "1", name: "Diabetes Care", slug: "diabetes-care", _count: { products: 3 } },
  { id: "2", name: "Weight Management", slug: "weight-management", _count: { products: 4 } },
  { id: "3", name: "Immunity Booster", slug: "immunity-booster", _count: { products: 5 } },
  { id: "4", name: "Heart & Blood Pressure", slug: "heart-bp", _count: { products: 3 } },
];

export async function GET() {
  try {
    const conditions = await prisma.condition.findMany({
      include: {
        _count: {
          select: { products: true },
        },
      },
      orderBy: { name: "asc" },
    });

    return NextResponse.json({
      conditions: conditions.length > 0 ? conditions : FALLBACK_CONDITIONS,
    });
  } catch (error) {
    console.error("Conditions fetch error:", error.message);
    return NextResponse.json({ conditions: FALLBACK_CONDITIONS });
  }
}
