import HeroSection from "@/components/homepage/herosection";
import WhoWeAre from "@/components/homepage/who-we-are";
import WhatWeDo from "@/components/homepage/what-we-do";
import ManufacturingProcess from "@/components/homepage/manufacturing-process";
import ConsumerReviews from "@/components/homepage/consumer-reviews";
import BestsellersSection from "@/components/homepage/bestsellers-section";
import FoundersDesk from "@/components/homepage/founders-desk";
import PrMediaVideos from "@/components/homepage/pr-media-videos";
import PrDoctorsVideos from "@/components/homepage/pr-doctors-videos";
import WhereToBuy from "@/components/homepage/where-to-buy";
import CurrentOffers from "@/components/homepage/current-offers";

export default function HomePage() {
  return (
    <>
      {/* 0. Hero Section */}
      <HeroSection />

      {/* 01. Who We Are */}
      <WhoWeAre />

      {/* 02. What We Do */}
      <WhatWeDo />

      {/* 03. How We Make Products (Manufacturing Unit, Working Employees & Packaging Line) */}
      <ManufacturingProcess />

      {/* 04. What Our Consumer Says */}
      <ConsumerReviews />

      {/* 05. Our Bestsellers */}
      <BestsellersSection />

      {/* 06. Idea Behind It - Founder's Desk */}
      <FoundersDesk />

      {/* 07. PR - What Major People and Agency Says About Us */}
      <PrMediaVideos />

      {/* 08. PR - Doctors of Different Domain Recommendation */}
      <PrDoctorsVideos />

      {/* 09. From Where You Can Get The Products */}
      <WhereToBuy />

      {/* 10. Abhi Purchase Karne Se Kya Offer Hai */}
      <CurrentOffers />
    </>
  );
}
