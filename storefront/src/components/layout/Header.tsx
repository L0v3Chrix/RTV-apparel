'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { CartButton } from './CartButton';

const navItems = [
  { href: '/collections/tees', label: 'TEES' },
  { href: '/collections/hoodies', label: 'HOODIES' },
  { href: '/pages/our-story', label: 'WHY' },
  { href: '/pages/faq', label: 'FAQ' },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Desktop Header */}
      <header className="fixed top-0 left-0 right-0 z-50 hidden md:block">
        <div className="mx-4 mt-4">
          <div
            className={`rounded-2xl px-6 py-3 transition-all duration-300 ${
              scrolled
                ? 'bg-white/90 backdrop-blur-lg shadow-soft border border-rtv-sand/50'
                : 'bg-white/70 backdrop-blur-md border border-rtv-sand/30'
            }`}
          >
            <div className="flex items-center justify-between">
              {/* Logo */}
              <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-rtv-teal to-rtv-tealDark flex items-center justify-center shadow-teal transition-transform group-hover:scale-105">
                  <span className="text-white text-sm font-bold">R</span>
                </div>
                <span className="text-rtv-ink font-bold text-lg tracking-tight">
                  Raize The Vibe
                </span>
              </Link>

              {/* Center Nav - Pill Chips */}
              <nav className="flex items-center gap-2">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wide text-rtv-stone hover:text-rtv-ink hover:bg-rtv-sand/60 transition-all duration-200"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>

              {/* Right Actions */}
              <div className="flex items-center gap-3">
                <Link
                  href="/collections/all"
                  className="btn-primary btn-sm"
                >
                  SHOP
                </Link>
                <CartButton variant="light" />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Header */}
      <header className="fixed top-0 left-0 right-0 z-50 md:hidden">
        <div className="mx-3 mt-3">
          <div
            className={`rounded-xl px-4 py-3 transition-all duration-300 ${
              scrolled
                ? 'bg-white/90 backdrop-blur-lg shadow-soft border border-rtv-sand/50'
                : 'bg-white/70 backdrop-blur-md border border-rtv-sand/30'
            }`}
          >
            <div className="flex items-center justify-between">
              {/* Logo */}
              <Link href="/" className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-rtv-teal to-rtv-tealDark flex items-center justify-center shadow-teal">
                  <span className="text-white text-xs font-bold">R</span>
                </div>
                <span className="text-rtv-ink font-bold text-base tracking-tight">
                  Raize The Vibe
                </span>
              </Link>

              {/* Right Actions */}
              <div className="flex items-center gap-2">
                <CartButton variant="light" />
                <button
                  onClick={() => setMobileMenuOpen(true)}
                  className="w-9 h-9 flex items-center justify-center rounded-lg text-rtv-stone hover:text-rtv-ink hover:bg-rtv-sand/60 transition-colors"
                  aria-label="Open menu"
                >
                  <MenuIcon />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[60] md:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-rtv-ink/60 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer */}
          <div className="absolute right-0 top-0 bottom-0 w-72 max-w-[85vw] bg-white border-l border-rtv-sand animate-slide-in-right shadow-2xl">
            <div className="flex items-center justify-between p-4 border-b border-rtv-sand">
              <span className="text-lg font-bold text-rtv-ink">Menu</span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="w-10 h-10 flex items-center justify-center text-rtv-stone hover:text-rtv-ink rounded-lg hover:bg-rtv-sand/60 transition-colors"
                aria-label="Close menu"
              >
                <CloseIcon />
              </button>
            </div>

            <nav className="p-4 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center px-4 py-3 text-rtv-stone hover:text-rtv-ink hover:bg-rtv-sand/40 rounded-lg transition-colors font-medium"
                >
                  {item.label}
                </Link>
              ))}
              <div className="pt-4 border-t border-rtv-sand mt-4">
                <Link
                  href="/collections/all"
                  onClick={() => setMobileMenuOpen(false)}
                  className="btn-primary w-full justify-center"
                >
                  Shop the Drop
                </Link>
              </div>
            </nav>

            {/* Mobile Menu Footer */}
            <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-rtv-sand bg-rtv-paper">
              <p className="text-xs text-rtv-stone text-center">
                Wear your faith. Love people on purpose.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Spacer for fixed header */}
      <div className="h-20 md:h-24" />
    </>
  );
}

function MenuIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
