import { connectCatalog, Combo } from "@/lib/catalog";
import ComboCard from "@/components/products/combo-card";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Wellness Combos | VeggieCrush",
  description: "Shop curated VeggieCrush wellness product combos.",
};

export default async function CombosPage() {
  await connectCatalog();
  const combos = await Combo.find({ isActive: true })
    .sort({ packSize: 1, code: 1 })
    .populate("products", "name shortName")
    .lean();

  return (
    <main className="min-h-screen bg-white px-6 py-12 lg:px-10">
      <div className="mx-auto max-w-[1440px]">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#5C8E42]">Curated wellness bundles</p>
        <h1 className="mt-2 text-3xl font-extrabold text-[#173719] sm:text-4xl">Shop all combos</h1>
        <p className="mt-3 max-w-2xl text-[#667E6A]">
          Thoughtfully paired products at a bundle price. Hover over a card to see its alternate image.
        </p>
        {combos.length ? (
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {combos.map((combo) => (
              <ComboCard
                key={String(combo._id)}
                combo={{
                  id: String(combo._id),
                  code: combo.code,
                  name: combo.name,
                  bundlePrice: combo.bundlePrice,
                  images: combo.images || [],
                  products: combo.products.map((product) => ({
                    name: product.name,
                    shortName: product.shortName,
                  })),
                }}
              />
            ))}
          </div>
        ) : (
          <p className="mt-10 text-sm text-[#667E6A]">No wellness combos are available right now.</p>
        )}
      </div>
    </main>
  );
}
