import { cookies } from "next/headers";
import SEOAdminClient from "./seo-admin-client";
import { getBlogPosts } from "@/lib/blog-data";

export const metadata = {
  title: "SEO Admin Portal | VeggieCrush",
  description: "Create and manage blog posts for VeggieCrush SEO pages.",
};

export default async function SeoAdminPage() {
  const cookieStore = await cookies();
  const authenticated = cookieStore.get("seo_portal_auth")?.value === "authenticated";
  const posts = await getBlogPosts();

  return <SEOAdminClient authenticated={authenticated} initialPosts={posts} />;
}
