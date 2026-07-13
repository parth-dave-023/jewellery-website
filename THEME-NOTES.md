# Minimalist Jewellery — Shopify theme

Based on Shopify **Dawn v15.5** (Online Store 2.0), restyled to the Minimalist
Jewellery "warm cream" design. Products, cart, checkout, orders and search are all
handled natively by Shopify — no external database.

## What's customised
- **Palette & type** — `config/settings_data.json`: cream colour schemes, Marcellus
  headings + Jost body, small radii, hairline cards.
- **Brand polish** — `assets/mj-custom.css` (loaded in `layout/theme.liquid`).
- **Photo hero** — `sections/mj-hero.liquid` (+ `assets/section-mj-hero.css`), default
  image `assets/mj-hero.jpg`. Swap the image in the theme editor.
- **Shop by shape** — `sections/mj-shape-strip.liquid` with faceted diamond SVGs
  (`snippets/mj-diamond.liquid`). Each card links to a product search for that cut.
- **Homepage** — `templates/index.json`: hero → shop-by-shape → featured collection
  ("Find your piece") → promise → story → newsletter.
- **Announcement bar** — set in `sections/header-group.json`.

## Everything else is stock Dawn
Product page media gallery already supports multiple images **and video** natively —
just upload them to the product in Shopify admin.

## Connect to Shopify (one-click)
Online Store → Themes → Add theme → **Connect from GitHub** → pick this repo and the
**`shopify`** branch. Then Customize, and add products in Shopify admin.

Optional local validation: `shopify theme check`.
