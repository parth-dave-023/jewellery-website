import { asset } from '../shopifyAssets'

export type ProductType = 'Rings' | 'Necklaces' | 'Earrings' | 'Bracelets' | 'Pendants'
export type Shape =
  | 'Round' | 'Oval' | 'Emerald' | 'Princess' | 'Pear'
  | 'Marquise' | 'Cushion' | 'Asscher' | 'Radiant'
export type Metal = 'Yellow Gold' | 'White Gold' | 'Rose Gold' | 'Platinum' | 'Silver'
export type Style =
  | 'Solitaire' | 'Halo' | 'Pave' | 'Three-Stone'
  | 'Eternity' | 'Minimalist' | 'Statement' | 'Cluster'
export type CaratBucket = 'under05' | '05to1' | '1to2' | '2plus'

export interface Product {
  id: string
  name: string
  type: ProductType
  shape: Shape
  metal: Metal
  carat: number
  price: number
  style: Style
  tag?: 'New' | 'Bestseller'
  hover: string
  /** Real studio photography (square). First image is the card/hero shot. */
  images?: string[]
  /** Optional web-optimised product clip. */
  video?: string
  /** Short marketing description for real pieces. */
  blurb?: string
}

export const PRODUCTS: Product[] = [
  {
    id: 'asimi',
    name: 'Asimi Pear Noir Ring',
    type: 'Rings',
    shape: 'Pear',
    metal: 'White Gold',
    carat: 5.2,
    price: 3480,
    style: 'Halo',
    tag: 'Bestseller',
    hover: 'DETAIL VIEW',
    images: [
      asset('/products/asimi/asimi-1-front.jpg'),
      asset('/products/asimi/asimi-4-detail.jpg'),
      asset('/products/asimi/asimi-3-underside.jpg'),
      asset('/products/asimi/asimi-2-side.jpg'),
    ],
    video: asset('/products/asimi/asimi-video.mp4'),
    blurb:
      'A 5-carat pear-cut salt-and-pepper diamond, held in a brilliant-cut halo on a French-pavé white-gold band. One-of-a-kind — the inclusions are its fingerprint.',
  },
  { id: 'aurora', name: 'Aurora Solitaire Ring', type: 'Rings', shape: 'Round', metal: 'White Gold', carat: 0.5, price: 1010, style: 'Solitaire', tag: 'New', hover: 'SIDE PROFILE' },
  { id: 'celeste', name: 'Celeste Oval Studs', type: 'Earrings', shape: 'Oval', metal: 'Yellow Gold', carat: 0.6, price: 625, style: 'Minimalist', hover: 'ON MODEL' },
  { id: 'lumen', name: 'Lumen Tennis Bracelet', type: 'Bracelets', shape: 'Round', metal: 'White Gold', carat: 2.0, price: 2950, style: 'Eternity', tag: 'Bestseller', hover: 'ON WRIST' },
  { id: 'marlow', name: 'Marlow Emerald Pendant', type: 'Pendants', shape: 'Emerald', metal: 'Platinum', carat: 0.75, price: 1180, style: 'Solitaire', hover: 'DETAIL VIEW' },
  { id: 'petal', name: 'Petal Halo Ring', type: 'Rings', shape: 'Round', metal: 'Rose Gold', carat: 0.8, price: 1350, style: 'Halo', tag: 'Bestseller', hover: 'SIDE PROFILE' },
  { id: 'thread', name: 'Thread Diamond Necklace', type: 'Necklaces', shape: 'Round', metal: 'Yellow Gold', carat: 0.25, price: 440, style: 'Minimalist', hover: 'ON MODEL' },
  { id: 'vega', name: 'Vega Princess Ring', type: 'Rings', shape: 'Princess', metal: 'White Gold', carat: 1.0, price: 1900, style: 'Solitaire', hover: 'SIDE PROFILE' },
  { id: 'dew', name: 'Dew Pave Huggies', type: 'Earrings', shape: 'Round', metal: 'Rose Gold', carat: 0.4, price: 530, style: 'Pave', hover: 'ON MODEL' },
  { id: 'estelle', name: 'Estelle Pear Pendant', type: 'Pendants', shape: 'Pear', metal: 'White Gold', carat: 0.5, price: 810, style: 'Solitaire', tag: 'New', hover: 'DETAIL VIEW' },
  { id: 'orbit', name: 'Orbit Eternity Band', type: 'Rings', shape: 'Round', metal: 'Platinum', carat: 1.0, price: 1615, style: 'Eternity', hover: 'SIDE PROFILE' },
  { id: 'muse', name: 'Muse Cushion Studs', type: 'Earrings', shape: 'Cushion', metal: 'Yellow Gold', carat: 1.0, price: 1445, style: 'Solitaire', hover: 'ON MODEL' },
  { id: 'favola', name: 'Favola Three-Stone Ring', type: 'Rings', shape: 'Oval', metal: 'Rose Gold', carat: 1.2, price: 2350, style: 'Three-Stone', tag: 'Bestseller', hover: 'SIDE PROFILE' },
  { id: 'lune', name: 'Lune Marquise Necklace', type: 'Necklaces', shape: 'Marquise', metal: 'White Gold', carat: 0.45, price: 700, style: 'Statement', hover: 'ON MODEL' },
  { id: 'aria', name: 'Aria Bezel Bracelet', type: 'Bracelets', shape: 'Round', metal: 'Yellow Gold', carat: 0.3, price: 495, style: 'Minimalist', hover: 'ON WRIST' },
  { id: 'nova', name: 'Nova Radiant Ring', type: 'Rings', shape: 'Radiant', metal: 'Platinum', carat: 1.5, price: 3375, style: 'Solitaire', hover: 'SIDE PROFILE' },
  { id: 'frost', name: 'Frost Cluster Studs', type: 'Earrings', shape: 'Round', metal: 'White Gold', carat: 0.7, price: 865, style: 'Cluster', hover: 'ON MODEL' },
  { id: 'reverie', name: 'Reverie Asscher Pendant', type: 'Pendants', shape: 'Asscher', metal: 'Yellow Gold', carat: 0.6, price: 950, style: 'Solitaire', hover: 'DETAIL VIEW' },
  { id: 'bloom', name: 'Bloom Pave Ring', type: 'Rings', shape: 'Round', metal: 'Rose Gold', carat: 0.35, price: 570, style: 'Pave', tag: 'New', hover: 'SIDE PROFILE' },
  { id: 'cascade', name: 'Cascade Diamond Necklace', type: 'Necklaces', shape: 'Round', metal: 'Platinum', carat: 1.0, price: 2025, style: 'Statement', hover: 'ON MODEL' },
  { id: 'wren', name: 'Wren Solitaire Studs', type: 'Earrings', shape: 'Round', metal: 'White Gold', carat: 0.5, price: 700, style: 'Solitaire', tag: 'Bestseller', hover: 'ON MODEL' },
  { id: 'halo', name: 'Halo Drop Earrings', type: 'Earrings', shape: 'Oval', metal: 'Yellow Gold', carat: 0.9, price: 1255, style: 'Halo', hover: 'ON MODEL' },
  { id: 'serein', name: 'Serein Bangle', type: 'Bracelets', shape: 'Round', metal: 'Rose Gold', carat: 0.5, price: 1060, style: 'Statement', hover: 'ON WRIST' },
  { id: 'iris', name: 'Iris Eternity Ring', type: 'Rings', shape: 'Round', metal: 'White Gold', carat: 0.75, price: 1155, style: 'Eternity', hover: 'SIDE PROFILE' },
  { id: 'astra', name: 'Astra Pear Studs', type: 'Earrings', shape: 'Pear', metal: 'Platinum', carat: 0.8, price: 1110, style: 'Minimalist', tag: 'New', hover: 'ON MODEL' },
]

export const TYPES: ProductType[] = ['Rings', 'Necklaces', 'Earrings', 'Bracelets', 'Pendants']
export const SHAPES: Shape[] = ['Round', 'Oval', 'Emerald', 'Princess', 'Pear', 'Marquise', 'Cushion', 'Asscher', 'Radiant']
export const METALS: Metal[] = ['Yellow Gold', 'White Gold', 'Rose Gold', 'Platinum', 'Silver']
export const CARAT_BUCKETS: { value: CaratBucket; label: string }[] = [
  { value: 'under05', label: 'Under 0.5 ct' },
  { value: '05to1', label: '0.5 – 1 ct' },
  { value: '1to2', label: '1 – 2 ct' },
  { value: '2plus', label: '2 ct +' },
]
export const STYLES: Style[] = ['Solitaire', 'Halo', 'Pave', 'Three-Stone', 'Eternity', 'Minimalist', 'Statement', 'Cluster']

export const PRICE_CAP = 6000
export const PRICE_MIN = 200
export const PRICE_STEP = 50
export const TAX_RATE = 0.03

export const formatPrice = (n: number) => '$' + Math.round(n).toLocaleString('en-US')

export const caratBucket = (c: number): CaratBucket => {
  if (c < 0.5) return 'under05'
  if (c < 1) return '05to1'
  if (c < 2) return '1to2'
  return '2plus'
}

export const METAL_DOTS: Record<Metal, string> = {
  'Yellow Gold': '#D4AF37',
  'White Gold': '#DDE1E4',
  'Rose Gold': '#D6A093',
  Platinum: '#C7CBCE',
  Silver: '#BEC3C6',
}

export const METAL_GRADIENTS: Record<Metal, string> = {
  'Yellow Gold': 'linear-gradient(140deg,#f4ecd8 0%,#e8d7ae 55%,#dcc389 100%)',
  'White Gold': 'linear-gradient(140deg,#eef1f3 0%,#e0e4e7 55%,#d3d8db 100%)',
  'Rose Gold': 'linear-gradient(140deg,#f5e6e1 0%,#eccdc4 55%,#e0b7ac 100%)',
  Platinum: 'linear-gradient(140deg,#eef0f2 0%,#dde1e4 55%,#cdd2d6 100%)',
  Silver: 'linear-gradient(140deg,#eef0f1 0%,#dee2e5 55%,#ccd1d4 100%)',
}

const PHOTO_IDS = [
  '1605100804763-247f67b3557e',
  '1515562141207-7a88fb7ce338',
  '1611652022419-a9419f74343d',
  '1603561591411-07134e71a2a9',
  '1602751584552-8ba73aad10e1',
  '1599643478518-a784e5dc4c8f',
  '1596944924616-7b38e7cfac36',
  '1535632066927-ab7c9ab60908',
  '1617038220319-276d3cfab638',
  '1573408301185-9146fe634ad0',
  '1608042314453-ae338d80c427',
  '1620656798579-1984d9e87df7',
]

export const photoFor = (p: Product): string => {
  let h = 0
  for (let i = 0; i < p.id.length; i++) h += p.id.charCodeAt(i)
  return `https://images.unsplash.com/photo-${PHOTO_IDS[h % PHOTO_IDS.length]}?w=640&h=640&fit=crop&q=70`
}

/** Primary card image: real photo if present, else the Unsplash stand-in. */
export const cardImageFor = (p: Product): string => (p.images?.length ? p.images[0] : photoFor(p))

/** Second image shown on card hover: real second angle, else the primary. */
export const hoverImageFor = (p: Product): string =>
  p.images && p.images.length > 1 ? p.images[1] : cardImageFor(p)

/** Whether a piece has its own real studio photography (vs a gradient/stand-in). */
export const hasRealMedia = (p: Product): boolean => !!p.images?.length

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

export const passes = (p: Product, f: Filters): boolean => {
  if (f.types.length && !f.types.includes(p.type)) return false
  if (f.shapes.length && !f.shapes.includes(p.shape)) return false
  if (f.metals.length && !f.metals.includes(p.metal)) return false
  if (f.styles.length && !f.styles.includes(p.style)) return false
  if (f.carats.length && !f.carats.includes(caratBucket(p.carat))) return false
  if (p.price > f.priceMax) return false
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
    if (kind === 'carats') return caratBucket(p.carat) === value
    const attr = { types: p.type, shapes: p.shape, metals: p.metal, styles: p.style }[kind]
    return attr === value
  }).length
}

export const sortProducts = (list: Product[], sort: SortKey): Product[] => {
  const rank = (x: Product) => (x.tag === 'Bestseller' ? 0 : x.tag === 'New' ? 1 : 2)
  return [...list].sort((a, b) => {
    if (sort === 'price-asc') return a.price - b.price
    if (sort === 'price-desc') return b.price - a.price
    if (sort === 'carat-desc') return b.carat - a.carat
    return rank(a) - rank(b)
  })
}
