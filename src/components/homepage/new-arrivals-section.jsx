import { connectCatalog, getProductImages, Product } from "@/lib/catalog";
import NewArrivals from "@/components/homepage/new-arrivals";

export const dynamic = "force-dynamic";

export default async function NewArrivalsSection() {
  let products = [];
  let errorMessage = "";

  try {
    await connectCatalog();
    const productRecords = await Product.find({ isActive: true })
      .sort({ createdAt: -1, code: 1 })
      .limit(8)
      .select("_id code name shortName slug price mrp size images")
      .lean();

    products = productRecords.map((product) => ({
      id: String(product._id),
      code: product.code,
      name: product.name,
      shortName: product.shortName,
      slug: product.slug,
      price: product.price,
      mrp: product.mrp,
      size: product.size,
      images: getProductImages(product),
    }));

  } catch (error) {
    console.error("Homepage New Arrivals catalog query failed:", error);
    errorMessage = "New arrivals could not be loaded. Please check the catalog database connection and try again.";
  }

  return <NewArrivals products={products} error={errorMessage} />;
}
