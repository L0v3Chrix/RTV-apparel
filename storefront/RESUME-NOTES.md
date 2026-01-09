# RTV Storefront — Resume Notes

> Last updated: 2026-01-09

## Current State

**Framework:** Next.js 14 (App Router) — fully migrated from Hydrogen
**Status:** Builds clean, all core routes return 200, ready for preview
**Branch:** `redesign-preview` (pushed to origin)

## Branch Structure

| Branch | Purpose | Status |
|--------|---------|--------|
| `main` | Old Hydrogen code (Vercel deploys from here) | Stable but outdated |
| `redesign-preview` | Next.js redesign | Ready for preview |
| `hydrogen-legacy` | Archive reference | Do not touch |

## What Works

- ✅ Home page (`/`)
- ✅ Collections (`/collections`, `/collections/[handle]`)
- ✅ Products (`/products/[handle]`)
- ✅ Cart (`/cart`) with add/update/remove
- ✅ Content pages (`/pages/our-story`, `/pages/faq`, `/pages/prayer`, `/pages/why-this-drop-matters`)
- ✅ Checkout redirect to Shopify-hosted checkout
- ✅ Cookie-based cart persistence

## Preview Instructions

### Option 1: Vercel Preview (Recommended)

1. Push is complete — Vercel should auto-deploy a preview URL
2. Check Vercel dashboard for preview deployment
3. Ensure env vars are set in Vercel project settings:
   - `SHOPIFY_STORE_DOMAIN`
   - `SHOPIFY_STOREFRONT_API_TOKEN`
   - `SHOPIFY_STOREFRONT_API_VERSION`
   - `SESSION_SECRET`

### Option 2: Local Preview

```bash
cd storefront
cp .env.example .env.local  # Fill in values
npm install
npm run dev
# Open http://localhost:3000
```

## Routes to Review

1. **Home** `/` — Hero, product family carousel
2. **Collections** `/collections` — Grid of all collections
3. **Collection Detail** `/collections/all` — Products in collection
4. **Product Detail** `/products/[any-product-handle]` — Add to cart
5. **Cart** `/cart` — Line items, quantity controls, checkout button
6. **Our Story** `/pages/our-story`
7. **FAQ** `/pages/faq`
8. **Prayer** `/pages/prayer`
9. **Why This Drop** `/pages/why-this-drop-matters`

## Next 5 Tasks

1. **Verify Vercel preview deployment** — Check that `redesign-preview` branch has a working preview URL with correct env vars

2. **Test checkout flow end-to-end** — Add product → cart → checkout redirect → Shopify checkout → payment (test mode)

3. **Add product images from Shopify** — Currently using local placeholders; switch to Shopify CDN images via `cdn.shopify.com`

4. **Mobile responsiveness pass** — Review all pages on mobile viewports, fix any layout issues

5. **SEO metadata** — Add proper `<title>`, meta descriptions, Open Graph tags to each page

## Known Issues

- `npm warn EBADENGINE` — Node 20.x specified but 22.x installed (works fine, just a warning)
- 3 high severity npm audit vulnerabilities (Next.js related, not blocking)
- Cart error during static build is expected (dynamic route using cookies)

## Files Changed This Session

- `storefront/.eslintrc.json` — Created ESLint config
- `storefront/README.md` — Updated brand colors section
- All Next.js app files committed from uncommitted state

## Decision Log

- **Hydrogen → Next.js migration**: Complete. Hydrogen code preserved in `storefront-hydrogen-legacy/`
- **Cart implementation**: Cookie-based with signed session secret, not localStorage
- **Checkout**: Redirect to Shopify-hosted checkout (not custom)
- **Design system**: 2025 Warm & Bold palette (teal/rust/gold accents on cream backgrounds)
