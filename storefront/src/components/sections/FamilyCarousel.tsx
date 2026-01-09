'use client';

import Image from 'next/image';
import { useRef } from 'react';

const familyImages = [
  {
    src: '/images/family/wife-me.jpeg',
    caption: 'Worn by our family—made for yours.',
  },
  {
    src: '/images/family/w-wife-me.jpeg',
    caption: 'Worn by our family—made for yours.',
  },
  {
    src: '/images/family/yaya-grandpa.jpeg',
    caption: 'Authentic faith.',
  },
  {
    src: '/images/family/older-kids.jpeg',
    caption: 'Worn by our family—made for yours.',
  },
  {
    src: '/images/family/3-generations.jpeg',
    caption: 'Three generations strong.',
  },
  {
    src: '/images/family/me-wife.png',
    caption: 'Worn by our family—made for yours.',
  },
];

export function FamilyCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="py-12 md:py-16 bg-rtv-sand overflow-hidden">
      {/* Section Header */}
      <div className="container-wide mb-6">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-rtv-teal text-xs font-bold uppercase tracking-wider mb-1 block">
              Real Family
            </span>
            <h2 className="text-lg sm:text-xl font-bold text-rtv-ink">
              Family Proof
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => scroll('left')}
              className="w-10 h-10 rounded-full bg-white border border-rtv-sand flex items-center justify-center text-rtv-stone hover:text-rtv-teal hover:border-rtv-teal transition-all shadow-soft"
              aria-label="Scroll left"
            >
              <ChevronLeftIcon />
            </button>
            <button
              onClick={() => scroll('right')}
              className="w-10 h-10 rounded-full bg-white border border-rtv-sand flex items-center justify-center text-rtv-stone hover:text-rtv-teal hover:border-rtv-teal transition-all shadow-soft"
              aria-label="Scroll right"
            >
              <ChevronRightIcon />
            </button>
          </div>
        </div>
      </div>

      {/* Carousel */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide px-4 md:px-8 pb-4 snap-x snap-mandatory"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {familyImages.map((image, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-40 sm:w-48 md:w-56 snap-start group"
          >
            <div
              className="relative w-full rounded-2xl overflow-hidden mb-3 bg-white border border-rtv-sand/50 shadow-soft transition-all duration-300 group-hover:shadow-card group-hover:scale-[1.02]"
              style={{ aspectRatio: '1/1' }}
            >
              <Image
                src={image.src}
                alt={image.caption}
                width={224}
                height={224}
                className="object-cover w-full h-full"
              />
              {/* Subtle gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-rtv-ink/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <p className="text-rtv-stone text-xs truncate">{image.caption}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function ChevronLeftIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  );
}
