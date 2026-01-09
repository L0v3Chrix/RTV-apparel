'use client';

import Link from 'next/link';

interface CartButtonProps {
  variant?: 'light' | 'dark';
}

// Simple cart button that links to cart page
// Cart count will be fetched on the cart page
export function CartButton({ variant = 'light' }: CartButtonProps) {
  return (
    <Link
      href="/cart"
      className={`relative flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-200 ${
        variant === 'light'
          ? 'text-rtv-stone hover:text-rtv-teal hover:bg-rtv-sand/60'
          : 'text-white/70 hover:text-white hover:bg-white/10'
      }`}
      aria-label="View cart"
    >
      <BagIcon />
    </Link>
  );
}

function BagIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
      <path d="M3 6h18" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
}
