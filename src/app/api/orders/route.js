import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        { error: "Authentication required to view orders." },
        { status: 401 }
      );
    }
    if (user.role !== "CUSTOMER" || !/^[a-f\d]{24}$/i.test(user.id)) {
      return NextResponse.json({ error: "A customer account is required." }, { status: 403 });
    }

    const orders = await prisma.order.findMany({
      where: { userId: user.id },
      include: {
        items: true,
        address: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ orders });
  } catch (error) {
    console.error("Error fetching user orders:", error);
    return NextResponse.json(
      { error: "Unable to retrieve orders" },
      { status: 500 }
    );
  }
}
