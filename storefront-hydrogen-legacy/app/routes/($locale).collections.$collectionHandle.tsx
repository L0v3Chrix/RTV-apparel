import {useEffect} from 'react';
import {
  json,
  redirect,
  type MetaArgs,
  type LoaderFunctionArgs,
} from '@shopify/remix-oxygen';
import {useLoaderData, useNavigate, Link} from '@remix-run/react';
import {useInView} from 'react-intersection-observer';
import type {
  ProductCollectionSortKeys,
  ProductFilter,
} from '@shopify/hydrogen/storefront-api-types';
import {
  Pagination,
  flattenConnection,
  getPaginationVariables,
  Analytics,
  getSeoMeta,
  Image,
  Money,
} from '@shopify/hydrogen';
import invariant from 'tiny-invariant';

import {PRODUCT_CARD_FRAGMENT} from '~/data/fragments';
import {routeHeaders} from '~/data/cache';
import {seoPayload} from '~/lib/seo.server';
import {FILTER_URL_PREFIX} from '~/components/SortFilter';
import {parseAsCurrency} from '~/lib/utils';
import {SITE_COPY} from '~/content/siteCopy';
import type {ProductCardFragment} from 'storefrontapi.generated';

export const headers = routeHeaders;

type SortParam =
  | 'price-high-low'
  | 'price-low-high'
  | 'best-selling'
  | 'newest'
  | 'featured';

// Map collection handles to user-friendly titles
const COLLECTION_TITLES: Record<string, {title: string; description: string}> =
  {
    all: {
      title: 'All Items',
      description: SITE_COPY.collection.header.description,
    },
    tees: {
      title: 'Tees',
      description: 'Premium soft tees with original artwork. Pick your flag.',
    },
    hoodies: {
      title: 'Hoodies',
      description:
        'Cozy hoodies for the whole tribe. Perfect for cooler days.',
    },
    'featured-drop': {
      title: 'Featured Drop',
      description: SITE_COPY.collection.header.description,
    },
  };

export async function loader({params, request, context}: LoaderFunctionArgs) {
  const paginationVariables = getPaginationVariables(request, {
    pageBy: 12,
  });
  const {collectionHandle} = params;
  const locale = context.storefront.i18n;

  invariant(collectionHandle, 'Missing collectionHandle param');

  const searchParams = new URL(request.url).searchParams;

  const {sortKey, reverse} = getSortValuesFromParam(
    searchParams.get('sort') as SortParam,
  );
  const filters = [...searchParams.entries()].reduce(
    (filters, [key, value]) => {
      if (key.startsWith(FILTER_URL_PREFIX)) {
        const filterKey = key.substring(FILTER_URL_PREFIX.length);
        filters.push({
          [filterKey]: JSON.parse(value),
        });
      }
      return filters;
    },
    [] as ProductFilter[],
  );

  const {collection, collections} = await context.storefront.query(
    COLLECTION_QUERY,
    {
      variables: {
        ...paginationVariables,
        handle: collectionHandle,
        filters,
        sortKey,
        reverse,
        country: context.storefront.i18n.country,
        language: context.storefront.i18n.language,
      },
    },
  );

  // If collection doesn't exist, try to redirect to 'all' collection
  if (!collection) {
    // Try getting the 'all' collection as fallback
    const {collection: allCollection} = await context.storefront.query(
      COLLECTION_QUERY,
      {
        variables: {
          ...paginationVariables,
          handle: 'all',
          filters,
          sortKey,
          reverse,
          country: context.storefront.i18n.country,
          language: context.storefront.i18n.language,
        },
      },
    );

    if (allCollection) {
      return redirect('/collections/all');
    }

    throw new Response('Collection not found', {status: 404});
  }

  const seo = seoPayload.collection({collection, url: request.url});

  const allFilterValues = collection.products.filters.flatMap(
    (filter) => filter.values,
  );

  const appliedFilters = filters
    .map((filter) => {
      const foundValue = allFilterValues.find((value) => {
        const valueInput = JSON.parse(value.input as string) as ProductFilter;
        if (valueInput.price && filter.price) {
          return true;
        }
        return JSON.stringify(valueInput) === JSON.stringify(filter);
      });
      if (!foundValue) {
        console.error('Could not find filter value for filter', filter);
        return null;
      }

      if (foundValue.id === 'filter.v.price') {
        const input = JSON.parse(foundValue.input as string) as ProductFilter;
        const min = parseAsCurrency(input.price?.min ?? 0, locale);
        const max = input.price?.max
          ? parseAsCurrency(input.price.max, locale)
          : '';
        const label = min && max ? `${min} - ${max}` : 'Price';

        return {
          filter,
          label,
        };
      }
      return {
        filter,
        label: foundValue.label,
      };
    })
    .filter((filter): filter is NonNullable<typeof filter> => filter !== null);

  // Get custom title/description or use from Shopify
  const customMeta = COLLECTION_TITLES[collectionHandle] || null;

  return json({
    collection,
    appliedFilters,
    collections: flattenConnection(collections),
    seo,
    customMeta,
  });
}

export const meta = ({matches}: MetaArgs<typeof loader>) => {
  return getSeoMeta(...matches.map((match) => (match.data as any).seo));
};

export default function Collection() {
  const {collection, customMeta} = useLoaderData<typeof loader>();
  const {ref, inView} = useInView();

  const displayTitle = customMeta?.title || collection.title;
  const displayDescription =
    customMeta?.description || collection?.description || '';

  return (
    <div className="min-h-screen bg-rtv-obsidian">
      {/* Collection Header */}
      <header className="pt-24 pb-8 md:pt-32 md:pb-12 px-4 md:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 md:mb-4">
            {displayTitle}
          </h1>
          {displayDescription && (
            <p className="text-base md:text-lg lg:text-xl text-white/60 max-w-2xl mx-auto px-4">
              {displayDescription}
            </p>
          )}
        </div>
      </header>

      {/* Sort Controls */}
      <div className="px-4 md:px-8 pb-6 md:pb-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 md:pb-6 border-b border-white/10">
            <p className="text-white/50 text-sm">
              {collection.products.nodes.length} products
            </p>
            <SortSelect />
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <section className="px-4 md:px-8 pb-16 md:pb-24">
        <div className="max-w-7xl mx-auto">
          <Pagination connection={collection.products}>
            {({nodes, isLoading, PreviousLink, NextLink, hasNextPage}) => (
              <>
                {/* Previous Button */}
                <div className="flex justify-center mb-6 md:mb-8">
                  <PreviousLink className="px-4 md:px-6 py-2 md:py-3 bg-white/5 hover:bg-white/10 text-white/70 hover:text-white text-sm md:text-base border border-white/10 rounded-full transition-all duration-300">
                    {isLoading ? 'Loading...' : 'Load Previous'}
                  </PreviousLink>
                </div>

                {/* Product Grid */}
                <ProductsGrid
                  products={nodes}
                  inView={inView}
                  hasNextPage={hasNextPage}
                />

                {/* Load More Button */}
                {hasNextPage && (
                  <div className="flex justify-center mt-8 md:mt-12" ref={ref}>
                    <NextLink className="px-6 md:px-8 py-3 md:py-4 bg-rtv-cyan/20 hover:bg-rtv-cyan/30 text-white font-medium text-sm md:text-base border border-rtv-cyan/30 rounded-full transition-all duration-300">
                      {isLoading ? 'Loading...' : 'Load More Products'}
                    </NextLink>
                  </div>
                )}
              </>
            )}
          </Pagination>

          {/* Empty State */}
          {collection.products.nodes.length === 0 && (
            <div className="text-center py-12 md:py-16">
              <p className="text-white/60 text-base md:text-lg mb-6">
                {SITE_COPY.collection.emptyState}
              </p>
              <Link
                to="/collections/all"
                className="inline-flex items-center gap-2 px-5 md:px-6 py-2.5 md:py-3 bg-rtv-cyan text-rtv-obsidian font-semibold text-sm md:text-base rounded-full hover:bg-rtv-cyan/90 transition-colors"
              >
                View All Products
              </Link>
            </div>
          )}
        </div>
      </section>

      <Analytics.CollectionView
        data={{
          collection: {
            id: collection.id,
            handle: collection.handle,
          },
        }}
      />
    </div>
  );
}

/**
 * Products Grid with RTV styling
 */
function ProductsGrid({
  products,
}: {
  products: ProductCardFragment[];
  inView: boolean;
  hasNextPage: boolean;
}) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
      {products.map((product, i) => (
        <RTVProductCard key={product.id} product={product} index={i} />
      ))}
    </div>
  );
}

/**
 * RTV-styled Product Card
 */
function RTVProductCard({
  product,
  index,
}: {
  product: ProductCardFragment;
  index: number;
}) {
  const variants = flattenConnection(product.variants);
  const firstVariant = variants[0];

  if (!firstVariant) return null;

  const {image, price, compareAtPrice} = firstVariant;
  const isOnSale =
    compareAtPrice &&
    parseFloat(compareAtPrice.amount) > parseFloat(price.amount);

  return (
    <Link
      to={`/products/${product.handle}`}
      prefetch="viewport"
      className="group block"
    >
      <div
        className="
          relative overflow-hidden rounded-lg sm:rounded-xl
          bg-white/[0.04]
          border border-white/10
          transition-all duration-300
          hover:bg-white/[0.08]
          hover:border-white/20
          hover:shadow-[0_0_30px_rgba(99,179,237,0.1)]
          md:hover:-translate-y-1
        "
      >
        {/* Product Image */}
        <div className="aspect-[4/5] overflow-hidden bg-white/5">
          {image && (
            <Image
              data={image}
              aspectRatio="4/5"
              sizes="(min-width: 64em) 25vw, (min-width: 48em) 33vw, 50vw"
              className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
              alt={image.altText || product.title}
              loading={index < 8 ? 'eager' : 'lazy'}
            />
          )}

          {/* Sale Badge */}
          {isOnSale && (
            <span className="absolute top-2 right-2 sm:top-3 sm:right-3 px-1.5 sm:px-2 py-0.5 sm:py-1 bg-rtv-cyan text-rtv-obsidian text-[10px] sm:text-xs font-bold rounded-md">
              Sale
            </span>
          )}
        </div>

        {/* Product Info */}
        <div className="p-3 sm:p-4">
          <h3 className="text-white font-medium text-xs sm:text-sm md:text-base line-clamp-2 mb-1.5 sm:mb-2 min-h-[2rem] sm:min-h-[2.5rem]">
            {product.title}
          </h3>
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="text-rtv-cyan font-semibold text-sm sm:text-base">
              <Money withoutTrailingZeros data={price} />
            </span>
            {isOnSale && compareAtPrice && (
              <span className="text-white/40 text-xs sm:text-sm line-through">
                <Money withoutTrailingZeros data={compareAtPrice} />
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}

/**
 * Sort Select Dropdown
 */
function SortSelect() {
  const navigate = useNavigate();

  const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    const url = new URL(window.location.href);
    if (value) {
      url.searchParams.set('sort', value);
    } else {
      url.searchParams.delete('sort');
    }
    navigate(url.pathname + url.search, {replace: true});
  };

  return (
    <select
      onChange={handleSort}
      className="
        px-3 md:px-4 py-1.5 md:py-2
        bg-white/5
        border border-white/10
        text-white/70 text-sm md:text-base
        rounded-lg
        cursor-pointer
        hover:bg-white/10
        focus:outline-none focus:border-rtv-cyan/50
        transition-colors
        appearance-none
        pr-8
        bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%23999%22%20stroke-width%3D%222%22%3E%3Cpath%20d%3D%22m6%209%206%206%206-6%22%2F%3E%3C%2Fsvg%3E')]
        bg-no-repeat
        bg-[right_0.5rem_center]
        bg-[length:1.25rem]
      "
      defaultValue=""
    >
      <option value="">Sort: Featured</option>
      <option value="newest">Newest</option>
      <option value="price-low-high">Price: Low to High</option>
      <option value="price-high-low">Price: High to Low</option>
      <option value="best-selling">Best Selling</option>
    </select>
  );
}

const COLLECTION_QUERY = `#graphql
  query CollectionDetails(
    $handle: String!
    $country: CountryCode
    $language: LanguageCode
    $filters: [ProductFilter!]
    $sortKey: ProductCollectionSortKeys!
    $reverse: Boolean
    $first: Int
    $last: Int
    $startCursor: String
    $endCursor: String
  ) @inContext(country: $country, language: $language) {
    collection(handle: $handle) {
      id
      handle
      title
      description
      seo {
        description
        title
      }
      image {
        id
        url
        width
        height
        altText
      }
      products(
        first: $first,
        last: $last,
        before: $startCursor,
        after: $endCursor,
        filters: $filters,
        sortKey: $sortKey,
        reverse: $reverse
      ) {
        filters {
          id
          label
          type
          values {
            id
            label
            count
            input
          }
        }
        nodes {
          ...ProductCard
        }
        pageInfo {
          hasPreviousPage
          hasNextPage
          endCursor
          startCursor
        }
      }
    }
    collections(first: 100) {
      edges {
        node {
          title
          handle
        }
      }
    }
  }
  ${PRODUCT_CARD_FRAGMENT}
` as const;

function getSortValuesFromParam(sortParam: SortParam | null): {
  sortKey: ProductCollectionSortKeys;
  reverse: boolean;
} {
  switch (sortParam) {
    case 'price-high-low':
      return {
        sortKey: 'PRICE',
        reverse: true,
      };
    case 'price-low-high':
      return {
        sortKey: 'PRICE',
        reverse: false,
      };
    case 'best-selling':
      return {
        sortKey: 'BEST_SELLING',
        reverse: false,
      };
    case 'newest':
      return {
        sortKey: 'CREATED',
        reverse: true,
      };
    case 'featured':
      return {
        sortKey: 'MANUAL',
        reverse: false,
      };
    default:
      return {
        sortKey: 'RELEVANCE',
        reverse: false,
      };
  }
}
