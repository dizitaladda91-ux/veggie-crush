import Link from "next/link";
import { notFound } from "next/navigation";
import { Check, Leaf, PackageCheck, ShieldCheck, Truck } from "lucide-react";
import ComboDetailActionButton from "@/components/products/combo-detail-action-button";
import ProductGallery from "@/components/products/product-gallery";
import { connectCatalog, Combo, getProductImages } from "@/lib/catalog";

export default async function ComboDetailPage({ params }) {
  const { slug } = await params;

  await connectCatalog();
  const combo = await Combo.findOne({
    slug,
    $or: [{ isActive: true }, { isActive: { $exists: false } }],
  })
    .populate("products", "name shortName slug size images")
    .lean();

  if (!combo) notFound();

  const products = (combo.products || []).filter(Boolean);
  const images = Array.isArray(combo.images) && combo.images.length
    ? combo.images
    : products.flatMap(getProductImages).slice(0, 4);
  const id = String(combo._id);
  const savings = Math.max(0, combo.totalMrp - combo.bundlePrice);
  const discount = combo.totalMrp > 0
    ? Math.round((savings / combo.totalMrp) * 100)
    : 0;

  return (
    <main className="min-h-screen bg-white px-5 py-8 sm:px-8 lg:px-10 lg:py-12">
      <div className="mx-auto max-w-7xl">
        <nav aria-label="Breadcrumb" className="mb-7 text-sm text-[#7A8B6F]">
          <Link href="/" className="transition-colors hover:text-[#1E4620]">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/combos" className="transition-colors hover:text-[#1E4620]">Combos</Link>
          <span className="mx-2">/</span>
          <span aria-current="page" className="font-semibold text-[#1E4620]">{combo.name}</span>
        </nav>

        <section className="grid items-start gap-7 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
          <ProductGallery productName={combo.name} images={images} />

          <div className="rounded-[28px] border border-[#E5E7EB] bg-white p-6 shadow-sm sm:p-8">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#F0F7E8] px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-[#376B26]">
              <Leaf size={13} />
              {combo.packSize}-product combo
            </span>
            <h1 className="mt-4 text-3xl font-black leading-tight tracking-tight text-[#1E4620] sm:text-4xl">
              {combo.name}
            </h1>
            <p className="mt-3 text-sm font-semibold text-[#667E6A]">Combo code: {combo.code}</p>

            <div className="mt-6 border-y border-[#E5E7EB] py-5">
              <div className="flex flex-wrap items-end gap-x-3 gap-y-1">
                <span className="text-4xl font-black tracking-tight text-[#1E4620]">₹{combo.bundlePrice}</span>
                {combo.totalMrp > combo.bundlePrice && (
                  <>
                    <span className="mb-1 text-lg text-[#8B9288] line-through">₹{combo.totalMrp}</span>
                    {discount > 0 && (
                      <span className="mb-1 rounded-full bg-[#F0F7E8] px-2.5 py-1 text-xs font-bold text-[#376B26]">
                        Save {discount}%
                      </span>
                    )}
                  </>
                )}
              </div>
              {savings > 0 && <p className="mt-1 text-xs font-medium text-[#6B7280]">You save ₹{savings} on this combo</p>}
              <p className="mt-2 text-xs text-[#7A8B6F]">Inclusive of all taxes</p>
            </div>

            <p className="mt-5 text-sm leading-7 text-[#4B5443]">
              {combo.description || "Thoughtfully paired VeggieCrush products for your everyday wellness routine."}
            </p>

            {products.length > 0 && (
              <section aria-labelledby="combo-includes-heading" className="mt-6">
                <h2 id="combo-includes-heading" className="text-sm font-bold text-[#1E4620]">What&apos;s included</h2>
                <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                  {products.map((product) => (
                    <li key={String(product._id)} className="flex items-start gap-2 text-sm leading-6 text-[#4B5443]">
                      <Check size={16} className="mt-1 shrink-0 text-[#6FAE3E]" />
                      <span>{product.shortName || product.name}{product.size ? ` · ${product.size}` : ""}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {Array.isArray(combo.keyBenefits) && combo.keyBenefits.length > 0 && (
              <section aria-labelledby="combo-benefits-heading" className="mt-6">
                <h2 id="combo-benefits-heading" className="text-sm font-bold text-[#1E4620]">Combo benefits</h2>
                <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                  {combo.keyBenefits.filter(Boolean).map((benefit, index) => (
                    <li key={`${benefit}-${index}`} className="flex items-start gap-2 text-sm leading-6 text-[#4B5443]">
                      <Check size={16} className="mt-1 shrink-0 text-[#6FAE3E]" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            <ComboDetailActionButton
              combo={{ id, name: combo.name, bundlePrice: combo.bundlePrice }}
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

        <div className="mt-8 text-center">
          <Link href="/combos" className="text-sm font-semibold text-[#4D763B] hover:underline">
            Back to all combos
          </Link>
        </div>
      </div>
    </main>
  );
}
