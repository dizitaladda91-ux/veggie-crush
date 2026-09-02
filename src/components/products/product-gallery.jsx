"use client";

import { useState } from "react";

export default function ProductGallery({ productName, images }) {
  const [selectedImage, setSelectedImage] = useState(images[0] || "/products/beetroot_1.webp");

  return (
    <section className="rounded-[28px] border p-5" style={{ backgroundColor: "#F0E8D6", borderColor: "#E7DCC2" }}>
      <div className="overflow-hidden rounded-[24px] border" style={{ backgroundColor: "#FBF7EC", borderColor: "#E7DCC2" }}>
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
                backgroundColor: isSelected ? "#F5EFE3" : "#FBF7EC",
                borderColor: isSelected ? "#6FAE3E" : "#E7DCC2",
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
