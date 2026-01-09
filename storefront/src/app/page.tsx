import Link from 'next/link';
import Image from 'next/image';
import { getFeaturedProducts } from '@/lib/shopify/queries';
import { ProductCard } from '@/components/ui/ProductCard';
import { FamilyCarousel } from '@/components/sections/FamilyCarousel';

// Force dynamic rendering - env vars aren't available at build time on Vercel
export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const featuredProducts = await getFeaturedProducts(8);

  return (
    <>
      {/* Hero Section - Warm cream background with personality */}
      <section className="relative min-h-[85vh] sm:min-h-[80vh] flex items-center -mt-20 md:-mt-24 pt-20 md:pt-24 bg-rtv-cream overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 right-0 w-96 h-96 bg-rtv-teal/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-rtv-rust/5 rounded-full blur-3xl" />
        </div>

        <div className="container-wide relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Left Content */}
            <div className="order-2 lg:order-1">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rtv-teal/10 border border-rtv-teal/20 mb-6">
                <span className="w-2 h-2 rounded-full bg-rtv-teal animate-pulse" />
                <span className="text-rtv-teal text-xs font-bold uppercase tracking-wider">
                  Faith-Forward Streetwear
                </span>
              </div>

              {/* Headline */}
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-rtv-ink leading-[0.95] tracking-tight mb-6">
                WEAR THE
                <span className="block text-rtv-teal">MESSAGE.</span>
                KEEP THE
                <span className="block text-rtv-rust">PEACE.</span>
              </h1>

              {/* Subheadline */}
              <p className="text-rtv-stone text-lg md:text-xl max-w-lg mb-8 leading-relaxed">
                Defiant faith in every thread. Premium streetwear that speaks louder than words.
                Made for the ones who came back from the dark.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/collections/tees"
                  className="btn-primary btn-lg"
                >
                  SHOP TEES
                </Link>
                <Link
                  href="/collections/hoodies"
                  className="btn-outline btn-lg"
                >
                  SHOP HOODIES
                </Link>
              </div>

              {/* Trust indicators */}
              <div className="flex items-center gap-6 mt-10 pt-8 border-t border-rtv-sand">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-rtv-paper flex items-center justify-center">
                    <StarIcon className="w-4 h-4 text-rtv-gold" />
                  </div>
                  <span className="text-sm text-rtv-stone">Premium Quality</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-rtv-paper flex items-center justify-center">
                    <TruckIcon className="w-4 h-4 text-rtv-teal" />
                  </div>
                  <span className="text-sm text-rtv-stone">Free Shipping</span>
                </div>
              </div>
            </div>

            {/* Right - Hero Image */}
            <div className="order-1 lg:order-2 relative">
              <div className="relative aspect-[4/5] max-w-md mx-auto lg:max-w-none">
                {/* Main product card */}
                <div className="absolute inset-0 rounded-3xl bg-white shadow-card overflow-hidden border border-rtv-sand/50">
                  <Image
                    src="/images/family/3-generations.jpeg"
                    alt="Raize The Vibe Family wearing our apparel"
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-rtv-ink/60 via-transparent to-transparent" />
                  {/* Floating badge */}
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                      <p className="text-rtv-ink font-bold text-sm mb-1">Worn by our family</p>
                      <p className="text-rtv-stone text-xs">Made for yours.</p>
                    </div>
                  </div>
                </div>
                {/* Decorative floating elements */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-rtv-teal/20 rounded-full blur-xl" />
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-rtv-rust/20 rounded-full blur-xl" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Drop Section - Dark contrast section */}
      <section className="section bg-rtv-ink">
        <div className="container-wide">
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
            <div>
              <span className="text-rtv-teal text-xs font-bold uppercase tracking-wider mb-2 block">
                The Collection
              </span>
              <h2 className="heading-section text-white">
                Featured Drop
              </h2>
            </div>
            <Link
              href="/collections/all"
              className="btn-outline-light btn-sm"
            >
              View All
            </Link>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {featuredProducts.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                priority={index < 4}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Family Proof Section */}
      <FamilyCarousel />

      {/* Featured Product Spotlight - Light section */}
      <section className="section bg-rtv-paper">
        <div className="container-wide">
          <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
            {/* Product Image */}
            <div className="relative">
              <div className="relative aspect-square bg-white rounded-3xl overflow-hidden shadow-card border border-rtv-sand/50">
                <Image
                  src="/images/products/worship.png"
                  alt="Worship Is My Weapon Tee"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-contain p-8"
                />
              </div>
              {/* Floating accent */}
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-rtv-teal/10 rounded-full blur-xl" />
            </div>

            {/* Product Info */}
            <div>
              <span className="text-overline mb-3 block">Featured</span>
              <h2 className="heading-section text-rtv-ink mb-4">
                Worship Is My Weapon
              </h2>
              <p className="text-2xl text-rtv-teal font-bold mb-4">$34</p>
              <p className="text-body mb-8 max-w-md">
                Defiant faith in every thread. Jesus-centered for our community.
                The mindset of worship as your greatest weapon against doubt, fear, and the noise.
              </p>

              {/* Size Selector Preview */}
              <div className="mb-6">
                <label className="text-xs text-rtv-stone uppercase tracking-wider mb-3 block font-semibold">
                  Select Size
                </label>
                <div className="flex flex-wrap gap-2">
                  {['S', 'M', 'L', 'XL', '2XL'].map((size, index) => (
                    <button
                      key={size}
                      className={`w-12 h-12 rounded-lg border-2 font-semibold transition-all ${
                        index === 1
                          ? 'border-rtv-teal bg-rtv-teal text-white'
                          : 'border-rtv-sand bg-white text-rtv-stone hover:border-rtv-teal hover:text-rtv-teal'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Add to Cart */}
              <Link
                href="/products/worship-is-my-weapon-tee"
                className="btn-primary btn-lg w-full sm:w-auto justify-center mb-4"
              >
                ADD TO CART
              </Link>

              <p className="text-rtv-stone/60 text-sm flex items-center gap-2">
                <TruckIcon className="w-4 h-4" />
                Free shipping on orders over $50
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why We Raize Section - Warm accent section */}
      <section className="section bg-rtv-cream">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-overline mb-4 block">Our Story</span>
            <h2 className="heading-section text-rtv-ink mb-6">
              Why We Raize The Vibe
            </h2>
            <p className="text-rtv-stone text-lg md:text-xl leading-relaxed mb-8">
              Raize The Vibe is for the people who have been misunderstood, mislabeled, or pushed out.
              It is for parents learning a new way. It is for the ones who came back from the dark
              and decided to <span className="text-rtv-teal font-semibold">love louder than fear</span>.
            </p>
            <Link
              href="/pages/our-story"
              className="inline-flex items-center gap-2 text-rtv-teal hover:text-rtv-tealDark font-bold transition-colors group"
            >
              Read Our Full Story
              <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Row - Dark accent */}
      <section className="py-12 bg-rtv-charcoal">
        <div className="container-wide">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { icon: <ShieldIcon />, label: 'Secure Checkout', sublabel: '100% Safe' },
              { icon: <UsersIcon />, label: 'Family Business', sublabel: 'Real Humans' },
              { icon: <StarIcon className="w-6 h-6" />, label: 'Premium Fabric', sublabel: 'Soft & Durable' },
              { icon: <RefreshIcon />, label: 'Easy Returns', sublabel: '30 Day Policy' },
            ].map((item) => (
              <div key={item.label} className="flex flex-col items-center gap-3">
                <div className="w-14 h-14 rounded-full bg-rtv-teal/10 flex items-center justify-center text-rtv-teal">
                  {item.icon}
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">{item.label}</p>
                  <p className="text-white/50 text-xs">{item.sublabel}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA - Gradient section */}
      <section className="section bg-gradient-to-b from-rtv-paper to-rtv-cream">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="heading-section text-rtv-ink mb-4">
            Join the Movement
          </h2>
          <p className="text-rtv-stone text-lg mb-8">
            Wear your values. Start conversations. Love people on purpose.
          </p>
          <Link href="/collections/all" className="btn-primary btn-lg">
            Shop the Drop
          </Link>
        </div>
      </section>
    </>
  );
}

// Icons
function StarIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
    </svg>
  );
}

function TruckIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  );
}

function UsersIcon() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  );
}

function RefreshIcon() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
    </svg>
  );
}
