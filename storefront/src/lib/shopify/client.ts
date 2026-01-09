import type { ShopifyResponse } from './types';

const SHOPIFY_STORE_DOMAIN = process.env.SHOPIFY_STORE_DOMAIN!;
const SHOPIFY_STOREFRONT_API_TOKEN = process.env.SHOPIFY_STOREFRONT_API_TOKEN!;
const SHOPIFY_STOREFRONT_API_VERSION =
  process.env.SHOPIFY_STOREFRONT_API_VERSION || '2024-10';

if (!SHOPIFY_STORE_DOMAIN) {
  throw new Error('SHOPIFY_STORE_DOMAIN is required');
}

if (!SHOPIFY_STOREFRONT_API_TOKEN) {
  throw new Error('SHOPIFY_STOREFRONT_API_TOKEN is required');
}

const endpoint = `https://${SHOPIFY_STORE_DOMAIN}/api/${SHOPIFY_STOREFRONT_API_VERSION}/graphql.json`;

export async function shopifyFetch<T>({
  query,
  variables = {},
  cache = 'force-cache',
  tags,
}: {
  query: string;
  variables?: Record<string, unknown>;
  cache?: RequestCache;
  tags?: string[];
}): Promise<T> {
  const options: RequestInit = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_API_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
    cache,
  };

  // Add Next.js specific options for revalidation
  if (tags) {
    (options as any).next = { tags };
  }

  const response = await fetch(endpoint, options);

  if (!response.ok) {
    throw new Error(
      `Shopify API error: ${response.status} ${response.statusText}`
    );
  }

  const json: ShopifyResponse<T> = await response.json();

  if (json.errors) {
    console.error('Shopify GraphQL errors:', json.errors);
    throw new Error(json.errors.map((e) => e.message).join('\n'));
  }

  return json.data;
}

// Helper for no-cache requests (cart operations, etc.)
export async function shopifyFetchNoCache<T>({
  query,
  variables = {},
}: {
  query: string;
  variables?: Record<string, unknown>;
}): Promise<T> {
  return shopifyFetch<T>({
    query,
    variables,
    cache: 'no-store',
  });
}
