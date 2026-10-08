import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function PATCH(request) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return NextResponse.json({ error: "Sign in to update your profile." }, { status: 401 });
    }
    if (currentUser.role !== "CUSTOMER" || !/^[a-f\d]{24}$/i.test(currentUser.id)) {
      return NextResponse.json({ error: "A customer account is required." }, { status: 403 });
    }

    const body = await request.json();
    if (!body || typeof body !== "object" || Array.isArray(body)) {
      return NextResponse.json({ error: "Profile details must be provided." }, { status: 400 });
    }
    const name = typeof body.name === "string" ? body.name.trim() : "";
    const phone = typeof body.phone === "string" ? body.phone.trim() : "";
    if (name.length < 2 || name.length > 100) {
      return NextResponse.json({ error: "Enter a name between 2 and 100 characters." }, { status: 400 });
    }
    if (phone && !/^[0-9+\s()-]{7,20}$/.test(phone)) {
      return NextResponse.json({ error: "Enter a valid contact number." }, { status: 400 });
    }

    const user = await prisma.user.update({
      where: { id: currentUser.id },
      data: { name, phone: phone || null },
      select: { id: true, email: true, name: true, phone: true, role: true, createdAt: true },
    });
    return NextResponse.json({ success: true, user });
  } catch (error) {
    console.error("Profile update error:", error);
    return NextResponse.json({ error: "Unable to update your profile." }, { status: 500 });
  }
}
