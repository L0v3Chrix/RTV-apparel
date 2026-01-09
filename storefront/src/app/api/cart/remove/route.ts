import { NextRequest, NextResponse } from 'next/server';
import { getCartId } from '@/lib/cart';
import { removeFromCart } from '@/lib/shopify/queries';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { lineIds } = body;

    if (!lineIds || !Array.isArray(lineIds)) {
      return NextResponse.json(
        { error: 'lineIds array is required' },
        { status: 400 }
      );
    }

    const cartId = await getCartId();

    if (!cartId) {
      return NextResponse.json(
        { error: 'No cart found' },
        { status: 404 }
      );
    }

    const cart = await removeFromCart(cartId, lineIds);

    return NextResponse.json({ cart });
  } catch (error) {
    console.error('Error removing from cart:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to remove from cart' },
      { status: 500 }
    );
  }
}
