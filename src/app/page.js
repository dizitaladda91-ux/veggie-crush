import Herosection from "../components/homepage/herosection";
// import Banner from "../components/homepage/banner";
import Video from "../components/homepage/video";
import Blog from "../components/homepage/blogsection";
import TopSellingProducts from "@/components/homepage/topselling";
export default function Home() {
  return (
    <main className="w-full bg-[#FBF7EC]">
      <Herosection/>
      {/* <Banner/> */}
      <TopSellingProducts/>
      <Video/>
      <Blog/>
    </main>
  );
}
