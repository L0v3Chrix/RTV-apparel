import { cookies } from 'next/headers';
import { SignJWT, jwtVerify } from 'jose';

const CART_COOKIE_NAME = 'rtv_cart_id';
const COOKIE_MAX_AGE = 60 * 60 * 24 * 14; // 14 days

function getSecretKey() {
  const secret = process.env.SESSION_SECRET;
  if (!secret) {
    throw new Error('SESSION_SECRET is required');
  }
  return new TextEncoder().encode(secret);
}

export async function getCartId(): Promise<string | null> {
  const cookieStore = await cookies();
  const cartCookie = cookieStore.get(CART_COOKIE_NAME);

  if (!cartCookie?.value) {
    return null;
  }

  try {
    const { payload } = await jwtVerify(cartCookie.value, getSecretKey());
    return payload.cartId as string;
  } catch (error) {
    console.error('Failed to verify cart cookie:', error);
    return null;
  }
}

export async function setCartId(cartId: string): Promise<void> {
  const token = await new SignJWT({ cartId })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('14d')
    .sign(getSecretKey());

  const cookieStore = await cookies();
  cookieStore.set(CART_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: COOKIE_MAX_AGE,
    path: '/',
  });
}

export async function clearCartId(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(CART_COOKIE_NAME);
}
