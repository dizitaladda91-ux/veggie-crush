import { createBrowserClient } from "@supabase/ssr";

let browserClientInstance = null;

export function createClient() {
  if (browserClientInstance) return browserClientInstance;

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return null;
  }

  browserClientInstance = createBrowserClient(supabaseUrl, supabaseKey);
  return browserClientInstance;
}
