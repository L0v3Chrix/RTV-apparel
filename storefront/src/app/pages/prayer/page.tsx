import { Metadata } from 'next';
import Link from 'next/link';
import { SITE_COPY } from '@/content/siteCopy';

export const metadata: Metadata = {
  title: 'Prayer | Raize The Vibe',
  description: 'If you needed a sign today, let this be it. You are not alone. God is not done with you.',
};

function PrayerCard({ title, text }: { title: string; text: string }) {
  return (
    <div className="bg-white rounded-2xl p-6 md:p-8 border-l-4 border-rtv-teal shadow-soft">
      <h3 className="text-xl font-bold text-rtv-ink mb-4">
        {title}
      </h3>
      <div className="text-rtv-stone leading-relaxed whitespace-pre-line italic">
        {text}
      </div>
    </div>
  );
}

export default function PrayerPage() {
  const content = SITE_COPY.pages.prayer;

  return (
    <main className="min-h-screen bg-rtv-cream">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 bg-rtv-paper -mt-20 md:-mt-24 pt-32 md:pt-40">
        <div className="container-narrow text-center">
          <h1 className="heading-hero text-rtv-ink mb-4">
            {content.title}
          </h1>
          <p className="text-lg md:text-xl text-rtv-stone max-w-2xl mx-auto">
            {content.intro}
          </p>
        </div>
      </section>

      {/* Prayers */}
      <section className="container-narrow py-16 md:py-20">
        <div className="space-y-6">
          {content.prayers.map((prayer, index) => (
            <PrayerCard key={index} title={prayer.title} text={prayer.text} />
          ))}
        </div>

        {/* Email Signup */}
        <div className="mt-16 bg-rtv-paper rounded-2xl p-8 text-center border border-rtv-sand">
          <h2 className="text-2xl font-bold text-rtv-ink mb-2">
            {content.emailModule.headline}
          </h2>
          <p className="text-rtv-stone mb-6">
            {content.emailModule.subhead}
          </p>
          <form className="max-w-md mx-auto flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Your email"
              className="input-field flex-1"
              required
            />
            <button
              type="submit"
              className="btn-primary"
            >
              {content.emailModule.button}
            </button>
          </form>
          <p className="mt-4 text-sm text-rtv-stone/60">
            {content.emailModule.consent}
          </p>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <Link href={content.cta.href} className="btn-primary btn-lg">
            {content.cta.text}
          </Link>
        </div>
      </section>
    </main>
  );
}
