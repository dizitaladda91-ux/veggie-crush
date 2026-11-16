"use client";

import { useState } from "react";
import Image from "next/image";
import { Play, X, Tv } from "lucide-react";

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
    <section id="pr-media" className="w-full py-16 lg:py-24 px-6 lg:px-12 bg-white border-b border-[#E8EFE5]">
      <div className="max-w-[1440px] mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-heading font-bold tracking-widest uppercase mb-3 text-[#1B5E14] bg-[#FFFBF2] border border-[#F7941D]/35">
            <Tv size={13} className="text-[#F7941D]" />
            <span>07 · PR · Media &amp; Agency Video Spotlight</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black tracking-tight text-[#1B5E14] leading-tight">
            What Major Media &amp; <span className="text-[#B00D0D]">Agencies Say About Us</span>
          </h2>
          <p className="text-sm sm:text-base font-body text-[#3B4D3C] mt-4 leading-relaxed">
            Watch video stories, factory tours, and honest tastings by leading culinary channels and national news agencies.
          </p>
        </div>

        {/* Video Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-14">
          {MEDIA_VIDEOS.map((video) => (
            <div
              key={video.id}
              className="group rounded-3xl border border-[#E8EFE5] bg-white overflow-hidden shadow-xs hover:border-[#F7941D]/40 transition-colors flex flex-col justify-between"
            >
              {/* Video Thumbnail with Play Button */}
              <div
                onClick={() => setActiveVideo(video)}
                className="relative aspect-video w-full bg-[#1B5E14] cursor-pointer overflow-hidden"
              >
                <Image
                  src={video.thumbnail}
                  alt={video.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover opacity-90 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

                {/* Duration Badge */}
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-heading font-bold uppercase tracking-wider bg-[#F7941D] text-white">
                  {video.category}
                </div>
                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-heading font-bold bg-[#1B5E14] text-white">
                  {video.duration}
                </div>

                {/* Center Play Button in Crush Red */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-[#B00D0D] text-white grid place-items-center shadow-2xl">
                    <Play size={22} fill="white" className="ml-1" />
                  </div>
                </div>

                {/* Views Pill */}
                <div className="absolute bottom-3 left-3 text-white text-xs font-heading font-semibold flex items-center gap-1.5 drop-shadow">
                  <span className="w-2 h-2 rounded-full bg-[#F7941D]" />
                  <span>{video.views}</span>
                </div>
              </div>

              {/* Video Details & Quote */}
              <div className="p-6 flex flex-col flex-grow justify-between">
                <div>
                  <span className="text-xs font-heading font-bold text-[#B85D00] uppercase tracking-wider">
                    {video.agency}
                  </span>
                  <h3 className="text-base font-heading font-bold text-[#1B5E14] mt-1.5 mb-3 group-hover:text-[#B00D0D] transition-colors leading-snug">
                    {video.title}
                  </h3>

                  <div className="p-3.5 rounded-2xl bg-[#FFFBF2] border border-[#F7941D]/25 mb-4">
                    <p className="text-xs italic font-body text-[#445B47] leading-relaxed">
                      &ldquo;{video.quote}&rdquo;
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#F0F5ED] flex items-center justify-between text-xs">
                  <span className="text-[11px] font-body text-[#7A937D] font-medium">
                    {video.keyTakeaway}
                  </span>
                  <button
                    onClick={() => setActiveVideo(video)}
                    className="font-heading font-bold text-[#B00D0D] hover:text-[#1B5E14] flex items-center gap-1 transition-colors"
                  >
                    <span>Watch Video</span>
                    <Play size={12} fill="currentColor" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Press Coverage Logos Strip */}
        <div className="rounded-2xl p-6 bg-[#FFFBF2] border border-[#F7941D]/30 shadow-xs">
          <p className="text-center text-xs font-heading font-black uppercase tracking-[0.2em] text-[#1B5E14] mb-5">
            As Featured &amp; Recognized In Major Media
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 text-center">
            {PRESS_LOGOS.map((press) => (
              <div
                key={press.name}
                className="p-3.5 rounded-xl bg-white border border-[#E8EFE5] flex flex-col items-center justify-center"
              >
                <span className="text-sm font-heading font-black text-[#1B5E14] tracking-tight">{press.name}</span>
                <span className="text-[10px] font-heading text-[#B85D00] font-semibold mt-0.5">{press.tag}</span>
              </div>
            ))}
          </div>
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
                  {activeVideo.agency}
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
              <span className="font-body">{activeVideo.quote}</span>
              <span className="text-[11px] font-heading font-bold text-[#F7941D] shrink-0 ml-3">
                Verified Press
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
