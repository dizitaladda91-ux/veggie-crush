import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST() {
  try {
    // Also sign out from Supabase if active
    try {
      const supabase = await createClient();
      if (supabase) await supabase.auth.signOut();
    } catch {
      // ignore
    }

    const response = NextResponse.json({
      success: true,
      message: "Signed out successfully.",
    });

    // Clear JWT token cookie
    response.cookies.set({
      name: "token",
      value: "",
      httpOnly: true,
      expires: new Date(0),
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Sign out error:", error);
    return NextResponse.json({ error: "Failed to sign out" }, { status: 500 });
  }
}
