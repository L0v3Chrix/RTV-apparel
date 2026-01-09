import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { getCollections } from '@/lib/shopify/queries';

export const metadata: Metadata = {
  title: 'Collections',
  description: 'Browse all our premium streetwear collections',
};

export const revalidate = 3600;

export default async function CollectionsPage() {
  const collections = await getCollections();

  return (
    <div className="min-h-screen bg-rtv-obsidian">
      {/* Header */}
      <header className="pt-24 pb-8 md:pt-32 md:pb-12 px-4 md:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 md:mb-4">
            Collections
          </h1>
          <p className="text-base md:text-lg lg:text-xl text-white/60 max-w-2xl mx-auto px-4">
            Explore our premium streetwear collections. Each piece designed to
            make a statement.
          </p>
        </div>
      </header>

      {/* Collections Grid */}
      <section className="px-4 md:px-8 pb-16 md:pb-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {collections.map((collection) => (
              <Link
                key={collection.id}
                href={`/collections/${collection.handle}`}
                className="group block"
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-white/5 border border-white/10 transition-all duration-300 hover:border-white/20 hover:shadow-glow-sm">
                  {collection.image ? (
                    <Image
                      src={collection.image.url}
                      alt={collection.image.altText || collection.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-rtv-cyan/20 to-rtv-violet/20" />
                  )}

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-rtv-obsidian/80 via-transparent to-transparent" />

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h2 className="text-xl md:text-2xl font-bold text-white mb-2">
                      {collection.title}
                    </h2>
                    {collection.description && (
                      <p className="text-white/60 text-sm line-clamp-2">
                        {collection.description}
                      </p>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
