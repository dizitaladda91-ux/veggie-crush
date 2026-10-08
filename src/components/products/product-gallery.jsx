"use client";

import { useState } from "react";
import Image from "next/image";
import { getCloudinaryImageUrl } from "@/lib/cloudinary-url";

export default function ProductGallery({ productName, images }) {
  const [selectedImage, setSelectedImage] = useState(images[0] || "/products/beetroot_1.webp");

  return (
    <section className="rounded-[28px] border p-5 shadow-sm" style={{ backgroundColor: "#F9FAFB", borderColor: "#E5E7EB" }}>
      <div className="relative h-[440px] overflow-hidden rounded-[24px] border" style={{ backgroundColor: "#FFFFFF", borderColor: "#E5E7EB" }}>
        <Image
          src={getCloudinaryImageUrl(selectedImage, 1200)}
          alt={productName}
          fill
          unoptimized
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-contain p-8"
        />
      </div>

      <div className="mt-4 grid grid-cols-4 gap-3">
        {images.map((image, index) => {
          const isSelected = image === selectedImage;

          return (
            <button
              key={`${image}-${index}`}
              type="button"
              onClick={() => setSelectedImage(image)}
              className="overflow-hidden rounded-2xl border transition-all duration-200"
              style={{
                backgroundColor: isSelected ? "#F0FDF4" : "#FFFFFF",
                borderColor: isSelected ? "#6FAE3E" : "#E5E7EB",
                boxShadow: isSelected ? "0 0 0 2px rgba(111, 174, 62, 0.2)" : "none",
              }}
            >
              <div className="relative h-24 w-full">
                <Image
                  src={getCloudinaryImageUrl(image, 160)}
                  alt={`${productName} view ${index + 1}`}
                  fill
                  unoptimized
                  sizes="96px"
                  className="object-contain p-2"
                />
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
