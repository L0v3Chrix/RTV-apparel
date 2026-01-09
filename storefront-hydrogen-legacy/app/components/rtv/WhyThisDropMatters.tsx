import {Link} from '@remix-run/react';

import {SITE_COPY} from '~/content/siteCopy';

/**
 * WhyThisDropMatters - Homepage section teasing the full "Why This Drop Matters" page
 * Shows the 4 key sections with CTAs to explore more
 */
export function WhyThisDropMatters() {
  const content = SITE_COPY.pages.whyThisDropMatters;

  return (
    <section className="py-16 md:py-24 bg-rtv-obsidian">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {content.headline}
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            {content.intro}
          </p>
        </div>

        {/* Four Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {content.sections.map((section, index) => (
            <div
              key={index}
              className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-8 hover:bg-white/10 transition-all duration-300"
            >
              {/* Number badge */}
              <div className="absolute -top-3 -left-3 w-8 h-8 bg-rtv-cyan rounded-full flex items-center justify-center text-rtv-obsidian font-bold text-sm">
                {index + 1}
              </div>

              <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-rtv-cyan transition-colors">
                {section.heading}
              </h3>
              <p className="text-white/60 leading-relaxed">
                {section.body}
              </p>
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          {content.ctas.map((cta, index) => (
            <Link
              key={index}
              to={cta.href}
              className={
                index === 0
                  ? 'inline-flex items-center justify-center px-8 py-3 bg-rtv-cyan text-rtv-obsidian font-semibold rounded-full hover:bg-rtv-cyan/90 transition-colors'
                  : 'inline-flex items-center justify-center px-8 py-3 border border-white/30 text-white font-semibold rounded-full hover:bg-white/10 transition-colors'
              }
            >
              {cta.text}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WhyThisDropMatters;
