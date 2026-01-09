import { Metadata } from 'next';
import Link from 'next/link';
import { SITE_COPY } from '@/content/siteCopy';

export const metadata: Metadata = {
  title: 'FAQ | Raize The Vibe',
  description: 'Frequently asked questions about Raize The Vibe apparel - shipping, returns, product care, and our mission.',
};

function FAQItem({ question, answer }: { question: string; answer: string }) {
  return (
    <details className="group border-b border-rtv-sand last:border-b-0">
      <summary className="flex cursor-pointer items-center justify-between py-4 text-base md:text-lg font-medium text-rtv-ink hover:text-rtv-teal transition-colors">
        {question}
        <span className="ml-4 shrink-0 text-rtv-teal transition-transform group-open:rotate-180">
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </summary>
      <div className="pb-4 text-rtv-stone leading-relaxed">
        {answer}
      </div>
    </details>
  );
}

export default function FAQPage() {
  const content = SITE_COPY.pages.faq;

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

      {/* FAQ Categories */}
      <section className="container-narrow py-16 md:py-20">
        <div className="space-y-10">
          {content.categories.map((category, index) => (
            <div key={index}>
              <h2 className="text-lg font-bold text-rtv-teal uppercase tracking-wider mb-4">
                {category.name}
              </h2>
              <div className="bg-white rounded-2xl p-6 shadow-soft border border-rtv-sand/50">
                {category.questions.map((item, qIndex) => (
                  <FAQItem key={qIndex} question={item.q} answer={item.a} />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <p className="text-rtv-stone mb-6">
            Still have questions? Hit us up and we will help.
          </p>
          <Link href="/collections/all" className="btn-primary btn-lg">
            Back to Shop
          </Link>
        </div>
      </section>
    </main>
  );
}
