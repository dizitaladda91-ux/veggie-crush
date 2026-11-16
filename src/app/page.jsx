import Hero from "@/components/Hero";
import SectionDivider from "@/components/SectionDivider";
import Products from "@/components/Products";
import WhyUs from "@/components/WhyUs";
import About from "@/components/About";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";

export default function HomePage() {
  return (
    <>
      {/* 1. Hero Section (Cream background) */}
      <Hero />

      {/* Curved orange-to-green swoosh transition to Products */}
      <SectionDivider className="bg-brand-cream" />

      {/* 2. Products Section (White background) */}
      <Products />

      {/* Curved orange-to-green swoosh transition to Why Us */}
      <SectionDivider flip className="bg-white" />

      {/* 3. Why Choose Us Section (Cream background) */}
      <WhyUs />

      {/* Curved orange-to-green swoosh transition to About */}
      <SectionDivider className="bg-brand-cream" />

      {/* 4. About Our Farm Section (White background) */}
      <About />

      {/* Curved orange-to-green swoosh transition to Testimonials */}
      <SectionDivider flip className="bg-white" />

      {/* 5. Testimonials Section (Cream background) */}
      <Testimonials />

      {/* Curved orange-to-green swoosh transition to Contact */}
      <SectionDivider className="bg-brand-cream" />

      {/* 6. Contact Section (White background) */}
      <Contact />
    </>
  );
}
