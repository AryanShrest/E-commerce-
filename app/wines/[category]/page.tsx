import { notFound } from "next/navigation";
import AnnouncementBar from "@/app/components/AnnouncementBar";
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import WineListingClient from "@/app/components/WineListingClient";

const categorySlugs = [
  "champagne-and-sparkling",
  "dessert-sherry-and-port",
  "rose-wine",
  "red-wine",
  "white-wine",
];

export function generateStaticParams() {
  return categorySlugs.map((category) => ({ category }));
}

export default async function WineCategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  if (!categorySlugs.includes(category)) notFound();

  return (
    <>
      <AnnouncementBar />
      <Header />
      <WineListingClient category={category} />
      <Footer />
    </>
  );
}
