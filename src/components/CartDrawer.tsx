import { METAL_GRADIENTS, inr, photoFor, PRODUCTS } from '../data/products'
import { useStore } from '../store'
import { CloseIcon, HeartIcon } from './Icons'

export function WishlistPanel() {
  const { state, dispatch } = useStore()
  if (!state.wishlistOpen) return null
  const items = state.wishlist
    .map((id) => PRODUCTS.find((p) => p.id === id))
    .filter((p): p is NonNullable<typeof p> => Boolean(p))

  return (
    <div className="overlay right" onClick={() => dispatch({ type: 'setWishlistPanel', open: false })}>
      <aside className="drawer slide-in" onClick={(e) => e.stopPropagation()} aria-label="Wishlist">
        <div className="drawer-head">
          <h2>Saved pieces ({items.length})</h2>
          <button className="icon-btn" aria-label="Close wishlist" onClick={() => dispatch({ type: 'setWishlistPanel', open: false })}>
            <CloseIcon />
          </button>
        </div>
        <div className="drawer-body">
          {items.length === 0 && (
            <div className="drawer-empty">
              <HeartIcon size={26} strokeWidth={1.1} />
              <p>Nothing saved yet</p>
              <span className="drawer-empty-sub">Tap the heart on any piece to keep it here.</span>
            </div>
          )}
          {items.map((p) => (
            <div key={p.id} className="line-item">
              <button
                className="line-media"
                style={{ background: METAL_GRADIENTS[p.metal] }}
                onClick={() => dispatch({ type: 'openQuick', id: p.id })}
                aria-label={`View ${p.name}`}
              >
                <img src={photoFor(p)} alt="" onError={(e) => { e.currentTarget.style.opacity = '0' }} />
              </button>
              <div className="line-info">
                <span className="line-name">{p.name}</span>
                <span className="line-spec">
                  {p.metal} · {p.carat} ct
                </span>
                <div className="line-row">
                  <span className="line-price">{inr(p.price)}</span>
                  <button className="btn-outline small" onClick={() => dispatch({ type: 'addToCart', id: p.id })}>
                    Add to bag
                  </button>
                </div>
              </div>
              <button className="line-remove" onClick={() => dispatch({ type: 'toggleWish', id: p.id })}>
                Remove
              </button>
            </div>
          ))}
        </div>
      </aside>
    </div>
  )
}

export default function CartDrawer() {
  const { state, dispatch, cartProducts, cartCount, subtotal, total } = useStore()
  if (!state.drawerOpen) return null

  return (
    <div className="overlay right" onClick={() => dispatch({ type: 'setDrawer', open: false })}>
      <aside className="drawer slide-in" onClick={(e) => e.stopPropagation()} aria-label="Shopping bag">
        <div className="drawer-head">
          <h2>Your bag ({cartCount})</h2>
          <button className="icon-btn" aria-label="Close bag" onClick={() => dispatch({ type: 'setDrawer', open: false })}>
            <CloseIcon />
          </button>
        </div>
        <div className="drawer-body">
          {cartProducts.length === 0 && (
            <div className="drawer-empty">
              <p>Your bag is empty</p>
              <button className="btn-outline" onClick={() => dispatch({ type: 'setDrawer', open: false })}>
                Keep shopping
              </button>
            </div>
          )}
          {cartProducts.map(({ product: p, qty }) => (
            <div key={p.id} className="line-item">
              <div className="line-media" style={{ background: METAL_GRADIENTS[p.metal] }}>
                <img src={photoFor(p)} alt="" onError={(e) => { e.currentTarget.style.opacity = '0' }} />
              </div>
              <div className="line-info">
                <span className="line-name">{p.name}</span>
                <span className="line-spec">
                  {p.shape} · {p.metal} · {p.carat} ct
                </span>
                <div className="line-row">
                  <span className="stepper">
                    <button aria-label="Decrease quantity" onClick={() => dispatch({ type: 'changeQty', id: p.id, delta: -1 })}>−</button>
                    <span>{qty}</span>
                    <button aria-label="Increase quantity" onClick={() => dispatch({ type: 'changeQty', id: p.id, delta: 1 })}>+</button>
                  </span>
                  <span className="line-price">{inr(p.price * qty)}</span>
                </div>
              </div>
              <button className="line-remove" onClick={() => dispatch({ type: 'removeItem', id: p.id })}>
                Remove
              </button>
            </div>
          ))}
        </div>
        {cartProducts.length > 0 && (
          <div className="drawer-foot">
            <div className="foot-row">
              <span>Subtotal</span>
              <span>{inr(subtotal)}</span>
            </div>
            <div className="foot-row total">
              <span>Total (incl. GST)</span>
              <span>{inr(total)}</span>
            </div>
            <button className="btn-ink block" onClick={() => dispatch({ type: 'go', view: 'checkout' })}>
              Checkout
            </button>
            <button className="btn-outline block" onClick={() => dispatch({ type: 'go', view: 'cart' })}>
              View full bag
            </button>
          </div>
        )}
      </aside>
    </div>
  )
}
