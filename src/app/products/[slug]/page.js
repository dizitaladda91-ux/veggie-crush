import Link from "next/link";
import { notFound } from "next/navigation";
import ProductGallery from "@/components/products/product-gallery";
import ProductActionButtons from "@/components/products/product-action-buttons";
import { prisma } from "@/lib/prisma";

const PRODUCT_IMAGES = {
  beetroot: ["/products/beetroot_1.webp", "/products/beetroot_2.webp", "/products/beetroot_3.webp", "/products/beetroot_4.webp"],
  gooseberry: ["/products/goosberry_1.webp", "/products/goosberry_2.webp", "/products/goosberry_3.webp", "/products/goosberry_4.webp"],
  moringa: ["/products/moringa_1.webp", "/products/moringa_2.webp", "/products/moringa_3.webp", "/products/moringa_4.webp"],
  neem: ["/products/neem_1.webp", "/products/neem_2.webp", "/products/neem_3.webp", "/products/neem_4.webp"],
  everfit: ["/products/everfit_1.webp", "/products/everfit_2.webp", "/products/everfit_3.webp", "/products/everfit_4.webp"],
  "giloy powder": ["/products/giloy_1.webp", "/products/giloy_2.webp", "/products/giloy_3.webp", "/products/giloy_4.webp"],
};

export default async function ProductDetailPage({ params }) {
  const { slug } = await params;

  const product = await prisma.product.findUnique({
    where: { slug },
    include: {
      variants: {
        where: { isActive: true },
        orderBy: { price: "asc" },
      },
    },
  });

  if (!product) {
    notFound();
  }

  const mainVariant = product.variants[0];
  const images = product.images?.length ? product.images : PRODUCT_IMAGES[product.name.toLowerCase()] || ["/products/beetroot_1.webp"];
  const price = mainVariant ? mainVariant.price / 100 : 0;
  const mrp = mainVariant ? mainVariant.mrp / 100 : 0;
  const discount = mrp > 0 ? Math.round(((mrp - price) / mrp) * 100) : 0;

  return (
    <main style={{ backgroundColor: "#FBF7EC" }} className="min-h-screen px-6 py-12 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <Link href="/" className="mb-8 inline-block text-sm font-semibold" style={{ color: "#1E4620" }}>
          ← Back to home
        </Link>

        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] items-start">
          <ProductGallery productName={product.name} images={images} />

          <aside className="rounded-[28px] border p-6 sm:p-8" style={{ backgroundColor: "#FBF7EC", borderColor: "#E7DCC2" }}>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em]" style={{ color: "#6FAE3E" }}>
              VeggieCrush
            </p>

            <h1 className="text-3xl font-extrabold leading-tight" style={{ color: "#1E4620" }}>
              {product.name}
            </h1>

            <div className="mt-4 flex items-center gap-2 text-sm" style={{ color: "#4B5443" }}>
              <span className="font-semibold">{mainVariant?.label || "Standard"}</span>
              <span>•</span>
              <span>{discount}% OFF</span>
            </div>

            <div className="mt-6 flex items-end gap-3">
              <span className="text-4xl font-black" style={{ color: "#1E4620" }}>
                ₹{price}
              </span>
              {mrp > 0 && (
                <span className="mb-1 text-lg line-through" style={{ color: "#8B8064" }}>
                  ₹{mrp}
                </span>
              )}
            </div>

            <div className="mt-6 rounded-2xl border p-4" style={{ backgroundColor: "#F0E8D6", borderColor: "#E7DCC2" }}>
              <p className="text-base font-semibold mb-2" style={{ color: "#1E4620" }}>
                Product description
              </p>
              <p className="text-sm leading-7" style={{ color: "#4B5443" }}>
                {product.description || "No description available for this product yet."}
              </p>
            </div>

            <ProductActionButtons
              product={{ id: product.id, name: product.name, startingAt: product.startingAt }}
              mainVariant={mainVariant}
              image={images[0]}
            />
          </aside>
        </div>
      </div>
    </main>
  );
}
