import JashnHeroSlider from "@/components/homepage/jashn-hero-slider";
import JashnAboutSection from "@/components/homepage/jashn-about-section";
import JashnProductsShowcase from "@/components/homepage/jashn-products-showcase";
import WhyVeggieCrush from "@/components/homepage/why-veggiecrush";
import JashnExperienceSection from "@/components/homepage/jashn-experience-section";
import JashnStatsBar from "@/components/homepage/jashn-stats-bar";
import Testimonials from "@/components/homepage/testimonials";
import SocialGram from "@/components/homepage/social-gram";
import BlogSection from "@/components/homepage/blogsection";
import JashnContactSection from "@/components/homepage/jashn-contact-section";

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <main className="w-full bg-[#FAF7F2] overflow-x-hidden selection:bg-[#7CB342] selection:text-white">
      {/* 1. Jashn Realty Style Luxury Hero Slider Banner */}
      <JashnHeroSlider />

      {/* 2. Jashn About Us & Overview with Left Accent Borders */}
      <JashnAboutSection />

      {/* 3. Jashn Projects / Product Category Showcase (Single Powders, Blends, Combos) */}
      <JashnProductsShowcase />

      {/* 4. Why VeggieCrush - 6-Step Machine-to-Jar Process & Animated Product Grid */}
      <WhyVeggieCrush />

      {/* 5. Jashn Experience Section (Visual Tour of Botanical Processing) */}
      <JashnExperienceSection />

      {/* 6. Jashn Stats Impact Bar (10,000+ Kitchens, 100% Pure, 0% Additives) */}
      <JashnStatsBar />

      {/* 7. Testimonials & Verified Customer Reviews */}
      <Testimonials />

      {/* 8. VeggieCrush on the #Gram Community Stories */}
      <SocialGram />

      {/* 9. Blog & Superfood Nutrition Guides */}
      <BlogSection />

      {/* 10. Jashn Contact & Inquiry Form + Newsletter 10% Off Banner */}
      <JashnContactSection />
    </main>
  );
}
