import { notFound } from "next/navigation";
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import ShopListingClient from "@/app/components/ShopListingClient";
import { categories, getCategory } from "@/lib/products";

export function generateStaticParams() {
  return categories.map((category) => ({ category: category.slug }));
}

export default async function ShopCategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ category: string }>;
  searchParams: Promise<{ sub?: string }>;
}) {
  const [{ category }, { sub }] = await Promise.all([params, searchParams]);
  if (!getCategory(category)) notFound();

  return (
    <>
      <Header />
      <ShopListingClient category={category} sub={sub} />
      <Footer />
    </>
  );
}
