/**
 * Microcopy - Buttons, labels, trust badges, empty states
 * Sourced from SITE_COPY master file
 * V1 PLACEHOLDER — Move to Shopify metafields in V2
 */

import {SITE_COPY} from './siteCopy';

export const buttons = {
  addToCart: SITE_COPY.pdp.buttons.addToCart,
  addingToCart: 'Adding...',
  soldOut: 'Sold Out',
  checkout: SITE_COPY.cart.checkoutButton,
  continueShopping: 'Continue Shopping',
  viewCart: 'View Cart',
  shopNow: SITE_COPY.cta.primary,
  learnMore: 'Learn More',
  readMore: 'Read More',
  backToShop: 'Back to Shop',
  subscribe: SITE_COPY.emailCapture.button,
};

export const trustBadges = [
  {
    icon: 'shield',
    title: 'Secure checkout',
    subtitle: 'SSL encrypted',
  },
  {
    icon: 'users',
    title: 'Printed to order',
    subtitle: 'By real humans',
  },
  {
    icon: 'star',
    title: 'Premium fabric',
    subtitle: 'Soft and quality fit',
  },
  {
    icon: 'heart',
    title: 'Original artwork',
    subtitle: 'Always unique',
  },
  {
    icon: 'refresh',
    title: 'Easy exchanges',
    subtitle: 'Hassle-free',
  },
];

export const productLabels = {
  newArrival: 'New',
  bestSeller: 'Best Seller',
  limitedEdition: 'Limited Edition',
  lowStock: 'Only a few left',
};

export const emptyStates = {
  cart: {
    title: 'Your cart is empty',
    description: SITE_COPY.cart.empty.message,
    cta: SITE_COPY.cart.empty.cta.text,
    ctaHref: SITE_COPY.cart.empty.cta.href,
  },
  collection: {
    title: 'No products found',
    description: SITE_COPY.collection.emptyState,
    cta: 'View All Products',
    ctaHref: '/collections/all',
  },
  search: {
    title: 'No results',
    description: "We couldn't find what you're looking for.",
    cta: 'Browse Collections',
    ctaHref: '/collections/all',
  },
};

export const pdpMicrocopy = {
  sizeGuideLink: 'Size Guide',
  shippingNote: SITE_COPY.pdp.shippingMicrocopy,
  returnNote: SITE_COPY.pdp.returnsMicrocopy,
  printOnDemandNote: 'Made just for you. Ships in 2-5 business days.',
  selectSize: 'Select Size',
  selectColor: 'Select Color',
  quantity: 'Quantity',
  relatedProducts: SITE_COPY.pdp.relatedProducts.headline,
  customerReviews: 'Customer Reviews',
  noReviewsYet: 'Be the first to leave a review!',
  sizeHelp: SITE_COPY.pdp.sizeHelp,
  whatItMeans: SITE_COPY.pdp.whatItMeans,
  goodies: SITE_COPY.pdp.goodies,
  storyLink: SITE_COPY.pdp.storyLink,
};

export const collectionMicrocopy = {
  filterBy: 'Filter By',
  sortBy: 'Sort By',
  showingResults: (count: number) =>
    count === 1 ? '1 product' : `${count} products`,
  noFilters: 'Clear all filters',
  filterChips: SITE_COPY.collection.filterChips,
  sortLabels: SITE_COPY.collection.sortLabels,
};

export const footer = {
  copyright: SITE_COPY.footer.legal,
  tagline: SITE_COPY.brand.tagline,
  columns: SITE_COPY.footer.columns,
  signOff: SITE_COPY.footer.signOff,
  socialLinks: {
    instagram: 'https://instagram.com/raizethevibe',
    facebook: 'https://facebook.com/raizethevibe',
    tiktok: 'https://tiktok.com/@raizethevibe',
  },
};

export const nav = SITE_COPY.nav;

export const emailCapture = SITE_COPY.emailCapture;

export const errors = SITE_COPY.errors;
