import { METAL_GRADIENTS, formatPrice, photoFor } from '../data/products'
import { useStore } from '../store'
import { LockIcon } from './Icons'

export default function CartView() {
  const { dispatch, cartProducts, subtotal, tax, total } = useStore()

  return (
    <main className="container page">
      <button className="text-link" onClick={() => dispatch({ type: 'go', view: 'shop' })}>
        ← Continue shopping
      </button>
      <h1 className="page-title">Your bag</h1>

      {cartProducts.length === 0 ? (
        <div className="empty-panel">
          <p>Your bag is empty</p>
          <button className="btn-ink" onClick={() => dispatch({ type: 'go', view: 'shop' })}>
            Shop now
          </button>
        </div>
      ) : (
        <div className="cart-grid">
          <div className="cart-lines">
            {cartProducts.map(({ product: p, qty }) => (
              <div key={p.id} className="cart-line">
                <div className="line-media large" style={{ background: METAL_GRADIENTS[p.metal] }}>
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
                    <button className="line-remove" onClick={() => dispatch({ type: 'removeItem', id: p.id })}>
                      Remove
                    </button>
                  </div>
                </div>
                <span className="line-total">{formatPrice(p.price * qty)}</span>
              </div>
            ))}
          </div>
          <aside className="summary-card">
            <h2>Order summary</h2>
            <div className="foot-row">
              <span>Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="foot-row">
              <span>Tax (3%)</span>
              <span>{formatPrice(tax)}</span>
            </div>
            <div className="foot-row">
              <span>Shipping</span>
              <span>Complimentary</span>
            </div>
            <div className="foot-row grand">
              <span>TOTAL</span>
              <span>{formatPrice(total)}</span>
            </div>
            <button className="btn-ink block" onClick={() => dispatch({ type: 'go', view: 'checkout' })}>
              Proceed to checkout
            </button>
            <p className="secure-line">
              <LockIcon /> Secure encrypted checkout
            </p>
          </aside>
        </div>
      )}
    </main>
  )
}
