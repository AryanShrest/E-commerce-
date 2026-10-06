import AnnouncementBar from "@/app/components/AnnouncementBar";
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import WineListingClient from "@/app/components/WineListingClient";

export default function WinesPage() {
  return (
    <>
      <AnnouncementBar />
      <Header />
      <WineListingClient />
      <Footer />
    </>
  );
}
