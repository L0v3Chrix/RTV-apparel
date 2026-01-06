# Backlog

## Legend
- **Owner:** Task Pack responsible (A-G)
- **Size:** S (< 1hr), M (1-3hr), L (3+ hr)
- **Status:** Todo | In Progress | Done | Blocked

---

## Storefront (Hydrogen)

| ID | Task | Owner | Size | Status | Acceptance Criteria | Dependencies |
|----|------|-------|------|--------|---------------------|--------------|
| SF-01 | Scaffold Hydrogen project | Pack C | M | Done | `npm run dev` works, routes render | None |
| SF-02 | Configure environment variables | Pack C | S | Todo | .env works locally, no errors | SF-01, Pack B |
| SF-03 | Home page layout | Pack C | M | Todo | Hero, featured products section | SF-02, brand spec |
| SF-04 | Collection page | Pack C | M | Todo | Grid of products, responsive | SF-02 |
| SF-05 | Product detail page | Pack C | M | Todo | Images, variants, add to cart | SF-02 |
| SF-06 | Cart functionality | Pack C | M | Todo | Add/remove items, quantity, checkout link | SF-02 |
| SF-07 | Policy pages (4) | Pack C | S | Todo | Shipping, returns, privacy, terms | SF-02, copy ready |
| SF-08 | Header/Footer components | Pack C | M | Todo | Navigation, logo, links | Brand spec |
| SF-09 | Mobile responsive pass | Pack C | M | Todo | All pages work on mobile | SF-03 through SF-08 |

---

## Shopify Admin Setup

| ID | Task | Owner | Size | Status | Acceptance Criteria | Dependencies |
|----|------|-------|------|--------|---------------------|--------------|
| SA-01 | Confirm store access | Pack B | S | Todo | Can log into Shopify admin | None |
| SA-02 | Create Storefront API token | Pack B | S | Todo | Token generated, documented | SA-01 |
| SA-03 | Configure store settings | Pack B | S | Todo | Store name, currency, timezone set | SA-01 |
| SA-04 | Set up shipping zones | Pack B | M | Todo | US shipping configured | SA-01 |
| SA-05 | Configure payment providers | Pack B | S | Todo | Stripe/Shopify Payments active | SA-01 |
| SA-06 | Add policy pages in admin | Pack B | S | Todo | Policies visible in Shopify | Copy ready |

---

## Catalog / Products

| ID | Task | Owner | Size | Status | Acceptance Criteria | Dependencies |
|----|------|-------|------|--------|---------------------|--------------|
| CP-01 | Define product data model | Pack D | S | Done | JSON schema documented | None |
| CP-02 | Prepare product source data | Pack D | M | Todo | 7+ products in JSON format | Designs ready |
| CP-03 | Create products in Printful | Pack E | L | Todo | Products with mockups ready | CP-02 |
| CP-04 | Sync Printful to Shopify | Pack E | S | Todo | Products appear in Shopify | CP-03, SA-01 |
| CP-05 | Verify product data in store | Pack D | S | Todo | All variants, prices correct | CP-04 |

---

## Printful

| ID | Task | Owner | Size | Status | Acceptance Criteria | Dependencies |
|----|------|-------|------|--------|---------------------|--------------|
| PF-01 | Create Printful account | Pack E | S | Todo | Account active | None |
| PF-02 | Connect Printful to Shopify | Pack E | S | Todo | Integration shows connected | PF-01, SA-01 |
| PF-03 | Upload designs to Printful | Pack E | M | Todo | All designs uploaded | Designs ready |
| PF-04 | Create product templates | Pack E | L | Todo | 7+ products with variants | PF-03 |
| PF-05 | Generate mockups | Pack E | M | Todo | Product images ready | PF-04 |
| PF-06 | Set pricing | Pack E | S | Todo | Retail prices set, margins verified | PF-04 |

---

## Brand / Copy

| ID | Task | Owner | Size | Status | Acceptance Criteria | Dependencies |
|----|------|-------|------|--------|---------------------|--------------|
| BC-01 | Define brand voice | Pack A | M | Todo | Voice guide documented | None |
| BC-02 | Write homepage copy | Pack A | M | Todo | Headline, subhead, CTAs | BC-01 |
| BC-03 | Write product descriptions | Pack A | M | Todo | Template + 7 descriptions | BC-01 |
| BC-04 | Write policy pages | Pack A | M | Todo | 4 policy documents | BC-01 |
| BC-05 | Taglines and microcopy | Pack A | S | Todo | Buttons, empty states, etc. | BC-01 |

---

## QA / Launch

| ID | Task | Owner | Size | Status | Acceptance Criteria | Dependencies |
|----|------|-------|------|--------|---------------------|--------------|
| QA-01 | Create QA checklist | Pack F | S | Todo | Checklist documented | None |
| QA-02 | Test all pages | Pack F | M | Todo | No broken links/images | All SF tasks |
| QA-03 | Test checkout flow | Pack F | M | Todo | Can complete test purchase | SA-05, CP-04 |
| QA-04 | Mobile testing | Pack F | M | Todo | Works on iOS/Android | SF-09 |
| QA-05 | Performance check | Pack F | S | Todo | Lighthouse 70+ | All SF tasks |
| QA-06 | Launch go/no-go | Pack F | S | Todo | All blockers resolved | All QA tasks |

---

## Analytics / SEO

| ID | Task | Owner | Size | Status | Acceptance Criteria | Dependencies |
|----|------|-------|------|--------|---------------------|--------------|
| AS-01 | SEO requirements doc | Pack G | S | Todo | Title/description patterns defined | None |
| AS-02 | Implement meta tags | Pack C | M | Todo | All pages have proper meta | AS-01 |
| AS-03 | Analytics plan | Pack G | S | Todo | GA4 or alternative selected | None |
| AS-04 | Add analytics snippet | Pack C | S | Todo | Tracking fires on page load | AS-03 |
| AS-05 | Sitemap setup | Pack C | S | Todo | Sitemap.xml accessible | SF-01 |
