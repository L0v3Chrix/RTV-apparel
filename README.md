# RTV Apparel

Headless Shopify storefront for Raize The Vibe apparel merchandise.

**Launch Target:** Friday

## Tech Stack

- **Storefront:** Shopify Hydrogen (Remix-based)
- **Backend:** Shopify (products, checkout, orders)
- **Fulfillment:** Printful (print-on-demand via Shopify app)

## Quick Start

```bash
# Clone
git clone https://github.com/L0v3Chrix/RTV-apparel.git
cd RTV-apparel

# Install dependencies
cd storefront
npm install

# Configure environment
cp ../.env.example .env
# Edit .env with your Shopify credentials

# Run development server
npm run dev
```

Open http://localhost:3000

## Project Structure

```
RTV-apparel/
├── docs/                 # Planning and documentation
│   ├── 00_PROJECT_OVERVIEW.md
│   ├── 01_DECISIONS.md
│   ├── 02_BACKLOG.md
│   ├── 03_AGENT_TASK_PACKS.md
│   ├── 04_GIT_WORKFLOW.md
│   ├── 05_RUNBOOK.md
│   ├── 06_SHOPIFY_SETUP.md
│   └── 07_PRINTFUL_SETUP.md
├── catalog/              # Product data source of truth
├── storefront/           # Hydrogen app (all code)
├── .env.example          # Environment template
└── README.md
```

## Working with Agents

This repo is designed for parallel agent work. See `/docs/03_AGENT_TASK_PACKS.md` for details.

### Task Packs

| Pack | Focus | Type |
|------|-------|------|
| A | Brand Voice + Copy | Docs |
| B | Shopify Admin Setup | Docs |
| C | Hydrogen Storefront | **Code** |
| D | Product Data Model | Docs + Catalog |
| E | Printful Setup | Docs |
| F | QA + Launch | Docs |
| G | Analytics + SEO | Docs |

### Rules
- **One agent per pack** at a time
- Only Pack C touches `/storefront/` code
- Docs packs can commit directly to `main`
- Always `git pull --rebase` before starting
- Commit and push after completing work

## Environment Variables

See `.env.example` for required variables. **Never commit secrets.**

## Documentation

- [Project Overview](docs/00_PROJECT_OVERVIEW.md)
- [Decisions Log](docs/01_DECISIONS.md)
- [Backlog](docs/02_BACKLOG.md)
- [Task Packs](docs/03_AGENT_TASK_PACKS.md)
- [Git Workflow](docs/04_GIT_WORKFLOW.md)
- [Runbook](docs/05_RUNBOOK.md)
- [Shopify Setup](docs/06_SHOPIFY_SETUP.md)
- [Printful Setup](docs/07_PRINTFUL_SETUP.md)
