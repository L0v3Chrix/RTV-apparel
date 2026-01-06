# Runbook

## Prerequisites

| Tool | Version | Check Command |
|------|---------|---------------|
| Node.js | 18+ LTS | `node --version` |
| npm | 9+ | `npm --version` |
| Git | Any | `git --version` |
| Shopify CLI | 3.x | `shopify version` (install later if needed) |

### Install Node.js
```bash
# macOS with Homebrew
brew install node@18

# Or use nvm
nvm install 18
nvm use 18
```

### Install Shopify CLI (optional, for some operations)
```bash
npm install -g @shopify/cli @shopify/theme
```

---

## Initial Setup

### 1. Clone the Repository
```bash
git clone https://github.com/L0v3Chrix/RTV-apparel.git
cd RTV-apparel
```

### 2. Install Dependencies
```bash
cd storefront
npm install
```

### 3. Configure Environment Variables
```bash
# Copy example file
cp .env.example .env

# Edit with your values
# SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
# SHOPIFY_STOREFRONT_API_TOKEN=your-token-here
```

### 4. Run Development Server
```bash
npm run dev
```

Open http://localhost:3000 in your browser.

---

## Environment Variables

| Variable | Description | Where to Get It |
|----------|-------------|-----------------|
| `SHOPIFY_STORE_DOMAIN` | Your .myshopify.com domain | Shopify Admin > Settings > Domains |
| `SHOPIFY_STOREFRONT_API_TOKEN` | Storefront API access token | See 06_SHOPIFY_SETUP.md |
| `PUBLIC_STORE_DOMAIN` | Public domain (optional) | Your custom domain if set up |
| `SESSION_SECRET` | Random string for sessions | Generate: `openssl rand -hex 32` |

---

## Common Commands

### Development
```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Type checking
npm run typecheck

# Linting
npm run lint
```

### Deployment
```bash
# Deploy to Oxygen (Shopify hosting)
shopify hydrogen deploy

# Or deploy to Vercel
vercel
```

---

## Folder Structure

```
RTV-apparel/
├── docs/                 # Planning and documentation
├── catalog/              # Product data (source of truth)
├── storefront/           # Hydrogen app (all code here)
│   ├── app/
│   │   ├── components/   # Reusable React components
│   │   ├── routes/       # Page routes
│   │   ├── styles/       # CSS/Tailwind
│   │   └── lib/          # Utilities
│   ├── public/           # Static assets
│   └── package.json
├── .env.example          # Environment template
├── .gitignore
└── README.md
```

---

## Troubleshooting

### "Cannot find module" errors
```bash
# Delete node_modules and reinstall
rm -rf node_modules
npm install
```

### Storefront API errors
- Verify `SHOPIFY_STORE_DOMAIN` is correct (include .myshopify.com)
- Check token has Storefront API access (not Admin API)
- Ensure token has required scopes: `unauthenticated_read_product_listings`, `unauthenticated_read_product_inventory`

### Port already in use
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use different port
npm run dev -- --port 3001
```

### Hydrogen CLI issues
```bash
# Update Shopify CLI
npm update -g @shopify/cli

# Clear cache
shopify cache clear
```

### Build fails
```bash
# Check for TypeScript errors
npm run typecheck

# Check for lint errors
npm run lint

# Try clean build
rm -rf .cache build
npm run build
```

---

## Health Checks

### Before Committing
- [ ] `npm run dev` starts without errors
- [ ] No console errors in browser
- [ ] `npm run build` succeeds

### Before Deploying
- [ ] All environment variables set in hosting platform
- [ ] `npm run build` succeeds locally
- [ ] Test checkout flow in preview

---

## Contacts

- **Chrix** — Architect, final decisions
- **Shopify Support** — https://help.shopify.com
- **Hydrogen Docs** — https://shopify.dev/docs/custom-storefronts/hydrogen
