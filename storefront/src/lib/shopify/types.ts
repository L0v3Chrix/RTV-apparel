// Shopify Storefront API Types

export interface Money {
  amount: string;
  currencyCode: string;
}

export interface Image {
  url: string;
  altText: string | null;
  width: number;
  height: number;
}

export interface SelectedOption {
  name: string;
  value: string;
}

export interface ProductVariant {
  id: string;
  title: string;
  availableForSale: boolean;
  selectedOptions: SelectedOption[];
  price: Money;
  compareAtPrice: Money | null;
  image: Image | null;
  sku: string | null;
}

export interface Product {
  id: string;
  title: string;
  handle: string;
  description: string;
  descriptionHtml: string;
  vendor: string;
  productType: string;
  tags: string[];
  images: {
    nodes: Image[];
  };
  variants: {
    nodes: ProductVariant[];
  };
  options: {
    name: string;
    values: string[];
  }[];
  seo: {
    title: string | null;
    description: string | null;
  };
  priceRange: {
    minVariantPrice: Money;
    maxVariantPrice: Money;
  };
}

export interface ProductCard {
  id: string;
  title: string;
  handle: string;
  vendor: string;
  publishedAt: string;
  variants: {
    nodes: {
      id: string;
      availableForSale: boolean;
      image: Image | null;
      price: Money;
      compareAtPrice: Money | null;
      selectedOptions: SelectedOption[];
      product: {
        handle: string;
        title: string;
      };
    }[];
  };
}

export interface Collection {
  id: string;
  title: string;
  handle: string;
  description: string;
  image: Image | null;
  seo: {
    title: string | null;
    description: string | null;
  };
  products: {
    nodes: ProductCard[];
    pageInfo: PageInfo;
  };
}

export interface PageInfo {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor: string | null;
  endCursor: string | null;
}

// Cart Types
export interface CartLine {
  id: string;
  quantity: number;
  merchandise: {
    id: string;
    title: string;
    selectedOptions: SelectedOption[];
    product: {
      id: string;
      title: string;
      handle: string;
      vendor: string;
    };
    image: Image | null;
    price: Money;
    compareAtPrice: Money | null;
  };
  cost: {
    totalAmount: Money;
    amountPerQuantity: Money;
    compareAtAmountPerQuantity: Money | null;
  };
}

export interface Cart {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  lines: {
    nodes: CartLine[];
  };
  cost: {
    subtotalAmount: Money;
    totalAmount: Money;
    totalTaxAmount: Money | null;
  };
  note: string | null;
  attributes: { key: string; value: string }[];
  discountCodes: { code: string; applicable: boolean }[];
}

export interface CartLineInput {
  merchandiseId: string;
  quantity: number;
  attributes?: { key: string; value: string }[];
}

export interface CartLineUpdateInput {
  id: string;
  quantity: number;
}

// API Response types
export interface ShopifyResponse<T> {
  data: T;
  errors?: { message: string }[];
}
