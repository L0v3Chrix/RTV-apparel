import Image from 'next/image';
import Link from 'next/link';
import { formatMoney } from '@/lib/utils';
import type { ProductCard as ProductCardType } from '@/lib/shopify/types';

interface ProductCardProps {
  product: ProductCardType;
  priority?: boolean;
}

// Placeholder product images when Shopify image is unavailable
const placeholderImages: Record<string, string> = {
  'worship-is-my-weapon-tee': '/images/products/worship-tee.png',
  'worship-tee': '/images/products/worship-tee.png',
  'raize-tee': '/images/products/raize-tee.png',
  'raize-hoodie': '/images/products/raize-hoodie.png',
  'still-mens-tee': '/images/products/still-mens-tee.png',
  'still-womens-tee': '/images/products/still-womens-tee.png',
  'love-tee': '/images/products/love-tee.png',
  'pronouns-tee': '/images/products/pronouns-tee.png',
  'iam-tee': '/images/products/iam-tee.png',
  'iam-hoodie': '/images/products/iam-hoodie.png',
  'godknows-tee': '/images/products/godknows-tee.png',
};

function getProductImage(product: ProductCardType) {
  const variant = product.variants.nodes[0];

  // First try Shopify variant image
  if (variant?.image?.url) {
    return { url: variant.image.url, alt: variant.image.altText || product.title };
  }

  // Fall back to local placeholder based on handle
  const placeholder = placeholderImages[product.handle];
  if (placeholder) {
    return { url: placeholder, alt: product.title };
  }

  // Generic placeholder
  return { url: '/images/products/placeholder.png', alt: product.title };
}

export function ProductCard({ product, priority = false }: ProductCardProps) {
  const variant = product.variants.nodes[0];
  if (!variant) return null;

  const { price, compareAtPrice } = variant;
  const isOnSale =
    compareAtPrice &&
    parseFloat(compareAtPrice.amount) > parseFloat(price.amount);

  const productImage = getProductImage(product);

  return (
    <Link href={`/products/${product.handle}`} className="group block">
      <div className="card-product">
        {/* Product Image */}
        <div className="aspect-[4/5] overflow-hidden relative bg-rtv-paper">
          <Image
            src={productImage.url}
            alt={productImage.alt}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            priority={priority}
          />

          {/* Quick Add Button - Shows on hover */}
          <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <div className="w-10 h-10 icon-btn-teal">
              <PlusIcon />
            </div>
          </div>

          {/* Sale Badge */}
          {isOnSale && (
            <span className="absolute top-3 left-3 px-3 py-1.5 bg-rtv-rust text-white text-xs font-bold rounded-full uppercase tracking-wide shadow-warm">
              Sale
            </span>
          )}
        </div>

        {/* Product Info */}
        <div className="p-4">
          <h3 className="text-rtv-ink font-semibold text-sm md:text-base line-clamp-2 mb-2 min-h-[2.5rem] group-hover:text-rtv-teal transition-colors">
            {product.title}
          </h3>
          <div className="flex items-center gap-2">
            <span className="text-rtv-ink font-bold text-base">
              {formatMoney(price.amount, price.currencyCode)}
            </span>
            {isOnSale && compareAtPrice && (
              <span className="text-rtv-stone/60 text-sm line-through">
                {formatMoney(compareAtPrice.amount, compareAtPrice.currencyCode)}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}

function PlusIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
    </svg>
  );
}
