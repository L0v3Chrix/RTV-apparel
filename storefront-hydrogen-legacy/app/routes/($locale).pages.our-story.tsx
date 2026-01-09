import {type MetaFunction} from '@shopify/remix-oxygen';
import {Link} from '@remix-run/react';

import {storyContent} from '~/content/story';
import {rtvPlaceholders} from '~/lib/placeholders';

export const meta: MetaFunction = () => {
  return [
    {title: 'Our Story: Why We Raize The Vibe | Raize The Vibe'},
    {
      name: 'description',
      content:
        'Two years ago we were living in our car in Arkansas. This is the story that became our flag.',
    },
  ];
};

export default function OurStoryPage() {
  return (
    <div className="min-h-screen bg-rtv-obsidian">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={rtvPlaceholders.family.story[0]}
            alt="Our Story"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-rtv-obsidian/80 via-rtv-obsidian/60 to-rtv-obsidian" />
        </div>

        <div className="relative z-10 section-container text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-2 text-white">
            {storyContent.title}
          </h1>
          <p className="text-2xl md:text-3xl text-rtv-cyan font-medium mb-8">
            {storyContent.subtitle}
          </p>
          <p className="text-xl text-white/80 italic">
            {storyContent.intro}
          </p>
        </div>
      </section>

      {/* Story Content */}
      <section className="py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-6 md:px-8">
          {/* Intro body - the "Before we tell you..." section */}
          <div className="mb-16 text-center">
            <p className="text-lg md:text-xl text-white/70 leading-relaxed">
              {storyContent.introBody}
            </p>
          </div>

          <hr className="border-white/10 mb-16" />

          {/* Main story sections */}
          {storyContent.sections.map((section, index) => (
            <div key={index} className="mb-16 last:mb-0">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white">
                {section.heading}
              </h2>
              <div className="space-y-4">
                {section.paragraphs.map((paragraph, pIndex) => (
                  <p
                    key={pIndex}
                    className="text-lg text-white/80 leading-relaxed"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          ))}

          <hr className="border-white/10 my-16" />

          {/* Thank You Section */}
          {storyContent.thankYou && (
            <div className="mb-16 text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white">
                {storyContent.thankYou.heading}
              </h2>
              <div className="space-y-4">
                {storyContent.thankYou.paragraphs.map((paragraph, pIndex) => (
                  <p
                    key={pIndex}
                    className="text-lg text-white/80 leading-relaxed"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
              <p className="text-xl md:text-2xl font-bold text-rtv-cyan mt-8 italic">
                {storyContent.thankYou.signOff}
              </p>
            </div>
          )}

          {/* Closing CTA */}
          <div className="pt-8 text-center">
            <Link
              to={storyContent.closingCta.href}
              className="inline-block px-8 py-4 bg-rtv-cyan text-rtv-obsidian font-bold rounded-lg hover:bg-rtv-cyan/90 transition-colors"
            >
              {storyContent.closingCta.text}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
