# Decision Log

## Template
```
### DEC-XXX: [Title]
**Date:** YYYY-MM-DD
**Status:** Proposed | Accepted | Rejected | Superseded
**Decider:** [Name]

**Context:** Why is this decision needed?

**Options Considered:**
1. Option A — pros/cons
2. Option B — pros/cons

**Decision:** What we chose and why.

**Consequences:** What this means for the project.
```

---

## Decisions

### DEC-001: Use Shopify Hydrogen for Storefront
**Date:** 2025-01-06
**Status:** Accepted
**Decider:** Chrix

**Context:**
We need a headless storefront that ships fast (Friday deadline) with minimal friction. Founder is experienced with Next.js/React but new to Shopify ecosystem.

**Options Considered:**
1. **Hydrogen** — Shopify's official headless framework (Remix-based)
   - Pros: First-party support, Storefront API optimized, deploys to Oxygen, templates available
   - Cons: Learning curve for Remix patterns, less flexibility than pure Next.js

2. **Next.js + Storefront API** — Custom headless build
   - Pros: Familiar to founder, maximum flexibility
   - Cons: More setup time, no official templates, DIY everything

3. **Shopify Theme (Liquid)** — Traditional approach
   - Pros: Fastest to "working store," huge template ecosystem
   - Cons: Not headless, limited customization, less modern DX

**Decision:**
Use Hydrogen. The 3-day timeline favors official tooling over custom builds. Hydrogen's templates get us 80% there immediately. Remix patterns are similar enough to Next.js App Router that the learning curve is manageable.

**Consequences:**
- Must use Shopify CLI for some operations
- Deploy target is likely Oxygen (Shopify's hosting) unless we need Vercel
- Storefront API token required before live data works
- Cart/checkout handled by Shopify (not custom)

---

### DEC-002: Keep Checkout on Shopify
**Date:** 2025-01-06
**Status:** Accepted
**Decider:** Chrix

**Context:**
Headless storefronts can use custom checkout or redirect to Shopify checkout.

**Decision:**
Use standard Shopify checkout redirect. No custom checkout.

**Consequences:**
- Faster to ship
- PCI compliance handled by Shopify
- Limited checkout customization (acceptable for v1)

---

### DEC-003: Printful via Shopify App (No Custom Fulfillment Code)
**Date:** 2025-01-06
**Status:** Accepted
**Decider:** Chrix

**Context:**
Printful can integrate via Shopify app or custom API.

**Decision:**
Use the official Printful Shopify app. Products created in Printful sync automatically to Shopify.

**Consequences:**
- No fulfillment code in our repo
- Product management happens in Printful dashboard
- Pricing/variants set in Printful, synced to Shopify
