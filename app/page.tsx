import AnnouncementBar from "./components/AnnouncementBar";
import Header from "./components/Header";
import HeroBanner from "./components/HeroBanner";
import CategoryPills from "./components/CategoryPills";
import ProductSection from "./components/ProductSection";
import Footer from "./components/Footer";
import { products } from "@/lib/products";

const homeProducts = products.filter((product) => product.slug !== "opus-one-2019");

export default function Home() {
  return (
    <>
      <AnnouncementBar />
      <Header />
      <main>
        <HeroBanner />
        <CategoryPills />
        <ProductSection title="Trending Today" products={homeProducts} />
        <ProductSection title="Popular Red Wines" products={homeProducts} />
      </main>
      <Footer />
    </>
  );
}
