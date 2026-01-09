import {Link} from '@remix-run/react';

import {heroContent} from '~/content/home';
import {rtvPlaceholders} from '~/lib/placeholders';
import {SITE_COPY} from '~/content/siteCopy';

interface RTVHeroProps {
  /** Override the background image URL */
  backgroundImage?: string;
  /** Override content from home.ts */
  content?: typeof heroContent;
}

/**
 * RTVHero - Full-viewport hero with family photo background
 * Centered glass card overlay matching mockup design
 */
export function RTVHero({
  backgroundImage = rtvPlaceholders.family.hero,
  content = heroContent,
}: RTVHeroProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={backgroundImage}
          alt="Raize The Vibe family"
          className="w-full h-full object-cover object-top"
          loading="eager"
          decoding="sync"
        />
        {/* Dark vignette overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-rtv-obsidian via-rtv-obsidian/40 to-rtv-obsidian/20" />
        <div className="absolute inset-0 bg-rtv-obsidian/30" />
      </div>

      {/* Centered Glass Card - matches mockup */}
      <div className="relative z-10 w-full max-w-lg mx-4 md:mx-auto">
        <div
          className="
            bg-white/10
            backdrop-blur-[20px]
            border border-white/20
            rounded-2xl
            p-8 md:p-10
            text-center
            shadow-[0_8px_32px_rgba(0,0,0,0.4)]
          "
        >
          {/* Brand Label */}
          <div className="flex items-center justify-center gap-2 mb-6">
            <img
              src="/images/logo-header-transparent.png"
              alt=""
              className="h-6 w-auto"
            />
            <span className="text-sm font-medium text-white/90 tracking-wide">
              {SITE_COPY.brand.name}
            </span>
          </div>

          {/* Main Headline - styled like mockup */}
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 leading-tight tracking-tight">
            WEAR THE MESSAGE.
            <br />
            KEEP THE PEACE.
          </h1>

          {/* Subtext */}
          <p className="text-sm md:text-base text-white/70 mb-8 max-w-sm mx-auto leading-relaxed">
            {SITE_COPY.brand.shortIntro}
          </p>

          {/* CTA Buttons - Teal style matching mockup */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to={content.primaryCta.href}
              className="
                inline-flex items-center justify-center
                px-6 py-3
                bg-rtv-cyan hover:bg-rtv-cyan/90
                text-rtv-obsidian font-semibold text-sm
                rounded-full
                transition-all duration-300
                hover:shadow-[0_0_20px_rgba(99,179,237,0.4)]
                uppercase tracking-wide
              "
            >
              {content.primaryCta.text}
            </Link>
            <Link
              to={content.secondaryCta.href}
              className="
                inline-flex items-center justify-center
                px-6 py-3
                bg-rtv-cyan hover:bg-rtv-cyan/90
                text-rtv-obsidian font-semibold text-sm
                rounded-full
                transition-all duration-300
                hover:shadow-[0_0_20px_rgba(99,179,237,0.4)]
                uppercase tracking-wide
              "
            >
              {content.secondaryCta.text}
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg
          className="w-6 h-6 text-white/40"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </section>
  );
}

export default RTVHero;
