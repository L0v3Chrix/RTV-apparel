import {Link} from '@remix-run/react';

import {SITE_COPY} from '~/content/siteCopy';

/**
 * StoryTeaser - Compelling teaser block for Our Story
 * Single focused CTA to read the full story
 */
export function StoryTeaser() {
  const content = SITE_COPY.home.storyTeaser;

  return (
    <section className="py-16 md:py-24 bg-rtv-obsidian">
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        <div className="relative bg-white/[0.04] backdrop-blur-sm border border-white/10 rounded-2xl p-8 md:p-12 overflow-hidden">
          {/* Decorative glow */}
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-rtv-cyan/10 rounded-full blur-3xl" />

          {/* Content */}
          <div className="relative text-center">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-6">
              {content.headline}
            </h2>

            <p className="text-lg text-white/60 leading-relaxed mb-8 max-w-2xl mx-auto">
              {content.excerpt}
            </p>

            <Link
              to={content.cta.href}
              className="
                inline-flex items-center gap-2
                px-6 py-3
                bg-white/10 hover:bg-white/15
                text-white font-medium
                border border-white/20
                rounded-full
                transition-all duration-300
                group
              "
            >
              {content.cta.text}
              <svg
                className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default StoryTeaser;
