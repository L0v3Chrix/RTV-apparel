import { shopifyFetch, shopifyFetchNoCache } from './client';
import {
  PRODUCT_CARD_FRAGMENT,
  PRODUCT_FRAGMENT,
  COLLECTION_FRAGMENT,
  CART_FRAGMENT,
} from './fragments';
import type {
  Product,
  ProductCard,
  Collection,
  Cart,
  CartLineInput,
  CartLineUpdateInput,
} from './types';

// ============================================
// PRODUCT QUERIES
// ============================================

const GET_PRODUCTS_QUERY = `
  query getProducts($first: Int!, $after: String) {
    products(first: $first, after: $after) {
      nodes {
        ...ProductCard
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
  ${PRODUCT_CARD_FRAGMENT}
`;

export async function getProducts(first = 20, after?: string) {
  const data = await shopifyFetch<{
    products: { nodes: ProductCard[]; pageInfo: { hasNextPage: boolean; endCursor: string } };
  }>({
    query: GET_PRODUCTS_QUERY,
    variables: { first, after },
    tags: ['products'],
  });
  return data.products;
}

const GET_FEATURED_PRODUCTS_QUERY = `
  query getFeaturedProducts($first: Int!) {
    products(first: $first, sortKey: BEST_SELLING) {
      nodes {
        ...ProductCard
      }
    }
  }
  ${PRODUCT_CARD_FRAGMENT}
`;

export async function getFeaturedProducts(first = 8) {
  const data = await shopifyFetch<{
    products: { nodes: ProductCard[] };
  }>({
    query: GET_FEATURED_PRODUCTS_QUERY,
    variables: { first },
    tags: ['products'],
  });
  return data.products.nodes;
}

const GET_PRODUCT_BY_HANDLE_QUERY = `
  query getProductByHandle($handle: String!) {
    product(handle: $handle) {
      ...Product
    }
  }
  ${PRODUCT_FRAGMENT}
`;

export async function getProductByHandle(handle: string) {
  const data = await shopifyFetch<{ product: Product | null }>({
    query: GET_PRODUCT_BY_HANDLE_QUERY,
    variables: { handle },
    tags: ['products', `product-${handle}`],
  });
  return data.product;
}

const GET_PRODUCT_RECOMMENDATIONS_QUERY = `
  query getProductRecommendations($productId: ID!) {
    productRecommendations(productId: $productId) {
      ...ProductCard
    }
  }
  ${PRODUCT_CARD_FRAGMENT}
`;

export async function getProductRecommendations(productId: string) {
  const data = await shopifyFetch<{
    productRecommendations: ProductCard[] | null;
  }>({
    query: GET_PRODUCT_RECOMMENDATIONS_QUERY,
    variables: { productId },
    tags: ['products'],
  });
  return data.productRecommendations || [];
}

// ============================================
// COLLECTION QUERIES
// ============================================

const GET_COLLECTIONS_QUERY = `
  query getCollections($first: Int!) {
    collections(first: $first) {
      nodes {
        ...Collection
      }
    }
  }
  ${COLLECTION_FRAGMENT}
`;

export async function getCollections(first = 20) {
  const data = await shopifyFetch<{
    collections: { nodes: Omit<Collection, 'products'>[] };
  }>({
    query: GET_COLLECTIONS_QUERY,
    variables: { first },
    tags: ['collections'],
  });
  return data.collections.nodes;
}

const GET_COLLECTION_BY_HANDLE_QUERY = `
  query getCollectionByHandle(
    $handle: String!
    $first: Int!
    $after: String
    $sortKey: ProductCollectionSortKeys
    $reverse: Boolean
  ) {
    collection(handle: $handle) {
      ...Collection
      products(first: $first, after: $after, sortKey: $sortKey, reverse: $reverse) {
        nodes {
          ...ProductCard
        }
        pageInfo {
          hasNextPage
          hasPreviousPage
          startCursor
          endCursor
        }
      }
    }
  }
  ${COLLECTION_FRAGMENT}
  ${PRODUCT_CARD_FRAGMENT}
`;

export type ProductSortKey =
  | 'MANUAL'
  | 'BEST_SELLING'
  | 'CREATED'
  | 'PRICE'
  | 'RELEVANCE'
  | 'TITLE';

export async function getCollectionByHandle(
  handle: string,
  options?: {
    first?: number;
    after?: string;
    sortKey?: ProductSortKey;
    reverse?: boolean;
  }
) {
  const { first = 12, after, sortKey = 'MANUAL', reverse = false } = options || {};

  const data = await shopifyFetch<{ collection: Collection | null }>({
    query: GET_COLLECTION_BY_HANDLE_QUERY,
    variables: { handle, first, after, sortKey, reverse },
    tags: ['collections', `collection-${handle}`],
  });
  return data.collection;
}

// ============================================
// CART QUERIES & MUTATIONS
// ============================================

const CREATE_CART_MUTATION = `
  mutation createCart($lines: [CartLineInput!]) {
    cartCreate(input: { lines: $lines }) {
      cart {
        ...Cart
      }
      userErrors {
        field
        message
      }
    }
  }
  ${CART_FRAGMENT}
`;

export async function createCart(lines?: CartLineInput[]) {
  const data = await shopifyFetchNoCache<{
    cartCreate: {
      cart: Cart;
      userErrors: { field: string; message: string }[];
    };
  }>({
    query: CREATE_CART_MUTATION,
    variables: { lines },
  });

  if (data.cartCreate.userErrors.length > 0) {
    throw new Error(data.cartCreate.userErrors.map((e) => e.message).join('\n'));
  }

  return data.cartCreate.cart;
}

const GET_CART_QUERY = `
  query getCart($cartId: ID!) {
    cart(id: $cartId) {
      ...Cart
    }
  }
  ${CART_FRAGMENT}
`;

export async function getCart(cartId: string) {
  const data = await shopifyFetchNoCache<{ cart: Cart | null }>({
    query: GET_CART_QUERY,
    variables: { cartId },
  });
  return data.cart;
}

const ADD_TO_CART_MUTATION = `
  mutation addToCart($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart {
        ...Cart
      }
      userErrors {
        field
        message
      }
    }
  }
  ${CART_FRAGMENT}
`;

export async function addToCart(cartId: string, lines: CartLineInput[]) {
  const data = await shopifyFetchNoCache<{
    cartLinesAdd: {
      cart: Cart;
      userErrors: { field: string; message: string }[];
    };
  }>({
    query: ADD_TO_CART_MUTATION,
    variables: { cartId, lines },
  });

  if (data.cartLinesAdd.userErrors.length > 0) {
    throw new Error(data.cartLinesAdd.userErrors.map((e) => e.message).join('\n'));
  }

  return data.cartLinesAdd.cart;
}

const UPDATE_CART_MUTATION = `
  mutation updateCart($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      cart {
        ...Cart
      }
      userErrors {
        field
        message
      }
    }
  }
  ${CART_FRAGMENT}
`;

export async function updateCart(cartId: string, lines: CartLineUpdateInput[]) {
  const data = await shopifyFetchNoCache<{
    cartLinesUpdate: {
      cart: Cart;
      userErrors: { field: string; message: string }[];
    };
  }>({
    query: UPDATE_CART_MUTATION,
    variables: { cartId, lines },
  });

  if (data.cartLinesUpdate.userErrors.length > 0) {
    throw new Error(data.cartLinesUpdate.userErrors.map((e) => e.message).join('\n'));
  }

  return data.cartLinesUpdate.cart;
}

const REMOVE_FROM_CART_MUTATION = `
  mutation removeFromCart($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart {
        ...Cart
      }
      userErrors {
        field
        message
      }
    }
  }
  ${CART_FRAGMENT}
`;

export async function removeFromCart(cartId: string, lineIds: string[]) {
  const data = await shopifyFetchNoCache<{
    cartLinesRemove: {
      cart: Cart;
      userErrors: { field: string; message: string }[];
    };
  }>({
    query: REMOVE_FROM_CART_MUTATION,
    variables: { cartId, lineIds },
  });

  if (data.cartLinesRemove.userErrors.length > 0) {
    throw new Error(data.cartLinesRemove.userErrors.map((e) => e.message).join('\n'));
  }

  return data.cartLinesRemove.cart;
}
