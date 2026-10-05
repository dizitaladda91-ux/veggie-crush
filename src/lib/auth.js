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
      if (payload && payload.userId) {
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
        if (user) return user;
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
