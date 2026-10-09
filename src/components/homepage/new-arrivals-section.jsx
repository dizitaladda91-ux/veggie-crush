import { connectCatalog, Combo, getProductImages, Product } from "@/lib/catalog";
import NewArrivals from "@/components/homepage/new-arrivals";
import { getProductComboPackSize, getProductComboParts } from "@/lib/combo-product";

export const dynamic = "force-dynamic";

export default async function NewArrivalsSection() {
  let products = [];
  let errorMessage = "";

  try {
    await connectCatalog();
    const [productRecords, comboRecords] = await Promise.all([
      Product.find({ isActive: true })
        .sort({ createdAt: -1, code: 1 })
        .select("_id code name shortName slug price mrp size images")
        .lean(),
      Combo.find({
        $or: [{ isActive: true }, { isActive: { $exists: false } }],
      })
        .sort({ createdAt: -1, packSize: 1, code: 1 })
        .populate("products", "name shortName slug size images")
        .lean(),
    ]);

    const allProducts = productRecords.map((product) => ({
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

    const storedCombos = comboRecords.map((combo) => {
      const includedProducts = (combo.products || []).filter(Boolean);
      const comboImages = Array.isArray(combo.images) ? combo.images.filter(Boolean) : [];

      return {
        id: String(combo._id),
        code: combo.code,
        name: combo.name,
        slug: combo.slug,
        packSize: combo.packSize,
        bundlePrice: combo.bundlePrice,
        images: comboImages.length
          ? comboImages
          : includedProducts.flatMap(getProductImages).slice(0, 4),
        products: includedProducts.map((product) => ({
          name: product.name,
          shortName: product.shortName,
        })),
      };
    });
    const storedCodes = new Set(storedCombos.map((combo) => combo.code?.trim().toUpperCase()).filter(Boolean));
    const storedSlugs = new Set(storedCombos.map((combo) => combo.slug?.trim().toLowerCase()).filter(Boolean));
    const storedNames = new Set(storedCombos.map((combo) => combo.name?.trim().toLowerCase()).filter(Boolean));
    const singleProducts = [];
    const generatedCombos = [];

    for (const product of allProducts) {
      const packSize = getProductComboPackSize(product);
      const duplicatesStoredCombo = storedCodes.has(product.code?.trim().toUpperCase())
        || storedSlugs.has(product.slug?.trim().toLowerCase())
        || storedNames.has(product.name?.trim().toLowerCase());

      if (!packSize) {
        if (!duplicatesStoredCombo) singleProducts.push(product);
        continue;
      }
      if (duplicatesStoredCombo) continue;

      generatedCombos.push({
        ...product,
        catalogProduct: true,
        packSize,
        bundlePrice: product.price,
        products: getProductComboParts(product).map((shortName) => ({ shortName })),
      });
    }

    products = singleProducts.slice(0, 2);
    const allCombos = [...storedCombos, ...generatedCombos];
    const combos = [2, 3, 4].flatMap((packSize) =>
      allCombos.filter((combo) => combo.packSize === packSize).slice(0, 2),
    );

    return <NewArrivals products={products} combos={combos} />;
  } catch (error) {
    console.error("Homepage New Arrivals catalog query failed:", error);
    errorMessage = "New arrivals could not be loaded. Please check the catalog database connection and try again.";
  }

  return <NewArrivals products={products} combos={[]} error={errorMessage} />;
}
