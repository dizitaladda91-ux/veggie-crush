"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Play } from "lucide-react";

const VIDEOS = [
  { id: "dQw4w9WgXcQ", title: "From Farm to Your Doorstep" },
  { id: "dQw4w9WgXcQ", title: "How We Grow Organically" },
  { id: "dQw4w9WgXcQ", title: "Meet Our Farmers" },
];

function getThumbnail(videoId) {
  return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
}

function getFallbackThumbnail(videoId) {
  return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
}

function VideoPlayer({ video, active, onPlay }) {
  return (
    <div
      className="relative w-full aspect-video rounded-3xl overflow-hidden border"
      style={{ backgroundColor: "#F3F4F6", borderColor: "#E5E7EB" }}
    >
      {active ? (
        <iframe
          src={`https://www.youtube.com/embed/${video.id}?autoplay=1`}
          title={video.title}
          allow="accelerated-video; autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
        />
      ) : (
        <button
          onClick={onPlay}
          aria-label={`Play ${video.title}`}
          className="absolute inset-0 w-full h-full group"
        >
          <img
            src={getThumbnail(video.id)}
            alt={video.title}
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = getFallbackThumbnail(video.id);
            }}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/25 group-hover:bg-black/10 transition-colors" />
          <motion.span
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.92 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 sm:w-20 sm:h-20 rounded-full grid place-items-center shadow-lg"
            style={{ backgroundColor: "#6FAE3E" }}
          >
            <Play size={26} color="#ffffff" fill="#ffffff" className="ml-1" />
          </motion.span>
        </button>
      )}
    </div>
  );
}

export default function VideoSection() {
  const [featured, setFeatured] = useState(VIDEOS[0]);
  const [playing, setPlaying] = useState(false);

  function selectVideo(video) {
    setFeatured(video);
    setPlaying(false);
  }

  return (
    <section style={{ backgroundColor: "#FFFFFF" }} className="w-full px-6 lg:px-10 py-16">
      <div className="max-w-[1440px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <p className="text-xs font-bold tracking-[0.25em] mb-2" style={{ color: "#6FAE3E" }}>
            STRAIGHT FROM THE FIELD
          </p>
          <h2
            style={{ color: "#1E4620" }}
            className="text-3xl lg:text-4xl font-extrabold"
          >
            Watch Our Story
          </h2>
          <motion.div
            className="h-1 rounded-full mt-3"
            style={{ backgroundColor: "#6FAE3E" }}
            initial={{ width: 0 }}
            whileInView={{ width: 64 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          />
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2"
          >
            <VideoPlayer video={featured} active={playing} onPlay={() => setPlaying(true)} />
            <h3 className="text-lg font-bold mt-4" style={{ color: "#1E4620" }}>
              {featured.title}
            </h3>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-row lg:flex-col gap-4 overflow-x-auto lg:overflow-visible"
          >
            {VIDEOS.map((video) => {
              const isSelected = video.title === featured.title;
              return (
                <button
                  key={video.title}
                  onClick={() => selectVideo(video)}
                  className="flex items-center gap-3 rounded-2xl p-2 text-left shrink-0 w-64 lg:w-full border transition-colors"
                  style={{
                    backgroundColor: isSelected ? "#F0FDF4" : "transparent",
                    borderColor: isSelected ? "#6FAE3E" : "#E5E7EB",
                  }}
                >
                  <div className="relative w-24 h-16 rounded-lg overflow-hidden shrink-0">
                    <img
                      src={getThumbnail(video.id)}
                      alt={video.title}
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = getFallbackThumbnail(video.id);
                      }}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 grid place-items-center bg-black/20">
                      <Play size={16} color="#ffffff" fill="#ffffff" />
                    </div>
                  </div>
                  <span className="text-sm font-semibold line-clamp-2" style={{ color: "#1E4620" }}>
                    {video.title}
                  </span>
                </button>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}