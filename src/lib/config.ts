export type SiteConfig = {
  title: string;
  description: string;
  baseUrl?: string;
  currency: {
    symbol: string;
    code: string;
  };
  collections: {
    heroSlider: string;
    featuredProducts: string;
  };
};

export const siteConfig: SiteConfig = {
  title: "Template Shopify",
  description: "Astro + Shopify Bootstrap",
  currency: {
    symbol: "Kč",
    code: "CZK",
  },
  collections: {
    heroSlider: "hidden-homepage-carousel",
    featuredProducts: "featured-products",
  },
};
