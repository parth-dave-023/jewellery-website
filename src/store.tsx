import { createContext, useContext, useMemo, useReducer, type ReactNode } from 'react'
import {
  EMPTY_FILTERS,
  TAX_RATE,
  PRODUCTS,
  TYPES,
  canBuy,
  passes,
  sortProducts,
  type Filters,
  type Product,
  type SortKey,
  type Variant,
} from './data/products'
import { isShopify, checkoutWithShopify } from './shopify'

export type View = 'shop' | 'cart' | 'checkout' | 'confirmation'
export type BrowseMode = 'rail' | 'discover'

export interface CartLine {
  id: string
  /** Chosen option, for pieces that come in more than one (e.g. a hoop size). */
  variantId?: number
  qty: number
}

/** Identifies a bag line: the same piece in two sizes is two lines. */
export const lineKey = (l: { id: string; variantId?: number }): string =>
  l.variantId ? `${l.id}#${l.variantId}` : l.id

const findLine = (l: { id: string; variantId?: number }) => {
  const product = PRODUCTS.find((p) => p.id === l.id)
  const variant = product?.variants?.find((v) => v.id === l.variantId)
  return { product, variant }
}

interface State {
  view: View
  browseMode: BrowseMode
  filters: Filters
  sort: SortKey
  cart: CartLine[]
  wishlist: string[]
  drawerOpen: boolean
  wishlistOpen: boolean
  searchOpen: boolean
  quickViewId: string | null
  orderNo: string | null
}

/**
 * Shopify gives every product and collection its own URL (the admin's "View"
 * link, shared links, search engines). The storefront is a single page, so when
 * it is opened on one of those URLs it starts on that piece or that category.
 */
const startFromUrl = (): Partial<State> => {
  if (typeof window === 'undefined') return {}
  const path = window.location.pathname
  const product = path.match(/\/products\/([^/?#]+)/)?.[1]
  if (product && PRODUCTS.some((p) => p.id === product)) return { quickViewId: product }
  const collection = path.match(/\/collections\/([^/?#]+)/)?.[1]?.toLowerCase()
  const type = TYPES.find((t) => t.toLowerCase() === collection)
  return type ? { filters: { ...EMPTY_FILTERS, types: [type] } } : {}
}

const initialState: State = {
  view: 'shop',
  browseMode: 'rail',
  filters: EMPTY_FILTERS,
  sort: 'featured',
  cart: [],
  wishlist: [],
  drawerOpen: false,
  wishlistOpen: false,
  searchOpen: false,
  quickViewId: null,
  orderNo: null,
  ...startFromUrl(),
}

/** True when the page was opened on a category URL, i.e. it starts pre-filtered. */
export const startsFiltered = initialState.filters !== EMPTY_FILTERS

type FacetKind = 'types' | 'shapes' | 'metals' | 'carats' | 'styles'

type Action =
  | { type: 'toggleFilter'; kind: FacetKind; value: string }
  | { type: 'setFilters'; filters: Partial<Filters> }
  | { type: 'setPrice'; value: number }
  | { type: 'clearFilters' }
  | { type: 'setSort'; sort: SortKey }
  | { type: 'setBrowse'; mode: BrowseMode }
  | { type: 'addToCart'; id: string; variantId?: number }
  | { type: 'changeQty'; key: string; delta: number }
  | { type: 'removeItem'; key: string }
  | { type: 'toggleWish'; id: string }
  | { type: 'setDrawer'; open: boolean }
  | { type: 'setWishlistPanel'; open: boolean }
  | { type: 'setSearch'; open: boolean }
  | { type: 'openQuick'; id: string }
  | { type: 'closeQuick' }
  | { type: 'go'; view: View }
  | { type: 'placeOrder' }

const reducer = (s: State, a: Action): State => {
  switch (a.type) {
    case 'toggleFilter': {
      const cur = s.filters[a.kind] as string[]
      const next = cur.includes(a.value) ? cur.filter((v) => v !== a.value) : [...cur, a.value]
      return { ...s, filters: { ...s.filters, [a.kind]: next } }
    }
    case 'setFilters':
      return { ...s, view: 'shop', filters: { ...EMPTY_FILTERS, ...a.filters } }
    case 'setPrice':
      return { ...s, filters: { ...s.filters, priceMax: a.value } }
    case 'clearFilters':
      return { ...s, filters: EMPTY_FILTERS }
    case 'setSort':
      return { ...s, sort: a.sort }
    case 'setBrowse':
      return { ...s, browseMode: a.mode }
    case 'addToCart': {
      // Only priced, in-stock pieces go in the bag — and a piece with options needs one chosen.
      const { product, variant } = findLine(a)
      if (!product || (product.variants && !variant) || !canBuy(product, variant)) return s
      const key = lineKey(a)
      const max = (variant ?? product).max ?? Infinity
      const exists = s.cart.some((c) => lineKey(c) === key)
      const cart = exists
        ? s.cart.map((c) => (lineKey(c) === key ? { ...c, qty: Math.min(c.qty + 1, max) } : c))
        : [...s.cart, { id: a.id, variantId: variant?.id, qty: 1 }]
      return { ...s, cart, drawerOpen: true, quickViewId: null, wishlistOpen: false, searchOpen: false }
    }
    case 'changeQty': {
      const cart = s.cart
        .map((c) => {
          if (lineKey(c) !== a.key) return c
          const { product, variant } = findLine(c)
          const max = (variant ?? product)?.max ?? Infinity
          return { ...c, qty: Math.min(c.qty + a.delta, max) }
        })
        .filter((c) => c.qty > 0)
      return { ...s, cart }
    }
    case 'removeItem':
      return { ...s, cart: s.cart.filter((c) => lineKey(c) !== a.key) }
    case 'toggleWish':
      return {
        ...s,
        wishlist: s.wishlist.includes(a.id)
          ? s.wishlist.filter((w) => w !== a.id)
          : [...s.wishlist, a.id],
      }
    case 'setDrawer':
      return { ...s, drawerOpen: a.open, wishlistOpen: false }
    case 'setWishlistPanel':
      return { ...s, wishlistOpen: a.open, drawerOpen: false }
    case 'setSearch':
      return { ...s, searchOpen: a.open }
    case 'openQuick':
      return { ...s, quickViewId: a.id, drawerOpen: false, wishlistOpen: false, searchOpen: false }
    case 'closeQuick':
      return { ...s, quickViewId: null }
    case 'go':
      return { ...s, view: a.view, drawerOpen: false, wishlistOpen: false, quickViewId: null, searchOpen: false }
    case 'placeOrder': {
      const orderNo = 'MJ-' + Math.floor(100000 + Math.random() * 900000)
      return { ...s, view: 'confirmation', orderNo, cart: [], drawerOpen: false }
    }
  }
}

export interface Store {
  state: State
  dispatch: (a: Action) => void
  /* derived */
  results: Product[]
  cartCount: number
  subtotal: number
  tax: number
  total: number
  cartProducts: {
    key: string
    product: Product
    /** The chosen option, when the piece has options. */
    variant?: Variant
    qty: number
    /** Unit price of this line. */
    price: number
    /** Most that can be ordered, when Shopify tracks stock for it. */
    max?: number
  }[]
  activeChipCount: number
  /** True when running inside the Shopify theme (real catalogue + checkout). */
  isShopify: boolean
  /* helpers */
  scrollToShop: () => void
  shopWithFilters: (filters: Partial<Filters>) => void
  /** Proceed to checkout: Shopify's hosted checkout when live, else the demo flow. */
  checkout: () => void
}

const StoreContext = createContext<Store | null>(null)

export const scrollToShopEl = () => {
  document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  const store = useMemo<Store>(() => {
    const filtered = PRODUCTS.filter((p) => passes(p, state.filters))
    const results = sortProducts(filtered, state.sort)
    const cartProducts = state.cart.flatMap((c) => {
      const { product, variant } = findLine(c)
      if (!product) return []
      const price = variant?.price ?? product.price
      return [{ key: lineKey(c), product, variant, qty: c.qty, price, max: (variant ?? product).max }]
    })
    const subtotal = cartProducts.reduce((sum, { price, qty }) => sum + price * qty, 0)
    const tax = Math.round(subtotal * TAX_RATE)
    const f = state.filters
    const activeChipCount =
      f.types.length + f.shapes.length + f.metals.length + f.carats.length + f.styles.length +
      (f.priceMax < EMPTY_FILTERS.priceMax ? 1 : 0)

    const shopWithFilters = (filters: Partial<Filters>) => {
      dispatch({ type: 'setFilters', filters })
      // let the shop view mount before scrolling
      setTimeout(scrollToShopEl, 60)
    }

    const checkout = () => {
      if (isShopify) {
        void checkoutWithShopify(
          cartProducts.map(({ product, variant, qty }) => ({ variantId: variant?.id ?? product.variantId, qty })),
        )
      } else {
        dispatch({ type: 'go', view: 'checkout' })
      }
    }

    return {
      state,
      dispatch,
      results,
      cartCount: state.cart.reduce((sum, c) => sum + c.qty, 0),
      subtotal,
      tax,
      total: subtotal + tax,
      cartProducts,
      activeChipCount,
      isShopify,
      scrollToShop: scrollToShopEl,
      shopWithFilters,
      checkout,
    }
  }, [state])

  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
}

export function useStore(): Store {
  const ctx = useContext(StoreContext)
  if (!ctx) throw new Error('useStore must be used within StoreProvider')
  return ctx
}
