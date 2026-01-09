/**
 * Homepage Content
 * Sourced from SITE_COPY master file
 * V1 PLACEHOLDER — Move to Shopify metafields in V2
 */

import {SITE_COPY} from './siteCopy';

// Re-export from SITE_COPY for backwards compatibility
export const heroContent = {
  headline: SITE_COPY.home.hero.headline,
  subheadline: SITE_COPY.home.hero.subheadline,
  description: SITE_COPY.brand.shortIntro,
  primaryCta: SITE_COPY.home.hero.primaryCta,
  secondaryCta: SITE_COPY.home.hero.secondaryCta,
  tertiaryLink: {
    text: 'Read our story',
    href: '/pages/our-story',
  },
  note: SITE_COPY.home.hero.note,
};

export const featuredDropContent = {
  sectionTitle: SITE_COPY.home.featuredDrop.sectionTitle,
  filterTabs: SITE_COPY.home.featuredDrop.tabs,
  quickAdd: SITE_COPY.home.featuredDrop.quickAdd,
  fromLabel: SITE_COPY.home.featuredDrop.fromLabel,
};

export const familyProofContent = {
  sectionTitle: SITE_COPY.home.familyProof.headline,
  subheadline: SITE_COPY.home.familyProof.subheadline,
  cta: SITE_COPY.home.familyProof.cta,
  // Captions for carousel images - real family photos
  captions: [
    'The Colvard clan repping the vibe',
    'Sunday service style',
    'Backyard BBQ blessed',
    'Three generations strong',
    'Faith and family',
    'Living the mission',
  ],
};

export const whyWeRaizeContent = {
  sectionTitle: SITE_COPY.home.whyWeRaize.headline,
  body: SITE_COPY.home.whyWeRaize.body,
  features: [
    {
      icon: 'heart',
      title: 'Trust God',
      description: 'Every design starts with prayer and purpose.',
    },
    {
      icon: 'users',
      title: 'Real Testimonies',
      description: 'Worn by real families walking real faith.',
    },
    {
      icon: 'shield',
      title: 'Ethical Production',
      description: 'Print-on-demand means no waste, fair labor.',
    },
    {
      icon: 'sparkles',
      title: 'Express Faith',
      description: 'Spark conversations that matter.',
    },
  ],
  ctaText: SITE_COPY.home.whyWeRaize.cta.text,
  ctaHref: SITE_COPY.home.whyWeRaize.cta.href,
};

export const storyTeaserContent = {
  label: 'Our Story',
  title: SITE_COPY.home.storyTeaser.headline,
  preview: SITE_COPY.home.storyTeaser.excerpt,
  cta: SITE_COPY.home.storyTeaser.cta,
};

export const missionTeaserContent = {
  label: 'Our Story',
  title: SITE_COPY.home.storyTeaser.headline,
  preview: SITE_COPY.home.storyTeaser.excerpt,
  links: [
    {text: 'Shop The Drop', href: '/collections/all'},
    {text: 'Why This Drop Matters', href: '/pages/why-this-drop-matters'},
    {text: 'Read Our Story', href: '/pages/our-story'},
    {text: 'Read a Prayer', href: '/pages/prayer'},
  ],
  footerCta: {
    text: 'Back to Shop',
    href: '/collections/all',
  },
};

export const trustBadgesContent = SITE_COPY.trustBadges;
