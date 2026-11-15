import { Sprout, ShieldCheck, Sunrise, PackageCheck, Leaf } from "lucide-react";

const REASONS = [
  {
    icon: Sprout,
    title: "100% Natural",
    badge: "Zero Additives",
    description:
      "Every jar contains only one pure ingredient: the whole plant. No maltodextrin, corn starch, or artificial fillers.",
  },
  {
    icon: ShieldCheck,
    title: "No Preservatives",
    badge: "Residue Free",
    description:
      "Free from synthetic preservatives, artificial flavors, and food dyes. Pure, raw plant vitality you can taste.",
  },
  {
    icon: Sunrise,
    title: "Farm Fresh",
    badge: "Dawn Harvest",
    description:
      "Picked at sunrise from our certified organic acres and processed within 12 hours to lock in natural antioxidants.",
  },
  {
    icon: PackageCheck,
    title: "Hygienic Packing",
    badge: "Cleanroom Standard",
    description:
      "Processed in GMP stainless-steel cleanrooms and sealed in airtight UV-protective 200g glass jars with tamper-proof foil.",
  },
];

export default function WhyUs() {
  return (
    <section id="why-us" className="w-full py-16 sm:py-20 lg:py-24 bg-brand-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white border border-brand-green/20 text-xs font-bold text-brand-green uppercase tracking-wider mb-3">
            <Leaf size={13} className="text-brand-leaf" />
            <span>The Pure Difference</span>
          </div>

          {/* Big heading: first word brand-green, second word brand-red */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading tracking-tight mb-3">
            <span className="text-brand-green">Why</span>{" "}
            <span className="text-brand-red">Choose Us</span>
          </h2>

          <p className="text-xl font-tagline italic text-brand-orange mb-3">
            Nature, Nothing Else.
          </p>

          <p className="text-sm sm:text-base text-brand-ink/75 font-body leading-relaxed">
            We reject the shortcuts of industrial grocery supply chains to bring you unadulterated, real nutrition.
          </p>
        </div>

        {/* 4 Icon Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {REASONS.map((reason) => {
            const Icon = reason.icon;
            return (
              <div
                key={reason.title}
                className="group rounded-2xl bg-white border border-brand-green/10 p-7 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-14 h-14 rounded-xl bg-brand-cream border border-brand-green/15 text-brand-green grid place-items-center group-hover:bg-brand-green group-hover:text-white transition-colors duration-300">
                      <Icon size={26} className="transition-transform group-hover:scale-110" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-brand-green/10 text-brand-green">
                      {reason.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-brand-ink font-heading group-hover:text-brand-green transition-colors mb-2">
                    {reason.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-brand-ink/70 font-body leading-relaxed">
                    {reason.description}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-gray-100 flex items-center gap-1.5 text-[11px] font-bold text-brand-leaf">
                  <Leaf size={12} />
                  <span>100% Certified Farm Standard</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
