import { injectedCatalog, isShopify, toProducts } from '../shopify'
import { previewProducts } from './previewCatalog'

export type ProductType = 'Rings' | 'Necklaces' | 'Earrings' | 'Bracelets' | 'Pendants'
export type Shape =
  | 'Round' | 'Oval' | 'Emerald' | 'Princess' | 'Pear'
  | 'Marquise' | 'Cushion' | 'Asscher' | 'Radiant'
export type Metal = 'Yellow Gold' | 'White Gold' | 'Rose Gold' | 'Platinum' | 'Silver'
export type Style =
  | 'Solitaire' | 'Halo' | 'Pave' | 'Three-Stone'
  | 'Eternity' | 'Minimalist' | 'Statement' | 'Cluster'
export type CaratBucket = 'under05' | '05to1' | '1to2' | '2plus'

/** One purchasable option of a piece (e.g. a hoop diameter). */
export interface Variant {
  /** Shopify variant id. */
  id: number
  label: string
  price: number
  available: boolean
  /** Units in stock, when Shopify tracks stock for it. */
  max?: number
}

export interface ProductVideo {
  sources: { src: string; type: string }[]
  poster?: string
}

export interface Product {
  id: string
  name: string
  /* Facts about the piece. Each one is optional: whatever isn't filled in on
     the Shopify product is left off the page rather than guessed. */
  type?: ProductType
  shape?: Shape
  metal?: Metal
  carat?: number
  style?: Style
  /** Lowest price across the piece's options. 0 = not priced yet. */
  price: number
  /** Priced and in stock in Shopify, so it can go in the bag. */
  available: boolean
  /** Units in stock of the default option, when Shopify tracks stock for it. */
  max?: number
  tag?: 'New' | 'Bestseller'
  hover?: string
  /** Studio photography (square). The first image is the card/hero shot. */
  images: string[]
  video?: ProductVideo
  blurb?: string
  /** Shopify variant id of the default option. */
  variantId?: number
  /** Set only when the piece comes in more than one option (e.g. Size). */
  optionName?: string
  variants?: Variant[]
}

/**
 * The catalogue. On the store it is whatever Shopify has published (injected by
 * the theme); in local dev it is a snapshot of that catalogue. Nothing is ever
 * hard-coded into the production build.
 */
export const PRODUCTS: Product[] = isShopify
  ? injectedCatalog()
  : import.meta.env.DEV
    ? toProducts(previewProducts())
    : []

const ALL_TYPES: ProductType[] = ['Rings', 'Necklaces', 'Earrings', 'Bracelets', 'Pendants']
const ALL_SHAPES: Shape[] = ['Round', 'Oval', 'Emerald', 'Princess', 'Pear', 'Marquise', 'Cushion', 'Asscher', 'Radiant']
const ALL_METALS: Metal[] = ['Yellow Gold', 'White Gold', 'Rose Gold', 'Platinum', 'Silver']
const ALL_STYLES: Style[] = ['Solitaire', 'Halo', 'Pave', 'Three-Stone', 'Eternity', 'Minimalist', 'Statement', 'Cluster']
const ALL_CARAT_BUCKETS: { value: CaratBucket; label: string }[] = [
  { value: 'under05', label: 'Under 0.5 ct' },
  { value: '05to1', label: '0.5 – 1 ct' },
  { value: '1to2', label: '1 – 2 ct' },
  { value: '2plus', label: '2 ct +' },
]

export const caratBucket = (c: number): CaratBucket => {
  if (c < 0.5) return 'under05'
  if (c < 1) return '05to1'
  if (c < 2) return '1to2'
  return '2plus'
}

/* Filter options are limited to what the catalogue actually contains, so no
   filter ever leads to an empty shelf. */
export const TYPES = ALL_TYPES.filter((v) => PRODUCTS.some((p) => p.type === v))
export const SHAPES = ALL_SHAPES.filter((v) => PRODUCTS.some((p) => p.shape === v))
export const METALS = ALL_METALS.filter((v) => PRODUCTS.some((p) => p.metal === v))
export const STYLES = ALL_STYLES.filter((v) => PRODUCTS.some((p) => p.style === v))
export const CARAT_BUCKETS = ALL_CARAT_BUCKETS.filter((b) =>
  PRODUCTS.some((p) => p.carat !== undefined && caratBucket(p.carat) === b.value),
)

/* The price slider spans the real price range; it is hidden until at least two
   different prices exist. */
const PRICES = PRODUCTS.map((p) => p.price).filter((n) => n > 0)
const TOP_PRICE = Math.max(0, ...PRICES)
export const PRICE_STEP = TOP_PRICE <= 2000 ? 50 : TOP_PRICE <= 10000 ? 100 : TOP_PRICE <= 50000 ? 500 : 1000
const stepUp = (n: number) => Math.ceil(n / PRICE_STEP) * PRICE_STEP
export const PRICE_CAP = stepUp(TOP_PRICE)
export const PRICE_MIN = PRICES.length ? stepUp(Math.min(...PRICES)) : 0
export const HAS_PRICE_RANGE = PRICE_CAP > PRICE_MIN
export const HAS_PRICES = PRICES.length > 0
export const HAS_CARATS = CARAT_BUCKETS.length > 0
export const TAX_RATE = 0.03

export const formatPrice = (n: number) =>
  '$' + n.toLocaleString('en-US', { minimumFractionDigits: Number.isInteger(n) ? 0 : 2, maximumFractionDigits: 2 })

/** What to show where a price goes: the price, "From …" across options, or a note when unpriced. */
export const priceLabel = (p: Product): string => {
  if (p.price <= 0) return 'Price on request'
  const varies = !!p.variants?.some((v) => v.price > 0 && v.price !== p.price)
  return (varies ? 'From ' : '') + formatPrice(p.price)
}

/** A piece (or one of its options) can go in the bag only once Shopify has a price and stock for it. */
export const canBuy = (p: Product, v?: Variant): boolean =>
  v ? v.available && v.price > 0 : p.available && p.price > 0

const SINGULAR: Record<ProductType, string> = {
  Rings: 'Ring',
  Necklaces: 'Necklace',
  Earrings: 'Earrings',
  Bracelets: 'Bracelet',
  Pendants: 'Pendant',
}

/** One-line summary under a piece's name, built only from the facts we have. */
export const specLine = (p: Product): string => {
  const known = [p.metal, p.carat !== undefined ? `${p.carat} ct` : undefined].filter(Boolean)
  if (known.length) return known.join(' · ')
  return [p.type && SINGULAR[p.type], p.shape && `${p.shape} cut`].filter(Boolean).join(' · ')
}

export const METAL_DOTS: Record<Metal, string> = {
  'Yellow Gold': '#D4AF37',
  'White Gold': '#DDE1E4',
  'Rose Gold': '#D6A093',
  Platinum: '#C7CBCE',
  Silver: '#BEC3C6',
}

const METAL_GRADIENTS: Record<Metal, string> = {
  'Yellow Gold': 'linear-gradient(140deg,#f4ecd8 0%,#e8d7ae 55%,#dcc389 100%)',
  'White Gold': 'linear-gradient(140deg,#eef1f3 0%,#e0e4e7 55%,#d3d8db 100%)',
  'Rose Gold': 'linear-gradient(140deg,#f5e6e1 0%,#eccdc4 55%,#e0b7ac 100%)',
  Platinum: 'linear-gradient(140deg,#eef0f2 0%,#dde1e4 55%,#cdd2d6 100%)',
  Silver: 'linear-gradient(140deg,#eef0f1 0%,#dee2e5 55%,#ccd1d4 100%)',
}
const NEUTRAL_GRADIENT = 'linear-gradient(140deg,#f3efe6 0%,#e9e3d6 55%,#ded6c5 100%)'

/** Backdrop behind a piece's photo (and what shows if it has no photo yet). */
export const mediaBackground = (p: Product): string => (p.metal ? METAL_GRADIENTS[p.metal] : NEUTRAL_GRADIENT)

/** Ask Shopify's image CDN for a copy no wider than needed. Other URLs pass through untouched. */
export const sized = (url: string, width: number): string => {
  if (!/cdn\.shopify\.com\/|\/cdn\/shop\//.test(url)) return url
  const bare = url.replace(/([?&])width=\d+(&|$)/, '$1').replace(/[?&]$/, '')
  return `${bare}${bare.includes('?') ? '&' : '?'}width=${width}`
}

/** Primary card image, if the piece has photography. */
export const cardImageFor = (p: Product): string | undefined => p.images[0]

/** Second angle shown on card hover, if there is one. */
export const hoverImageFor = (p: Product): string | undefined => p.images[1]

export interface Filters {
  types: ProductType[]
  shapes: Shape[]
  metals: Metal[]
  carats: CaratBucket[]
  styles: Style[]
  priceMax: number
}

export const EMPTY_FILTERS: Filters = {
  types: [],
  shapes: [],
  metals: [],
  carats: [],
  styles: [],
  priceMax: PRICE_CAP,
}

export type SortKey = 'featured' | 'price-asc' | 'price-desc' | 'carat-desc'

const has = <T,>(list: T[], v: T | undefined): boolean => v !== undefined && list.includes(v)

export const passes = (p: Product, f: Filters): boolean => {
  if (f.types.length && !has(f.types, p.type)) return false
  if (f.shapes.length && !has(f.shapes, p.shape)) return false
  if (f.metals.length && !has(f.metals, p.metal)) return false
  if (f.styles.length && !has(f.styles, p.style)) return false
  if (f.carats.length && !(p.carat !== undefined && f.carats.includes(caratBucket(p.carat)))) return false
  // A price ceiling only applies once the slider is moved, and then only priced pieces qualify.
  if (f.priceMax < PRICE_CAP && !(p.price > 0 && p.price <= f.priceMax)) return false
  return true
}

/** Count of products matching `value` for facet `kind`, with every OTHER active filter applied. */
export const countFor = (
  filters: Filters,
  kind: 'types' | 'shapes' | 'metals' | 'styles' | 'carats',
  value: string,
): number => {
  const f = { ...filters, [kind]: [] as string[] }
  return PRODUCTS.filter((p) => {
    if (!passes(p, f as Filters)) return false
    if (kind === 'carats') return p.carat !== undefined && caratBucket(p.carat) === value
    const attr = { types: p.type, shapes: p.shape, metals: p.metal, styles: p.style }[kind]
    return attr === value
  }).length
}

export const sortProducts = (list: Product[], sort: SortKey): Product[] => {
  const rank = (x: Product) => (x.tag === 'Bestseller' ? 0 : x.tag === 'New' ? 1 : 2)
  // Unpriced pieces always sit after priced ones when sorting by price.
  const unpriced = (x: Product) => (x.price > 0 ? 0 : 1)
  return [...list].sort((a, b) => {
    if (sort === 'price-asc') return unpriced(a) - unpriced(b) || a.price - b.price
    if (sort === 'price-desc') return unpriced(a) - unpriced(b) || b.price - a.price
    if (sort === 'carat-desc') return (b.carat ?? 0) - (a.carat ?? 0)
    return rank(a) - rank(b)
  })
}
