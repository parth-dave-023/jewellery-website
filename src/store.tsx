import { createContext, useContext, useMemo, useReducer, type ReactNode } from 'react'
import {
  EMPTY_FILTERS,
  TAX_RATE,
  PRODUCTS,
  passes,
  sortProducts,
  type Filters,
  type Product,
  type SortKey,
} from './data/products'

export type View = 'shop' | 'cart' | 'checkout' | 'confirmation'
export type BrowseMode = 'rail' | 'discover'

export interface CartLine {
  id: string
  qty: number
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
}

type FacetKind = 'types' | 'shapes' | 'metals' | 'carats' | 'styles'

type Action =
  | { type: 'toggleFilter'; kind: FacetKind; value: string }
  | { type: 'setFilters'; filters: Partial<Filters> }
  | { type: 'setPrice'; value: number }
  | { type: 'clearFilters' }
  | { type: 'setSort'; sort: SortKey }
  | { type: 'setBrowse'; mode: BrowseMode }
  | { type: 'addToCart'; id: string }
  | { type: 'changeQty'; id: string; delta: number }
  | { type: 'removeItem'; id: string }
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
      const exists = s.cart.some((c) => c.id === a.id)
      const cart = exists
        ? s.cart.map((c) => (c.id === a.id ? { ...c, qty: c.qty + 1 } : c))
        : [...s.cart, { id: a.id, qty: 1 }]
      return { ...s, cart, drawerOpen: true, quickViewId: null, wishlistOpen: false, searchOpen: false }
    }
    case 'changeQty': {
      const cart = s.cart
        .map((c) => (c.id === a.id ? { ...c, qty: c.qty + a.delta } : c))
        .filter((c) => c.qty > 0)
      return { ...s, cart }
    }
    case 'removeItem':
      return { ...s, cart: s.cart.filter((c) => c.id !== a.id) }
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
  cartProducts: { product: Product; qty: number }[]
  activeChipCount: number
  /* helpers */
  scrollToShop: () => void
  shopWithFilters: (filters: Partial<Filters>) => void
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
      const product = PRODUCTS.find((p) => p.id === c.id)
      return product ? [{ product, qty: c.qty }] : []
    })
    const subtotal = cartProducts.reduce((sum, { product, qty }) => sum + product.price * qty, 0)
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
      scrollToShop: scrollToShopEl,
      shopWithFilters,
    }
  }, [state])

  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
}

export function useStore(): Store {
  const ctx = useContext(StoreContext)
  if (!ctx) throw new Error('useStore must be used within StoreProvider')
  return ctx
}
