import AnnouncementBar from "@/app/components/AnnouncementBar";
import CheckoutPageClient from "@/app/components/CheckoutPageClient";
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";

export default function CheckoutPage() {
  return (
    <>
      <AnnouncementBar />
      <Header />
      <CheckoutPageClient />
      <Footer />
    </>
  );
}
