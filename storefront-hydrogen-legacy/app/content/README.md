# Content Directory

This directory contains all copy and content for the RTV Apparel storefront.

## V1 Structure

All content is stored as TypeScript exports for easy bundling. In V2, this should migrate to Shopify Pages/metafields for CMS editing.

## Files

- `home.ts` — Homepage copy (hero headline, CTAs, section headers)
- `story.ts` — "Our Story" page content
- `why-this-drop.ts` — "Why This Drop Matters" page content
- `prayer.ts` — Prayer page content
- `faq.ts` — FAQ questions and answers
- `microcopy.ts` — Buttons, empty states, trust badges, etc.

## Updating Content

1. Edit the relevant `.ts` file
2. Run `npm run dev` to see changes
3. No rebuild needed for development

## V2 Migration TODO

- [ ] Create Shopify Pages for each content page
- [ ] Add metafields for homepage sections
- [ ] Replace static exports with Storefront API queries
