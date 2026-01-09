import { NextRequest, NextResponse } from 'next/server';
import { getCartId, setCartId } from '@/lib/cart';
import { createCart, addToCart, getCart } from '@/lib/shopify/queries';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { merchandiseId, quantity = 1 } = body;

    if (!merchandiseId) {
      return NextResponse.json(
        { error: 'merchandiseId is required' },
        { status: 400 }
      );
    }

    let cartId = await getCartId();
    let cart;

    if (!cartId) {
      // Create new cart with the item
      cart = await createCart([{ merchandiseId, quantity }]);
      await setCartId(cart.id);
    } else {
      // Try to get existing cart
      const existingCart = await getCart(cartId);

      if (!existingCart) {
        // Cart doesn't exist anymore, create new one
        cart = await createCart([{ merchandiseId, quantity }]);
        await setCartId(cart.id);
      } else {
        // Add to existing cart
        cart = await addToCart(cartId, [{ merchandiseId, quantity }]);
      }
    }

    return NextResponse.json({ cart });
  } catch (error) {
    console.error('Error adding to cart:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to add to cart' },
      { status: 500 }
    );
  }
}
