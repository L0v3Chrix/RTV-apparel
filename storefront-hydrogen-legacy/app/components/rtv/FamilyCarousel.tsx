import {useRef} from 'react';

import {familyProofContent} from '~/content/home';
import {rtvPlaceholders} from '~/lib/placeholders';

interface FamilyCarouselProps {
  /** Override images from placeholders */
  images?: string[];
  /** Override captions from content */
  captions?: string[];
  /** Section title */
  title?: string;
}

/**
 * FamilyCarousel - Horizontal scroll carousel of family photos
 * Matches wireframe "Family Proof" section
 */
export function FamilyCarousel({
  images = rtvPlaceholders.family.carousel,
  captions = familyProofContent.captions,
  title = familyProofContent.sectionTitle,
}: FamilyCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 320; // Card width + gap
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="section-padding overflow-hidden">
      <div className="section-container">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold">{title}</h2>

          {/* Navigation Arrows */}
          <div className="flex gap-2">
            <button
              onClick={() => scroll('left')}
              className="w-10 h-10 rounded-full glass-card flex items-center justify-center hover:bg-white/10 transition-colors"
              aria-label="Scroll left"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              onClick={() => scroll('right')}
              className="w-10 h-10 rounded-full glass-card flex items-center justify-center hover:bg-white/10 transition-colors"
              aria-label="Scroll right"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Carousel */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory hiddenScroll -mx-4 px-4"
        >
          {images.map((image, index) => (
            <div key={index} className="flex-shrink-0 w-72 md:w-80 snap-start">
              <div className="glass-card-hover overflow-hidden">
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={image}
                    alt={captions[index] || `Family photo ${index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    loading="lazy"
                  />
                </div>
                {captions[index] && (
                  <div className="p-4">
                    <p className="text-sm text-primary/70">{captions[index]}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FamilyCarousel;
