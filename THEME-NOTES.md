# Minimalist Jewellery — Shopify theme

The live theme for https://minimalistjewellery.com. It is a blank Online Store
2.0 theme whose `layout/theme.liquid` mounts the compiled storefront app, so the
whole storefront (browsing, filters, quick view, bag) is that one app.

## What's here
- `assets/mj-app.js` + `assets/mj-app.css` — the compiled storefront app
  (source is on the `main` branch of this repo).
- `layout/theme.liquid` — loads the app into `<div id="root">`.
- `snippets/mj-catalog.liquid` — hands the app the live catalogue
  (`window.MJ_PRODUCTS`): every product published to the Online Store, with its
  price, stock, options, photos, video and `spec` metafields.
- `assets/mj-hero.png` — the homepage hero photo.
- Every `templates/*.liquid` is a stub — the app renders all views.
- `layout/password.liquid` — branded "opening soon" gate.

## Where things are managed
- **Products, prices, stock, photos, videos** — Shopify admin. Nothing is
  hard-coded here; publish a product to the Online Store and it appears.
- **Checkout, payments, orders** — Shopify's own hosted checkout.
- **Design / behaviour** — the app source on `main`.

## Updating the app
Shopify is connected to this branch and pulls every push.
1. On `main`: `npm run build -- --base=./`
2. Copy `dist/assets/index-*.js` over `assets/mj-app.js` and
   `dist/assets/index-*.css` over `assets/mj-app.css` here.
3. Commit and push. (Pull first — Shopify's theme editor commits here too.)
