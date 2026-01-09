'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function NotFound() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <main className="min-h-screen bg-rtv-obsidian flex items-center justify-center -mt-20 md:-mt-24 pt-20 md:pt-24">
      <div className="container-narrow text-center">
        {/* Animated 404 */}
        <div className="relative mb-8">
          <h1
            className={`text-[8rem] sm:text-[12rem] md:text-[16rem] font-bold leading-none transition-all duration-1000 ${
              mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{
              background: 'linear-gradient(135deg, #3AA3A5 0%, #2D8A8C 50%, #1d5a5c 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: 'none',
              filter: 'drop-shadow(0 0 40px rgba(45, 138, 140, 0.3))',
            }}
          >
            404
          </h1>
          {/* Glow effect behind */}
          <div
            className="absolute inset-0 -z-10 blur-3xl opacity-30"
            style={{
              background: 'radial-gradient(circle at center, rgba(45, 138, 140, 0.4) 0%, transparent 70%)',
            }}
          />
        </div>

        {/* Message */}
        <div className={`transition-all duration-1000 delay-200 ${
          mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
            Page Not Found
          </h2>
          <p className="text-white/60 text-lg mb-8 max-w-md mx-auto">
            Looks like this page wandered off. Let&apos;s get you back to the good stuff.
          </p>
        </div>

        {/* CTAs */}
        <div className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-1000 delay-400 ${
          mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          <Link href="/" className="btn-primary btn-lg">
            Back to Home
          </Link>
          <Link href="/collections/all" className="btn-secondary btn-lg">
            Shop the Drop
          </Link>
        </div>

        {/* Fun quote */}
        <p className={`mt-12 text-white/30 text-sm italic transition-all duration-1000 delay-600 ${
          mounted ? 'opacity-100' : 'opacity-0'
        }`}>
          &quot;Sometimes you gotta get lost to find your vibe.&quot;
        </p>
      </div>
    </main>
  );
}
