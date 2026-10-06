export type Product = {
  slug: string;
  category: "red-wine" | "rose-wine" | "white-wine";
  title: string;
  variant: string;
  rating?: { score: number; source: string };
  price: string;
  img: string;
  varietal: string;
  region: string;
  producer: string;
  vintage: string;
};

const BOTTLE_IMG = "/Screenshot 2026-09-15 173034.png";

export const products: Product[] = [
  {
    slug: "caiarossa-vertical-case-vv",
    category: "red-wine",
    title: "Caiarossa - Vertical Case Caiarossa 15-16-17-18-19-20 - VV",
    variant: "Vertical Case Caiarossa 15-16-17-18-19-...",
    rating: { score: 97, source: "James Suckling" },
    price: "$67.99",
    img: BOTTLE_IMG,
    varietal: "Cabernet Franc Blend",
    region: "Tuscany, Italy",
    producer: "Caiarossa",
    vintage: "2015–2020",
  },
  {
    slug: "chateau-ducru-beaucaillou-gift-set",
    category: "red-wine",
    title: "Chateau Ducru Beaucaillou - 95/96/99 Gift Set - VV",
    variant: "95/96/99 Gift Set",
    rating: { score: 95, source: "Decanter" },
    price: "$485.99",
    img: BOTTLE_IMG,
    varietal: "Cabernet Sauvignon",
    region: "Saint-Julien, Bordeaux",
    producer: "Chateau Ducru Beaucaillou",
    vintage: "1995 / 1996 / 1999",
  },
  {
    slug: "chateau-belle-vue-le-chateau-2014",
    category: "red-wine",
    title: "Chateau Belle-Vue - Le Chateau - 2014",
    variant: "Le Chateau",
    price: "$58.99",
    img: BOTTLE_IMG,
    varietal: "Merlot Blend",
    region: "Haut-Médoc, Bordeaux",
    producer: "Chateau Belle-Vue",
    vintage: "2014",
  },
  {
    slug: "chateau-belle-vue-le-chateau-2013",
    category: "red-wine",
    title: "Chateau Belle-Vue - Le Chateau - 2013",
    variant: "Le Chateau",
    price: "$61.99",
    img: BOTTLE_IMG,
    varietal: "Merlot Blend",
    region: "Haut-Médoc, Bordeaux",
    producer: "Chateau Belle-Vue",
    vintage: "2013",
  },
  {
    slug: "opus-one-2019",
    category: "red-wine",
    title: "Opus One - Napa Valley Red - 2019",
    variant: "Napa Valley Red Blend",
    price: "$399.99",
    img: BOTTLE_IMG,
    varietal: "Cabernet Sauvignon Blend",
    region: "Napa Valley, California",
    producer: "Opus One Winery",
    vintage: "2019",
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}
