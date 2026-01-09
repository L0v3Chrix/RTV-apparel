import type { Metadata } from 'next';
import { getCartId } from '@/lib/cart';
import { getCart } from '@/lib/shopify/queries';
import { CartContents } from './CartContents';

export const metadata: Metadata = {
  title: 'Cart',
  description: 'Your shopping cart',
};

export const dynamic = 'force-dynamic';

export default async function CartPage() {
  const cartId = await getCartId();
  const cart = cartId ? await getCart(cartId) : null;

  return (
    <div className="min-h-screen bg-rtv-cream">
      {/* Header */}
      <header className="pt-24 pb-8 md:pt-32 md:pb-12 px-4 md:px-8 bg-rtv-paper -mt-20 md:-mt-24">
        <div className="max-w-4xl mx-auto pt-20 md:pt-24">
          <span className="text-overline mb-3 block">Shopping</span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-rtv-ink">
            Your Cart
          </h1>
        </div>
      </header>

      {/* Cart Contents */}
      <section className="px-4 md:px-8 pb-16 md:pb-24">
        <div className="max-w-4xl mx-auto">
          <CartContents initialCart={cart} />
        </div>
      </section>
    </div>
  );
}
