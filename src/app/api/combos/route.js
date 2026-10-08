import { NextResponse } from "next/server";
import { connectCatalog, Combo } from "@/lib/catalog";

export const dynamic = "force-dynamic";

export async function GET(request) {
  try {
    await connectCatalog();
    const { searchParams } = new URL(request.url);
    const packSizeValue = searchParams.get("packSize");
    const filter = { isActive: true };

    if (packSizeValue) {
      const packSize = Number(packSizeValue);
      if (![2, 3, 4].includes(packSize)) {
        return NextResponse.json({ error: "packSize must be 2, 3, or 4." }, { status: 400 });
      }
      filter.packSize = packSize;
    }

    const combos = await Combo.find(filter)
      .sort({ packSize: 1, code: 1 })
      .populate("products", "code name shortName slug price mrp size images")
      .lean();

    return NextResponse.json({
      combos: combos.map((combo) => ({
        id: String(combo._id),
        code: combo.code,
        name: combo.name,
        slug: combo.slug,
        packSize: combo.packSize,
        products: combo.products.map((product) => ({
          id: String(product._id),
          code: product.code,
          name: product.name,
          shortName: product.shortName,
          slug: product.slug,
          price: product.price,
          mrp: product.mrp,
          size: product.size,
          images: product.images,
        })),
        description: combo.description,
        keyBenefits: combo.keyBenefits,
        totalPrice: combo.totalPrice,
        totalMrp: combo.totalMrp,
        bundleDiscountPercent: combo.bundleDiscountPercent,
        bundlePrice: combo.bundlePrice,
        images: combo.images,
      })),
    });
  } catch (error) {
    console.error("Error fetching catalog combos:", error);
    return NextResponse.json({ error: "Unable to load combos" }, { status: 500 });
  }
}
