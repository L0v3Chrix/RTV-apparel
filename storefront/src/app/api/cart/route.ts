import { NextResponse } from 'next/server';
import { getCartId } from '@/lib/cart';
import { getCart } from '@/lib/shopify/queries';

export async function GET() {
  try {
    const cartId = await getCartId();

    if (!cartId) {
      return NextResponse.json({ cart: null });
    }

    const cart = await getCart(cartId);

    return NextResponse.json({ cart });
  } catch (error) {
    console.error('Error fetching cart:', error);
    return NextResponse.json(
      { error: 'Failed to fetch cart' },
      { status: 500 }
    );
  }
}
