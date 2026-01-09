import {useState} from 'react';
import {type MetaFunction} from '@shopify/remix-oxygen';
import {Link} from '@remix-run/react';

import {faqContent} from '~/content/faq';

export const meta: MetaFunction = () => {
  return [
    {title: 'FAQ | Raize The Vibe'},
    {
      name: 'description',
      content:
        'Frequently asked questions about Raize The Vibe apparel, shipping, returns, and more.',
    },
  ];
};

function FAQItem({question, answer}: {question: string; answer: string}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-white/10 last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-5 flex items-center justify-between text-left"
        aria-expanded={isOpen}
      >
        <span className="font-medium text-lg pr-4">{question}</span>
        <svg
          className={`w-5 h-5 flex-shrink-0 text-primary/40 transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-96 pb-5' : 'max-h-0'
        }`}
      >
        <p className="text-primary/70 leading-relaxed">{answer}</p>
      </div>
    </div>
  );
}

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState(
    faqContent.categories[0].name,
  );

  const activeQuestions =
    faqContent.categories.find((cat) => cat.name === activeCategory)
      ?.questions || [];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 md:py-32 text-center">
        <div className="section-container">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-glow">
            {faqContent.title}
          </h1>
          <p className="text-xl text-primary/70 max-w-2xl mx-auto">
            {faqContent.subtitle}
          </p>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="section-padding">
        <div className="section-container">
          <div className="max-w-3xl mx-auto">
            {/* Category Tabs */}
            <div className="flex flex-wrap gap-2 mb-8 justify-center">
              {faqContent.categories.map((category) => (
                <button
                  key={category.name}
                  onClick={() => setActiveCategory(category.name)}
                  className={`px-4 py-2 rounded-lg transition-all ${
                    activeCategory === category.name
                      ? 'bg-white/10 text-primary'
                      : 'text-primary/60 hover:text-primary hover:bg-white/5'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>

            {/* Questions */}
            <div className="glass-card">
              {activeQuestions.map((item, index) => (
                <FAQItem key={index} question={item.q} answer={item.a} />
              ))}
            </div>

            {/* All Categories Expanded View */}
            <div className="mt-16 space-y-12">
              {faqContent.categories.map((category) => (
                <div key={category.name}>
                  <h2 className="text-2xl font-bold mb-6 gradient-text">
                    {category.name}
                  </h2>
                  <div className="glass-card">
                    {category.questions.map((item, index) => (
                      <FAQItem key={index} question={item.q} answer={item.a} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="section-padding border-t border-white/5">
        <div className="section-container text-center">
          <p className="text-lg text-primary/60 mb-6">
            Still have questions? We&apos;re here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="mailto:hello@raizethevibe.com" className="btn-secondary">
              Email Us
            </a>
            <Link to={faqContent.closingCta.href} className="btn-primary">
              {faqContent.closingCta.text}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
