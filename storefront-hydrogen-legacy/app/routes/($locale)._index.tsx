import {
  defer,
  type MetaArgs,
  type LoaderFunctionArgs,
} from '@shopify/remix-oxygen';
import {Suspense} from 'react';
import {Await, useLoaderData, Link} from '@remix-run/react';
import {getSeoMeta, Image, Money, flattenConnection} from '@shopify/hydrogen';
import type {ProductCardFragment} from 'storefrontapi.generated';
import {
  RTVHero,
  FamilyCarousel,
  TrustRow,
  WhyWeRaize,
  MissionTeaser,
  WhyDropMattersGrid,
  StoryTeaser,
} from '~/components/rtv';
import {featuredDropContent} from '~/content/home';
import {PRODUCT_CARD_FRAGMENT} from '~/data/fragments';
import {routeHeaders} from '~/data/cache';
import {seoPayload} from '~/lib/seo.server';

export const headers = routeHeaders;

export async function loader(args: LoaderFunctionArgs) {
  const {params, context} = args;
  const {language, country} = context.storefront.i18n;

  if (
    params.locale &&
    params.locale.toLowerCase() !== `${language}-${country}`.toLowerCase()
  ) {
    // If the locale URL param is defined, yet we still are on `EN-US`
    // the the locale param must be invalid, send to the 404 page
    throw new Response(null, {status: 404});
  }

  // Start fetching non-critical data without blocking time to first byte
  const deferredData = loadDeferredData(args);

  // Await the critical data required to render initial state of the page
  const criticalData = await loadCriticalData(args);

  return defer({...deferredData, ...criticalData});
}

/**
 * Load data necessary for rendering content above the fold. This is the critical data
 * needed to render the page. If it's unavailable, the whole page should 400 or 500 error.
 */
async function loadCriticalData({context, request}: LoaderFunctionArgs) {
  const [{shop}] = await Promise.all([
    context.storefront.query(HOMEPAGE_SEO_QUERY),
    // Add other queries here, so that they are loaded in parallel
  ]);

  return {
    shop,
    seo: seoPayload.home({url: request.url}),
  };
}

/**
 * Load data for rendering content below the fold. This data is deferred and will be
 * fetched after the initial page load. If it's unavailable, the page should still 200.
 * Make sure to not throw any errors here, as it will cause the page to 500.
 */
function loadDeferredData({context}: LoaderFunctionArgs) {
  const {language, country} = context.storefront.i18n;

  // Fetch all products for the featured drop section
  const featuredProducts = context.storefront
    .query(HOMEPAGE_FEATURED_PRODUCTS_QUERY, {
      variables: {
        country,
        language,
      },
    })
    .catch((error) => {
      // Log query errors, but don't throw them so the page can still render
      // eslint-disable-next-line no-console
      console.error(error);
      return null;
    });

  return {
    featuredProducts,
  };
}

export const meta = ({matches}: MetaArgs<typeof loader>) => {
  return getSeoMeta(...matches.map((match) => (match.data as any).seo));
};

export default function Homepage() {
  const {featuredProducts} = useLoaderData<typeof loader>();

  return (
    <>
      {/* Hero Section - Full viewport with family photo */}
      <RTVHero />

      {/* Featured Drop - Polished product grid */}
      {featuredProducts && (
        <section className="py-12 md:py-24 bg-rtv-obsidian">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            {/* Section Header */}
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 md:mb-4">
                {featuredDropContent.sectionTitle}
              </h2>
              <p className="text-white/60 text-base md:text-lg px-4">
                Eight pieces. One message. Love people on purpose.
              </p>
            </div>

            {/* Product Grid - Tight 4-column layout */}
            <Suspense>
              <Await resolve={featuredProducts}>
                {(response) => {
                  if (
                    !response ||
                    !response?.products ||
                    !response?.products?.nodes
                  ) {
                    return <></>;
                  }
                  return (
                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
                      {response.products.nodes
                        .slice(0, 8)
                        .map((product: ProductCardFragment) => (
                          <FeaturedProductCard
                            key={product.id}
                            product={product}
                          />
                        ))}
                    </div>
                  );
                }}
              </Await>
            </Suspense>
          </div>
        </section>
      )}

      {/* Family Proof Carousel */}
      <FamilyCarousel />

      {/* Why This Drop Matters - 8-tile grid */}
      <WhyDropMattersGrid />

      {/* Trust Badges Row */}
      <TrustRow />

      {/* Why We Raize The Vibe - Feature grid */}
      <WhyWeRaize />

      {/* Story Teaser - Why we started */}
      <StoryTeaser />

      {/* Mission Teaser - Collapsible section */}
      <MissionTeaser />
    </>
  );
}

// Simple SEO query for homepage
const HOMEPAGE_SEO_QUERY = `#graphql
  query homepageSeo {
    shop {
      name
      description
    }
  }
` as const;

// Fetch featured products for the drop section
// @see: https://shopify.dev/api/storefront/current/queries/products
export const HOMEPAGE_FEATURED_PRODUCTS_QUERY = `#graphql
  query homepageFeaturedProducts($country: CountryCode, $language: LanguageCode)
  @inContext(country: $country, language: $language) {
    products(first: 8) {
      nodes {
        ...ProductCard
      }
    }
  }
  ${PRODUCT_CARD_FRAGMENT}
` as const;

// Keep this query for FeaturedCollections component used in search/account
// @see: https://shopify.dev/api/storefront/current/queries/collections
export const FEATURED_COLLECTIONS_QUERY = `#graphql
  query homepageFeaturedCollections($country: CountryCode, $language: LanguageCode)
  @inContext(country: $country, language: $language) {
    collections(
      first: 4,
      sortKey: UPDATED_AT
    ) {
      nodes {
        id
        title
        handle
        image {
          altText
          width
          height
          url
        }
      }
    }
  }
` as const;

/**
 * FeaturedProductCard - Glass-styled product card for homepage grid
 */
function FeaturedProductCard({product}: {product: ProductCardFragment}) {
  const variants = flattenConnection(product.variants);
  const firstVariant = variants[0];

  if (!firstVariant) return null;

  const {image, price} = firstVariant;

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
            />
          )}
        </div>

        {/* Product Info */}
        <div className="p-3 sm:p-4">
          <h3 className="text-white font-medium text-xs sm:text-sm md:text-base line-clamp-2 mb-1 min-h-[2rem] sm:min-h-[2.5rem]">
            {product.title}
          </h3>
          <div className="text-rtv-cyan font-semibold text-sm sm:text-base">
            <Money withoutTrailingZeros data={price} />
          </div>
        </div>
      </div>
    </Link>
  );
}
