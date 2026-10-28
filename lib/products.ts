export type CategorySlug =
  | "makeup"
  | "skin-care"
  | "hair-care"
  | "tools"
  | "bath-body";

export type Product = {
  slug: string;
  category: CategorySlug;
  subCategory: string;
  subCategoryLabel: string;
  title: string;
  brand: string;
  price: number;
  img: string;
  size?: string;
  description: string;
};

export type SubCategory = { slug: string; label: string };

export type Category = {
  slug: CategorySlug;
  label: string;
  color: string;
  subs: SubCategory[];
};

export const categories: Category[] = [
  {
    slug: "makeup",
    label: "Make Up",
    color: "#E45D89",
    subs: [
      { slug: "face", label: "Face" },
      { slug: "eyes", label: "Eyes" },
      { slug: "lips", label: "Lips" },
      { slug: "brows", label: "Brows" },
      { slug: "brushes", label: "Brushes" },
    ],
  },
  {
    slug: "skin-care",
    label: "Skin Care",
    color: "#F9A0BE",
    subs: [
      { slug: "eye-cream", label: "Eye Cream" },
      { slug: "sunscreen", label: "Sunscreen" },
      { slug: "cleanser", label: "Cleanser" },
      { slug: "face-cream", label: "Face Cream" },
    ],
  },
  {
    slug: "hair-care",
    label: "Hair Care",
    color: "#B32E5C",
    subs: [
      { slug: "shampoo", label: "Shampoo" },
      { slug: "hair-serum", label: "Hair Serum" },
      { slug: "hair-spray", label: "Hair Spray" },
    ],
  },
  {
    slug: "tools",
    label: "Tools",
    color: "#F07CA4",
    subs: [
      { slug: "sponges", label: "Sponges & Spatulas" },
      { slug: "brush-sets", label: "Brush Sets" },
      { slug: "cases", label: "Cases & Boxes" },
    ],
  },
  {
    slug: "bath-body",
    label: "Bath & Body",
    color: "#FDC4D8",
    subs: [
      { slug: "body-scrub", label: "Scrubs & Exfoliators" },
      { slug: "body-wash", label: "Body Wash" },
      { slug: "cleansing-bar", label: "Cleansing Bars" },
    ],
  },
];

export const products: Product[] = [
  {
    slug: "essential-18-color-eyeshadow-palette-782",
    category: "makeup",
    subCategory: "eyes",
    subCategoryLabel: "Eyes",
    title: "Essential 18 Color Eyeshadow Palette",
    brand: "Daily Life Forever52",
    price: 2615,
    img: "/products/essential-18-color-eyeshadow-palette-782.png",
    size: "18 shades",
    description:
      "A versatile 18-shade eyeshadow palette with a mix of matte and shimmer finishes for everyday and evening looks.",
  },
  {
    slug: "backstage-essential-8-color-blush-palette-32g",
    category: "makeup",
    subCategory: "face",
    subCategoryLabel: "Face",
    title: "Essential: 8-Color Blush Palette 32g",
    brand: "Daily Life Forever52",
    price: 3155,
    img: "/products/backstage-essential-8-color-blush-palette-32g.png",
    size: "32 g",
    description:
      "A creamy, micro-finished eight-shade blush palette for all skin tones, with buildable pigment and a silky texture.",
  },
  {
    slug: "luxe-matte-liquid-foundation",
    category: "makeup",
    subCategory: "face",
    subCategoryLabel: "Face",
    title: "Luxe Matte Liquid Foundation",
    brand: "Daily Life Forever52",
    price: 1400,
    img: "/products/luxe-matte-liquid-foundation.png",
    description:
      "Buildable full coverage with an ultra-lightweight matte finish that resists sweat, humidity and water.",
  },
  {
    slug: "velvet-rose-matte-lipstick",
    category: "makeup",
    subCategory: "lips",
    subCategoryLabel: "Lips",
    title: "Velvet Rose Matte Lipstick",
    brand: "Daily Life Forever52",
    price: 1075,
    img: "/products/velvet-rose-matte-lipstick.png",
    description:
      "A creamy matte lipstick made with rose oil essentials, in a range of nudes that nourish while adding color.",
  },
  {
    slug: "academic-under-eye-cream",
    category: "skin-care",
    subCategory: "eye-cream",
    subCategoryLabel: "Eye Cream",
    title: "Academic Under Eye Cream",
    brand: "Daily Life Forever52",
    price: 1400,
    img: "/products/academic-under-eye-cream.png",
    description:
      "A lightweight, fast-absorbing eye cream with caffeine, niacinamide and hyaluronic acid that hydrates, de-puffs and brightens.",
  },
  {
    slug: "mild-sun-cream-pink-tone-up",
    category: "skin-care",
    subCategory: "sunscreen",
    subCategoryLabel: "Sunscreen",
    title: "Mild Sun Cream Pink Tone Up",
    brand: "Beausta",
    price: 1775,
    img: "/products/mild-sun-cream-pink-tone-up.png",
    size: "SPF 50+ PA++++",
    description:
      "A tone-up sunscreen that brightens and evens the complexion while providing broad-spectrum SPF 50+ PA++++ protection.",
  },
  {
    slug: "teen-derm-gel-sensitive-deep-cleansing-gel-100ml",
    category: "skin-care",
    subCategory: "cleanser",
    subCategoryLabel: "Cleanser",
    title: "Teen Derm Gel Sensitive Deep Cleansing Gel 100ml",
    brand: "ISIS Pharma",
    price: 2080,
    img: "/products/teen-derm-gel-sensitive-deep-cleansing-gel-100ml.png",
    size: "100 ml",
    description:
      "A gentle deep-cleansing gel for oily, combination and acne-prone sensitive skin, suitable for daily use.",
  },
  {
    slug: "cicapro-cream",
    category: "skin-care",
    subCategory: "face-cream",
    subCategoryLabel: "Face Cream",
    title: "Cicapro Cream",
    brand: "ISIS Pharma",
    price: 2050,
    img: "/products/cicapro-cream.png",
    description:
      "A restorative cream that soothes, repairs and deeply hydrates irritated skin with an invisible, non-greasy finish.",
  },
  {
    slug: "style-guide-natural-flex-heat-hair-spray-200ml",
    category: "hair-care",
    subCategory: "hair-spray",
    subCategoryLabel: "Hair Spray",
    title: "Style Guide Natural Flex Heat Hair Spray 200ml",
    brand: "Urban Care",
    price: 1450,
    img: "/products/style-guide-natural-flex-heat-hair-spray-200ml.png",
    size: "200 ml",
    description:
      "A flexible-hold hair spray with botanical keratin complex and UV filter that protects against heat and humidity.",
  },
  {
    slug: "0atks",
    category: "hair-care",
    subCategory: "hair-serum",
    subCategoryLabel: "Hair Serum",
    title: "Densyl-P Advanced Hair Growth Serum 50ml",
    brand: "Dermpix",
    price: 2000,
    img: "/products/0atks.png",
    size: "50 ml",
    description:
      "A leave-in scalp serum with Redensyl, Procapil and caffeine that supports follicle strength and helps reduce hair fall.",
  },
  {
    slug: "anti-dandruff-shampoo-120ml",
    category: "hair-care",
    subCategory: "shampoo",
    subCategoryLabel: "Shampoo",
    title: "Anti Dandruff Shampoo 120ML",
    brand: "Neutriderm",
    price: 1610,
    img: "/products/anti-dandruff-shampoo-120ml.png",
    size: "120 ml",
    description:
      "An anti-fungal shampoo that gently cleanses the scalp, removes excess sebum and reduces dandruff flakes.",
  },
  {
    slug: "dry-scalp-shampoo-250ml",
    category: "hair-care",
    subCategory: "shampoo",
    subCategoryLabel: "Shampoo",
    title: "Dry Scalp Shampoo 250ML",
    brand: "Dermavive",
    price: 2530,
    img: "/products/dry-scalp-shampoo-250ml.png",
    size: "250 ml",
    description:
      "A soap-free, pH-balanced shampoo that cleanses and hydrates a dry, sensitive scalp.",
  },
  {
    slug: "skin-like-blend-air-soft-puff-sponge",
    category: "tools",
    subCategory: "sponges",
    subCategoryLabel: "Sponges & Spatulas",
    title: "Skin-Like Blend Air-Soft Puff & Sponge",
    brand: "Daily Life Forever52",
    price: 515,
    img: "/products/skin-like-blend-air-soft-puff-sponge.png",
    description:
      "An ultra-soft, bouncy puff and sponge for seamless foundation, concealer and powder application, wet or dry.",
  },
  {
    slug: "beauty-sponge",
    category: "tools",
    subCategory: "sponges",
    subCategoryLabel: "Sponges & Spatulas",
    title: "Beauty Sponge",
    brand: "Daily Life Forever52",
    price: 515,
    img: "/products/beauty-sponge.jpg",
    description:
      "A pear-shaped makeup sponge for blending, contouring and a flawless, even finish.",
  },
  {
    slug: "5fry8e",
    category: "tools",
    subCategory: "brush-sets",
    subCategoryLabel: "Brush Sets",
    title: "9 Pieces Brush Set + Sponge + Cleaner",
    brand: "Character Cosmetics",
    price: 5000,
    img: "/products/5fry8e.png",
    size: "9 pieces",
    description:
      "A handcrafted nine-piece brush set with synthetic hair, wooden handles, a blending sponge and cleaner.",
  },
  {
    slug: "make-up-studio-box-medium-5x-type-b",
    category: "tools",
    subCategory: "cases",
    subCategoryLabel: "Cases & Boxes",
    title: "Make Up Studio Box Medium 5x Type B",
    brand: "Make Up Studio",
    price: 1380,
    img: "/products/make-up-studio-box-medium-5x-type-b.jpg",
    size: "5 refills",
    description:
      "A refillable medium palette box with a soft-touch lid and mirror, holding five round refills.",
  },
  {
    slug: "c-scrub-50gm",
    category: "bath-body",
    subCategory: "body-scrub",
    subCategoryLabel: "Scrubs & Exfoliators",
    title: "C Scrub 50GM",
    brand: "Neutriderm",
    price: 4600,
    img: "/products/c-scrub-50gm.png",
    size: "50 g",
    description:
      "A vitamin C exfoliating scrub that smooths texture, helps reduce dark spots and reveals brighter skin.",
  },
  {
    slug: "brightening-bar-120gm",
    category: "bath-body",
    subCategory: "cleansing-bar",
    subCategoryLabel: "Cleansing Bars",
    title: "Brightening Bar 120GM",
    brand: "Neutriderm",
    price: 2645,
    img: "/products/brightening-bar-120gm.png",
    size: "120 g",
    description:
      "A pH-balanced brightening bar with vitamin C and retinol that cleanses and helps even skin tone.",
  },
  {
    slug: "monoi-oil-ylang-ylang-exfoliating-body-scrub-250ml",
    category: "bath-body",
    subCategory: "body-scrub",
    subCategoryLabel: "Scrubs & Exfoliators",
    title: "Monoi Oil & Ylang Ylang Exfoliating Body Scrub 250ML",
    brand: "Urban Care",
    price: 2000,
    img: "/products/monoi-oil-ylang-ylang-exfoliating-body-scrub-250ml.png",
    size: "250 ml",
    description:
      "A purifying body scrub with apricot seeds, monoi and ylang ylang oil that smooths and nourishes the skin.",
  },
  {
    slug: "lavender-vanilla-body-wash-500ml",
    category: "bath-body",
    subCategory: "body-wash",
    subCategoryLabel: "Body Wash",
    title: "Lavender Vanilla Body Wash 500ml",
    brand: "Urban Care",
    price: 1520,
    img: "/products/lavender-vanilla-body-wash-500ml.png",
    size: "500 ml",
    description:
      "A vegan shower gel with lavender and vanilla extracts that gently cleanses without drying the skin.",
  },
];

export const brands = [...new Set(products.map((product) => product.brand))];

export function formatPrice(amount: number) {
  return `Rs. ${amount.toLocaleString("en-IN")}`;
}

export function getCategory(slug: string): Category | undefined {
  return categories.find((category) => category.slug === slug);
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}
