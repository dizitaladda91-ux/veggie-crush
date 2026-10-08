import { cookies, headers } from "next/headers";
import { verifyJWT } from "./jwt";
import { prisma } from "./prisma";
import { createClient as createSupabaseClient } from "./supabase/server";

/**
 * Gets the currently authenticated user from JWT cookie or Bearer token header.
 * Falls back to Supabase auth session if present.
 * Returns null if the user is unauthenticated.
 */
export async function getCurrentUser() {
  try {
    const cookieStore = await cookies();
    let token = cookieStore.get("token")?.value;

    if (!token) {
      const headerList = await headers();
      const authHeader = headerList.get("authorization");
      if (authHeader && authHeader.startsWith("Bearer ")) {
        token = authHeader.substring(7);
      }
    }

    // 1. Verify via native JWT
    if (token) {
      const payload = await verifyJWT(token);
      if (payload) {
        const envAdminEmail = (process.env.ADMIN_EMAIL || "admin@veggiecrush.com").toLowerCase().trim();
        const isAdmin =
          payload.role === "ADMIN" ||
          (payload.email && payload.email.toLowerCase().trim() === envAdminEmail);

        if (payload.userId) {
          try {
            const user = await prisma.user.findUnique({
              where: { id: payload.userId },
              select: {
                id: true,
                email: true,
                name: true,
                phone: true,
                role: true,
                createdAt: true,
              },
            });
            if (user) {
              if (isAdmin) user.role = "ADMIN";
              return user;
            }
          } catch (dbErr) {
            console.warn("DB lookup in getCurrentUser fallback:", dbErr.message);
          }
        }

        // Return user from valid token payload (guarantees admin session even if DB was slow)
        if (isAdmin || payload.userId) {
          return {
            id: payload.userId || "admin-root-id",
            email: payload.email,
            name: payload.name || (isAdmin ? "Administrator" : "User"),
            phone: payload.phone || null,
            role: isAdmin ? "ADMIN" : (payload.role || "USER"),
            createdAt: new Date().toISOString(),
          };
        }
      }
    }

    // 2. Fallback to Supabase auth if configured
    try {
      const supabase = await createSupabaseClient();
      if (supabase) {
        const {
          data: { user: authUser },
        } = await supabase.auth.getUser();

        if (authUser) {
          const user = await prisma.user.findFirst({
            where: {
              OR: [{ authId: authUser.id }, { email: authUser.email }],
            },
            select: {
              id: true,
              email: true,
              name: true,
              phone: true,
              role: true,
              createdAt: true,
            },
          });
          if (user) return user;
        }
      }
    } catch {
      // Supabase not configured or failed, ignore
    }

    return null;
  } catch (error) {
    console.error("Error in getCurrentUser:", error);
    return null;
  }
}
