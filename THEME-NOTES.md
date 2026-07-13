# Minimalist Jewellery — Shopify theme (exact site duplicate)

This theme renders the exact Minimalist Jewellery storefront
(https://jewellery-website-rose.vercel.app) inside Shopify. It is a blank
Online Store 2.0 theme whose `layout/theme.liquid` mounts the compiled app
bundle, so the look and every interaction are identical to the live site.

## How it works
- `assets/mj-app.js` + `assets/mj-app.css` — the compiled storefront bundle.
- `layout/theme.liquid` — loads the bundle into `<div id="root">` and injects a
  `window.MJ_ASSETS` manifest that maps the app's media to Shopify CDN URLs.
- `assets/mj-hero.png`, `assets/asimi-*.jpg`, `assets/asimi-video.mp4` — media.
- Every `templates/*.liquid` is a stub — the app renders all views client-side.
- `layout/password.liquid` — branded "opening soon" gate.

## Import (one click)
Online Store → Themes → Add theme → Connect from GitHub → this repo, branch
**`shopify`** → Publish.

## Updating the design later
Rebuild the app (`npm run build -- --base=./` on `main`) and copy the new
`dist/assets/index-*.js|css` over `assets/mj-app.js|css`.

## Note on commerce
This duplicates the design + UX exactly. Products/cart/checkout currently run in
the app (demo data). Wiring real Shopify products & checkout is the next step and
is tracked separately.
