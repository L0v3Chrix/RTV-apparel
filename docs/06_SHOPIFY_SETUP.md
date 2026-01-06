# Shopify Setup Guide

## What is a Shopify Store?

Shopify provides the backend for your e-commerce: products, inventory, orders, payments, and checkout. Even with a headless storefront (Hydrogen), Shopify handles:
- Product catalog management
- Shopping cart and checkout
- Payment processing
- Order management
- Customer accounts

Your Hydrogen storefront is just the "face" — Shopify is the engine.

---

## Development Store vs Production Store

### Development Store
- Free, for testing
- Can't process real payments
- Created through Shopify Partners
- Good for: building and testing before launch

### Production Store
- Paid Shopify plan required
- Real payments enabled
- Good for: actually selling

**For RTV Apparel:** Use your existing production store (raize-the-vibe.myshopify.com) since we're launching Friday.

---

## Required Store Settings

### Basic Settings
Location: Shopify Admin > Settings

| Setting | Value | Where |
|---------|-------|-------|
| Store name | Raize The Vibe Apparel | Settings > Store details |
| Store currency | USD | Settings > Store details |
| Timezone | Your timezone | Settings > Store details |
| Unit system | Imperial | Settings > Store details |

### Shipping
Location: Settings > Shipping and delivery

- [ ] Create shipping zone for United States
- [ ] Set flat rate or calculated shipping
- [ ] Printful will also add shipping rates when connected

### Payments
Location: Settings > Payments

- [ ] Enable Shopify Payments or Stripe
- [ ] Test mode is fine until launch day

---

## Creating a Storefront API Token

The Storefront API allows your headless storefront to read products and create checkouts.

### Steps

1. **Go to Shopify Admin**
   - URL: `https://your-store.myshopify.com/admin`

2. **Navigate to Apps**
   - Settings > Apps and sales channels > Develop apps

3. **Enable Custom App Development**
   - If prompted, click "Allow custom app development"

4. **Create a New App**
   - Click "Create an app"
   - Name it: "RTV Hydrogen Storefront"

5. **Configure Storefront API Access**
   - Click "Configure Storefront API scopes"
   - Enable these scopes:
     - `unauthenticated_read_product_listings`
     - `unauthenticated_read_product_inventory`
     - `unauthenticated_read_product_pickup_locations`
     - `unauthenticated_read_selling_plans`
     - `unauthenticated_read_checkouts`
     - `unauthenticated_write_checkouts`
     - `unauthenticated_read_customers`
   - Save

6. **Install the App**
   - Click "Install app"
   - Confirm installation

7. **Get Your Token**
   - Go to "API credentials" tab
   - Copy the "Storefront API access token"
   - **Keep this secret!** Don't commit to git.

---

## Environment Variables Needed

After setup, you'll have these values:

```bash
# Your Shopify store domain
SHOPIFY_STORE_DOMAIN=raize-the-vibe.myshopify.com

# Storefront API token (keep secret!)
SHOPIFY_STOREFRONT_API_TOKEN=xxxxx

# Public domain (if you have custom domain)
PUBLIC_STORE_DOMAIN=raizethevibe.com

# Session secret (generate random string)
SESSION_SECRET=xxxxx
```

### How to Share Token Securely
- **Do NOT** put the actual token in any file in this repo
- Share via secure channel (1Password, Signal, etc.)
- Add to `.env` file locally (gitignored)
- Add to hosting platform's environment variables

---

## Storefront API vs Admin API

| API | Use Case | Token Type |
|-----|----------|------------|
| Storefront API | Public storefront, read products, create carts | Storefront Access Token |
| Admin API | Backend operations, manage products, orders | Admin API Access Token |

**For Hydrogen:** We only need Storefront API.

---

## Checklist

### Store Configuration
- [ ] Store name set
- [ ] Currency set to USD
- [ ] Timezone configured
- [ ] Store address/location set

### Shipping
- [ ] Shipping zone for US created
- [ ] Shipping rates configured (or will use Printful rates)

### Payments
- [ ] Shopify Payments or Stripe enabled
- [ ] Test mode enabled (switch to live at launch)

### API Access
- [ ] Custom app created
- [ ] Storefront API scopes configured
- [ ] App installed
- [ ] Storefront API token obtained
- [ ] Token shared securely with Chrix (not in repo!)

### Policies
- [ ] Shipping policy added
- [ ] Return policy added
- [ ] Privacy policy added
- [ ] Terms of service added

---

## Troubleshooting

### "Unauthorized" errors from Storefront API
- Token might be Admin API token (wrong type)
- Token might be expired or revoked
- Scopes might be insufficient

### Can't find "Develop apps"
- Go to Settings > Apps and sales channels
- Click "Develop apps" in top right
- If not visible, you may need store owner permissions

### Token not working
- Verify you copied Storefront API token (not Admin API)
- Check that app is installed (not just created)
- Try regenerating the token
