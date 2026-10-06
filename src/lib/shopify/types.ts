export type Money = {
  amount: string;
  currencyCode: string;
};

export type Image = {
  id: string;
  url: string;
  altText: string | null;
  width: number | null;
  height: number | null;
};

export type SelectedOption = {
  name: string;
  value: string;
};

export type ProductVariant = {
  id: string;
  title: string;
  availableForSale: boolean;
  price: Money;
  compareAtPrice: Money | null;
  selectedOptions: SelectedOption[];
  image: Image | null;
  sku: string | null;
  quantityAvailable: number | null;
};

export type Product = {
  id: string;
  handle: string;
  title: string;
  description: string;
  descriptionHtml: string;
  options: { id: string; name: string; values: string[] }[];
  priceRange: { minVariantPrice: Money; maxVariantPrice: Money };
  compareAtPriceRange: { minVariantPrice: Money; maxVariantPrice: Money } | null;
  featuredImage: Image | null;
  images: Image[];
  variants: ProductVariant[];
  tags: string[];
  productType: string | null;
  vendor: string | null;
  publishedAt: string | null;
  updatedAt: string | null;
};

export type Collection = {
  id: string;
  handle: string;
  title: string;
  description: string | null;
  image: Image | null;
  products: Product[];
};

export type CartLine = {
  id: string;
  quantity: number;
  attributes: { key: string; value: string }[];
  merchandise: {
    id: string;
    title: string;
    selectedOptions: SelectedOption[];
  };
  cost: {
    totalAmount: Money;
  };
};

export type Cart = {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  lines: CartLine[];
  cost: {
    subtotalAmount: Money;
    totalAmount: Money;
    totalTaxAmount: Money | null;
  };
  buyerIdentity: {
    email: string | null;
    phone: string | null;
  } | null;
};

export type MenuItem = {
  title: string;
  url: string;
};

export type Menu = {
  id: string;
  items: MenuItem[];
};

export type Page = {
  id: string;
  handle: string;
  title: string;
  body: string | null;
  bodySummary: string | null;
};

export type Customer = {
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  phone: string | null;
  acceptsMarketing: boolean;
};

export type Shop = {
  name: string;
  description: string | null;
  primaryDomain: {
    url: string;
    host: string;
  };
};

export type PageInfo = {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor: string | null;
  endCursor: string | null;
};

export type Connection<T> = {
  edges: { cursor: string; node: T }[];
  pageInfo: PageInfo;
};
