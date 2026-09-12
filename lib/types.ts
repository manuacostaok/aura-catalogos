export type FontPreset = "platform" | "editorial-warm" | "editorial-bold";

export type ThemeTokens = {
  bg: string;
  bgAlt: string;
  surface: string;
  surfaceAlt: string;
  text: string;
  textMuted: string;
  border: string;
  accent: string;
  accentStrong: string;
  accentInk: string;
  success: string;
  successInk: string;
  radius: string;
  fontPreset: FontPreset;
};

export type FilterOption = {
  id: string;
  label: string;
};

export type FilterGroup = {
  id: string;
  label: string;
  options: FilterOption[];
};

export type ProductSpec = {
  label: string;
  value: string;
};

export type Product = {
  id: string;
  name: string;
  subtitle: string;
  /** One option id per filter group this product belongs to. */
  categoryIds: string[];
  price: number;
  priceNote?: string;
  stock?: string;
  specs: ProductSpec[];
  badges?: string[];
  /** Seed used to derive this product's generated artwork — swap for a real photo URL later. */
  artSeed: string;
  featured?: boolean;
};

export type Tenant = {
  slug: string;
  name: string;
  tagline: string;
  niche: string;
  whatsapp: string;
  instagram?: string;
  currency: string;
  locale: string;
  theme: ThemeTokens;
  hero: {
    eyebrow: string;
    heading: string;
    description: string;
  };
  filterGroups: FilterGroup[];
  products: Product[];
  contactNote: string;
  legalNote?: string;
};
