"use client";

import { useState } from "react";
import Image from "next/image";
import { Play, X, Stethoscope, CheckCircle, ShieldCheck } from "lucide-react";

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
    <section id="pr-doctors" className="w-full py-16 lg:py-24 px-6 lg:px-12 bg-[#FFFBF2] border-b border-[#E8EFE5]">
      <div className="max-w-[1440px] mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-heading font-bold tracking-widest uppercase mb-3 text-[#1B5E14] bg-white border border-[#F7941D]/35">
            <Stethoscope size={13} className="text-[#1B5E14]" />
            <span>08 · PR · Doctors of Different Domain Recommendations</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black tracking-tight text-[#1B5E14] leading-tight">
            Certified Doctors &amp; Specialists <span className="text-[#B00D0D]">Endorse VeggieCrush</span>
          </h2>
          <p className="text-sm sm:text-base font-body text-[#3B4D3C] mt-4 leading-relaxed">
            Watch certified practitioners in Ayurveda, Cardiology, and Clinical Nutrition break down the clinical science of our single-ingredient powders.
          </p>
        </div>

        {/* Doctor Video Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {DOCTOR_VIDEOS.map((doc) => (
            <div
              key={doc.id}
              className="group rounded-3xl border border-[#E8EFE5] bg-white overflow-hidden shadow-xs hover:border-[#1B5E14]/40 transition-colors flex flex-col justify-between"
            >
              {/* Doctor Video Thumbnail */}
              <div
                onClick={() => setActiveVideo(doc)}
                className="relative aspect-[16/10] w-full bg-[#1B5E14] cursor-pointer overflow-hidden"
              >
                <Image
                  src={doc.thumbnail}
                  alt={doc.doctor}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover opacity-90 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />

                {/* Domain Badge */}
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-heading font-bold uppercase tracking-wider bg-[#1B5E14] text-white border border-white/20">
                  {doc.badge}
                </div>
                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-heading font-bold bg-[#F7941D] text-white">
                  {doc.duration}
                </div>

                {/* Play Button Overlay in Crush Red */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-[#B00D0D] text-white grid place-items-center shadow-2xl">
                    <Play size={22} fill="white" className="ml-1" />
                  </div>
                </div>

                {/* Doctor Name at bottom of video thumbnail */}
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <p className="text-xs font-heading font-black drop-shadow">{doc.doctor}</p>
                  <p className="text-[10px] font-heading text-[#F7941D] drop-shadow">{doc.domain}</p>
                </div>
              </div>

              {/* Details & Medical Quote */}
              <div className="p-6 flex flex-col flex-grow justify-between">
                <div>
                  <span className="text-[11px] font-heading font-semibold text-[#6B856D]">
                    {doc.qualifications}
                  </span>

                  <h3 className="text-sm sm:text-base font-heading font-bold text-[#1B5E14] mt-2 mb-3 leading-snug group-hover:text-[#B00D0D] transition-colors">
                    {doc.title}
                  </h3>

                  <div className="p-3.5 rounded-2xl bg-[#FFFBF2] border border-[#F7941D]/25 mb-4">
                    <p className="text-xs italic font-body text-[#445B47] leading-relaxed">
                      &ldquo;{doc.quote}&rdquo;
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#F0F5ED] flex items-center justify-between text-xs">
                  <span className="text-[11px] font-heading text-[#2E8B1F] font-bold flex items-center gap-1">
                    <CheckCircle size={13} />
                    <span>Clinical Endorsement</span>
                  </span>
                  <button
                    onClick={() => setActiveVideo(doc)}
                    className="font-heading font-bold text-[#B00D0D] hover:text-[#1B5E14] flex items-center gap-1 transition-colors"
                  >
                    <span>Watch Doctor Clip</span>
                    <Play size={12} fill="currentColor" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Doctor Verification Strip */}
        <div className="rounded-2xl p-5 bg-white border-2 border-[#1B5E14]/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FFF5E6] text-[#F7941D] grid place-items-center shrink-0 border border-[#F7941D]/30">
              <ShieldCheck size={20} />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-heading font-bold text-[#1B5E14]">
                Zero Adulteration, Zero Heavy Metals Guaranteed
              </h4>
              <p className="text-[11px] font-body text-[#526955]">
                Every batch is vetted against FSSAI, NPOP &amp; NABL pharmaceutical laboratory limits.
              </p>
            </div>
          </div>
          <span className="text-[11px] font-heading font-black uppercase tracking-wider px-3.5 py-1.5 rounded-full bg-[#1B5E14] text-white shrink-0">
            Doctors Approved
          </span>
        </div>
      </div>

      {/* Video Modal Player */}
      {activeVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-3xl rounded-3xl overflow-hidden bg-[#102011] border-2 border-[#F7941D]/40 shadow-2xl">
            {/* Modal Header */}
            <div className="p-4 sm:p-5 flex items-center justify-between border-b border-white/10 bg-[#162B17]">
              <div>
                <span className="text-[10px] font-heading font-bold uppercase tracking-wider text-[#F7941D]">
                  {activeVideo.doctor} · {activeVideo.domain}
                </span>
                <h4 className="text-sm sm:text-base font-heading font-bold text-white leading-tight">
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
            <div className="p-4 bg-[#162B17] flex items-center justify-between text-xs text-[#E0EEDD]">
              <span className="font-body">{activeVideo.recommendation}</span>
              <span className="text-[11px] font-heading font-bold text-[#F7941D] shrink-0 ml-3">
                Domain Verified
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
