import Image from "next/image";
import Link from "next/link";
import { Leaf, ArrowRight, ShieldCheck, Sparkles } from "lucide-react";

export default function Hero() {
  return (
    <section id="home" className="relative w-full bg-brand-cream overflow-hidden py-16 sm:py-20 lg:py-28">
      {/* Decorative background glows */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-orange/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-leaf/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Content Column */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left">
            {/* Small leaf badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-brand-green/20 text-xs font-semibold text-brand-green w-fit mb-6 shadow-sm">
              <Leaf size={14} className="text-brand-leaf" />
              <span>100% Raw, Cold-Crushed Organics</span>
            </div>

            {/* Big Heading: first word brand-green, second word brand-red */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight font-heading leading-tight mb-4">
              <span className="text-brand-green">Pure</span>{" "}
              <span className="text-brand-red">VeggieCrush</span>
            </h1>

            {/* Italic Tagline in Playfair Display */}
            <p className="text-2xl sm:text-3xl font-tagline italic text-brand-orange font-medium mb-6">
              Nature, Nothing Else.
            </p>

            {/* Description */}
            <p className="text-base sm:text-lg text-brand-ink/80 leading-relaxed font-body max-w-xl mb-8">
              Experience the potent life-force of freshly harvested vegetables and medicinal botanicals. Cold-crushed, gently machine-dried, and sealed into eco-glass jars to preserve 100% natural vitamins and enzymes.
            </p>

            {/* 2 Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-10">
              <Link
                href="#products"
                className="px-7 py-3.5 rounded-lg text-sm font-bold text-white bg-brand-red hover:bg-brand-green shadow-md flex items-center justify-center gap-2"
              >
                <span>Order Fresh Today</span>
                <ArrowRight size={16} />
              </Link>

              <Link
                href="#about"
                className="px-7 py-3.5 rounded-lg text-sm font-bold text-brand-green bg-white border-2 border-brand-green hover:bg-brand-green hover:text-white flex items-center justify-center gap-2"
              >
                <span>Learn Our Process</span>
                <Leaf size={16} className="text-brand-leaf" />
              </Link>
            </div>

            {/* Trust Highlights */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-brand-green/15 text-left">
              <div>
                <p className="text-lg sm:text-2xl font-black text-brand-green font-heading">120+ Acres</p>
                <p className="text-xs text-brand-ink/70 font-body">Certified Organic Soils</p>
              </div>
              <div>
                <p className="text-lg sm:text-2xl font-black text-brand-red font-heading">0% Added</p>
                <p className="text-xs text-brand-ink/70 font-body">Preservatives or Sugars</p>
              </div>
              <div>
                <p className="text-lg sm:text-2xl font-black text-brand-orange font-heading">10,000+</p>
                <p className="text-xs text-brand-ink/70 font-body">Conscious Families</p>
              </div>
            </div>
          </div>

          {/* Right Product Image Column */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-md aspect-square rounded-3xl overflow-hidden bg-white/60 p-6 sm:p-8 border border-white shadow-xl flex items-center justify-center">
              {/* Product Hero Image */}
              <div className="relative w-full h-full">
                <Image
                  src="/images/hero-crush.png"
                  alt="Pure VeggieCrush Organic Harvest"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 450px"
                  className="object-contain"
                />
              </div>

              {/* Floating Leaf Accent Badge */}
              <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-brand-green/20 shadow-md flex items-center gap-1.5">
                <Sparkles size={14} className="text-brand-orange" />
                <span className="text-[11px] font-bold text-brand-green font-heading">Direct Dawn Harvest</span>
              </div>

              {/* Floating Purity Seal */}
              <div className="absolute bottom-4 left-4 bg-brand-green text-white px-3.5 py-2 rounded-xl shadow-lg flex items-center gap-2">
                <ShieldCheck size={18} className="text-brand-orange" />
                <div>
                  <p className="text-[10px] uppercase font-bold tracking-wider text-brand-cream">Quality Guaranteed</p>
                  <p className="text-xs font-black font-heading">100% Pure Plant</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
