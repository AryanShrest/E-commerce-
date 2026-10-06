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
    { label: "SKU", value: "BCS-DUCRU-VV1" },
    { label: "Vintage", value: product.vintage },
    { label: "Region", value: product.region },
    { label: "Sub-Region", value: "Saint-Julien" },
    { label: "Varietal", value: product.varietal },
    { label: "Producer", value: product.producer },
    { label: "Size", value: "6/750 ML" },
    { label: "Color", value: "Red" },
    { label: "Product", value: product.title },
  ];

  const specRows = [
    { label: "Varietal", value: product.varietal },
    { label: "Region", value: product.region },
    { label: "Producer", value: product.producer },
    { label: "Vintage", value: product.vintage },
    { label: "SKU", value: "BCS-DUCRU-VV1" },
    { label: "Size", value: "6/750 ML" },
  ];

  return (
    <>
      <AnnouncementBar />
      <Header />
      <main className="bg-white">
        <div className="max-w-7xl mx-auto px-6 py-10">
          <div className="flex gap-10 items-start">

            {/* ── LEFT COLUMN (scrolls normally) ── */}
            <div className="flex-1 flex flex-col gap-8 min-w-0">

              {/* Product image */}
              <div className="bg-white p-10 flex flex-col items-center gap-4">
                <img
                  src={product.img}
                  alt={product.title}
                  className="max-h-96 object-contain"
                />
                <div className="flex items-center gap-4 text-gray-400">
                  <button className="hover:text-gray-600 transition" title="Share">
                    <i className="fas fa-share-alt text-lg" />
                  </button>
                  <button className="hover:text-gray-600 transition" title="Facebook">
                    <i className="fab fa-facebook text-lg" />
                  </button>
                  <button className="hover:text-gray-600 transition" title="Twitter">
                    <i className="fab fa-twitter text-lg" />
                  </button>
                </div>
                <hr className="w-full border-gray-200" />
              </div>

              {/* Description */}
              <div className="bg-white p-8">
                <h2 className="text-lg font-bold text-gray-900 mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Description
                </h2>
                <table className="w-full text-sm">
                  <tbody>
                    {descriptionRows.map(({ label, value }) => (
                      <tr key={label} className="border-b border-gray-100 last:border-0">
                        <td className="py-2.5 pr-6 text-gray-500 font-medium w-1/3">{label}</td>
                        <td className="py-2.5 text-gray-800">{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Professional Ratings */}
              <div className="bg-white p-8">
                <h2 className="text-lg font-bold text-gray-900 mb-5" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Professional Ratings
                </h2>
                {product.rating ? (
                  <div className="flex items-center gap-4 p-4 border border-gray-100 rounded-xl">
                    <div
                      className="w-14 h-14 rounded-full flex items-center justify-center text-white text-xl font-bold flex-shrink-0"
                      style={{ backgroundColor: "#4B1D7B" }}
                    >
                      {product.rating.score}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{product.rating.source}</p>
                      <p className="text-sm text-gray-500">Score: {product.rating.score} / 100</p>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-gray-400">No professional ratings available.</p>
                )}
              </div>
            </div>

            {/* ── RIGHT COLUMN (sticky card) ── */}
            <div className="w-96 flex-shrink-0" style={{ position: "sticky", top: "24px", alignSelf: "flex-start" }}>
              <div className="bg-white rounded-2xl border border-gray-200 p-6 flex flex-col gap-4">

                <div>
                  <h1 className="text-xl font-bold text-gray-900 leading-snug" style={{ fontFamily: "'Playfair Display', serif" }}>
                    {product.title}
                  </h1>
                  <p className="text-sm text-gray-500 mt-1">{product.variant}</p>
                </div>

                {product.rating && (
                  <div className="flex items-center gap-2">
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
                      style={{ backgroundColor: "#1a1a2e" }}
                    >
                      {product.rating.score}
                    </div>
                    <span className="text-sm text-gray-500">{product.rating.source}</span>
                  </div>
                )}

                <p className="text-3xl font-bold text-gray-900">{product.price}</p>

                <ProductDetailClient />

                <hr className="border-gray-200" />

                <h2 className="text-sm font-bold text-gray-900">Product Details</h2>
                <table className="w-full text-sm">
                  <tbody>
                    {specRows.map(({ label, value }) => (
                      <tr key={label} className="border-b border-gray-100 last:border-0">
                        <td className="py-2 pr-4 text-gray-500 w-2/5">{label}</td>
                        <td className="py-2 font-medium" style={{ color: "#4B1D7B" }}>{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </div>

        {/* Related products */}
        <div className="pb-10">
          <ProductSection title="You May Also Like" products={related} />
        </div>
      </main>
      <Footer />
    </>
  );
}
