# Minimalist Jewellery — storefront

The storefront for [minimalistjewellery.com](https://minimalistjewellery.com), which runs on
Shopify. It is a single-page React app (React 19 + Vite + TypeScript) embedded in a blank
Shopify theme.

## How it fits together

- **`main` branch** — the app's source code (this branch).
- **`shopify` branch** — the Shopify theme: the compiled app (`assets/mj-app.js`,
  `assets/mj-app.css`) plus a handful of Liquid files. Shopify is connected to this branch
  and updates the live theme on every push.
- **Shopify admin** — products, prices, stock, photos and videos. None of that lives in
  this repo. The theme hands the published catalogue to the app
  (`snippets/mj-catalog.liquid` → `window.MJ_PRODUCTS`), and checkout is Shopify's own.

## What the storefront reads from each product

Standard Shopify fields: title, price, inventory, options (e.g. Size), photos and video.

Optional metafields in the `spec` namespace: `type`, `shape`, `metal`, `carat`, `style`,
`tag`, `blurb`, `hover`, `video_url`. Anything left blank is simply not shown.

A piece shows "Price on request" and cannot be added to the bag until it has both a price
and stock in Shopify.

## Run locally

```bash
npm install
npm run dev      # http://localhost:3004
```

Local dev previews a snapshot of the catalogue (`src/data/previewCatalog.ts`) and a demo
checkout; nothing from it ships to the store.

## Publish a change

1. On `main`: `npm run build -- --base=./`
2. On the `shopify` branch (pull first — Shopify's theme editor commits there too), copy
   `dist/assets/index-*.js` over `assets/mj-app.js` and `dist/assets/index-*.css` over
   `assets/mj-app.css`.
3. Commit and push `shopify`. Shopify picks it up within a minute.
