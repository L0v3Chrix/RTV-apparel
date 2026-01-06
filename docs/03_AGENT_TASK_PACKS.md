# Agent Task Packs

Task packs are designed to minimize merge conflicts. Each pack has clear file ownership.

## Pack Overview

| Pack | Name | Type | Can Run In Parallel With |
|------|------|------|--------------------------|
| A | Brand Voice + Copy | Docs | B, D, E, F, G |
| B | Shopify Admin Setup | Docs | A, D, E, F, G |
| C | Hydrogen Storefront | Code | A, B (after token), D, E, F, G |
| D | Product Data Model | Docs + Catalog | A, B, C, E, F, G |
| E | Printful Setup | Docs | A, B, C, D, F, G |
| F | QA + Launch | Docs | A, B, D, E, G |
| G | Analytics + SEO | Docs | A, B, D, E, F |

---

## Pack A: Brand Voice + Site Copy

**Goal:** Define RTV Apparel's brand voice and produce all site copy.

**Inputs:**
- Brand direction from Chrix (existing RTV brand guidelines if any)
- Product list (from Pack D)

**Files This Pack May Touch:**
- `/docs/brand/` (new folder)
- `/docs/brand/voice-guide.md`
- `/docs/brand/homepage-copy.md`
- `/docs/brand/product-descriptions.md`
- `/docs/brand/policy-pages.md`
- `/docs/brand/microcopy.md`

**Outputs / Acceptance Criteria:**
- [ ] Brand voice guide (tone, vocabulary, do's/don'ts)
- [ ] Homepage copy (headline, subhead, section copy, CTAs)
- [ ] Product description template + 7 descriptions
- [ ] 4 policy pages (shipping, returns, privacy, terms)
- [ ] Microcopy document (buttons, empty states, error messages)

**Dependencies:** None (can start immediately)

---

## Pack B: Shopify Admin Setup

**Goal:** Configure the Shopify store and obtain API credentials.

**Inputs:**
- Shopify account access
- Store name decision

**Files This Pack May Touch:**
- `/docs/06_SHOPIFY_SETUP.md` (update with actual values, no secrets)
- `/docs/shopify/` (new folder)
- `/docs/shopify/setup-checklist.md`
- `/docs/shopify/api-tokens.md` (instructions only, no actual tokens)

**Outputs / Acceptance Criteria:**
- [ ] Store settings configured (name, currency, timezone)
- [ ] Storefront API token created (shared securely with Chrix, not in repo)
- [ ] Shipping zones configured
- [ ] Payment provider enabled (test mode ok for now)
- [ ] Setup checklist marked complete

**Dependencies:** None (can start immediately)

---

## Pack C: Hydrogen Storefront (CODE)

**Goal:** Build the headless storefront.

**Inputs:**
- Storefront API token (from Pack B)
- Brand/copy specs (from Pack A)
- Product data synced to Shopify (from Pack E)

**Files This Pack May Touch:**
- `/storefront/` (entire directory — this pack owns all code)
- `/.env.example` (update if new vars needed)
- `/docs/05_RUNBOOK.md` (update run instructions)

**Outputs / Acceptance Criteria:**
- [ ] `npm run dev` starts without errors
- [ ] Home page renders with real or placeholder content
- [ ] Collection page shows products from Shopify
- [ ] Product detail page works (variants, add to cart)
- [ ] Cart page/drawer functional
- [ ] Checkout redirects to Shopify
- [ ] Policy pages render
- [ ] Mobile responsive
- [ ] No console errors

**Dependencies:**
- Pack B (API token) — blocks live data
- Pack A (copy) — blocks final content
- Pack E (products synced) — blocks real product display

**Note:** Can start with stub data while waiting for dependencies.

---

## Pack D: Product Data Model

**Goal:** Define product structure and prepare catalog data.

**Inputs:**
- Product designs from Chrix
- Printful product catalog (for variant options)

**Files This Pack May Touch:**
- `/catalog/products.source.json`
- `/catalog/schema.md`
- `/docs/catalog/` (new folder)
- `/docs/catalog/product-guidelines.md`

**Outputs / Acceptance Criteria:**
- [ ] JSON schema for product data documented
- [ ] `products.source.json` populated with 7+ products
- [ ] Each product has: name, description placeholder, design file reference, product type, variants
- [ ] Guidelines for naming, pricing, variant structure

**Dependencies:** None (can start immediately)

---

## Pack E: Printful Setup

**Goal:** Connect Printful to Shopify and sync products.

**Inputs:**
- Printful account access
- Shopify store connected (from Pack B)
- Product data (from Pack D)
- Design files from Chrix

**Files This Pack May Touch:**
- `/docs/07_PRINTFUL_SETUP.md` (update with specifics)
- `/docs/printful/` (new folder)
- `/docs/printful/setup-checklist.md`
- `/docs/printful/product-mapping.md`

**Outputs / Acceptance Criteria:**
- [ ] Printful account created
- [ ] Printful connected to Shopify store
- [ ] 7+ products created in Printful
- [ ] Products synced to Shopify
- [ ] Mockup images generated
- [ ] Pricing set with acceptable margins

**Dependencies:**
- Pack B (Shopify store ready)
- Pack D (product data defined)
- Design files from Chrix

---

## Pack F: QA + Launch Checklist

**Goal:** Define quality gates and launch criteria.

**Inputs:**
- Definition of Done from Project Overview
- All other packs' outputs

**Files This Pack May Touch:**
- `/docs/qa/` (new folder)
- `/docs/qa/checklist.md`
- `/docs/qa/test-cases.md`
- `/docs/qa/launch-criteria.md`

**Outputs / Acceptance Criteria:**
- [ ] QA checklist covering all pages and flows
- [ ] Test cases for critical paths (browse, cart, checkout)
- [ ] Mobile testing protocol
- [ ] Performance benchmarks
- [ ] Launch go/no-go criteria
- [ ] Rollback plan

**Dependencies:** None (can define criteria immediately)

---

## Pack G: Analytics + SEO Plan

**Goal:** Define SEO requirements and analytics implementation.

**Inputs:**
- Page list from Pack C
- Brand keywords from Pack A

**Files This Pack May Touch:**
- `/docs/seo/` (new folder)
- `/docs/seo/meta-tags.md`
- `/docs/seo/sitemap-plan.md`
- `/docs/analytics/` (new folder)
- `/docs/analytics/tracking-plan.md`

**Outputs / Acceptance Criteria:**
- [ ] Meta tag patterns for each page type
- [ ] Title/description templates
- [ ] OG image requirements
- [ ] Analytics tool selected (GA4 recommended)
- [ ] Key events to track (page view, add to cart, checkout start)
- [ ] Implementation instructions for Pack C

**Dependencies:** None (can start immediately)

---

## Execution Order (Recommended)

### Wave 1 (Tuesday — Parallel)
- Pack A: Brand Voice + Copy
- Pack B: Shopify Admin Setup
- Pack D: Product Data Model
- Pack F: QA Checklist
- Pack G: Analytics/SEO Plan

### Wave 2 (Tuesday/Wednesday — After Wave 1)
- Pack E: Printful Setup (needs B + D)
- Pack C: Hydrogen Storefront (needs B token, can stub until E)

### Wave 3 (Thursday)
- Pack C: Final content integration
- Pack F: QA execution

### Wave 4 (Friday)
- Launch
- Hotfix support
