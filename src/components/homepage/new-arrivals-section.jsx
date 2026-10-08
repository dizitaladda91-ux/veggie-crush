import { connectCatalog, Combo, Product } from "@/lib/catalog";
import NewArrivals from "@/components/homepage/new-arrivals";

export const dynamic = "force-dynamic";

export default async function NewArrivalsSection() {
  let products = [];
  let comboGroups = [];
  let errorMessage = "";

  try {
    await connectCatalog();
    const [productRecords, ...fetchedComboGroups] = await Promise.all([
      Product.find({ isActive: true })
        .sort({ createdAt: -1, code: 1 })
        .limit(2)
        .select("_id code name shortName slug price mrp size images")
        .lean(),
      ...[
        { packSize: 2, title: "Double Combos" },
        { packSize: 3, title: "Triple Combos" },
        { packSize: 4, title: "Quad Combos" },
      ].map(({ packSize }) => Combo.find({ isActive: true, packSize })
        .sort({ code: 1 })
        .limit(2)
        .populate("products", "name shortName")
        .lean()),
    ]);

    products = productRecords.map((product) => ({
      id: String(product._id),
      code: product.code,
      name: product.name,
      shortName: product.shortName,
      slug: product.slug,
      price: product.price,
      mrp: product.mrp,
      size: product.size,
      images: product.images || [],
    }));
    comboGroups = fetchedComboGroups.map((records, index) => ({
      title: ["Double Combos", "Triple Combos", "Quad Combos"][index],
      combos: records.map((combo) => ({
        id: String(combo._id),
        code: combo.code,
        name: combo.name,
        slug: combo.slug,
        packSize: combo.packSize,
        products: (combo.products || []).filter(Boolean).map((product) => ({
          name: product.name,
          shortName: product.shortName,
        })),
        bundlePrice: combo.bundlePrice,
        images: combo.images || [],
      })),
    }));

  } catch (error) {
    console.error("Homepage New Arrivals catalog query failed:", error);
    errorMessage = "New arrivals could not be loaded. Please check the catalog database connection and try again.";
  }

  return <NewArrivals products={products} comboGroups={comboGroups} error={errorMessage} />;
}
