"use client";

import Image from "next/image";

export default function Banner() {
  return (
    <div className="w-100px h-[100px] lg:h-[300px] relative bg-[#FBF7EC] ">
        <Image src="/homesection/banner.png" alt="Banner image" layout="fill" objectFit="contain" />
    </div>
  );
}


