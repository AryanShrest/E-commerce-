import AnnouncementBar from "@/app/components/AnnouncementBar";
import CartPageClient from "@/app/components/CartPageClient";
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";

export default function CartPage() {
  return (
    <>
      <AnnouncementBar />
      <Header />
      <CartPageClient />
      <Footer />
    </>
  );
}
