import Image from "next/image";
import Link from "next/link";
import { Leaf, CheckCircle2, ArrowRight, Heart } from "lucide-react";

export default function About() {
  return (
    <section id="about" className="w-full py-16 sm:py-20 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          
          {/* Left: Farm Image */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-brand-green/15 shadow-xl bg-brand-cream">
              <Image
                src="/images/about-farm.png"
                alt="Pure VeggieCrush regenerative organic farms in India"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: "linear-gradient(180deg, rgba(27,94,20,0.02) 0%, rgba(27,94,20,0.45) 100%)",
                }}
              />
              <div className="absolute bottom-5 left-5 right-5 p-4 rounded-xl bg-white border border-brand-green/20 shadow-md flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-brand-green font-heading">Direct From Indian Soil</p>
                  <p className="text-[11px] text-brand-ink/70 font-body">Harvested by local rural farmers with dignity & fair wages</p>
                </div>
                <div className="w-9 h-9 rounded-full bg-brand-red text-white grid place-items-center shrink-0">
                  <Heart size={16} fill="white" />
                </div>
              </div>
            </div>
          </div>

          {/* Right: Brand Story */}
          <div className="lg:col-span-6 flex flex-col justify-center text-left">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-brand-cream border border-brand-green/20 text-xs font-bold text-brand-green uppercase tracking-wider mb-4 w-fit">
              <Leaf size={13} className="text-brand-leaf" />
              <span>Our Roots &amp; Philosophy</span>
            </div>

            {/* Big heading: first word brand-green, second word brand-red */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading tracking-tight mb-3">
              <span className="text-brand-green">About</span>{" "}
              <span className="text-brand-red">Our Mission</span>
            </h2>

            <p className="text-2xl font-tagline italic text-brand-orange mb-6">
              Nature, Nothing Else.
            </p>

            <div className="space-y-4 text-sm sm:text-base text-brand-ink/80 font-body leading-relaxed mb-8">
              <p>
                Modern grocery store vegetables often look fresh, but beneath their chemical wax shine lies produce that has spent over 14 days in stale cold storage, stripped of natural vitamins and enzymes.
              </p>
              <p>
                <strong>Pure VeggieCrush</strong> was born to restore real food. We partner directly with organic farmers across 120+ certified acres, picking ruby beets, ancient moringa, and wild amla at dawn.
              </p>
              <p>
                Instead of harsh industrial boiling or chemical extraction, our low-heat machine dehydrators evaporate moisture gently below 48°C. Ground into silky 300-mesh powders and sealed into reusable 200g glass jars, you get pure concentrated plant energy that dissolves effortlessly into water, smoothies, or daily dough.
              </p>
            </div>

            {/* Key Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {[
                "100% Heirloom Non-GMO Seeds",
                "NPOP Organic Farm Standards",
                "Zero Maltodextrin or Fillers",
                "Sterile Cleanroom Packaging",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2 text-xs font-semibold text-brand-green">
                  <CheckCircle2 size={16} className="text-brand-leaf shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div>
              <Link
                href="#products"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg text-sm font-bold text-white bg-brand-red hover:bg-brand-green shadow-md"
              >
                <span>Discover Our Crushes</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
