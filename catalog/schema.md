# Product Data Schema

## Overview

`products.source.json` is the source of truth for product data. It defines what products we want to create before they exist in Printful or Shopify.

## Schema Definition

```typescript
interface ProductCatalog {
  products: Product[];
}

interface Product {
  // Required
  id: string;              // Unique slug, e.g., "vibe-check-tee"
  name: string;            // Display name, e.g., "Vibe Check Tee"
  productType: ProductType;
  designFile: string;      // Path to design file
  placement: Placement;
  colors: string[];        // At least one color
  sizes: string[];         // At least one size
  basePrice: number;       // USD, e.g., 29.00
  status: Status;

  // Optional
  description?: string;
  printfulProduct?: string; // Specific Printful product name
  tags?: string[];
}

type ProductType =
  | "unisex-tee"
  | "womens-tee"
  | "hoodie"
  | "sweatshirt"
  | "tank"
  | "cap"
  | "beanie"
  | "tote"
  | "poster";

type Placement =
  | "front"
  | "back"
  | "front-back"
  | "left-chest"
  | "full-front";

type Status =
  | "draft"      // Idea stage
  | "ready"      // Design ready, can create in Printful
  | "synced";    // Live in Printful and Shopify
```

## Printful Product Mapping

| productType | Recommended Printful Product | Notes |
|-------------|------------------------------|-------|
| unisex-tee | Bella+Canvas 3001 | Soft, quality blank |
| womens-tee | Bella+Canvas 6004 | Fitted cut |
| hoodie | Independent Trading SS4500 | Midweight |
| sweatshirt | Gildan 18000 | Budget option |
| cap | Otto Cap H47 | Structured fit |

## Color Options by Product

### Tees (Bella+Canvas 3001)
Common colors: Black, White, Navy, Heather Grey, Red, Forest Green, Maroon

### Hoodies
Common colors: Black, Navy, Charcoal, Sport Grey, Maroon

### Caps
Common colors: Black, Navy, White, Grey

## Size Guidelines

### Unisex Tees/Hoodies
Standard: S, M, L, XL, 2XL
Extended: 3XL, 4XL (check Printful availability)

### Women's Tees
Standard: S, M, L, XL
Extended: 2XL (check availability)

## Workflow

1. **Draft**: Add product to JSON with status: "draft"
2. **Design Ready**: Update status to "ready" when design file is complete
3. **Create in Printful**: Use JSON data to create product
4. **Sync**: Product appears in Shopify
5. **Update Status**: Change to "synced" with any notes

## Example Complete Product

```json
{
  "id": "raize-the-vibe-tee",
  "name": "Raize The Vibe Tee",
  "description": "The flagship RTV tee. Soft, comfortable, and ready to spread good vibes.",
  "productType": "unisex-tee",
  "printfulProduct": "Bella+Canvas 3001",
  "designFile": "designs/rtv-logo-front.png",
  "placement": "front",
  "colors": ["Black", "White", "Navy"],
  "sizes": ["S", "M", "L", "XL", "2XL"],
  "basePrice": 29.00,
  "tags": ["tees", "unisex", "logo"],
  "status": "ready"
}
```
