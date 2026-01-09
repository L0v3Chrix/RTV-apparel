import {useState} from 'react';
import {Link} from '@remix-run/react';

import {missionTeaserContent} from '~/content/home';

interface MissionTeaserProps {
  /** Override content from home.ts */
  content?: typeof missionTeaserContent;
  /** Start expanded */
  defaultExpanded?: boolean;
}

/**
 * MissionTeaser - Collapsible mission preview section
 * Expandable section with quick links to key pages
 */
export function MissionTeaser({
  content = missionTeaserContent,
  defaultExpanded = false,
}: MissionTeaserProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  return (
    <section className="section-padding">
      <div className="section-container">
        <div className="glass-card-glow p-8 md:p-12 max-w-4xl mx-auto">
          {/* Section Label */}
          <p className="text-sm uppercase tracking-widest text-primary/50 mb-4">
            {content.label}
          </p>

          {/* Title */}
          <h2 className="text-3xl md:text-4xl font-bold mb-6 gradient-text">
            {content.title}
          </h2>

          {/* Preview Text */}
          <p className="text-lg text-primary/70 mb-8 leading-relaxed">
            {content.preview}
          </p>

          {/* Expandable Links Section */}
          <div
            className={`overflow-hidden transition-all duration-500 ${
              isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            <nav className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {content.links.map((link, index) => (
                <Link
                  key={index}
                  to={link.href}
                  className="glass-card p-4 flex items-center justify-between hover:bg-white/10 transition-colors group"
                >
                  <span className="font-medium">{link.text}</span>
                  <svg
                    className="w-5 h-5 text-primary/40 group-hover:text-primary/80 transition-colors"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              ))}
            </nav>
          </div>

          {/* Toggle Button */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full py-4 flex items-center justify-center gap-2 text-primary/60 hover:text-primary transition-colors"
            aria-expanded={isExpanded}
          >
            <span>{isExpanded ? 'Show Less' : 'Explore More'}</span>
            <svg
              className={`w-5 h-5 transition-transform duration-300 ${
                isExpanded ? 'rotate-180' : ''
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

          {/* Footer CTA */}
          <div className="pt-6 border-t border-white/10">
            <Link
              to={content.footerCta.href}
              className="btn-primary w-full sm:w-auto inline-block text-center"
            >
              {content.footerCta.text}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MissionTeaser;
