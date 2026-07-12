import { useEffect, useRef, useState } from 'react'
import { useStore } from '../store'
import { PRODUCTS, inr } from '../data/products'
import { SearchIcon, AccountIcon, HeartIcon, BagIcon, CloseIcon } from './Icons'

const ANNOUNCEMENT = 'Complimentary insured shipping across India · Lifetime warranty & servicing'

function SearchOverlay() {
  const { state, dispatch } = useStore()
  const [q, setQ] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (state.searchOpen) {
      setQ('')
      inputRef.current?.focus()
    }
  }, [state.searchOpen])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') dispatch({ type: 'setSearch', open: false })
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [dispatch])

  if (!state.searchOpen) return null

  const query = q.trim().toLowerCase()
  const hits = query
    ? PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.type.toLowerCase().includes(query) ||
          p.shape.toLowerCase().includes(query) ||
          p.metal.toLowerCase().includes(query) ||
          p.style.toLowerCase().includes(query),
      ).slice(0, 7)
    : []

  return (
    <div className="search-overlay" onClick={() => dispatch({ type: 'setSearch', open: false })}>
      <div className="search-panel rise" onClick={(e) => e.stopPropagation()}>
        <div className="search-row">
          <SearchIcon size={17} />
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search rings, pear, rose gold, solitaire…"
            aria-label="Search products"
          />
          <button className="icon-btn" aria-label="Close search" onClick={() => dispatch({ type: 'setSearch', open: false })}>
            <CloseIcon size={16} />
          </button>
        </div>
        {query && (
          <ul className="search-results">
            {hits.map((p) => (
              <li key={p.id}>
                <button onClick={() => dispatch({ type: 'openQuick', id: p.id })}>
                  <span className="search-name">{p.name}</span>
                  <span className="search-spec">
                    {p.metal} · {p.carat} ct
                  </span>
                  <span className="search-price">{inr(p.price)}</span>
                </button>
              </li>
            ))}
            {hits.length === 0 && <li className="search-empty">No pieces found for “{q.trim()}”</li>}
          </ul>
        )}
      </div>
    </div>
  )
}

export default function Header() {
  const { state, dispatch, cartCount } = useStore()

  return (
    <>
      <div className="announce">{ANNOUNCEMENT}</div>
      <header className="header">
        <div className="header-inner">
          <div className="header-left" />
          <button className="wordmark" onClick={() => dispatch({ type: 'go', view: 'shop' })} aria-label="Minimalist Jewellery — home">
            <span className="wm-main">MINIMALIST</span>
            <span className="wm-sub">Jewellery</span>
          </button>
          <div className="header-icons">
            <button className="icon-btn" aria-label="Search" onClick={() => dispatch({ type: 'setSearch', open: true })}>
              <SearchIcon />
            </button>
            <button className="icon-btn" aria-label="Account (demo)" title="Accounts arrive with the full launch">
              <AccountIcon />
            </button>
            <button
              className="icon-btn"
              aria-label={`Wishlist, ${state.wishlist.length} saved`}
              onClick={() => dispatch({ type: 'setWishlistPanel', open: !state.wishlistOpen })}
            >
              <HeartIcon />
              {state.wishlist.length > 0 && <span className="badge">{state.wishlist.length}</span>}
            </button>
            <button
              className="icon-btn"
              aria-label={`Bag, ${cartCount} items`}
              onClick={() => dispatch({ type: 'setDrawer', open: true })}
            >
              <BagIcon />
              {cartCount > 0 && <span className="badge">{cartCount}</span>}
            </button>
          </div>
        </div>
      </header>
      <SearchOverlay />
    </>
  )
}
