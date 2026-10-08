import Link from "next/link";
import { notFound } from "next/navigation";
import { Check, Leaf, PackageCheck, ShieldCheck, Star, Truck } from "lucide-react";
import ProductGallery from "@/components/products/product-gallery";
import ProductActionButtons from "@/components/products/product-action-buttons";
import WishlistButton from "@/components/products/wishlist-button";
import { connectCatalog, Product } from "@/lib/catalog";

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

  await connectCatalog();
  const product = await Product.findOne({ slug, isActive: true }).lean();
  if (!product) notFound();

  const productId = String(product._id);
  const mainVariant = {
    id: `${productId}-standard`,
    label: product.size,
    price: Math.round(product.price * 100),
    mrp: Math.round(product.mrp * 100),
  };
  const productImages = product.images?.filter((image) => typeof image === "string" && image) || [];
  const images = productImages.length
    ? productImages
    : PRODUCT_IMAGES[product.slug] || ["/products/beetroot_1.webp"];
  const discount = product.mrp > 0
    ? Math.round(((product.mrp - product.price) / product.mrp) * 100)
    : 0;
  const savings = Math.max(0, product.mrp - product.price);
  const benefits = Array.isArray(product.keyBenefits) ? product.keyBenefits.filter(Boolean) : [];

  return (
    <main className="min-h-screen bg-white px-5 py-8 sm:px-8 lg:px-10 lg:py-12">
      <div className="mx-auto max-w-7xl">
        <nav aria-label="Breadcrumb" className="mb-7 text-sm text-[#7A8B6F]">
          <Link href="/" className="transition-colors hover:text-[#1E4620]">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/products" className="transition-colors hover:text-[#1E4620]">Shop</Link>
          <span className="mx-2">/</span>
          <span aria-current="page" className="font-semibold text-[#1E4620]">{product.name}</span>
        </nav>

        <section className="grid items-start gap-7 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
          <ProductGallery productName={product.name} images={images} />

          <div className="rounded-[28px] border border-[#E5E7EB] bg-white p-6 shadow-sm sm:p-8">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#F0F7E8] px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-[#376B26]">
                <Leaf size={13} />
                VeggieCrush
              </span>
              {product.bestseller && (
                <span className="rounded-full bg-[#FFF7E6] px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-[#986515]">
                  Customer favourite
                </span>
              )}
            </div>

            <h1 className="mt-4 text-3xl font-black leading-tight tracking-tight text-[#1E4620] sm:text-4xl">
              {product.name}
            </h1>

            <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-[#4B5443]">
              {product.rating > 0 ? (
                <span className="inline-flex items-center gap-1.5 font-semibold">
                  <Star size={16} fill="#E9A629" color="#E9A629" />
                  {Number(product.rating).toFixed(1)}
                  {product.reviewsCount > 0 && (
                    <span className="font-normal text-[#7A8B6F]">({product.reviewsCount} reviews)</span>
                  )}
                </span>
              ) : (
                <span className="text-[#7A8B6F]">A fresh pick from VeggieCrush</span>
              )}
              <span className="hidden text-[#D1D5DB] sm:inline">|</span>
              <span className="font-semibold">{product.size}</span>
              {product.code && <span className="text-xs text-[#7A8B6F]">SKU: {product.code}</span>}
            </div>

            <div className="mt-6 border-y border-[#E5E7EB] py-5">
              <div className="flex flex-wrap items-end gap-x-3 gap-y-1">
                <span className="text-4xl font-black tracking-tight text-[#1E4620]">₹{product.price}</span>
                {product.mrp > product.price && (
                  <>
                    <span className="mb-1 text-lg text-[#8B9288] line-through">₹{product.mrp}</span>
                    {discount > 0 && (
                      <span className="mb-1 rounded-full bg-[#F0F7E8] px-2.5 py-1 text-xs font-bold text-[#376B26]">
                        Save {discount}%
                      </span>
                    )}
                  </>
                )}
              </div>
              {savings > 0 && (
                <p className="mt-1 text-xs font-medium text-[#6B7280]">You save ₹{savings} on this pack</p>
              )}
              <p className="mt-2 text-xs text-[#7A8B6F]">Inclusive of all taxes</p>
            </div>

            <p className="mt-5 text-sm leading-7 text-[#4B5443]">
              {product.description || "Thoughtfully selected for your everyday kitchen and wellness routine."}
            </p>

            <div className="mt-5 flex items-center justify-between rounded-2xl bg-[#FAFBF9] px-4 py-3">
              <span className="text-sm font-semibold text-[#43513F]">Save this product for later</span>
              <WishlistButton productId={productId} className="h-10 w-10" />
            </div>

            {benefits.length > 0 && (
              <section aria-labelledby="benefits-heading" className="mt-6">
                <h2 id="benefits-heading" className="text-sm font-bold text-[#1E4620]">Why you&apos;ll love it</h2>
                <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                  {benefits.map((benefit, index) => (
                    <li key={`${benefit}-${index}`} className="flex items-start gap-2 text-sm leading-6 text-[#4B5443]">
                      <Check size={16} className="mt-1 shrink-0 text-[#6FAE3E]" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            <ProductActionButtons
              product={{ id: productId, slug: product.slug, name: product.name, startingAt: product.price }}
              mainVariant={mainVariant}
              image={images[0]}
            />

            <div className="mt-7 grid grid-cols-3 gap-2 border-t border-[#E5E7EB] pt-5 text-center">
              <div className="flex flex-col items-center gap-2 text-[11px] font-medium leading-4 text-[#4B5443]">
                <PackageCheck size={19} className="text-[#6FAE3E]" />
                Carefully packed
              </div>
              <div className="flex flex-col items-center gap-2 text-[11px] font-medium leading-4 text-[#4B5443]">
                <Truck size={19} className="text-[#6FAE3E]" />
                Tracked delivery
              </div>
              <div className="flex flex-col items-center gap-2 text-[11px] font-medium leading-4 text-[#4B5443]">
                <ShieldCheck size={19} className="text-[#6FAE3E]" />
                Secure payment
              </div>
            </div>
          </div>
        </section>

        <section className="mt-10 grid gap-6 rounded-[28px] border border-[#E5E7EB] bg-[#F9FAF7] p-6 sm:p-8 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#6FAE3E]">From our selection to your home</p>
            <h2 className="mt-2 text-xl font-extrabold text-[#1E4620]">A little more care in every order</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-[#5D6858]">
              Your order is prepared with care and packed for delivery. You can review your items, add a delivery address, and pay securely at checkout.
            </p>
          </div>
          <Link
            href="/products"
            className="inline-flex items-center justify-center rounded-full border border-[#1E4620] px-5 py-3 text-sm font-bold text-[#1E4620] transition-colors hover:bg-[#EAF4DA]"
          >
            Explore more products
          </Link>
        </section>
      </div>
    </main>
  );
}
