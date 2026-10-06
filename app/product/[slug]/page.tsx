import { notFound } from "next/navigation";
import AnnouncementBar from "@/app/components/AnnouncementBar";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import ProductSection from "@/app/components/ProductSection";
import ProductDetailClient from "@/app/components/ProductDetailClient";
import { getProductBySlug, products } from "@/lib/products";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const related = products.filter((p) => p.slug !== slug).slice(0, 4);

  const descriptionRows = [
    { label: "Varietal", value: product.varietal },
    { label: "Region", value: product.region },
    { label: "Producer", value: product.producer },
    { label: "Vintage", value: product.vintage },
    { label: "Size", value: "750 ML" },
  ];

  return (
    <>
      <AnnouncementBar />
      <Header />
      <main className="bg-white">
        <div className="mx-auto max-w-7xl px-2 py-3 sm:px-6 sm:py-10">
          <div className="grid min-w-0 grid-cols-1 items-start gap-3 sm:gap-8 lg:grid-cols-[minmax(0,1fr)_24rem]">
            <div className="order-1 flex min-w-0 flex-col items-center gap-3 sm:gap-6 lg:col-start-1 lg:row-start-1">
              <div className="flex h-40 w-full items-center justify-center bg-white sm:h-96">
                <img src={product.img} alt={product.title} className="max-h-full max-w-full object-contain" />
              </div>
              <div className="flex items-center gap-3 text-gray-500">
                <button className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 hover:text-gray-800" title="Share" aria-label="Share product">
                  <i className="fas fa-share-alt text-xs" aria-hidden="true" />
                </button>
                <button type="button" className="flex h-8 w-8 items-center justify-center rounded border border-gray-200 p-1" aria-label="Product image thumbnail">
                  <img src={product.img} alt="" className="h-full w-full object-contain" />
                </button>
              </div>
            </div>

            <section className="order-2 min-w-0 rounded-xl border border-gray-200 bg-white p-3 sm:rounded-2xl sm:p-6 lg:col-start-2 lg:row-span-3 lg:row-start-1" style={{ position: "sticky", top: "24px", alignSelf: "flex-start" }}>
              <h1 className="text-sm font-bold leading-snug text-gray-900 sm:text-xl" style={{ fontFamily: "'Playfair Display', serif" }}>
                {product.title}
              </h1>
              <p className="mt-1 text-[10px] text-gray-500 sm:text-sm">{product.variant}</p>
              {product.rating && (
                <div className="mt-2 flex items-center gap-1.5">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full text-[9px] font-bold text-white sm:h-9 sm:w-9 sm:text-sm" style={{ backgroundColor: "#1a1a2e" }}>{product.rating.score}</span>
                  <span className="text-[10px] text-gray-600 sm:text-sm">{product.rating.source}</span>
                </div>
              )}
              <p className="mt-2 text-lg font-bold text-red-600 sm:mt-4 sm:text-3xl">{product.price}</p>
              <div className="mt-2 sm:mt-4">
                <ProductDetailClient product={product} />
              </div>
              <div className="mt-4 border-t border-gray-200 pt-3 sm:mt-6 sm:pt-5">
                <h2 className="mb-2 text-xs font-bold text-gray-900 sm:text-sm">Product Details</h2>
                <table className="w-full border-collapse text-[9px] sm:text-sm">
                  <tbody>
                    {descriptionRows.map(({ label, value }) => (
                      <tr key={label} className="border-b border-gray-100 last:border-0">
                        <td className="w-2/5 py-1.5 pr-2 text-gray-500 sm:py-2 sm:pr-4">{label}</td>
                        <td className="py-1.5 font-medium text-gray-800 sm:py-2" style={{ color: "#4B1D7B" }}>{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section className="order-3 min-w-0 px-1 py-2 sm:px-8 sm:py-6 lg:col-start-1 lg:row-start-2">
              <h2 className="mb-2 text-sm font-bold text-gray-900 sm:mb-4 sm:text-lg" style={{ fontFamily: "'Playfair Display', serif" }}>Description</h2>
              <p className="text-[10px] leading-relaxed text-gray-600 sm:text-sm">
                {product.title} is a {product.varietal} from {product.region}, produced by {product.producer}.
              </p>
            </section>

            <section className="order-4 min-w-0 px-1 py-2 sm:px-8 sm:py-6 lg:col-start-1 lg:row-start-3">
              <h2 className="mb-3 text-sm font-bold text-gray-900 sm:mb-5 sm:text-lg" style={{ fontFamily: "'Playfair Display', serif" }}>Professional Ratings</h2>
              {product.rating ? (
                <div className="flex items-center gap-3 rounded-xl border border-gray-200 p-3 sm:gap-4 sm:p-4">
                  <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full text-sm font-bold text-white sm:h-14 sm:w-14 sm:text-xl" style={{ backgroundColor: "#1a1a2e" }}>
                    {product.rating.score}
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-900 sm:text-base">{product.rating.source}</p>
                    <p className="text-[10px] text-gray-500 sm:text-sm">Score: {product.rating.score} / 100</p>
                  </div>
                </div>
              ) : (
                <p className="text-xs text-gray-400 sm:text-sm">No professional ratings available.</p>
              )}
            </section>
          </div>
        </div>

        {/* Related products */}
        <div className="pb-6 sm:pb-10">
          <ProductSection title="Related items" products={related} />
        </div>
      </main>
      <Footer />
    </>
  );
}
