import { Metadata } from 'next';
import Link from 'next/link';
import { SITE_COPY } from '@/content/siteCopy';

export const metadata: Metadata = {
  title: 'Our Story | Raize The Vibe',
  description: 'The story behind Raize The Vibe. Two years ago we were living in our car in Arkansas. This is how we came back.',
};

export default function OurStoryPage() {
  const content = SITE_COPY.pages.ourStory;

  return (
    <main className="min-h-screen bg-rtv-cream">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 bg-rtv-paper -mt-20 md:-mt-24 pt-32 md:pt-40">
        <div className="container-narrow text-center">
          <span className="text-overline mb-4 block">
            Chapter One
          </span>
          <h1 className="heading-hero text-rtv-ink mb-4">
            {content.title}
          </h1>
          <p className="text-xl md:text-2xl text-rtv-stone">
            {content.subtitle}
          </p>
        </div>
      </section>

      {/* Content */}
      <article className="container-narrow py-16 md:py-20">
        {/* Intro */}
        <div className="mb-16 text-center">
          <p className="text-2xl md:text-3xl font-semibold text-rtv-ink mb-4">
            {content.intro}
          </p>
          <p className="text-lg text-rtv-stone">
            {content.introBody}
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-16">
          {content.sections.map((section, index) => (
            <section key={index}>
              <h2 className="text-xl md:text-2xl font-bold text-rtv-ink mb-6 pb-4 border-b border-rtv-sand">
                {section.heading}
              </h2>
              <div className="space-y-4">
                {section.paragraphs.map((paragraph, pIndex) => (
                  <p key={pIndex} className="text-rtv-stone leading-relaxed text-lg">
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Thank You Section */}
        <section className="mt-20 pt-12 border-t border-rtv-sand">
          <h2 className="text-xl md:text-2xl font-bold text-rtv-ink mb-6">
            {content.thankYou.heading}
          </h2>
          <div className="space-y-4">
            {content.thankYou.paragraphs.map((paragraph, index) => (
              <p key={index} className="text-rtv-stone leading-relaxed text-lg">
                {paragraph}
              </p>
            ))}
          </div>
          <p className="mt-8 text-xl text-rtv-teal italic font-medium">
            {content.thankYou.signOff}
          </p>
        </section>

        {/* CTA */}
        <div className="mt-16 text-center">
          <Link
            href={content.closingCta.href}
            className="btn-primary btn-lg"
          >
            {content.closingCta.text}
          </Link>
        </div>
      </article>
    </main>
  );
}
