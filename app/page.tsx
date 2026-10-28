import Header from "./components/Header";
import HeroBanner from "./components/HeroBanner";
import ProductSection from "./components/ProductSection";
import Footer from "./components/Footer";
import { products } from "@/lib/products";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroBanner />
        <ProductSection title="Trending Today" products={products} />
        <ProductSection title="New Arrivals" products={[...products].reverse()} />
      </main>
      <Footer />
    </>
  );
}
