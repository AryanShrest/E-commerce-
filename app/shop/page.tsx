import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import ShopListingClient from "@/app/components/ShopListingClient";

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ brand?: string }>;
}) {
  const { brand } = await searchParams;

  return (
    <>
      <Header />
      <ShopListingClient key={brand ?? "all"} initialBrand={brand} />
      <Footer />
    </>
  );
}
