'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import type { Cart } from '@/lib/shopify/types';
import { formatMoney } from '@/lib/utils';

interface CartContentsProps {
  initialCart: Cart | null;
}

export function CartContents({ initialCart }: CartContentsProps) {
  const router = useRouter();
  const [cart, setCart] = useState(initialCart);
  const [loading, setLoading] = useState<string | null>(null);

  if (!cart || cart.lines.nodes.length === 0) {
    return <EmptyCart />;
  }

  const handleUpdateQuantity = async (lineId: string, quantity: number) => {
    setLoading(lineId);

    try {
      if (quantity === 0) {
        // Remove item
        const response = await fetch('/api/cart/remove', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ lineIds: [lineId] }),
        });

        if (response.ok) {
          const data = await response.json();
          setCart(data.cart);
        }
      } else {
        // Update quantity
        const response = await fetch('/api/cart/update', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ lineId, quantity }),
        });

        if (response.ok) {
          const data = await response.json();
          setCart(data.cart);
        }
      }
    } catch (error) {
      console.error('Failed to update cart:', error);
    } finally {
      setLoading(null);
    }
  };

  const handleCheckout = () => {
    if (cart.checkoutUrl) {
      window.location.href = cart.checkoutUrl;
    }
  };

  return (
    <div className="grid gap-8 lg:grid-cols-3">
      {/* Cart Items */}
      <div className="lg:col-span-2 space-y-4">
        {cart.lines.nodes.map((line) => (
          <div
            key={line.id}
            className="flex gap-4 p-4 bg-white border border-rtv-sand/50 rounded-xl shadow-soft"
          >
            {/* Product Image */}
            <div className="w-24 h-24 relative flex-shrink-0 rounded-lg overflow-hidden bg-rtv-paper">
              {line.merchandise.image ? (
                <Image
                  src={line.merchandise.image.url}
                  alt={line.merchandise.image.altText || line.merchandise.title}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-rtv-teal/20 to-rtv-rust/20" />
              )}
            </div>

            {/* Product Info */}
            <div className="flex-1 min-w-0">
              <Link
                href={`/products/${line.merchandise.product.handle}`}
                className="text-rtv-ink font-semibold hover:text-rtv-teal transition-colors line-clamp-1"
              >
                {line.merchandise.product.title}
              </Link>

              {/* Variant Info */}
              {line.merchandise.selectedOptions.length > 0 && (
                <p className="text-sm text-rtv-stone mt-1">
                  {line.merchandise.selectedOptions
                    .map((opt) => opt.value)
                    .join(' / ')}
                </p>
              )}

              {/* Price */}
              <p className="text-rtv-teal font-bold mt-2">
                {formatMoney(
                  line.cost.amountPerQuantity.amount,
                  line.cost.amountPerQuantity.currencyCode
                )}
              </p>

              {/* Quantity Controls */}
              <div className="flex items-center gap-3 mt-3">
                <div className="flex items-center border-2 border-rtv-sand rounded-lg">
                  <button
                    onClick={() => handleUpdateQuantity(line.id, line.quantity - 1)}
                    disabled={loading === line.id}
                    className="w-8 h-8 flex items-center justify-center text-rtv-stone hover:text-rtv-ink transition-colors disabled:opacity-50"
                    aria-label="Decrease quantity"
                  >
                    <MinusIcon />
                  </button>
                  <span className="w-10 text-center text-rtv-ink font-medium">
                    {line.quantity}
                  </span>
                  <button
                    onClick={() => handleUpdateQuantity(line.id, line.quantity + 1)}
                    disabled={loading === line.id}
                    className="w-8 h-8 flex items-center justify-center text-rtv-stone hover:text-rtv-ink transition-colors disabled:opacity-50"
                    aria-label="Increase quantity"
                  >
                    <PlusIcon />
                  </button>
                </div>

                <button
                  onClick={() => handleUpdateQuantity(line.id, 0)}
                  disabled={loading === line.id}
                  className="text-sm text-rtv-stone hover:text-rtv-rust transition-colors disabled:opacity-50"
                >
                  Remove
                </button>
              </div>
            </div>

            {/* Line Total */}
            <div className="text-right">
              <p className="text-rtv-ink font-bold">
                {formatMoney(
                  line.cost.totalAmount.amount,
                  line.cost.totalAmount.currencyCode
                )}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Order Summary */}
      <div className="lg:col-span-1">
        <div className="bg-white rounded-xl p-6 sticky top-28 shadow-soft border border-rtv-sand/50">
          <h2 className="text-xl font-bold text-rtv-ink mb-6">Order Summary</h2>

          <div className="space-y-3 mb-6">
            <div className="flex justify-between text-rtv-stone">
              <span>Subtotal</span>
              <span className="font-medium text-rtv-ink">
                {formatMoney(
                  cart.cost.subtotalAmount.amount,
                  cart.cost.subtotalAmount.currencyCode
                )}
              </span>
            </div>
            <div className="flex justify-between text-rtv-stone/60 text-sm">
              <span>Shipping</span>
              <span>Calculated at checkout</span>
            </div>
            {cart.cost.totalTaxAmount && (
              <div className="flex justify-between text-rtv-stone/60 text-sm">
                <span>Tax</span>
                <span>
                  {formatMoney(
                    cart.cost.totalTaxAmount.amount,
                    cart.cost.totalTaxAmount.currencyCode
                  )}
                </span>
              </div>
            )}
          </div>

          <div className="border-t border-rtv-sand pt-4 mb-6">
            <div className="flex justify-between text-lg font-bold text-rtv-ink">
              <span>Total</span>
              <span>
                {formatMoney(
                  cart.cost.totalAmount.amount,
                  cart.cost.totalAmount.currencyCode
                )}
              </span>
            </div>
          </div>

          <button
            onClick={handleCheckout}
            className="btn-primary w-full py-4"
          >
            Proceed to Checkout
          </button>

          <Link
            href="/collections/all"
            className="block text-center mt-4 text-rtv-stone hover:text-rtv-teal text-sm transition-colors font-medium"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}

function EmptyCart() {
  return (
    <div className="text-center py-12">
      <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-rtv-paper flex items-center justify-center">
        <BagIcon />
      </div>
      <h2 className="text-2xl font-bold text-rtv-ink mb-3">Your cart is empty</h2>
      <p className="text-rtv-stone mb-8">
        Looks like you haven&apos;t added anything to your cart yet.
      </p>
      <Link
        href="/collections/all"
        className="btn-primary btn-lg"
      >
        Start Shopping
      </Link>
    </div>
  );
}

function MinusIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}

function BagIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="48"
      height="48"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-rtv-stone/30"
    >
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
      <path d="M3 6h18" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
}
