import { Star, Quote, CheckCircle, Leaf } from "lucide-react";

const REVIEWS = [
  {
    name: "Dr. Ananya Sharma",
    location: "Mumbai, Maharashtra",
    product: "Beetroot Power Crush",
    rating: 5,
    title: "Remarkable stamina & blood flow boost",
    review:
      "I stir a spoonful into my morning smoothie. Unlike caffeine pills, Pure VeggieCrush Beetroot delivers clean, sustained stamina through natural dietary nitrates without jittery energy crashes.",
  },
  {
    name: "Vikramaditya Mehta",
    location: "Delhi-NCR",
    product: "Pure Moringa Superleaf Crush",
    rating: 5,
    title: "Vanished my morning fatigue within 2 weeks",
    review:
      "Most moringa powders on the market smell burnt or taste like dusty chalk. You can immediately tell this is cold-crushed—the vibrant green color and fresh grassy aroma are unmatched.",
  },
  {
    name: "Pooja Kulkarni",
    location: "Pune, Maharashtra",
    product: "Wild Amla Vitamin-C Crush",
    rating: 5,
    title: "Real food-state Vitamin C without acidity",
    review:
      "Synthetic ascorbic acid effervescent tablets always irritated my stomach lining. VeggieCrush wild amla powder with warm water and raw honey has completely solved my seasonal sniffles and hair fall.",
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="w-full py-16 sm:py-20 lg:py-24 bg-brand-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white border border-brand-green/20 text-xs font-bold text-brand-green uppercase tracking-wider mb-3">
            <Leaf size={13} className="text-brand-leaf" />
            <span>Real Health Stories</span>
          </div>

          {/* Big heading: first word brand-green, second word brand-red */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading tracking-tight mb-3">
            <span className="text-brand-green">Customer</span>{" "}
            <span className="text-brand-red">Reviews</span>
          </h2>

          <p className="text-2xl font-tagline italic text-brand-orange mb-3">
            Nature, Nothing Else.
          </p>

          <p className="text-sm sm:text-base text-brand-ink/75 font-body leading-relaxed">
            Read why over 10,000+ conscious Indian families trust Pure VeggieCrush for their daily organic nutrition.
          </p>
        </div>

        {/* 3 Review Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {REVIEWS.map((rev) => (
            <div
              key={rev.name}
              className="rounded-2xl bg-white border border-brand-green/10 p-7 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex gap-1 text-[#F0B429]">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} size={16} fill="#F0B429" color="#F0B429" />
                    ))}
                  </div>
                  <Quote size={24} className="text-brand-green/20" />
                </div>

                <span className="inline-block text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-brand-cream text-brand-green border border-brand-green/15 mb-3">
                  {rev.product}
                </span>

                <h3 className="text-base font-bold text-brand-ink font-heading mb-2 leading-snug">
                  &ldquo;{rev.title}&rdquo;
                </h3>

                <p className="text-xs sm:text-sm text-brand-ink/75 font-body leading-relaxed">
                  {rev.review}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-brand-green font-heading">{rev.name}</span>
                    <CheckCircle size={13} className="text-brand-leaf" />
                  </div>
                  <span className="text-[11px] text-brand-ink/60 font-body">{rev.location}</span>
                </div>
                <span className="text-[10px] font-bold text-brand-green bg-brand-green/10 px-2 py-0.5 rounded">
                  Verified Buyer
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
