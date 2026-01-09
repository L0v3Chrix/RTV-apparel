import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { getProductByHandle, getProductRecommendations } from '@/lib/shopify/queries';
import { formatMoney, getExcerpt } from '@/lib/utils';
import { AddToCartForm } from './AddToCartForm';
import { ProductCard } from '@/components/ui/ProductCard';

interface ProductPageProps {
  params: Promise<{ handle: string }>;
  searchParams: Promise<{ [key: string]: string | undefined }>;
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { handle } = await params;
  const product = await getProductByHandle(handle);

  if (!product) {
    return { title: 'Product Not Found' };
  }

  const description = product.seo.description || getExcerpt(product.description);

  return {
    title: product.seo.title || product.title,
    description,
    openGraph: {
      title: product.seo.title || product.title,
      description,
      images: product.images.nodes[0]?.url
        ? [{ url: product.images.nodes[0].url }]
        : [],
    },
  };
}

export const revalidate = 3600;

export default async function ProductPage({ params, searchParams }: ProductPageProps) {
  const { handle } = await params;
  const urlSearchParams = await searchParams;
  const product = await getProductByHandle(handle);

  if (!product) {
    notFound();
  }

  // Get recommendations
  const recommendations = await getProductRecommendations(product.id);

  // Find selected variant based on URL params
  let selectedVariant = product.variants.nodes[0];

  if (Object.keys(urlSearchParams).length > 0) {
    const matchedVariant = product.variants.nodes.find((variant) =>
      variant.selectedOptions.every(
        (option) => urlSearchParams[option.name] === option.value
      )
    );
    if (matchedVariant) {
      selectedVariant = matchedVariant;
    }
  }

  const isOnSale =
    selectedVariant.compareAtPrice &&
    parseFloat(selectedVariant.compareAtPrice.amount) >
      parseFloat(selectedVariant.price.amount);

  return (
    <>
      {/* PDP Hero Section */}
      <section className="bg-rtv-obsidian min-h-screen pt-20 md:pt-24">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 py-6 md:py-12">
          <div className="grid md:grid-cols-2 gap-6 md:gap-8 lg:gap-12 items-start">
            {/* Left: Product Gallery */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="aspect-square relative overflow-hidden rounded-xl bg-white/5">
                {selectedVariant.image ? (
                  <Image
                    src={selectedVariant.image.url}
                    alt={selectedVariant.image.altText || product.title}
                    fill
                    className="object-cover"
                    priority
                  />
                ) : product.images.nodes[0] ? (
                  <Image
                    src={product.images.nodes[0].url}
                    alt={product.images.nodes[0].altText || product.title}
                    fill
                    className="object-cover"
                    priority
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-rtv-cyan/20 to-rtv-violet/20" />
                )}
              </div>

              {/* Thumbnail Gallery */}
              {product.images.nodes.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {product.images.nodes.slice(0, 4).map((image, index) => (
                    <div
                      key={image.url}
                      className="aspect-square relative overflow-hidden rounded-lg bg-white/5 border border-white/10"
                    >
                      <Image
                        src={image.url}
                        alt={image.altText || `${product.title} - Image ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Right: Buy Panel */}
            <div className="md:sticky md:top-28">
              <div className="glass rounded-xl md:rounded-2xl p-4 sm:p-6 md:p-8 shadow-glass">
                {/* Product Title & Vendor */}
                <div className="mb-4 md:mb-6">
                  <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-1 md:mb-2">
                    {product.title}
                  </h1>
                  {product.vendor && (
                    <p className="text-white/50 text-xs sm:text-sm font-medium uppercase tracking-wide">
                      {product.vendor}
                    </p>
                  )}
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-3 mb-6">
                  <span className="text-2xl font-bold text-white">
                    {formatMoney(
                      selectedVariant.price.amount,
                      selectedVariant.price.currencyCode
                    )}
                  </span>
                  {isOnSale && selectedVariant.compareAtPrice && (
                    <span className="text-lg text-white/40 line-through">
                      {formatMoney(
                        selectedVariant.compareAtPrice.amount,
                        selectedVariant.compareAtPrice.currencyCode
                      )}
                    </span>
                  )}
                </div>

                {/* Add to Cart Form */}
                <AddToCartForm
                  product={product}
                  selectedVariant={selectedVariant}
                />

                {/* Product Details Accordion */}
                {product.descriptionHtml && (
                  <div className="mt-6 md:mt-8 pt-4 md:pt-6 border-t border-white/10">
                    <details className="group">
                      <summary className="flex justify-between items-center cursor-pointer list-none">
                        <span className="text-lg font-medium text-white">
                          Product Details
                        </span>
                        <span className="transition-transform group-open:rotate-180">
                          <ChevronDownIcon />
                        </span>
                      </summary>
                      <div
                        className="mt-4 prose prose-invert prose-sm max-w-none text-white/60"
                        dangerouslySetInnerHTML={{
                          __html: product.descriptionHtml,
                        }}
                      />
                    </details>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {recommendations.length > 0 && (
        <section className="py-12 md:py-16 bg-rtv-obsidian border-t border-white/5">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">
              You Might Also Like
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {recommendations.slice(0, 4).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

function ChevronDownIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}
