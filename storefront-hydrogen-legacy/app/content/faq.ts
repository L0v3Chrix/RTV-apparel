/**
 * FAQ Page Content
 * Sourced from SITE_COPY master file
 * V1 PLACEHOLDER — Move to Shopify Pages in V2
 */

import {SITE_COPY} from './siteCopy';

// Re-export from SITE_COPY for backwards compatibility
export const faqContent = {
  title: SITE_COPY.pages.faq.title,
  subtitle: 'Questions we get asked (and some we wish people would ask)',
  intro: SITE_COPY.pages.faq.intro,
  categories: SITE_COPY.pages.faq.categories,
  closingCta: {
    text: 'Back to Shop',
    href: '/collections/all',
  },
};
