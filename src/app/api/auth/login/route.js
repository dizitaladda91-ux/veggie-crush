import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { comparePassword, hashPassword, signJWT } from "@/lib/jwt";

export const dynamic = "force-dynamic";

export async function POST(request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required." },
        { status: 400 }
      );
    }

    const normalizedEmail = email.toLowerCase().trim();
    const inputPassword = String(password).trim();

    // 1. Check Admin credentials from .env
    const envAdminEmail = (process.env.ADMIN_EMAIL || "admin@veggiecrush.com").toLowerCase().trim();
    const envAdminPass = (process.env.ADMIN_PASSWORD || "admin123").trim();

    const isEnvAdminMatch =
      normalizedEmail === envAdminEmail &&
      inputPassword === envAdminPass;

    if (isEnvAdminMatch) {
      let adminUser = null;
      try {
        adminUser = await prisma.user.findUnique({
          where: { email: normalizedEmail },
        });

        if (!adminUser) {
          const hashedPassword = await hashPassword(inputPassword);
          adminUser = await prisma.user.create({
            data: {
              email: normalizedEmail,
              password: hashedPassword,
              name: "Administrator",
              role: "ADMIN",
            },
          });
        } else if (adminUser.role !== "ADMIN") {
          adminUser = await prisma.user.update({
            where: { id: adminUser.id },
            data: { role: "ADMIN" },
          });
        }
      } catch (dbErr) {
        console.warn("DB user sync during admin login:", dbErr.message);
      }

      const userId = adminUser?.id || "admin-root-id";
      const token = await signJWT({
        userId,
        email: normalizedEmail,
        name: adminUser?.name || "Administrator",
        role: "ADMIN",
      });

      const response = NextResponse.json({
        success: true,
        message: "Logged in as Administrator.",
        user: {
          id: userId,
          email: normalizedEmail,
          name: adminUser?.name || "Administrator",
          role: "ADMIN",
        },
      });

      response.cookies.set({
        name: "token",
        value: token,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 7 days
      });

      return response;
    }

    // 2. Normal customer lookup in database
    const user = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (!user || !user.password) {
      return NextResponse.json(
        { error: "Invalid email or password." },
        { status: 401 }
      );
    }

    // Verify password hash
    const isValid = await comparePassword(inputPassword, user.password);
    if (!isValid) {
      return NextResponse.json(
        { error: "Invalid email or password." },
        { status: 401 }
      );
    }

    // Sign JWT token for customer
    const token = await signJWT({
      userId: user.id,
      email: user.email,
      name: user.name,
      role: user.role || "USER",
    });

    const response = NextResponse.json({
      success: true,
      message: "Logged in successfully.",
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        phone: user.phone,
        role: user.role || "USER",
      },
    });

    // Set secure httpOnly cookie
    response.cookies.set({
      name: "token",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Authentication failed. Please try again." },
      { status: 500 }
    );
  }
}
