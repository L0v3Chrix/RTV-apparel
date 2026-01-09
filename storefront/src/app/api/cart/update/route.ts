import { NextRequest, NextResponse } from 'next/server';
import { getCartId } from '@/lib/cart';
import { updateCart } from '@/lib/shopify/queries';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { lineId, quantity } = body;

    if (!lineId || typeof quantity !== 'number') {
      return NextResponse.json(
        { error: 'lineId and quantity are required' },
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

    const cart = await updateCart(cartId, [{ id: lineId, quantity }]);

    return NextResponse.json({ cart });
  } catch (error) {
    console.error('Error updating cart:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to update cart' },
      { status: 500 }
    );
  }
}
