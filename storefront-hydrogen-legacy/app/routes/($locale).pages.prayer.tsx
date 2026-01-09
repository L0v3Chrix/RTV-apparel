import {type MetaFunction} from '@shopify/remix-oxygen';
import {Link} from '@remix-run/react';

import {prayerContent} from '~/content/prayer';

export const meta: MetaFunction = () => {
  return [
    {title: 'A Prayer For You | Raize The Vibe'},
    {
      name: 'description',
      content:
        'Before you shop, can we pray? We believe every purchase is an opportunity for blessing.',
    },
  ];
};

export default function PrayerPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 md:py-32 text-center">
        <div className="section-container">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-glow">
            {prayerContent.title}
          </h1>
          <p className="text-xl md:text-2xl text-primary/70 max-w-2xl mx-auto mb-8">
            {prayerContent.subtitle}
          </p>
          <p className="text-lg text-primary/60 max-w-xl mx-auto">
            {prayerContent.intro}
          </p>
        </div>
      </section>

      {/* Prayers */}
      <section className="section-padding">
        <div className="section-container">
          <div className="grid gap-8 md:gap-12 max-w-4xl mx-auto">
            {prayerContent.prayers.map((prayer, index) => (
              <div key={index} className="glass-card-glow p-8 md:p-10">
                <h2 className="text-2xl md:text-3xl font-bold mb-6 gradient-text">
                  {prayer.title}
                </h2>
                <div className="prose prose-invert max-w-none">
                  {prayer.text.split('\n\n').map((paragraph, pIndex) => (
                    <p
                      key={pIndex}
                      className="text-lg text-primary/80 leading-relaxed mb-4 last:mb-0 whitespace-pre-line"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Email Signup */}
      <section className="section-padding border-t border-white/5">
        <div className="section-container">
          <div className="glass-card p-8 md:p-12 max-w-2xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-4">
              {prayerContent.signupSection.title}
            </h3>
            <p className="text-primary/60 mb-6">
              {prayerContent.signupSection.description}
            </p>

            {/* Simple email form placeholder - TODO: Connect to Klaviyo/GHL */}
            <form className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-white/30 transition-colors"
                />
                <button type="submit" className="btn-primary whitespace-nowrap">
                  Subscribe
                </button>
              </div>
              <label className="flex items-center gap-3 text-sm text-primary/60 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-white/20 bg-white/5"
                />
                <span>{prayerContent.signupSection.checkboxLabel}</span>
              </label>
            </form>

            <div className="mt-8 pt-6 border-t border-white/10">
              <Link
                to={prayerContent.signupSection.ctaButtonHref}
                className="btn-secondary inline-block"
              >
                {prayerContent.signupSection.ctaButtonText}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
