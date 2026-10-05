import Herosection from "../components/homepage/herosection";
import FeaturesStrip from "../components/homepage/features-strip";
import CategoriesSection from "../components/homepage/categories-section";
import TopSellingProducts from "@/components/homepage/topselling";
import PromoBanners from "../components/homepage/promo-banners";
import Testimonials from "../components/homepage/testimonials";
import Video from "../components/homepage/video";
import Blog from "../components/homepage/blogsection";
import Newsletter from "../components/homepage/newsletter";

export default function Home() {
  return (
    <main className="w-full bg-[#FBF7EC]">
      <Herosection />
      <FeaturesStrip />
      <CategoriesSection />
      <TopSellingProducts />
      <PromoBanners />
      <Testimonials />
      <Video />
      <Blog />
      <Newsletter />
    </main>
  );
}
