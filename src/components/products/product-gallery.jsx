"use client";

import { useState } from "react";
import Image from "next/image";
import ImageZoom from "@/components/products/image-zoom";
import { getCloudinaryImageUrl } from "@/lib/cloudinary-url";

export default function ProductGallery({ productName, images }) {
  const [selectedImage, setSelectedImage] = useState(images[0] || "/products/beetroot_1.webp");

  return (
    <section className="overflow-hidden rounded-[28px] border shadow-sm" style={{ backgroundColor: "#FFFFFF", borderColor: "#E5E7EB" }}>
      <div className="relative aspect-square w-full overflow-hidden bg-white">
        <ImageZoom
          src={getCloudinaryImageUrl(selectedImage, 2000)}
          alt={productName}
          className="h-full w-full"
        >
          <Image
            src={getCloudinaryImageUrl(selectedImage, 1200)}
            alt={productName}
            fill
            unoptimized
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-contain"
          />
        </ImageZoom>
      </div>

      <div className="grid grid-cols-4 gap-3 p-3 sm:p-4">
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
                  className="object-contain"
                />
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
