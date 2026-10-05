import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Leaf, ShieldCheck, Heart, Sparkles, CheckCircle2, Award, Truck } from "lucide-react";

export const metadata = {
  title: "About Us | VeggieCrush - Farm to Door",
  description: "Learn about VeggieCrush's mission to bring zero-chemical, regeneratively grown organic vegetables and Ayurvedic superfoods to every Indian household.",
};

const STATS = [
  { value: "120+", label: "Organic Farm Acres", icon: <Leaf size={20} color="#6FAE3E" /> },
  { value: "12h", label: "Harvest to Door Average", icon: <Truck size={20} color="#6FAE3E" /> },
  { value: "10,000+", label: "Happy Regular Families", icon: <Heart size={20} color="#6FAE3E" /> },
  { value: "0.0%", label: "Synthetic Pesticides", icon: <ShieldCheck size={20} color="#6FAE3E" /> },
];

const PILLARS = [
  {
    title: "1. Living Soil Regeneration",
    desc: "We feed the soil, not the plant. Using indigenous micro-organisms (Jeevamrutha), cow dung bio-fertilizers, and multi-crop rotation, our soils are alive with natural earthworms and beneficial bacteria.",
  },
  {
    title: "2. Zero Chemical Guarantee",
    desc: "Every single lot undergoes rigorous pesticide residue screening. If any batch fails to meet strict 100% residue-free standards, it never leaves our farm.",
  },
  {
    title: "3. Direct Dawn Harvesting",
    desc: "Commercial supply chains hold produce in stale cold storages for days. We pick only upon order confirmation at dawn and deliver straight to your kitchen the same day.",
  },
  {
    title: "4. Cold-Chain Protection",
    desc: "From farm sorting hubs to your apartment gate, our temperature-stabilized logistics prevent transpiration and vitamin oxidation, preserving natural crunch and flavor.",
  },
];

const CERTIFICATIONS = [
  { title: "NPOP Organic Certified", authority: "APEDA India", desc: "Meets National Programme for Organic Production strict compliance standards." },
  { title: "FSSAI Food Safety", authority: "Central License", desc: "100% compliant with hygiene, cold-chain handling, and microbial limits." },
  { title: "Non-GMO Project", authority: "Pure Heirloom Seeds", desc: "Guaranteed free from genetically engineered or laboratory-modified seeds." },
  { title: "Third-Party Lab Tested", authority: "NABL Accredited Labs", desc: "Regular multi-residue gas chromatography screening for 200+ pesticides." },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen py-10 px-6 lg:px-10 bg-white">
      <div className="max-w-[1440px] mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold mb-6 hover:opacity-75 transition-opacity"
          style={{ color: "#1E4620" }}
        >
          <ArrowLeft size={14} />
          <span>Back to Home</span>
        </Link>

        {/* Hero Section */}
        <div className="max-w-3xl mb-16">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold tracking-widest uppercase mb-3 text-[#1E4620] bg-[#EAF4DA]">
            <Sparkles size={12} color="#6FAE3E" />
            Our Roots & Purpose
          </span>
          <h1
            className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight"
            style={{ fontFamily: "'Baloo 2', cursive", color: "#1E4620" }}
          >
            Reimagining What Real, Honest Food Tastes Like
          </h1>
          <p className="text-sm sm:text-base text-[#4B5443] mt-4 leading-relaxed">
            VeggieCrush began with a simple revelation: fresh food in urban grocery markets was neither fresh nor clean. It was coated in chemical waxes, doused in systemic pesticides, and kept in cold hibernation for over a week.
          </p>
          <p className="text-sm sm:text-base text-[#4B5443] mt-3 leading-relaxed">
            We built VeggieCrush to bypass middle agents, shorten the harvest-to-kitchen window to 12 hours, and bring potent ancient superfoods (Moringa, Giloy, Neem, Heirloom Roots) back into the modern kitchen.
          </p>
        </div>

        {/* Stats Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {STATS.map((stat) => (
            <div key={stat.label} className="rounded-3xl border p-6 bg-[#F9FAFB] border-[#E5E7EB] text-center">
              <div className="w-10 h-10 rounded-2xl bg-white border border-[#E5E7EB] mx-auto grid place-items-center mb-3">
                {stat.icon}
              </div>
              <h3 className="text-3xl sm:text-4xl font-black" style={{ color: "#1E4620" }}>
                {stat.value}
              </h3>
              <p className="text-xs text-[#6B7280] font-semibold mt-1">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* 4 Pillars Grid */}
        <div className="mb-20">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#6FAE3E]">
              Our Ethical Standards
            </span>
            <h2 className="text-2xl sm:text-3xl font-black mt-1" style={{ fontFamily: "'Baloo 2', cursive", color: "#1E4620" }}>
              How We Farm Differently
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {PILLARS.map((p) => (
              <div key={p.title} className="rounded-3xl border p-8 bg-white border-[#E5E7EB] shadow-sm">
                <h3 className="text-lg font-extrabold mb-2" style={{ color: "#1E4620" }}>
                  {p.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#4B5443] leading-relaxed">
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications & Trust */}
        <div className="rounded-3xl border p-8 sm:p-12 mb-20 bg-[#F9FAFB] border-[#E5E7EB]">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#6FAE3E]">
              Verification & Safety
            </span>
            <h2 className="text-2xl sm:text-3xl font-black mt-1" style={{ fontFamily: "'Baloo 2', cursive", color: "#1E4620" }}>
              Official Farm Certifications
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {CERTIFICATIONS.map((cert) => (
              <div key={cert.title} className="bg-white p-6 rounded-2xl border border-[#E5E7EB] flex flex-col justify-between">
                <div>
                  <Award size={24} color="#1E4620" className="mb-3" />
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#6FAE3E]">
                    {cert.authority}
                  </span>
                  <h4 className="text-sm font-bold mt-1" style={{ color: "#1E4620" }}>
                    {cert.title}
                  </h4>
                  <p className="text-xs text-[#6B7280] mt-2 leading-relaxed">
                    {cert.desc}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-[#E5E7EB] flex items-center gap-1.5 text-[11px] font-bold text-[#1E4620]">
                  <CheckCircle2 size={13} color="#6FAE3E" />
                  <span>Audited & Active</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Banner */}
        <div className="rounded-3xl p-8 sm:p-12 bg-[#1E4620] text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
          <div>
            <h3 className="text-2xl sm:text-3xl font-black" style={{ fontFamily: "'Baloo 2', cursive" }}>
              Taste the Difference of Pure Organic Harvest
            </h3>
            <p className="text-xs sm:text-sm text-[#D7E8BD] mt-2 max-w-md">
              Try our Essential Family Harvest Box or discover nutrient-potent Moringa powders.
            </p>
          </div>
          <Link
            href="/products"
            className="px-7 py-3.5 rounded-full text-xs font-bold text-[#1E4620] bg-white hover:bg-[#EAF4DA] transition-all hover:scale-105 shrink-0"
          >
            Explore All Produce
          </Link>
        </div>
      </div>
    </main>
  );
}
