import Herosection from "../components/homepage/herosection";
import NewArrivals from "@/components/homepage/new-arrivals";
import CategoriesSection from "../components/homepage/categories-section";
import FromSeedToTable from "../components/homepage/from-seed-to-table";
import SubscriptionBoxes from "../components/homepage/subscription-boxes";
import SocialGram from "../components/homepage/social-gram";
import Newsletter from "../components/homepage/newsletter";

export default function Home() {
  return (
    <main className="w-full bg-white">
      {/* 1. Hero Section matching Wix comp-mhs1bc6l */}
      <Herosection />

      {/* 2. New Arrivals matching Wix comp-ml7u8bz8 */}
      <NewArrivals />

      {/* 3. Shop by Category matching Wix comp-ml7ubq9z */}
      <CategoriesSection />

      {/* 4. From Seed to Table (Brand Philosophy) matching Wix comp-ml7whu8h */}
      <FromSeedToTable />

      {/* 5. Shop Our Farm Subscription Boxes matching Wix comp-ml7xizsf */}
      <SubscriptionBoxes />

      {/* 6. VeggieCrush on the #Gram matching Wix comp-ml7x2wtq */}
      <SocialGram />

      {/* 7. Newsletter matching Wix comp-ml7xiso4 */}
      <Newsletter />
    </main>
  );
}
