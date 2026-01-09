import {useState, useCallback} from 'react';
import {Image} from '@shopify/hydrogen';

import type {MediaFragment} from 'storefrontapi.generated';

/**
 * ProductGallery - Rebuilt for proper PDP experience
 *
 * Desktop: Main image (left) + vertical thumbnails strip
 * Mobile: Swipeable carousel with dot indicators
 *
 * Max 6 images shown, fixed aspect ratios for consistency
 */
export function ProductGallery({
  media,
  className,
}: {
  media: MediaFragment[];
  className?: string;
}) {
  const [activeIndex, setActiveIndex] = useState(0);

  // Limit to 6 images max for cleaner UX
  const images = media.slice(0, 6).filter((med) => med.__typename === 'MediaImage');

  const handleThumbnailClick = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  const handleSwipe = useCallback(
    (direction: 'left' | 'right') => {
      if (direction === 'left') {
        setActiveIndex((prev) => (prev + 1) % images.length);
      } else {
        setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
      }
    },
    [images.length],
  );

  if (!images.length) {
    return null;
  }

  const activeMedia = images[activeIndex];
  const activeImage =
    activeMedia.__typename === 'MediaImage' && 'image' in activeMedia
      ? {
          ...activeMedia.image,
          altText: activeMedia.alt || 'Product image',
        }
      : null;

  return (
    <div className={`${className}`}>
      {/* Desktop Layout: Main image + Thumbnails */}
      <div className="hidden md:flex md:gap-4">
        {/* Thumbnail Strip - Vertical on left */}
        {images.length > 1 && (
          <div className="flex flex-col gap-2 w-20 flex-shrink-0">
            {images.map((med, i) => {
              const image =
                med.__typename === 'MediaImage' && 'image' in med
                  ? {...med.image, altText: med.alt || `Product thumbnail ${i + 1}`}
                  : null;

              return (
                <button
                  key={med.id || image?.id}
                  onClick={() => handleThumbnailClick(i)}
                  className={`
                    relative aspect-square overflow-hidden rounded-lg
                    border-2 transition-all duration-200
                    ${
                      activeIndex === i
                        ? 'border-rtv-cyan shadow-glow-sm'
                        : 'border-white/10 hover:border-white/30'
                    }
                  `}
                  aria-label={`View image ${i + 1}`}
                >
                  {image && (
                    <Image
                      data={image}
                      aspectRatio="1/1"
                      sizes="80px"
                      className="object-cover w-full h-full"
                    />
                  )}
                </button>
              );
            })}
          </div>
        )}

        {/* Main Image */}
        <div className="flex-1 relative">
          <div
            className="
              aspect-square overflow-hidden rounded-xl
              bg-white/5 border border-white/10
            "
          >
            {activeImage && (
              <Image
                loading="eager"
                data={activeImage}
                aspectRatio="1/1"
                sizes="(min-width: 64em) 50vw, 60vw"
                className="object-cover w-full h-full"
              />
            )}
          </div>
        </div>
      </div>

      {/* Mobile Layout: Swipeable Carousel */}
      <div className="md:hidden">
        {/* Carousel Container */}
        <div
          className="relative aspect-square overflow-hidden rounded-xl bg-white/5"
          onTouchStart={(e) => {
            const touch = e.touches[0];
            (e.currentTarget as any).touchStartX = touch.clientX;
          }}
          onTouchEnd={(e) => {
            const touchStartX = (e.currentTarget as any).touchStartX;
            const touchEndX = e.changedTouches[0].clientX;
            const diff = touchStartX - touchEndX;

            if (Math.abs(diff) > 50) {
              handleSwipe(diff > 0 ? 'left' : 'right');
            }
          }}
        >
          {activeImage && (
            <Image
              loading="eager"
              data={activeImage}
              aspectRatio="1/1"
              sizes="100vw"
              className="object-cover w-full h-full"
            />
          )}
        </div>

        {/* Dot Indicators */}
        {images.length > 1 && (
          <div className="flex justify-center gap-2 mt-4">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => handleThumbnailClick(i)}
                className={`
                  w-2 h-2 rounded-full transition-all duration-200
                  ${
                    activeIndex === i
                      ? 'bg-rtv-cyan w-6'
                      : 'bg-white/30 hover:bg-white/50'
                  }
                `}
                aria-label={`Go to image ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
