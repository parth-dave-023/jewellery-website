# Handoff: Auren — Single-Page Fine-Jewellery E-Commerce Store

## Overview
A luxury, minimal, single-page diamond & fine-jewellery storefront for the Indian market (INR). The whole shopping experience — hero, product discovery with live faceted filtering, quick-view, cart — lives on one page; only the **cart**, **checkout**, and **order-confirmation** are treated as separate "pages" (implemented here as swapped in-app views). Aesthetic is *"Icy Platinum"*: cool off-whites, near-black ink, restrained silver/metal accents, generous whitespace, subtle shimmer.

"Auren" is a **placeholder brand name** — rename freely.

## About the Design Files
The files in this bundle are **design references created in HTML** — a working prototype showing the intended look, layout, and behaviour. **They are not production code to copy line-for-line.** The task is to **recreate this design in your target codebase** (React, Vue, Next.js, Svelte, native, etc.) using its established components, routing, state, and styling conventions. If no codebase exists yet, pick the framework best suited to the project (a React + Vite or Next.js app is a natural fit for this SPA-style storefront) and implement the design there.

`Auren Fine Jewellery.dc.html` is authored in a small in-house "Design Component" format and depends on `support.js` (also bundled) to run. Open the HTML file in a browser to interact with the live prototype. **Do not port `support.js` or the `.dc.html` wrapper** — read them for reference and rebuild the UI natively. All the logic you need (data model, filtering, cart math) is plain JavaScript inside the `<script type="text/x-dc">` block near the bottom of the HTML file and is documented below.

## Fidelity
**High-fidelity (hifi).** Final colours, typography, spacing, radii, motion, and interactions are all specified below and in the prototype. Recreate the UI pixel-accurately, then swap the demonstration product imagery and (optionally) the type stack for your brand's finalised assets.

Product photography in the prototype uses **remote demonstration photos** (Unsplash jewellery shots, pulled by `photoFor(product)` in the logic, with the metal-tinted gradient kept as an automatic `onError` fallback). These are stand-ins only — replace them with your own colour-managed studio photography (square crop for product, ideally a primary + a "second angle" hover image per piece).

---

## Screens / Views
The app is a single component with a `view` state that switches between four top-level views. A sticky **header** and a **footer** are shared chrome (footer shows on `shop` and `cart` only). A **cart drawer** and a **quick-view modal** are overlays available from any shopping context.

### 1. Header (shared)
- **Layout**: `position: sticky; top:0`, translucent (`rgba(244,245,246,.82)` + `backdrop-filter: saturate(150%) blur(16px)`), 1px bottom hairline. Optional **announcement bar** above it (ink background `#16181B`, centred uppercase 11px text, `.16em` tracking). Main bar is a 3-column grid `1fr auto 1fr`, height 72px, max-width 1340px, side padding 30px.
- **Left**: intentionally empty (keeps the wordmark optically centred). *Design note: an earlier category text-nav lived here (`Rings · Necklaces · …`) and was removed — a flat row of category words read as generic/"cheap". Categories are now reached via the "Shop by shape" strip and the filter rail.* If you want top-level nav in production, give it a considered treatment (a single "Shop" trigger or an offcanvas menu), not a flat word list.
- **Center**: wordmark `AUREN`, Marcellus 27px, `.30em` letter-spacing. Click → home/shop view.
- **Right**: 4 icon buttons — search, account, wishlist (with count badge), bag (with count badge). Icons are 19px line SVGs, `stroke-width` ~1.4, colour ink. Badges: 15px ink circle, white 9px text, top-right offset.

### 2. Shop view (`view === 'shop'`)
Sections top-to-bottom:

**a) Hero** — 2-column grid `1.05fr .95fr`, `min-height: 76vh`, gap 48px.
- Left: eyebrow `EVERYDAY FINE JEWELLERY` (12px uppercase `#8A9299`, `.24em`); headline **"Quietly / brilliant."** (Marcellus `clamp(44px,5.6vw,76px)`, line-height 1.04); paragraph (Jost 300, 17px/1.7, `#5B6167`, max-width 430px); two CTAs — primary "Shop the collection" (ink button, white text, 17px×30px padding, radius 2px) and text link "Our promise" (underlined).
- Right: a full-bleed **hero photograph** — an `<img>` at `aspect-ratio: 4/5`, `object-fit: cover`, radius 3px, soft shadow `0 30px 70px -40px rgba(20,24,27,.4)`, over a platinum gradient backdrop that shows through only if the image fails to load. The prototype points it at a demonstration campaign photo; **replace the `src` with your own hero photography (≈1200×1500)** or wire it to a CMS image field. (An earlier decorative shimmer/sparkle overlay was removed here so a real photo reads cleanly; the shimmer still appears on product-card hover.)

**b) "Shop by shape" strip** — horizontal scroll of 9 shape cards (104px wide, white, 1px border, radius 3px, hover lifts `translateY(-2px)`). Each shows a small **CSS shape glyph** + shape name. Clicking sets `shapes:[shape]` and jumps to the collection. A "View all →" link clears filters.

**c) The Collection (`#shop`)** — the core.
- Header row: eyebrow `THE COLLECTION` + title **"Find your piece"** (Marcellus ~42px), and a **Refine / Discover** segmented toggle (right-aligned; active segment = ink fill, white text).
- **Active-filter chips**: row of removable ink chips (each `label ×`) + "Clear all" link, shown when any filter is active.
- **Two browse modes** (see Interactions):
  - **Refine mode** — 2-column layout `250px 1fr`, gap 48px. Left **sticky filter rail**; right toolbar (result count + Sort `<select>`) above the product grid.
  - **Discover mode** — no rail; a full-width white facet panel ("Choose a cut" big shape tiles with counts, Metal swatches, a Budget range slider, Style chips) above a full-width product grid.
- **Filter rail sections** (each separated by hairlines):
  - *Category* — checkbox rows (16px ink checkbox, label, live count).
  - *Diamond shape* — 3-col grid of glyph tiles (glyph + tiny label; selected = ink border + faint ink wash).
  - *Metal* — rows with a colour swatch dot, label, count.
  - *Carat* — checkbox rows: `Under 0.5 ct`, `0.5 – 1 ct`, `1 – 2 ct`, `2 ct +`.
  - *Price* — range slider (`accent-color:#16181B`), min ₹20,000 → max ₹5,00,000, live "Up to ₹X" readout.
  - *Style* — wrapping chips (selected = ink fill).
- **Product grid** — `repeat(auto-fill, minmax(258px,1fr))`, gap `34px 26px` (comfortable) / `minmax(210px,1fr)`, gap `22px 18px` (compact). Card anatomy below.
- **Empty state** — dashed-border panel, "No pieces match those filters" + "Clear filters" button.

**d) The Auren promise** — alt-background band (`#EDEFF1`), centred intro, 3-column values (`Certified & graded`, `Responsibly sourced`, `A lifetime of care`), each with a small rotated-square diamond glyph + Marcellus subtitle + Jost body.

#### Product card
- Column flex. **Image**: square (`aspect-ratio:1/1`), radius 3px, `overflow:hidden`, background = the product's **metal-tinted gradient** + a diagonal hairline overlay. `cursor:pointer` — clicking opens quick-view.
  - Top-left **tag** badge when present (`NEW` = ink fill/white; `BESTSELLER` = white/ink with inset hairline; 9.5px uppercase `.12em`).
  - Top-right **wishlist heart** button (32px translucent circle; filled with accent when saved). Its click must **not** bubble to the image (no quick-view).
  - Centered monospace caption `TYPE · SHAPE`; on hover it cross-fades to the second-angle caption (`SIDE PROFILE` / `ON MODEL` / `ON WRIST` / `DETAIL VIEW`).
  - On hover: image scales to 1.05 (`transition: transform 1s cubic-bezier(.2,.8,.2,1)`), a light **sheen** sweeps across, and a **"Quick view"** bar rises from the bottom.
- **Info**: name (Marcellus 16.5px), spec line `Metal · X ct` (Jost 300, 12.5px, `#8A9299`), then a footer row with price (Jost 15px ink) and an outlined **"Add"** button (hover → ink fill).

### 3. Cart view (`view === 'cart'`)
- "← Continue shopping" link; title "Your bag" (Marcellus 40px).
- 2-column `1fr 380px`. Left: line items (110px image, name/spec, qty stepper `− n +`, "Remove"), each row separated by a top hairline; line total right-aligned. Right: sticky **Order summary** card — Subtotal, GST (3%), Shipping = "Complimentary", TOTAL (Marcellus 22px), "Proceed to checkout" ink button, and a small lock + "Secure encrypted checkout" line.
- **Empty state**: dashed panel "Your bag is empty" + "Shop now".

### 4. Checkout view (`view === 'checkout'`)
- Title "Checkout" + a lock + "256-BIT SECURE" badge (top-right).
- `<form>`, 2-column `1fr 400px`. Left sections with hairline-underlined uppercase headings:
  - **Contact** — email.
  - **Shipping address** — First/Last (2-col), Address, City/State/PIN (3-col `1.4fr 1fr 1fr`), Phone.
  - **Payment** — heading with a small "Encrypted" lock tag; Card number, MM/YY + CVV (2-col), Name on card; a note: *"UPI & net banking also available at payment. This is a demonstration — no real payment is processed."*
  - Inputs: full-width, 1px hairline border, radius 2px, padding `14px 15px`, Jost 300 14px.
- Right: sticky **"Your order"** summary (mini line items with qty, Subtotal, GST, Shipping = "Free", TOTAL), a **"Place order · ₹TOTAL"** submit button, and an SSL reassurance line. Uses native HTML5 `required` validation; submitting a valid form places the order.

### 5. Confirmation view (`view === 'confirmation'`)
- Centred, max-width 640px. Ringed **animated checkmark** (stroke draws in). Eyebrow `ORDER CONFIRMED`; headline "Thank you — your order is on its way to being made"; "A confirmation has been sent to your email. Your order reference is" + **order number** `AUR-######` (Marcellus, `.16em`). A 3-card "what happens next" row (`01 Hand-crafted`, `02 Quality & certification`, `03 Insured dispatch`). "Continue shopping" button.

### 6. Cart drawer (overlay)
Right slide-in panel `min(420px, 92vw)`, full-height, `#F4F5F6`, left shadow. Header "Your bag (n)" + close ×. Scrollable line items (76px image, name/spec, qty stepper, line total, "Remove"). Footer on `#EDEFF1`: Subtotal, TOTAL, "Checkout" (ink) + "View full bag" (outline). Backdrop `rgba(20,24,27,.34)` + blur; click backdrop to close. Empty state: "Your bag is empty" + "Keep shopping".

### 7. Quick-view modal (overlay)
Centred `max-width 840px`, 2-column `1fr 1fr`, radius 4px, big shadow. Left = product image tile (metal gradient + caption). Right = optional tag, name (Marcellus 30px), price (19px), a spec table (`Type, Diamond shape, Metal, Total carat, Style, Certification: IGI / GIA`), then "Add to bag" (ink, flex-1) + a heart button. Small "Certified · complimentary insured shipping · lifetime care" line. Backdrop click closes; inner click is stopped.

---

## Interactions & Behavior
- **Live filtering**: the grid re-renders instantly on any facet change. Filters combine as AND across facet groups, OR within a group (multi-select). Price is an upper bound.
- **Faceted counts**: each option shows how many products would match if that value were applied *given the other currently-active filters* (compute by applying all filters except the one being counted, then counting matches for that value). Counts update live.
- **Sort**: `Featured` (Bestseller → New → rest), `Price: Low→High`, `Price: High→Low`, `Carat: High→Low`.
- **Browse-mode toggle**: `Refine` (filter rail) vs `Discover` (top facet band). Both operate on the same filter state and product list — switching modes preserves selections.
- **Add to cart**: increments qty if present, else adds; opens the cart drawer.
- **Qty steppers**: `−`/`+`; reaching 0 removes the line.
- **Wishlist**: toggle per product; header badge = count; heart fills with accent when saved. Wishlist heart click must stop propagation so it doesn't open quick-view.
- **Quick-view**: opens on product-image click or the hover "Quick view" bar.
- **Checkout**: native `required` validation; on valid submit, generate `AUR-` + 6 random digits, switch to confirmation, empty the cart.
- **Navigation**: nav items and shape/category entries set a filter and route to the collection; the wordmark returns to shop; view changes scroll to top.
- **Motion** (keep subtle — client asked for calm): fade-up on view/panel mount (~.25–.8s), hover image zoom (1s ease-out), light sheen sweep, sparkle twinkle, checkmark stroke-draw. All shimmer/sparkle should be behind a global on/off flag.
- **Responsive**: prototype is desktop-first. For production, collapse the hero and 2-col layouts to single column, turn the filter rail into a slide-in "Filters" sheet on mobile, and ensure tap targets ≥44px. The product image is already tap-to-quick-view (good for touch).

## State Management
Single source of truth (component state or a store):
- `view`: `'shop' | 'cart' | 'checkout' | 'confirmation'`
- `browseMode`: `'rail' | 'discover'`
- `filters`: `{ types: string[], shapes: string[], metals: string[], carats: string[], styles: string[], priceMax: number }`
- `sort`: `'featured' | 'price-asc' | 'price-desc' | 'carat-desc'`
- `cart`: `Array<{ id: string, qty: number }>`
- `wishlist`: `string[]` (product ids)
- `drawerOpen`: boolean
- `quickViewId`: string | null
- `hoveredId`: string | null (drives card hover reveal)
- `orderNo`: string | null

Derived (compute, don't store): filtered+sorted product list, per-facet counts, subtotal, `gst = round(subtotal * 0.03)`, `total = subtotal + gst`, cart count, wishlist count.

No data fetching in the prototype — products are a static array. In production, replace with your catalogue API; keep filtering/sorting server- or client-side as suits your scale.

## Data Model
```ts
type Product = {
  id: string;
  name: string;
  type: 'Rings' | 'Necklaces' | 'Earrings' | 'Bracelets' | 'Pendants';
  shape: 'Round'|'Oval'|'Emerald'|'Princess'|'Pear'|'Marquise'|'Cushion'|'Asscher'|'Radiant';
  metal: 'Yellow Gold'|'White Gold'|'Rose Gold'|'Platinum'|'Silver';
  carat: number;          // total carat weight
  price: number;          // INR, integer
  style: 'Solitaire'|'Halo'|'Pave'|'Three-Stone'|'Eternity'|'Minimalist'|'Statement'|'Cluster';
  tag?: 'New' | 'Bestseller';
  hover: string;          // second-angle caption, e.g. 'SIDE PROFILE'
};
```
Facet definitions: **Carat buckets** — `under05` (<0.5), `05to1` (0.5–<1), `1to2` (1–<2), `2plus` (≥2). **Price slider** — min 20000, max 500000, step 5000. The full 24-item placeholder catalogue is in the prototype's script block; treat it as sample data.

Currency format: `'₹' + n.toLocaleString('en-IN')` (Indian digit grouping, e.g. ₹1,12,000). Tax: **GST 3%** (jewellery). Shipping: free/complimentary.

## Design Tokens

### Colour
| Token | Value |
|---|---|
| Page background | `#F4F5F6` |
| Alt section background | `#EDEFF1` |
| Surface / card | `#FFFFFF` |
| Ink (primary text, buttons) | `#16181B` |
| Secondary text | `#5B6167` |
| Muted text / labels | `#8A9299` |
| Placeholder text | `#9AA1A7` |
| Monospace caption | `#6B7278` |
| Link hover | `#565C62` |
| Hairlines | `rgba(20,24,27, .08 / .09 / .10 / .12)` |
| Footer background | `#16181B` (text `#C9CDD1`, muted `#9AA1A7` / `#7D858B`) |
| **Accent (default)** | `#16181B` — alternatives: `#243B45`, `#43384F`, `#33463A` |

Metal swatch dots — Yellow Gold `#D4AF37`, White Gold `#DDE1E4`, Rose Gold `#D6A093`, Platinum `#C7CBCE`, Silver `#BEC3C6`.

Metal placeholder gradients (`linear-gradient(140deg, …)`):
- Yellow Gold `#f4ecd8 → #e8d7ae 55% → #dcc389`
- White Gold `#eef1f3 → #e0e4e7 55% → #d3d8db`
- Rose Gold `#f5e6e1 → #eccdc4 55% → #e0b7ac`
- Platinum `#eef0f2 → #dde1e4 55% → #cdd2d6`
- Silver `#eef0f1 → #dee2e5 55% → #ccd1d4`

### Typography
- **Display / headings**: `Marcellus` (Google Fonts), regular 400. Used for wordmark, hero, section titles, product names, totals.
- **UI / body**: `Jost` (Google Fonts), weights 300 / 400 / 500 / 600.
- **Mono captions / spec labels**: `ui-monospace, Menlo, monospace`.
- Scale: hero `clamp(44px,5.6vw,76px)`/1.04; section title `clamp(30px,3.4vw,42px)`; product name 16.5px; body 15–17px / 1.6–1.7; eyebrows & nav 11–12px uppercase, tracking `.12–.24em`; price 15px.

### Spacing & layout
- Content max-width **1340px**, side padding **30px**.
- Section vertical padding ~52–84px.
- Grid gaps: comfortable `34px 26px`; compact `22px 18px`.
- Filter rail width 250px; sticky offset `top:100px`.

### Radius & elevation
- Radius: **2px** (buttons, inputs, chips), **3px** (cards, images), **4px** (panels, modal), `50%` (dots, icon buttons).
- Shadows: hero `0 30px 70px -40px rgba(20,24,27,.4)`; drawer `-30px 0 60px -30px rgba(0,0,0,.4)`; modal `0 40px 90px -30px rgba(0,0,0,.5)`; cards flat (hairline border only).

### Motion (keyframes in the prototype `<helmet>`)
`aurShimmer` (sweep), `aurTwinkle` (sparkle opacity/scale), `aurRise` (fade+translateY up), `aurDraw` (SVG stroke-dashoffset checkmark), `aurFloat`. Durations .25–.8s for entrances; hover zoom 1s ease-out.

### Configurable options (surfaced as "tweaks" in the prototype)
- `accent` (colour) · `gridDensity` (`comfortable | compact`) · `enableShimmer` (bool — the calm/minimal switch) · `showTrustBar` (bool) · `announcement` (string). Wire these as theme/config in production.

### Diamond shape glyphs
Small outline glyphs drawn with **CSS** (a bordered box with tuned `width/height/border-radius/transform`) — not SVG. Approximate mapping: Round=circle, Oval=tall ellipse, Emerald/Asscher/Princess=squares/tall-rect with small radii, Cushion=rounded square, Pear=teardrop (`border-radius:50% 50% 50% 2px; transform:rotate(45deg)`), Marquise=thin ellipse, Radiant=tall rounded rect. Replace with your icon set if you have proper diamond-cut icons.

## Assets
- **No image assets are bundled.** All imagery (hero + products) is loaded remotely as **demonstration photography** via `<img>` tags, with a metal-tinted gradient as the `onError` fallback. Provide your own real, colour-managed jewellery photography (hero ≈1200×1500, product square) and consider a primary + hover ("second angle") image per product. Metal gradients (below) remain useful as loading/fallback states.
- **Fonts**: Marcellus & Jost from Google Fonts (self-host for production/perf).
- **Icons**: simple inline line SVGs (search, account, heart, bag, lock, close, chevron, check) — swap for your icon library.
- No third-party logos/brand assets are used; "Auren" is an invented placeholder.

## Screenshots
Reference renders of each view are in `screenshots/` (captured at desktop width ≈ 924px):
- `01-auren.png` — Home / hero (hero photograph + header)
- `02-auren.png` — The Collection, **Refine** mode (filter rail + product grid)
- `03-auren.png` — The Collection, **Discover** mode (shape-first facet band)
- `04-auren.png` — Quick-view modal
- `05-auren.png` — Cart drawer (slide-out)
- `06-auren.png` — Cart page
- `07-auren.png` — Checkout
- `08-auren.png` — Order confirmation

## Files
- `Auren Fine Jewellery.dc.html` — the interactive design prototype. Read the `<script type="text/x-dc">` block for the exact product data, filtering/counting/sort/cart logic, and per-element inline styles.
- `support.js` — the prototype runtime (**reference only — do not port**).
- `screenshots/` — static renders of all eight views (see above).
- Open the HTML in a browser to click through all views and states.
