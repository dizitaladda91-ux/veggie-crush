"use client";

import { useState } from "react";
import Image from "next/image";
import { 
  Sprout, 
  Droplets, 
  Scissors, 
  SunMedium, 
  Filter, 
  PackageCheck, 
  Users, 
  Factory, 
  ShieldCheck
} from "lucide-react";

const STEPS = [
  {
    num: "01",
    title: "Hand Selection & Sorting",
    subtitle: "At the Farm Gate",
    icon: Sprout,
    image: "/process/01-select.jpg",
    badge: "Organic Soil Harvest",
    desc: "Our farm partners and harvesting crew carefully hand-pick fresh vegetables, leaves, and medicinal herbs at dawn. Only undamaged, pesticide-free batches pass our initial 18-point inspection checklist.",
    employeeRole: "Trained Harvesters & Agronomists inspecting harvest freshness.",
  },
  {
    num: "02",
    title: "Purified Triple-Stage Wash",
    subtitle: "In the Cleaning Bay",
    icon: Droplets,
    image: "/process/02-wash.jpg",
    badge: "Ozone & RO Water Wash",
    desc: "Produce undergoes a rigorous 3-step washing cycle using filtered reverse-osmosis and ozonated water to remove natural soil particles and external impurities without harming delicate plant cuticles.",
    employeeRole: "Hygiene Specialists maintaining food-grade sanitation.",
  },
  {
    num: "03",
    title: "Precision Slicing Unit",
    subtitle: "Processing Bay",
    icon: Scissors,
    image: "/process/03-cut.jpg",
    badge: "Uniform Thin Slicing",
    desc: "Cleaned beets, bitter gourds, and amla are transferred to food-grade 316 stainless-steel slicers to produce uniform micro-slices. This ensures complete, even dehydration without hotspots.",
    employeeRole: "Certified Machine Operators following strict GMP standards.",
  },
  {
    num: "04",
    title: "Low-Heat Machine Dehydrators",
    subtitle: "Dehydration Chamber",
    icon: SunMedium,
    image: "/process/04-machine-dry.jpg",
    badge: "Controlled Low-Temp Drying",
    desc: "Produce slices are laid on multi-tier stainless trays inside climate-controlled dehydrators. Closed-loop gentle warm air evaporates moisture below 48°C, preserving active vitamins and bio-flavonoids.",
    employeeRole: "Dehydration Technicians monitoring hourly temperature & humidity curves.",
  },
  {
    num: "05",
    title: "Stainless Steel Micro-Grind & Sieve",
    subtitle: "Milling Cleanroom",
    icon: Filter,
    image: "/process/05-grind-sieve.jpg",
    badge: "300-Mesh Smooth Sieving",
    desc: "Dehydrated slices enter high-speed stone-free pulverizers, followed by vibrating micro-sieves that deliver a silky, 300-mesh powder that dissolves instantly into liquids and batters.",
    employeeRole: "Quality Control Inspectors checking powder particle size & aroma.",
  },
  {
    num: "06",
    title: "Sterile Cleanroom 200g Glass Packaging",
    subtitle: "Packaging Line",
    icon: PackageCheck,
    image: "/process/06-pack.png",
    badge: "Airtight Glass Seal",
    desc: "In an ISO-certified positive-pressure cleanroom, powders are filled into sterilized 200g heavy glass jars, fitted with induction tamper-proof foil, and sealed with airtight lids to guarantee 100% shelf life.",
    employeeRole: "Packaging Team handling automated weighing, induction foil sealing & batch coding.",
  },
];

const UNIT_SPECS = [
  { icon: Factory, title: "GMP-Certified Facility", text: "Stainless steel food contact surfaces and positive-pressure cleanrooms.", color: "text-[#1B5E14]" },
  { icon: Users, title: "Skilled & Empowered Workforce", text: "85% local rural women workforce employed with fair living wages and safety gear.", color: "text-[#B00D0D]" },
  { icon: ShieldCheck, title: "Batch-by-Batch Lab Audits", text: "Every batch tested for heavy metals, microbial safety, and moisture content.", color: "text-[#F7941D]" },
];

export default function ManufacturingProcess() {
  const [activeStep, setActiveStep] = useState(0);
  const current = STEPS[activeStep];

  return (
    <section id="manufacturing-process" className="w-full py-16 lg:py-24 px-6 lg:px-12 bg-white border-b border-[#E8EFE5]">
      <div className="max-w-[1440px] mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-heading font-bold tracking-widest uppercase mb-3 text-[#1B5E14] bg-[#FFFBF2] border border-[#F7941D]/35">
            <Factory size={13} className="text-[#1B5E14]" />
            <span>03 · How We Make Our Products</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black tracking-tight text-[#1B5E14] leading-tight">
            Inside Our Manufacturing Unit, Workforce &amp; <span className="text-[#B00D0D]">Packaging Line</span>
          </h2>
          <p className="text-sm sm:text-base font-body text-[#3B4D3C] mt-4 leading-relaxed">
            From raw soil to an airtight 200g glass jar in your pantry—see how our dedicated employees and hygienic dehydration facility preserve nature&apos;s true vitality.
          </p>
        </div>

        {/* Manufacturing Unit Highlight Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
          {UNIT_SPECS.map((spec) => {
            const Icon = spec.icon;
            return (
              <div
                key={spec.title}
                className="rounded-2xl p-6 bg-[#FFFBF2] border border-[#F7941D]/25 shadow-xs flex items-start gap-4"
              >
                <div className={`w-12 h-12 rounded-xl bg-white border border-[#F7941D]/30 grid place-items-center shrink-0 ${spec.color}`}>
                  <Icon size={22} />
                </div>
                <div>
                  <h4 className="text-sm sm:text-base font-heading font-bold text-[#1B5E14]">{spec.title}</h4>
                  <p className="text-xs font-body text-[#526955] mt-1 leading-relaxed">{spec.text}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Step Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {STEPS.map((step, idx) => {
            const isActive = activeStep === idx;
            return (
              <button
                key={step.num}
                onClick={() => setActiveStep(idx)}
                className={`flex items-center gap-2 px-4 py-3 rounded-2xl text-xs font-heading font-bold shrink-0 border transition-colors ${
                  isActive
                    ? "bg-[#1B5E14] text-white border-[#1B5E14] shadow-sm"
                    : "bg-[#FFFBF2] text-[#1B5E14] border-[#F7941D]/30 hover:bg-[#FFF5E6]"
                }`}
              >
                <span className={`w-5 h-5 rounded-full text-[10px] grid place-items-center font-black ${
                  isActive ? "bg-[#F7941D] text-white" : "bg-white text-[#1B5E14] border border-[#1B5E14]/20"
                }`}>
                  {step.num}
                </span>
                <span>{step.title}</span>
              </button>
            );
          })}
        </div>

        {/* Active Step Showcase Card */}
        <div
          key={activeStep}
          className="rounded-3xl border-2 border-[#1B5E14]/15 bg-[#FFFDF7] p-6 sm:p-10 shadow-lg grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
        >
          {/* Step Photo */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[16/11] rounded-2xl overflow-hidden border border-[#E8EFE5] bg-white shadow-inner">
              <Image
                src={current.image}
                alt={current.title}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#1B5E14] text-white text-[10px] font-heading font-bold uppercase tracking-wider shadow-sm">
                Step {current.num} · {current.badge}
              </div>
            </div>
          </div>

          {/* Step Details & Employee Highlight */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-heading font-bold uppercase tracking-wider text-[#B85D00]">
                {current.subtitle}
              </span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-heading font-black text-[#1B5E14] mb-4">
              {current.title}
            </h3>
            <p className="text-sm sm:text-base font-body text-[#3B4D3C] leading-relaxed mb-6">
              {current.desc}
            </p>

            {/* Working Employee & Packaging Role Box */}
            <div className="p-4 rounded-2xl bg-white border border-[#F7941D]/35 mb-6 flex items-start gap-3 shadow-xs">
              <div className="w-8 h-8 rounded-lg bg-[#FFF1F0] text-[#B00D0D] grid place-items-center shrink-0 mt-0.5">
                <Users size={16} />
              </div>
              <div>
                <p className="text-xs font-heading font-bold text-[#B00D0D]">Working Employees &amp; Quality Role:</p>
                <p className="text-xs font-body text-[#526955] mt-0.5 leading-snug">{current.employeeRole}</p>
              </div>
            </div>

            {/* Step indicator pagination */}
            <div className="flex items-center justify-between pt-4 border-t border-[#E8EFE5]">
              <span className="text-xs font-heading font-semibold text-[#5C7560]">
                Step {activeStep + 1} of {STEPS.length}
              </span>
              <div className="flex items-center gap-2">
                <button
                  disabled={activeStep === 0}
                  onClick={() => setActiveStep((prev) => Math.max(0, prev - 1))}
                  className="px-4 py-2 rounded-xl border border-[#1B5E14]/30 text-xs font-heading font-bold text-[#1B5E14] bg-white disabled:opacity-40 hover:bg-[#FFFBF2]"
                >
                  Previous
                </button>
                <button
                  disabled={activeStep === STEPS.length - 1}
                  onClick={() => setActiveStep((prev) => Math.min(STEPS.length - 1, prev + 1))}
                  className="px-4 py-2 rounded-xl bg-[#B00D0D] text-white text-xs font-heading font-bold disabled:opacity-40 hover:bg-[#8F0A0A] shadow-sm"
                >
                  Next Step
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
