"use client";

import { useState } from "react";

export default function ProductGallery({ productName, images }) {
  const [selectedImage, setSelectedImage] = useState(images[0] || "/products/beetroot_1.webp");

  return (
    <section className="rounded-[28px] border p-5 shadow-sm" style={{ backgroundColor: "#F9FAFB", borderColor: "#E5E7EB" }}>
      <div className="overflow-hidden rounded-[24px] border" style={{ backgroundColor: "#FFFFFF", borderColor: "#E5E7EB" }}>
        <img src={selectedImage} alt={productName} className="h-[440px] w-full object-contain p-8" />
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
              <img src={image} alt={`${productName} view ${index + 1}`} className="h-24 w-full object-contain p-2" />
            </button>
          );
        })}
      </div>
    </section>
  );
}
