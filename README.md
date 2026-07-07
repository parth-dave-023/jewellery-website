# Auren — Fine Jewellery Storefront

A luxury single-page e-commerce storefront for a diamond jewellery brand, built from the
design handoff in [`design-handoff/`](design-handoff/). React 19 + Vite + TypeScript, no other
runtime dependencies.

## Run locally

```bash
npm install
npm run dev      # http://localhost:3004
npm run build    # typecheck + production build to dist/
```

## What's inside

Everything lives on one page except the bag, checkout and order-confirmation views
(in-app view switches, per the handoff):

- **Lookbook hero** — an interactive page-turn "book" replaces the static hero image.
  Pages carry campaign photography, a chapter story and a CTA that filters the collection.
- **The Collection** — 24 products, live faceted filtering (category, diamond shape, metal,
  carat, price, style) with per-facet counts, Refine (filter rail) / Discover (facet band)
  browse modes, sorting, active-filter chips.
- **Product quick-view, cart drawer, wishlist panel, live search overlay.**
- **Cart → checkout → confirmation** with GST (3%) totals in INR formatting.
- **Depth sections** — curated edits, craftsmanship story, 4 Cs diamond education,
  the Auren promise, bespoke band, testimonials, journal, "as worn" gallery, FAQ,
  newsletter.

## Notes

- Product and campaign photography are **Unsplash placeholders** (metal-tinted gradients as
  fallback) — swap for colour-managed studio photography before launch.
- "Auren" is a placeholder brand name. Payment, accounts and journal links are demo-only;
  no real payment is processed.
- Design tokens (colour, type, spacing, radii, motion) follow the handoff spec:
  Marcellus / Jost, "Icy Platinum" palette, 1340px content width.
