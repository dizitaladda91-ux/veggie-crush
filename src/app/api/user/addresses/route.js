import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    if (user.role !== "CUSTOMER" || !/^[a-f\d]{24}$/i.test(user.id)) {
      return NextResponse.json({ error: "A customer account is required." }, { status: 403 });
    }

    const addresses = await prisma.address.findMany({
      where: { userId: user.id },
      orderBy: [{ isDefault: "desc" }, { createdAt: "desc" }],
    });

    return NextResponse.json({ addresses });
  } catch (error) {
    console.error("Error fetching addresses:", error);
    return NextResponse.json({ error: "Failed to fetch addresses" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    if (user.role !== "CUSTOMER" || !/^[a-f\d]{24}$/i.test(user.id)) {
      return NextResponse.json({ error: "A customer account is required." }, { status: 403 });
    }

    const body = await request.json();
    if (!body || typeof body !== "object" || Array.isArray(body)) {
      return NextResponse.json({ error: "Address details must be provided." }, { status: 400 });
    }
    const { fullName, phone, line1, line2, city, state, pincode, label, isDefault } = body;

    if (![fullName, phone, line1, city, state, pincode].every((value) =>
      typeof value === "string" && value.trim())) {
      return NextResponse.json(
        { error: "Please provide all required address fields." },
        { status: 400 }
      );
    }
    if (fullName.trim().length > 100 || line1.trim().length > 200 ||
      (line2 && (typeof line2 !== "string" || line2.trim().length > 200)) ||
      !/^[0-9+()\s-]{7,20}$/.test(phone.trim()) || !/^\d{6}$/.test(pincode.trim())) {
      return NextResponse.json({ error: "Check the name, phone number, address, and 6-digit PIN code." }, { status: 400 });
    }

    // If setting as default, unmark other addresses
    if (isDefault) {
      await prisma.address.updateMany({
        where: { userId: user.id },
        data: { isDefault: false },
      });
    }

    const address = await prisma.address.create({
      data: {
        userId: user.id,
        fullName: fullName.trim(),
        phone: phone.trim(),
        line1: line1.trim(),
        line2: line2?.trim() || null,
        city: city.trim(),
        state: state.trim(),
        pincode: pincode.trim(),
        label: typeof label === "string" && label.trim() ? label.trim().slice(0, 40) : "Home",
        isDefault: Boolean(isDefault),
      },
    });

    return NextResponse.json({ success: true, address }, { status: 201 });
  } catch (error) {
    console.error("Error creating address:", error);
    return NextResponse.json({ error: "Failed to save address" }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    if (user.role !== "CUSTOMER" || !/^[a-f\d]{24}$/i.test(user.id)) {
      return NextResponse.json({ error: "A customer account is required." }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Address ID required" }, { status: 400 });
    }

    await prisma.address.deleteMany({
      where: { id, userId: user.id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting address:", error);
    return NextResponse.json({ error: "Failed to delete address" }, { status: 500 });
  }
}
