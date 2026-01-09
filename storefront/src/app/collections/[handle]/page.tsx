import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { getCollectionByHandle, type ProductSortKey } from '@/lib/shopify/queries';
import { ProductCard } from '@/components/ui/ProductCard';

interface CollectionPageProps {
  params: Promise<{ handle: string }>;
  searchParams: Promise<{ sort?: string }>;
}

// Custom titles for known collections
const COLLECTION_TITLES: Record<string, { title: string; description: string }> = {
  all: {
    title: 'All Items',
    description: 'Browse our complete collection of premium streetwear.',
  },
  tees: {
    title: 'Tees',
    description: 'Premium soft tees with original artwork. Pick your flag.',
  },
  hoodies: {
    title: 'Hoodies',
    description: 'Cozy hoodies for the whole tribe. Perfect for cooler days.',
  },
  'featured-drop': {
    title: 'Featured Drop',
    description: 'Eight pieces. One message. Love people on purpose.',
  },
};

export async function generateMetadata({
  params,
}: CollectionPageProps): Promise<Metadata> {
  const { handle } = await params;
  const collection = await getCollectionByHandle(handle, { first: 1 });

  if (!collection) {
    return { title: 'Collection Not Found' };
  }

  const customMeta = COLLECTION_TITLES[handle];
  const title = customMeta?.title || collection.title;
  const description = customMeta?.description || collection.description;

  return {
    title,
    description: description || `Shop our ${title} collection`,
    openGraph: {
      title,
      description: description || `Shop our ${title} collection`,
    },
  };
}

function getSortValues(sort?: string): { sortKey: ProductSortKey; reverse: boolean } {
  switch (sort) {
    case 'price-high-low':
      return { sortKey: 'PRICE', reverse: true };
    case 'price-low-high':
      return { sortKey: 'PRICE', reverse: false };
    case 'best-selling':
      return { sortKey: 'BEST_SELLING', reverse: false };
    case 'newest':
      return { sortKey: 'CREATED', reverse: true };
    default:
      return { sortKey: 'MANUAL', reverse: false };
  }
}

export const revalidate = 3600;

export default async function CollectionPage({
  params,
  searchParams,
}: CollectionPageProps) {
  const { handle } = await params;
  const { sort } = await searchParams;
  const { sortKey, reverse } = getSortValues(sort);

  const collection = await getCollectionByHandle(handle, {
    first: 24,
    sortKey,
    reverse,
  });

  if (!collection) {
    notFound();
  }

  const customMeta = COLLECTION_TITLES[handle];
  const displayTitle = customMeta?.title || collection.title;
  const displayDescription = customMeta?.description || collection.description;

  return (
    <div className="min-h-screen bg-rtv-cream">
      {/* Collection Header */}
      <header className="pt-24 pb-8 md:pt-32 md:pb-12 px-4 md:px-8 bg-rtv-paper -mt-20 md:-mt-24">
        <div className="max-w-7xl mx-auto text-center pt-20 md:pt-24">
          <span className="text-overline mb-3 block">Collection</span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-rtv-ink mb-3 md:mb-4">
            {displayTitle}
          </h1>
          {displayDescription && (
            <p className="text-base md:text-lg lg:text-xl text-rtv-stone max-w-2xl mx-auto px-4">
              {displayDescription}
            </p>
          )}
        </div>
      </header>

      {/* Sort Controls */}
      <div className="px-4 md:px-8 py-6 md:py-8 bg-rtv-cream">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 md:pb-6 border-b border-rtv-sand">
            <p className="text-rtv-stone text-sm">
              {collection.products.nodes.length} products
            </p>
            <SortSelect currentSort={sort} handle={handle} />
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <section className="px-4 md:px-8 pb-16 md:pb-24 bg-rtv-cream">
        <div className="max-w-7xl mx-auto">
          {collection.products.nodes.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
              {collection.products.nodes.map((product, index) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  priority={index < 8}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 md:py-16">
              <p className="text-rtv-stone text-base md:text-lg mb-6">
                No products found in this collection.
              </p>
              <Link
                href="/collections/all"
                className="btn-primary btn-lg"
              >
                View All Products
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

function SortSelect({
  currentSort,
  handle,
}: {
  currentSort?: string;
  handle: string;
}) {
  const sortOptions = [
    { value: '', label: 'Featured' },
    { value: 'newest', label: 'Newest' },
    { value: 'price-low-high', label: 'Price: Low to High' },
    { value: 'price-high-low', label: 'Price: High to Low' },
    { value: 'best-selling', label: 'Best Selling' },
  ];

  return (
    <div className="relative">
      <select
        defaultValue={currentSort || ''}
        onChange={(e) => {
          const url = new URL(window.location.href);
          if (e.target.value) {
            url.searchParams.set('sort', e.target.value);
          } else {
            url.searchParams.delete('sort');
          }
          window.location.href = url.toString();
        }}
        className="input-field pr-10 cursor-pointer appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%2344403C%22%20stroke-width%3D%222%22%3E%3Cpath%20d%3D%22m6%209%206%206%206-6%22%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[right_0.75rem_center] bg-[length:1.25rem]"
      >
        {sortOptions.map((option) => (
          <option key={option.value} value={option.value}>
            Sort: {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
