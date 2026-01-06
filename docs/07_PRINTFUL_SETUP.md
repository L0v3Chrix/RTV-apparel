# Printful Setup Guide

## What is Printful?

Printful is a print-on-demand service. You upload designs, they print and ship products when customers order. No inventory, no upfront costs.

**How it works with Shopify:**
1. You create products in Printful (design + product type)
2. Printful generates mockup images
3. Products sync to your Shopify store
4. Customer orders on your store
5. Order goes to Printful automatically
6. Printful prints and ships directly to customer

---

## Initial Setup

### 1. Create Printful Account
- Go to https://www.printful.com
- Sign up (free, no credit card needed to start)
- Verify email

### 2. Connect to Shopify
1. In Printful dashboard, go to **Stores**
2. Click **Add store**
3. Select **Shopify**
4. Enter your Shopify store URL: `raize-the-vibe.myshopify.com`
5. Authorize the connection
6. Printful will install as a Shopify app

### 3. Verify Connection
- In Shopify Admin > Apps, you should see Printful
- In Printful > Stores, your store shows as connected

---

## Creating Products

### Step-by-Step

1. **Go to Printful Dashboard > Products > Add product**

2. **Choose Product Type**
   - T-shirts: Bella+Canvas 3001 (popular, quality)
   - Hoodies: Independent Trading Co. or Bella+Canvas
   - Hats: Otto Cap or similar

3. **Upload Your Design**
   - Recommended: PNG with transparent background
   - Resolution: 300 DPI, at least 4000x4000px for best quality
   - Printful will show print area limits

4. **Position Your Design**
   - Use the mockup generator to position
   - Check front, back (if applicable)
   - Preview on different colors

5. **Select Variants**
   - Choose colors to offer
   - Choose sizes to offer
   - Each combination = one variant in Shopify

6. **Generate Mockups**
   - Printful auto-generates product photos
   - These sync to Shopify as product images

7. **Set Pricing**
   - Printful shows you their cost
   - You set your retail price
   - Difference = your profit margin

8. **Add Product Details**
   - Title (will sync to Shopify)
   - Description (or leave blank, add in Shopify later)

9. **Submit to Store**
   - Click "Submit to store"
   - Product appears in Shopify within minutes

---

## Product Naming Convention

**Pattern:** `[Design Name] [Product Type]`

Examples:
- "Vibe Check Tee"
- "Raize Up Hoodie"
- "Good Vibes Cap"

### Variant Naming
Printful handles this automatically:
- "Vibe Check Tee - Black / S"
- "Vibe Check Tee - White / M"

---

## Pricing Strategy

### Printful Costs (approximate)
| Product | Base Cost | Shipping |
|---------|-----------|----------|
| Basic Tee | $9-12 | $4-5 |
| Premium Tee | $12-15 | $4-5 |
| Hoodie | $20-25 | $6-8 |
| Hat | $12-15 | $4-5 |

### Suggested Retail Pricing
| Product | Retail | Profit |
|---------|--------|--------|
| Basic Tee | $29 | ~$15-18 |
| Premium Tee | $35 | ~$17-20 |
| Hoodie | $55 | ~$25-30 |
| Hat | $32 | ~$14-17 |

Adjust based on:
- Brand positioning
- Competitor pricing
- Volume expectations

---

## Mockup Best Practices

### What Makes Good Mockups
- Multiple angles (front, back, detail)
- Lifestyle shots if possible
- Consistent background/style across products
- Show design clearly

### Printful Mockup Generator
- Use the built-in generator (good enough for launch)
- Select lifestyle backgrounds for better look
- Generate multiple views per product

### Custom Mockups (Post-Launch)
- Use Placeit.net or similar for premium mockups
- Upload custom images to Shopify product gallery

---

## SKU Mapping

**Printful generates SKUs automatically.** Example:
- `UNISEX-TEE-BELLA-3001-BLACK-S`

These sync to Shopify. No action needed unless you want custom SKUs.

---

## Checklist

### Account Setup
- [ ] Printful account created
- [ ] Email verified
- [ ] Billing info added (needed before first order)

### Store Connection
- [ ] Shopify store connected
- [ ] Connection shows "Active" in Printful
- [ ] Printful app visible in Shopify Admin

### Products Created
- [ ] Product 1: [Name] — synced to Shopify
- [ ] Product 2: [Name] — synced to Shopify
- [ ] Product 3: [Name] — synced to Shopify
- [ ] Product 4: [Name] — synced to Shopify
- [ ] Product 5: [Name] — synced to Shopify
- [ ] Product 6: [Name] — synced to Shopify
- [ ] Product 7: [Name] — synced to Shopify

### Quality Check
- [ ] Mockup images look good
- [ ] Prices set correctly
- [ ] Variants (sizes/colors) correct
- [ ] Shipping rates appear at checkout

---

## Troubleshooting

### Products Not Syncing
- Check Printful > Stores > Sync status
- Try manual sync: Products > [Product] > Sync
- Verify Shopify app permissions

### Images Not Showing
- Give it a few minutes (syncing takes time)
- Check Shopify product gallery
- Re-sync from Printful

### Wrong Prices in Shopify
- Prices set in Printful sync to Shopify
- Edit in Printful, not Shopify (or changes will be overwritten)

### Shipping Rates Missing
- Printful adds shipping automatically at checkout
- Make sure Printful is set as fulfillment service

---

## Post-Launch Considerations

### Order Flow
1. Customer orders on your site
2. Payment processed by Shopify
3. Order sent to Printful automatically
4. Printful charges you their cost
5. Printful prints and ships
6. Customer gets tracking email
7. You keep the profit margin

### Refunds/Returns
- Handle through Shopify (refund customer)
- Contact Printful for production issues
- Printful has reprint/refund policy for defects

### Scaling
- No limits on orders
- Volume discounts available
- Multiple fulfillment centers (US, EU, etc.)
