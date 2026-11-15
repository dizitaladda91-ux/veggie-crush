"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X, Stethoscope, Award, CheckCircle, ShieldCheck, Video, HeartPulse } from "lucide-react";

const DOCTOR_VIDEOS = [
  {
    id: "doc-1",
    youtubeId: "dQw4w9WgXcQ",
    doctor: "Dr. Sneha Kulkarni",
    qualifications: "BAMS, MD (Ayurveda) · 14+ Yrs Practice",
    domain: "Ayurvedic Medicine & Immunity",
    badge: "Ayurvedic Vaidya",
    title: "Why Low-Heat Dehydrated Giloy & Moringa Preserve 'Prana' Better Than Capsules",
    duration: "2:15 min",
    thumbnail: "/homesection/hero-veggiecrush.png",
    quote: "Industrial high-temperature heat drying destroys active enzymes. VeggieCrush's low-heat processing preserves natural bio-active compounds in their purest therapeutic state.",
    recommendation: "Prescribes 1 spoon daily with warm water for morning vitality & gut immunity.",
  },
  {
    id: "doc-2",
    youtubeId: "dQw4w9WgXcQ",
    doctor: "Dr. Rohan Verma",
    qualifications: "MBBS, MD (Internal & Lifestyle Medicine)",
    domain: "Cardiology & Metabolic Health",
    badge: "Consultant Physician",
    title: "Clinical Role of Pure Beetroot Nitrates in Blood Circulation & Stamina",
    duration: "3:10 min",
    thumbnail: "/products/beetroot_1.webp",
    quote: "Dietary nitrates from unadulterated whole beetroot support natural nitric oxide dilation. I recommend VeggieCrush for athletes and anyone wanting healthy vascular health without synthetic boosters.",
    recommendation: "Recommends 1 scoop in pre-workout shakes or daily morning breakfast.",
  },
  {
    id: "doc-3",
    youtubeId: "dQw4w9WgXcQ",
    doctor: "Dt. Meera Nambiar",
    qualifications: "MSc Clinical Nutrition, Certified Gut Specialist",
    domain: "Clinical Dietetics & Gut Health",
    badge: "Senior Dietitian",
    title: "Natural Whole Amla vs Synthetic Vitamin C: Why Food-State Vitamin C Wins",
    duration: "2:40 min",
    thumbnail: "/products/goosberry_1.webp",
    quote: "Synthetic ascorbic acid pills often trigger acidity. Pure gooseberry powder contains natural bioflavonoids and tannins that allow slow, gentle cellular absorption.",
    recommendation: "Prescribes for daily collagen synthesis, hair growth, and immune defense.",
  },
];

export default function PrDoctorsVideos() {
  const [activeVideo, setActiveVideo] = useState(null);

  return (
    <section id="pr-doctors" className="w-full py-16 lg:py-24 px-6 lg:px-12 bg-white border-b border-[#E6EFE3]">
      <div className="max-w-[1440px] mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-3 text-[#1E4620] bg-[#EAF4DA] border border-[#D5E8C0]">
            <Stethoscope size={13} className="text-[#5C8E42]" />
            <span>08 · PR · Doctors of Different Domain Recommendations</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#173719] leading-tight">
            Certified Doctors &amp; Specialists Endorse VeggieCrush
          </h2>
          <p className="text-sm sm:text-base text-[#4A634E] mt-4 leading-relaxed">
            Watch certified practitioners in Ayurveda, Cardiology, and Clinical Nutrition break down the clinical science of our single-ingredient powders.
          </p>
        </div>

        {/* Doctor Video Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {DOCTOR_VIDEOS.map((doc, idx) => (
            <motion.div
              key={doc.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="group rounded-3xl border border-[#DCE8D8] bg-[#FDFEFC] overflow-hidden shadow-sm hover:shadow-xl transition-all flex flex-col justify-between"
            >
              {/* Doctor Video Thumbnail */}
              <div
                onClick={() => setActiveVideo(doc)}
                className="relative aspect-[16/10] w-full bg-[#173719] cursor-pointer overflow-hidden"
              >
                <Image
                  src={doc.thumbnail}
                  alt={doc.doctor}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover opacity-85 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />

                {/* Domain Badge */}
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#1E4620] text-white border border-white/20">
                  {doc.badge}
                </div>
                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#6FAE3E] text-white">
                  {doc.duration}
                </div>

                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-[#1E4620]/90 border border-white/40 text-white grid place-items-center shadow-2xl group-hover:scale-115 group-hover:bg-[#6FAE3E] transition-all duration-300">
                    <Play size={22} fill="white" className="ml-1" />
                  </div>
                </div>

                {/* Doctor Name at bottom of video thumbnail */}
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <p className="text-xs font-black drop-shadow">{doc.doctor}</p>
                  <p className="text-[10px] text-[#A8D96A] drop-shadow">{doc.domain}</p>
                </div>
              </div>

              {/* Details & Medical Quote */}
              <div className="p-6 flex flex-col flex-grow justify-between">
                <div>
                  <span className="text-[11px] font-semibold text-[#6B856D]">
                    {doc.qualifications}
                  </span>

                  <h3 className="text-sm sm:text-base font-extrabold text-[#173719] mt-2 mb-3 leading-snug group-hover:text-[#366829] transition-colors">
                    {doc.title}
                  </h3>

                  <div className="p-3.5 rounded-2xl bg-[#F6FAF4] border border-[#E1EBE0] mb-4">
                    <p className="text-xs italic text-[#445B47] leading-relaxed">
                      &ldquo;{doc.quote}&rdquo;
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#EEF5EC] flex items-center justify-between text-xs">
                  <span className="text-[11px] text-[#5C8E42] font-bold flex items-center gap-1">
                    <CheckCircle size={12} />
                    <span>Clinical Endorsement</span>
                  </span>
                  <button
                    onClick={() => setActiveVideo(doc)}
                    className="font-bold text-[#1E4620] hover:text-[#5C8E42] flex items-center gap-1 transition-colors"
                  >
                    <span>Watch Doctor Clip</span>
                    <Play size={12} fill="currentColor" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Doctor Verification Strip */}
        <div className="rounded-2xl p-5 bg-[#F8FAF6] border border-[#E1EBE0] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#EAF4DA] text-[#1E4620] grid place-items-center shrink-0">
              <ShieldCheck size={20} className="text-[#366829]" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-[#173719]">
                Zero Adulteration, Zero Heavy Metals Guaranteed
              </h4>
              <p className="text-[11px] text-[#526955]">
                Every batch is vetted against FSSAI, NPOP &amp; NABL pharmaceutical laboratory limits.
              </p>
            </div>
          </div>
          <span className="text-[11px] font-black uppercase tracking-wider px-3 py-1.5 rounded-full bg-[#1E4620] text-white shrink-0">
            Doctors Approved
          </span>
        </div>
      </div>

      {/* Video Modal Player */}
      <AnimatePresence>
        {activeVideo && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-3xl rounded-3xl overflow-hidden bg-[#121B13] border border-white/20 shadow-2xl"
            >
              {/* Modal Header */}
              <div className="p-4 sm:p-5 flex items-center justify-between border-b border-white/10 bg-[#172218]">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#A8D96A]">
                    {activeVideo.doctor} · {activeVideo.domain}
                  </span>
                  <h4 className="text-sm sm:text-base font-bold text-white leading-tight">
                    {activeVideo.title}
                  </h4>
                </div>
                <button
                  onClick={() => setActiveVideo(null)}
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white grid place-items-center transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Video Player */}
              <div className="relative aspect-video w-full bg-black">
                <iframe
                  src={`https://www.youtube.com/embed/${activeVideo.youtubeId}?autoplay=1`}
                  title={activeVideo.title}
                  allow="accelerated-video; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full border-0"
                />
              </div>

              {/* Modal Footer Note */}
              <div className="p-4 bg-[#172218] flex items-center justify-between text-xs text-[#C5DDC0]">
                <span>{activeVideo.recommendation}</span>
                <span className="text-[11px] font-bold text-[#A8D96A] shrink-0 ml-3">
                  Domain Verified
                </span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
