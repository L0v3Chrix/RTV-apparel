# RTV Storefront — Next.js Headless Shopify

> Raize The Vibe Apparel storefront built with Next.js 14 App Router and Shopify Storefront API.

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS with RTV brand colors
- **Data:** Shopify Storefront API (GraphQL)
- **Cart:** Cookie-based cart persistence with signed cookies
- **Deployment:** Vercel (native Next.js support)

## Project Structure

```
storefront/
├── src/
│   ├── app/                   # Next.js App Router routes
│   │   ├── page.tsx           # Home (/)
│   │   ├── layout.tsx         # Root layout
│   │   ├── collections/       # Collection pages
│   │   ├── products/          # Product detail pages
│   │   ├── cart/              # Cart page
│   │   ├── pages/             # Static content pages
│   │   │   ├── our-story/
│   │   │   ├── faq/
│   │   │   ├── prayer/
│   │   │   └── why-this-drop-matters/
│   │   └── api/
│   │       └── cart/          # Cart API routes
│   ├── lib/
│   │   ├── shopify/           # Shopify GraphQL client
│   │   ├── cart.ts            # Cart cookie helpers
│   │   └── utils.ts           # Utilities
│   ├── components/
│   │   ├── layout/            # Header, Footer, CartButton
│   │   ├── sections/          # Page sections (FamilyCarousel, etc.)
│   │   └── ui/                # Reusable UI components (ProductCard, etc.)
│   └── content/
│       └── siteCopy.ts        # All site copy (single source of truth)
├── public/                    # Static assets
├── tailwind.config.ts         # RTV brand colors & typography
├── .env.example               # Required environment variables
└── vercel.json                # Vercel configuration
```

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

```bash
cp .env.example .env.local
```

Edit `.env.local` with your Shopify credentials:

```env
SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
SHOPIFY_STOREFRONT_API_TOKEN=your-storefront-token
SHOPIFY_STOREFRONT_API_VERSION=2024-10
SESSION_SECRET=generate-with-openssl-rand-hex-32
```

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Routes

| Route | Description |
|-------|-------------|
| `/` | Home page with featured products |
| `/collections` | All collections |
| `/collections/[handle]` | Single collection |
| `/products/[handle]` | Product detail page |
| `/cart` | Shopping cart |
| `/pages/our-story` | Our Story page |
| `/pages/faq` | FAQ page |
| `/pages/prayer` | Prayer page |
| `/pages/why-this-drop-matters` | Why This Drop Matters page |

## Cart System

Cart is managed via cookie-based persistence:

1. Cart ID stored in HTTP-only signed cookie (`rtv_cart_id`)
2. Cart operations via API routes:
   - `GET /api/cart` — Get current cart
   - `POST /api/cart/add` — Add line items
   - `POST /api/cart/update` — Update quantities
   - `POST /api/cart/remove` — Remove line items
3. Checkout redirects to Shopify-hosted checkout

## Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Set root directory to `storefront`
3. Add environment variables in Vercel dashboard
4. Deploy!

Vercel will automatically detect Next.js and deploy with optimal settings.

### Environment Variables for Production

Set these in Vercel dashboard:

- `SHOPIFY_STORE_DOMAIN`
- `SHOPIFY_STOREFRONT_API_TOKEN`
- `SHOPIFY_STOREFRONT_API_VERSION`
- `SESSION_SECRET`
- `NEXT_PUBLIC_SITE_URL` (optional)

## Brand Colors (2025 Warm & Bold)

RTV brand colors are defined in `tailwind.config.ts` under `rtv.*`:

**Backgrounds:**
- `rtv-cream` `#FAF8F5` — Light background
- `rtv-paper` `#F5F1EB` — Card backgrounds
- `rtv-sand` `#EDE8E0` — Section dividers

**Text & Dark:**
- `rtv-ink` `#1C1917` — Primary text
- `rtv-charcoal` `#292524` — Secondary text
- `rtv-stone` `#44403C` — Muted text

**Accent Colors:**
- `rtv-teal` `#2D8A8C` — Primary CTA
- `rtv-rust` `#C45D3E` — Secondary accent
- `rtv-gold` `#B8860B` — Premium highlights

## Content Management

All site copy is centralized in `src/content/siteCopy.ts`. This includes:

- Brand messaging and CTAs
- Product descriptions
- Page content (Our Story, FAQ, Prayer)
- Navigation and footer links
- Error messages

**V2 Plan:** Move to Shopify metafields for CMS editing.

## Legacy Storefront

The original Hydrogen (Remix) storefront is preserved at `/storefront-hydrogen-legacy/` for reference. It is no longer deployed.

## Contributing

1. Make changes in a feature branch
2. Run `npm run lint` and `npm run build`
3. Create a pull request

---

Built with love by Raize The Vibe.
