import { products } from "@/data/products";
import ProductCard from "./ProductCard";
import { Leaf, Sparkles } from "lucide-react";

export default function Products() {
  return (
    <section id="products" className="w-full py-16 sm:py-20 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-brand-cream border border-brand-green/20 text-xs font-bold text-brand-green uppercase tracking-wider mb-3">
            <Sparkles size={13} className="text-brand-orange" />
            <span>Farm Harvest Selection</span>
          </div>

          {/* Big heading: first word brand-green, second word brand-red */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading tracking-tight mb-3">
            <span className="text-brand-green">Fresh</span>{" "}
            <span className="text-brand-red">Crushes</span>
          </h2>

          <p className="text-xl font-tagline italic text-brand-orange mb-3">
            Nature, Nothing Else.
          </p>

          <p className="text-sm sm:text-base text-brand-ink/75 font-body leading-relaxed">
            Every spoonful is harvested at sunrise, gently dehydrated below 48°C, and ground into fine powders to preserve living enzymes and vitamins.
          </p>
        </div>

        {/* 6 Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Bottom Guarantee Banner */}
        <div className="mt-14 p-6 sm:p-8 rounded-2xl bg-brand-cream border border-brand-green/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-brand-green text-white grid place-items-center shrink-0">
              <Leaf size={20} className="text-brand-cream" />
            </div>
            <div>
              <h4 className="text-sm sm:text-base font-bold text-brand-green font-heading">
                Zero Plastic Leaching Guarantee
              </h4>
              <p className="text-xs text-brand-ink/70 font-body">
                All Pure VeggieCrush botanicals are packaged in heavy UV-protected 200g glass jars.
              </p>
            </div>
          </div>
          <span className="text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-lg bg-brand-green text-white shrink-0">
            100% Eco-Glass Sealed
          </span>
        </div>

      </div>
    </section>
  );
}
