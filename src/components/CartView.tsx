import { cardImageFor, formatPrice, mediaBackground, sized, specLine } from '../data/products'
import { useStore } from '../store'
import { LockIcon } from './Icons'

export default function CartView() {
  const { dispatch, cartProducts, subtotal, tax, total, isShopify, checkout } = useStore()

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
            {cartProducts.map(({ key, product: p, variant, qty, price, max }) => {
              const photo = cardImageFor(p)
              return (
                <div key={key} className="cart-line">
                  <div className="line-media large" style={{ background: mediaBackground(p) }}>
                    {photo && <img src={sized(photo, 320)} alt="" onError={(e) => { e.currentTarget.style.opacity = '0' }} />}
                  </div>
                  <div className="line-info">
                    <span className="line-name">{p.name}</span>
                    <span className="line-spec">{[variant?.label, specLine(p)].filter(Boolean).join(' · ')}</span>
                    <div className="line-row">
                      <span className="stepper">
                        <button aria-label="Decrease quantity" onClick={() => dispatch({ type: 'changeQty', key, delta: -1 })}>−</button>
                        <span>{qty}</span>
                        <button
                          aria-label="Increase quantity"
                          disabled={max !== undefined && qty >= max}
                          onClick={() => dispatch({ type: 'changeQty', key, delta: 1 })}
                        >
                          +
                        </button>
                      </span>
                      <button className="line-remove" onClick={() => dispatch({ type: 'removeItem', key })}>
                        Remove
                      </button>
                    </div>
                  </div>
                  <span className="line-total">{formatPrice(price * qty)}</span>
                </div>
              )
            })}
          </div>
          <aside className="summary-card">
            <h2>Order summary</h2>
            {isShopify ? (
              <>
                <div className="foot-row grand">
                  <span>SUBTOTAL</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <p className="secure-line">Taxes &amp; shipping calculated at checkout</p>
              </>
            ) : (
              <>
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
              </>
            )}
            <button className="btn-ink block" onClick={checkout}>
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
