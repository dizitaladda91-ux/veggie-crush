import { createClient } from "./supabase/server";
import { prisma } from "./prisma";

/**
 * Gets the currently authenticated user from the Supabase session,
 * and ensures a synchronized record exists in the Prisma User database.
 * Returns null if the user is not authenticated.
 */
export async function getCurrentUser() {
  try {
    const supabase = await createClient();
    if (!supabase) return null;

    const {
      data: { user: authUser },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !authUser) {
      return null;
    }

    // Upsert into Prisma User database so relation queries (Orders, Wishlist, Address) work seamlessly
    const user = await prisma.user.upsert({
      where: { id: authUser.id },
      update: {
        email: authUser.email || "",
        name: authUser.user_metadata?.full_name || authUser.user_metadata?.name || undefined,
        phone: authUser.phone || authUser.user_metadata?.phone || undefined,
      },
      create: {
        id: authUser.id,
        email: authUser.email || "",
        name: authUser.user_metadata?.full_name || authUser.user_metadata?.name || null,
        phone: authUser.phone || authUser.user_metadata?.phone || null,
      },
    });

    return user;
  } catch (error) {
    console.error("Error in getCurrentUser:", error);
    return null;
  }
}
