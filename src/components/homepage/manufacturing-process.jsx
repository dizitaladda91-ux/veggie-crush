"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Sprout, 
  Droplets, 
  Scissors, 
  SunMedium, 
  Filter, 
  PackageCheck, 
  Users, 
  Factory, 
  ShieldCheck, 
  CheckCircle2,
  Sparkles
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
  { icon: Factory, title: "GMP-Certified Facility", text: "Stainless steel food contact surfaces and positive-pressure cleanrooms." },
  { icon: Users, title: "Skilled & Empowered Workforce", text: "85% local rural women workforce employed with fair living wages and safety gear." },
  { icon: ShieldCheck, title: "Batch-by-Batch Lab Audits", text: "Every batch tested for heavy metals, microbial safety, and moisture content." },
];

export default function ManufacturingProcess() {
  const [activeStep, setActiveStep] = useState(0);
  const current = STEPS[activeStep];

  return (
    <section id="manufacturing-process" className="w-full py-16 lg:py-24 px-6 lg:px-12 bg-[#F7FAF5] border-b border-[#E6EFE3]">
      <div className="max-w-[1440px] mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-3 text-[#1E4620] bg-[#EAF4DA] border border-[#D5E8C0]">
            <Factory size={13} className="text-[#5C8E42]" />
            <span>03 · How We Make Our Products</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#173719] leading-tight">
            Inside Our Manufacturing Unit, Workforce &amp; Packaging Line
          </h2>
          <p className="text-sm sm:text-base text-[#4A634E] mt-4 leading-relaxed">
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
                className="rounded-2xl p-6 bg-white border border-[#E1EBE0] shadow-sm flex items-start gap-4"
              >
                <div className="w-12 h-12 rounded-xl bg-[#EAF4DA] text-[#1E4620] grid place-items-center shrink-0">
                  <Icon size={22} className="text-[#366829]" />
                </div>
                <div>
                  <h4 className="text-sm sm:text-base font-bold text-[#173719]">{spec.title}</h4>
                  <p className="text-xs text-[#526955] mt-1 leading-relaxed">{spec.text}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Step Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {STEPS.map((step, idx) => {
            const Icon = step.icon;
            const isActive = activeStep === idx;
            return (
              <button
                key={step.num}
                onClick={() => setActiveStep(idx)}
                className={`flex items-center gap-2 px-4 py-3 rounded-2xl text-xs font-bold shrink-0 transition-all border ${
                  isActive
                    ? "bg-[#1E4620] text-white border-[#1E4620] shadow-md scale-[1.02]"
                    : "bg-white text-[#4A634E] border-[#DCE8D8] hover:bg-[#F0F7ED]"
                }`}
              >
                <span className={`w-5 h-5 rounded-full text-[10px] grid place-items-center font-black ${
                  isActive ? "bg-[#6FAE3E] text-white" : "bg-[#EAF4DA] text-[#1E4620]"
                }`}>
                  {step.num}
                </span>
                <span>{step.title}</span>
              </button>
            );
          })}
        </div>

        {/* Active Step Showcase Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35 }}
            className="rounded-3xl border border-[#DCE8D8] bg-white p-6 sm:p-10 shadow-lg grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
          >
            {/* Step Photo */}
            <div className="lg:col-span-6 relative">
              <div className="relative aspect-[16/11] rounded-2xl overflow-hidden border border-[#DCE8D8] bg-[#F2F7F0] shadow-inner">
                <Image
                  src={current.image}
                  alt={current.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md border border-[#D2E4CC] text-[10px] font-bold uppercase tracking-wider text-[#1E4620]">
                  Step {current.num} · {current.badge}
                </div>
              </div>
            </div>

            {/* Step Details & Employee Highlight */}
            <div className="lg:col-span-6 flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#5C8E42]">
                  {current.subtitle}
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-[#173719] mb-4">
                {current.title}
              </h3>
              <p className="text-sm sm:text-base text-[#465F4A] leading-relaxed mb-6">
                {current.desc}
              </p>

              {/* Working Employee & Packaging Role Box */}
              <div className="p-4 rounded-2xl bg-[#F6FAF4] border border-[#DCEBD7] mb-6 flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#EAF4DA] text-[#1E4620] grid place-items-center shrink-0 mt-0.5">
                  <Users size={16} className="text-[#366829]" />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#173719]">Working Employees &amp; Quality Role:</p>
                  <p className="text-xs text-[#526955] mt-0.5 leading-snug">{current.employeeRole}</p>
                </div>
              </div>

              {/* Step indicator pagination */}
              <div className="flex items-center justify-between pt-4 border-t border-[#EDF4EB]">
                <span className="text-xs font-semibold text-[#667E68]">
                  Step {activeStep + 1} of {STEPS.length}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    disabled={activeStep === 0}
                    onClick={() => setActiveStep((prev) => Math.max(0, prev - 1))}
                    className="px-3.5 py-1.5 rounded-xl border border-[#DCE8D8] text-xs font-bold text-[#1E4620] disabled:opacity-40 hover:bg-[#F0F7ED]"
                  >
                    Previous
                  </button>
                  <button
                    disabled={activeStep === STEPS.length - 1}
                    onClick={() => setActiveStep((prev) => Math.min(STEPS.length - 1, prev + 1))}
                    className="px-3.5 py-1.5 rounded-xl bg-[#1E4620] text-white text-xs font-bold disabled:opacity-40 hover:bg-[#28572B]"
                  >
                    Next Step
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
