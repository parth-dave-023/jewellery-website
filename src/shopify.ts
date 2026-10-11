// Bridge between the storefront app and the real Shopify store when the app is
// embedded in the Shopify theme. The theme injects window.MJ_SHOPIFY (a flag +
// shop info) and window.MJ_PRODUCTS (the live catalogue) before the bundle runs.
// Outside Shopify (local dev) these are absent; the app then previews a snapshot
// of the catalogue (see data/previewCatalog.ts) with the demo checkout.
import type { Product, ProductType, ProductVideo, Shape, Metal, Style, Variant } from './data/products'

export interface InjectedVariant {
  id: number
  title: string
  price: number
  available: boolean
  /** Units in stock when Shopify tracks stock and doesn't allow overselling. */
  max?: number | null
}

/** One product exactly as snippets/mj-catalog.liquid writes it into the page. */
export interface InjectedProduct {
  id: number | string
  handle: string
  title: string
  productType?: string | null
  optionName?: string | null
  variants?: InjectedVariant[]
  images?: string[]
  /** Video uploaded to the product in Shopify (served from Shopify's CDN). */
  video?: {
    poster?: string | null
    sources?: { url: string; format?: string | null; height?: number | null }[]
  } | null
  /** Externally hosted clip, from the spec.video_url metafield. */
  videoUrl?: string | null
  type?: string | null
  shape?: string | null
  metal?: string | null
  carat?: number | string | null
  style?: string | null
  tag?: string | null
  blurb?: string | null
  hover?: string | null
}

interface MJWindow {
  MJ_SHOPIFY?: { domain: string; currency: string }
  MJ_PRODUCTS?: InjectedProduct[]
}
const w = (typeof window !== 'undefined' ? window : {}) as unknown as MJWindow

export const isShopify: boolean = !!w.MJ_SHOPIFY

const TYPES: ProductType[] = ['Rings', 'Necklaces', 'Earrings', 'Bracelets', 'Pendants']
const SHAPES: Shape[] = ['Round', 'Oval', 'Emerald', 'Princess', 'Pear', 'Marquise', 'Cushion', 'Asscher', 'Radiant']
const METALS: Metal[] = ['Yellow Gold', 'White Gold', 'Rose Gold', 'Platinum', 'Silver']
const STYLES: Style[] = ['Solitaire', 'Halo', 'Pave', 'Three-Stone', 'Eternity', 'Minimalist', 'Statement', 'Cluster']

/** A spec value is used only if it is one the storefront knows; otherwise it is left blank. */
const pick = <T extends string>(v: unknown, list: T[]): T | undefined =>
  typeof v === 'string' && (list as string[]).includes(v) ? (v as T) : undefined

const pickVideo = (p: InjectedProduct): ProductVideo | undefined => {
  const all = (p.video?.sources ?? []).filter((s) => s.url)
  const mp4 = all.filter((s) => s.format === 'mp4')
  if (mp4.length) {
    // Adaptive stream first (Safari / mobile pick it up), then one right-sized
    // MP4 for everything else: 480p on phones, 720p on larger screens.
    const want = typeof window !== 'undefined' && window.innerWidth < 700 ? 480 : 720
    const best = [...mp4].sort((a, b) => Math.abs((a.height ?? 0) - want) - Math.abs((b.height ?? 0) - want))[0]
    const hls = all.find((s) => s.format === 'm3u8')
    return {
      poster: p.video?.poster || undefined,
      sources: [
        ...(hls ? [{ src: hls.url, type: 'application/x-mpegURL' }] : []),
        { src: best.url, type: 'video/mp4' },
      ],
    }
  }
  return p.videoUrl ? { sources: [{ src: p.videoUrl, type: 'video/mp4' }] } : undefined
}

/** Map Shopify's catalogue (as injected by the theme) to the app's Product shape. */
export function toProducts(raw: InjectedProduct[]): Product[] {
  return raw.map((p): Product => {
    const variants: Variant[] = (p.variants ?? []).map((v) => ({
      id: v.id,
      label: v.title,
      price: Number(v.price) || 0,
      available: !!v.available,
      max: typeof v.max === 'number' ? v.max : undefined,
    }))
    const sellable = variants.filter((v) => v.available && v.price > 0)
    const priced = variants.filter((v) => v.price > 0).map((v) => v.price)
    const first = sellable[0] ?? variants[0]
    const multi = variants.length > 1
    const caratNum = typeof p.carat === 'number' ? p.carat : parseFloat(String(p.carat ?? ''))
    return {
      id: p.handle || String(p.id),
      name: p.title,
      type: pick(p.type, TYPES) ?? pick(p.productType, TYPES),
      shape: pick(p.shape, SHAPES),
      metal: pick(p.metal, METALS),
      carat: Number.isFinite(caratNum) && caratNum > 0 ? caratNum : undefined,
      style: pick(p.style, STYLES),
      price: priced.length ? Math.min(...priced) : 0,
      available: sellable.length > 0,
      max: first?.max,
      tag: p.tag === 'New' || p.tag === 'Bestseller' ? p.tag : undefined,
      hover: p.hover || undefined,
      images: p.images ?? [],
      video: pickVideo(p),
      blurb: p.blurb || undefined,
      variantId: first?.id,
      optionName: multi ? p.optionName || 'Option' : undefined,
      variants: multi ? variants : undefined,
    }
  })
}

/** The live catalogue the theme injected (empty if nothing is published yet). */
export const injectedCatalog = (): Product[] => toProducts(w.MJ_PRODUCTS ?? [])

/**
 * Sync the app cart into Shopify's real cart, then hand off to Shopify's hosted
 * checkout (real payment, order + invoice). The app cart is the source of truth,
 * so we clear Shopify's cart and re-add the current lines.
 */
export async function checkoutWithShopify(lines: { variantId?: number; qty: number }[]): Promise<void> {
  const items = lines
    .filter((l) => typeof l.variantId === 'number')
    .map((l) => ({ id: l.variantId as number, quantity: l.qty }))
  try {
    await fetch('/cart/clear.js', { method: 'POST', headers: { 'Content-Type': 'application/json' } })
    if (items.length) {
      await fetch('/cart/add.js', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items }),
      })
    }
  } catch {
    /* proceed to checkout regardless; Shopify will show whatever synced */
  }
  window.location.href = '/checkout'
}
