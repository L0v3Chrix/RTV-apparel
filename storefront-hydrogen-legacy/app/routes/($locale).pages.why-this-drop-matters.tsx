import {type MetaFunction} from '@shopify/remix-oxygen';
import {Link} from '@remix-run/react';

import {whyThisDropContent} from '~/content/why-this-drop';
import {rtvPlaceholders} from '~/lib/placeholders';

export const meta: MetaFunction = () => {
  return [
    {title: 'Why This Drop Matters | Raize The Vibe'},
    {
      name: 'description',
      content:
        'Every collection has a story. This one started with restoration.',
    },
  ];
};

export default function WhyThisDropMattersPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={rtvPlaceholders.family.story[1]}
            alt="Why This Drop Matters"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 glass-overlay" />
        </div>

        <div className="relative z-10 section-container text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-glow">
            {whyThisDropContent.title}
          </h1>
          <p className="text-xl md:text-2xl text-primary/70 max-w-2xl mx-auto">
            {whyThisDropContent.subtitle}
          </p>
        </div>
      </section>

      {/* Intro */}
      <section className="section-padding border-b border-white/5">
        <div className="section-container">
          <p className="text-xl md:text-2xl text-primary/80 max-w-3xl mx-auto text-center leading-relaxed">
            {whyThisDropContent.intro}
          </p>
        </div>
      </section>

      {/* Content Sections */}
      <section className="section-padding">
        <div className="section-container">
          <div className="max-w-3xl mx-auto">
            {whyThisDropContent.sections.map((section, index) => (
              <div key={index} className="mb-16 last:mb-0">
                <h2 className="text-2xl md:text-3xl font-bold mb-6 gradient-text">
                  {section.heading}
                </h2>
                <div className="space-y-4">
                  <p className="text-lg text-primary/80 leading-relaxed">
                    {section.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTAs */}
      <section className="section-padding border-t border-white/5">
        <div className="section-container">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {whyThisDropContent.ctas.map((cta, index) => (
              <Link
                key={index}
                to={cta.href}
                className={index === 0 ? 'btn-primary' : 'btn-secondary'}
              >
                {cta.text}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
