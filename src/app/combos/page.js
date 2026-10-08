import { connectCatalog, Combo, Product } from "@/lib/catalog";
import ComboCatalog from "@/app/combos/combo-catalog";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Wellness Combos | VeggieCrush",
  description: "Shop curated VeggieCrush wellness product combos.",
};

export default async function CombosPage() {
  await connectCatalog();
  const [productRecords, comboRecords] = await Promise.all([
    Product.find({ isActive: true })
      .sort({ createdAt: -1, code: 1 })
      .select("_id code name shortName slug price mrp size images")
      .lean(),
    Combo.find({
      $or: [{ isActive: true }, { isActive: { $exists: false } }],
    })
      .sort({ packSize: 1, code: 1 })
      .populate("products", "name shortName")
      .lean(),
  ]);

  const products = productRecords.map((product) => ({
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
  const combos = comboRecords.map((combo) => ({
    id: String(combo._id),
    code: combo.code,
    name: combo.name,
    slug: combo.slug,
    packSize: combo.packSize,
    bundlePrice: combo.bundlePrice,
    images: combo.images || [],
    products: (combo.products || []).filter(Boolean).map((product) => ({
      name: product.name,
      shortName: product.shortName,
    })),
  }));
  const comboCodes = new Set(combos.map((combo) => combo.code?.trim().toUpperCase()).filter(Boolean));
  const comboSlugs = new Set(combos.map((combo) => combo.slug?.trim().toLowerCase()).filter(Boolean));
  const comboNames = new Set(combos.map((combo) => combo.name?.trim().toLowerCase()).filter(Boolean));
  const standaloneProducts = products.filter((product) =>
    !comboCodes.has(product.code?.trim().toUpperCase())
      && !comboSlugs.has(product.slug?.trim().toLowerCase())
      && !comboNames.has(product.name?.trim().toLowerCase()),
  );

  return (
    <main className="min-h-screen bg-white px-6 py-12 lg:px-10">
      <div className="mx-auto max-w-[1440px]">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#5C8E42]">Curated wellness bundles</p>
        <h1 className="mt-2 text-3xl font-extrabold text-[#173719] sm:text-4xl">Shop all combos</h1>
        <p className="mt-3 max-w-2xl text-[#667E6A]">
          Shop single products or explore thoughtfully paired double, triple, and quad combos.
        </p>
        <ComboCatalog products={standaloneProducts} combos={combos} />
      </div>
    </main>
  );
}
