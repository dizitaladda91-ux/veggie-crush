"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X, Tv, Award, Sparkles, ExternalLink, Quote, Volume2 } from "lucide-react";

const MEDIA_VIDEOS = [
  {
    id: "media-1",
    youtubeId: "dQw4w9WgXcQ", // Safe fallback YouTube ID or custom video URL
    title: "Inside India's Purest Farm-to-Jar Dehydration Unit",
    agency: "The Better India · Startup Spotlight",
    category: "Agency Feature",
    duration: "2:45 min",
    views: "125K+ Views",
    thumbnail: "/homesection/hero-veggiecrush2.png",
    quote: "VeggieCrush has proven that Indian superfoods do not need imported maltodextrin or synthetic preservatives to taste fresh.",
    keyTakeaway: "Transparent cleanroom manufacturing & solar dehydrators featured.",
  },
  {
    id: "media-2",
    youtubeId: "dQw4w9WgXcQ",
    title: "Honest Taste & Solubility Test: 4 Organic Powders Reviewed",
    agency: "Food Food TV & Culinary Creators",
    category: "Culinary Review",
    duration: "3:20 min",
    views: "88K+ Views",
    thumbnail: "/homesection/banner.png",
    quote: "Stirring the beetroot powder into warm water released a fragrant earthy sweetness with zero artificial clumping.",
    keyTakeaway: "300-mesh fine powder solubility test passed with top honors.",
  },
  {
    id: "media-3",
    youtubeId: "dQw4w9WgXcQ",
    title: "D2C Clean Label Revolution: Why 200g Glass Jars Matter",
    agency: "Inc42 & D2C Insider Summit",
    category: "Industry PR",
    duration: "1:55 min",
    views: "64K+ Views",
    thumbnail: "/process/06-pack.png",
    quote: "By refusing plastic pouches and opting for recyclable airtight glass jars, VeggieCrush sets a benchmark in shelf-stability.",
    keyTakeaway: "UV-protection & zero plastic chemical leaching highlighted.",
  },
];

const PRESS_LOGOS = [
  { name: "YourStory", tag: "Emerging Brand 2025" },
  { name: "Inc42", tag: "D2C Top Disruptor" },
  { name: "Food Food TV", tag: "Purity Seal" },
  { name: "The Better India", tag: "Sustainable Farming" },
  { name: "Outlook Business", tag: "Clean Label Leader" },
];

export default function PrMediaVideos() {
  const [activeVideo, setActiveVideo] = useState(null);

  return (
    <section id="pr-media" className="w-full py-16 lg:py-24 px-6 lg:px-12 bg-[#F9FBF8] border-b border-[#E6EFE3]">
      <div className="max-w-[1440px] mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-3 text-[#1E4620] bg-[#EAF4DA] border border-[#D5E8C0]">
            <Tv size={13} className="text-[#5C8E42]" />
            <span>07 · PR · Media &amp; Agency Video Spotlight</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#173719] leading-tight">
            What Major Media &amp; Agencies Say About Us
          </h2>
          <p className="text-sm sm:text-base text-[#4A634E] mt-4 leading-relaxed">
            Watch video stories, factory tours, and honest tastings by leading culinary channels and national news agencies.
          </p>
        </div>

        {/* Video Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-14">
          {MEDIA_VIDEOS.map((video, idx) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="group rounded-3xl border border-[#DCE8D8] bg-white overflow-hidden shadow-sm hover:shadow-xl transition-all flex flex-col justify-between"
            >
              {/* Video Thumbnail with Play Button */}
              <div
                onClick={() => setActiveVideo(video)}
                className="relative aspect-video w-full bg-[#173719] cursor-pointer overflow-hidden"
              >
                <Image
                  src={video.thumbnail}
                  alt={video.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover opacity-85 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                {/* Duration Badge */}
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-black/60 text-white backdrop-blur-md">
                  {video.category}
                </div>
                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#6FAE3E] text-white">
                  {video.duration}
                </div>

                {/* Center Pulsing Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-[#6FAE3E] text-white grid place-items-center shadow-2xl group-hover:scale-115 transition-transform duration-300">
                    <Play size={22} fill="white" className="ml-1" />
                  </div>
                </div>

                {/* Views Pill */}
                <div className="absolute bottom-3 left-3 text-white text-xs font-semibold flex items-center gap-1.5 drop-shadow">
                  <span className="w-2 h-2 rounded-full bg-[#A8D96A] animate-pulse" />
                  <span>{video.views}</span>
                </div>
              </div>

              {/* Video Details & Quote */}
              <div className="p-6 flex flex-col flex-grow justify-between">
                <div>
                  <span className="text-xs font-bold text-[#5C8E42] uppercase tracking-wider">
                    {video.agency}
                  </span>
                  <h3 className="text-base font-extrabold text-[#173719] mt-1.5 mb-3 group-hover:text-[#366829] transition-colors leading-snug">
                    {video.title}
                  </h3>

                  <div className="p-3.5 rounded-2xl bg-[#F6FAF4] border border-[#E1EBE0] mb-4">
                    <p className="text-xs italic text-[#445B47] leading-relaxed">
                      &ldquo;{video.quote}&rdquo;
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#EEF5EC] flex items-center justify-between text-xs">
                  <span className="text-[11px] text-[#7A937D] font-medium">
                    {video.keyTakeaway}
                  </span>
                  <button
                    onClick={() => setActiveVideo(video)}
                    className="font-bold text-[#1E4620] hover:text-[#5C8E42] flex items-center gap-1 transition-colors"
                  >
                    <span>Watch Video</span>
                    <Play size={12} fill="currentColor" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Press Coverage Logos Strip */}
        <div className="rounded-2xl p-6 bg-white border border-[#E2EBE0] shadow-sm">
          <p className="text-center text-xs font-black uppercase tracking-[0.2em] text-[#6FAE3E] mb-5">
            As Featured &amp; Recognized In Major Media
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 text-center">
            {PRESS_LOGOS.map((press) => (
              <div
                key={press.name}
                className="p-3 rounded-xl bg-[#F9FBF8] border border-[#EAF2E8] flex flex-col items-center justify-center"
              >
                <span className="text-sm font-black text-[#173719] tracking-tight">{press.name}</span>
                <span className="text-[10px] text-[#5C8E42] font-semibold mt-0.5">{press.tag}</span>
              </div>
            ))}
          </div>
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
                    {activeVideo.agency}
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
                <span>{activeVideo.quote}</span>
                <span className="text-[11px] font-bold text-[#A8D96A] shrink-0 ml-3">
                  Verified Media Press
                </span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
