// Bridge between the storefront app and the real Shopify store when the app is
// embedded in the Shopify theme. The theme injects window.MJ_SHOPIFY (a flag +
// shop info) and window.MJ_PRODUCTS (the live catalogue) before the bundle runs.
// Outside Shopify (Vercel / local dev) these are absent and everything falls
// back to the built-in demo catalogue + demo checkout.
import type { Product, ProductType, Shape, Metal, Style } from './data/products'

interface InjectedProduct {
  id: number | string
  handle: string
  title: string
  price: number
  variantId: number
  images?: string[]
  video?: string | null
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
const pick = <T extends string>(v: unknown, list: T[], fallback: T): T =>
  typeof v === 'string' && (list as string[]).includes(v) ? (v as T) : fallback

/** Map the Liquid-injected Shopify catalogue to the app's Product shape. */
export function injectedCatalog(): Product[] | null {
  const raw = w.MJ_PRODUCTS
  if (!raw || !raw.length) return null
  return raw.map((p): Product => {
    const caratNum = typeof p.carat === 'number' ? p.carat : parseFloat(String(p.carat ?? ''))
    return {
      id: p.handle || String(p.id),
      name: p.title,
      type: pick(p.type, TYPES, 'Rings'),
      shape: pick(p.shape, SHAPES, 'Round'),
      metal: pick(p.metal, METALS, 'White Gold'),
      carat: Number.isFinite(caratNum) ? caratNum : 0,
      price: p.price,
      style: pick(p.style, STYLES, 'Solitaire'),
      tag: p.tag === 'New' || p.tag === 'Bestseller' ? p.tag : undefined,
      hover: p.hover || 'DETAIL VIEW',
      images: p.images && p.images.length ? p.images : undefined,
      video: p.video || undefined,
      blurb: p.blurb || undefined,
      variantId: p.variantId,
    }
  })
}

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
