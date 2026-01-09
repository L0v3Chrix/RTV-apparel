import { Metadata } from 'next';
import Link from 'next/link';
import { SITE_COPY } from '@/content/siteCopy';

export const metadata: Metadata = {
  title: 'Why This Drop Matters | Raize The Vibe',
  description: 'This is not a random merch drop. This is a marker in the road. A way of saying we came back, and we are not going quiet about love.',
};

export default function WhyThisDropMattersPage() {
  const content = SITE_COPY.pages.whyThisDropMatters;

  return (
    <main className="min-h-screen bg-rtv-parchment">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 bg-gradient-to-b from-rtv-navy to-rtv-navy/90">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
            {content.headline}
          </h1>
          <p className="text-lg md:text-xl text-rtv-parchment/80 max-w-2xl mx-auto">
            {content.intro}
          </p>
        </div>
      </section>

      {/* Content Sections */}
      <section className="container mx-auto px-4 py-16 max-w-3xl">
        <div className="space-y-12">
          {content.sections.map((section, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg p-8 border-t-4 border-rtv-gold"
            >
              <h2 className="text-2xl font-display font-bold text-rtv-navy mb-4">
                {section.heading}
              </h2>
              <p className="text-rtv-charcoal/80 leading-relaxed text-lg">
                {section.body}
              </p>
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div className="mt-16 flex flex-col sm:flex-row gap-4 justify-center">
          {content.ctas.map((cta, index) => (
            <Link
              key={index}
              href={cta.href}
              className={`px-8 py-4 font-bold rounded-lg transition-colors text-lg text-center ${
                index === 0
                  ? 'bg-rtv-gold text-rtv-navy hover:bg-rtv-gold/90'
                  : 'bg-rtv-navy text-white hover:bg-rtv-navy/90'
              }`}
            >
              {cta.text}
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
