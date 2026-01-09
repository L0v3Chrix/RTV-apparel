'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Product, ProductVariant } from '@/lib/shopify/types';
import { cn } from '@/lib/utils';

interface AddToCartFormProps {
  product: Product;
  selectedVariant: ProductVariant;
}

export function AddToCartForm({ product, selectedVariant }: AddToCartFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isOutOfStock = !selectedVariant.availableForSale;

  // Handle variant selection via URL params
  const handleOptionChange = (optionName: string, value: string) => {
    const url = new URL(window.location.href);
    url.searchParams.set(optionName, value);
    router.push(url.toString(), { scroll: false });
  };

  // Handle add to cart
  const handleAddToCart = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/cart/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          merchandiseId: selectedVariant.id,
          quantity: 1,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to add to cart');
      }

      // Navigate to cart page
      router.push('/cart');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add to cart');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Product Options */}
      {product.options.map((option) => {
        // Skip if only one value
        if (option.values.length <= 1) return null;

        // Find currently selected value
        const currentValue =
          selectedVariant.selectedOptions.find((o) => o.name === option.name)
            ?.value || option.values[0];

        return (
          <div key={option.name} className="space-y-3">
            <label className="text-sm font-medium text-white/70 uppercase tracking-wide">
              {option.name}
            </label>
            <div className="flex flex-wrap gap-2">
              {option.values.map((value) => {
                const isSelected = value === currentValue;

                // Check if this option value is available
                const isAvailable = product.variants.nodes.some(
                  (v) =>
                    v.availableForSale &&
                    v.selectedOptions.some(
                      (o) => o.name === option.name && o.value === value
                    )
                );

                return (
                  <button
                    key={value}
                    onClick={() => handleOptionChange(option.name, value)}
                    disabled={!isAvailable}
                    className={cn(
                      'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 border',
                      isSelected
                        ? 'bg-rtv-cyan text-rtv-obsidian border-rtv-cyan'
                        : 'bg-white/5 text-white border-white/15 hover:border-white/30',
                      !isAvailable && 'opacity-40 cursor-not-allowed'
                    )}
                  >
                    {value}
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}

      {/* Error Message */}
      {error && (
        <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
          {error}
        </div>
      )}

      {/* Action Buttons */}
      <div className="space-y-3 pt-4">
        {isOutOfStock ? (
          <button
            disabled
            className="
              w-full py-4 px-6 rounded-full
              bg-white/10 text-white/50
              font-semibold text-sm uppercase tracking-wide
              cursor-not-allowed
            "
          >
            Sold Out
          </button>
        ) : (
          <button
            onClick={handleAddToCart}
            disabled={loading}
            className="
              w-full py-4 px-6 rounded-full
              bg-rtv-cyan hover:bg-rtv-cyan/90
              text-rtv-obsidian font-semibold text-sm uppercase tracking-wide
              transition-all duration-300
              hover:shadow-[0_0_20px_rgba(99,179,237,0.4)]
              disabled:opacity-50 disabled:cursor-not-allowed
            "
          >
            {loading ? 'Adding...' : 'Add to Cart'}
          </button>
        )}
      </div>
    </div>
  );
}
