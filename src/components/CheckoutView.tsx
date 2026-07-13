import type { FormEvent } from 'react'
import { formatPrice } from '../data/products'
import { useStore } from '../store'
import { LockIcon } from './Icons'

export default function CheckoutView() {
  const { dispatch, cartProducts, subtotal, tax, total } = useStore()

  const submit = (e: FormEvent) => {
    e.preventDefault()
    dispatch({ type: 'placeOrder' })
  }

  if (cartProducts.length === 0) {
    return (
      <main className="container page">
        <h1 className="page-title">Checkout</h1>
        <div className="empty-panel">
          <p>Your bag is empty</p>
          <button className="btn-ink" onClick={() => dispatch({ type: 'go', view: 'shop' })}>
            Shop now
          </button>
        </div>
      </main>
    )
  }

  return (
    <main className="container page">
      <div className="checkout-head">
        <h1 className="page-title">Checkout</h1>
        <span className="secure-badge mono">
          <LockIcon /> 256-BIT SECURE
        </span>
      </div>
      <form className="checkout-grid" onSubmit={submit}>
        <div className="checkout-fields">
          <section>
            <h2 className="field-head">CONTACT</h2>
            <input className="field" type="email" required placeholder="Email" autoComplete="email" />
          </section>
          <section>
            <h2 className="field-head">SHIPPING ADDRESS</h2>
            <div className="field-row two">
              <input className="field" required placeholder="First name" autoComplete="given-name" />
              <input className="field" required placeholder="Last name" autoComplete="family-name" />
            </div>
            <input className="field" required placeholder="Address" autoComplete="street-address" />
            <div className="field-row three">
              <input className="field" required placeholder="City" autoComplete="address-level2" />
              <input className="field" required placeholder="State" autoComplete="address-level1" />
              <input className="field" required placeholder="PIN code" inputMode="numeric" pattern="[0-9]{6}" title="6-digit PIN code" autoComplete="postal-code" />
            </div>
            <input className="field" required type="tel" placeholder="Phone" inputMode="tel" autoComplete="tel" />
          </section>
          <section>
            <h2 className="field-head">
              PAYMENT
              <span className="mini-lock mono">
                <LockIcon size={11} /> ENCRYPTED
              </span>
            </h2>
            <input className="field" required placeholder="Card number" inputMode="numeric" autoComplete="cc-number" maxLength={19} />
            <div className="field-row two">
              <input className="field" required placeholder="MM / YY" autoComplete="cc-exp" maxLength={7} />
              <input className="field" required placeholder="CVV" inputMode="numeric" autoComplete="cc-csc" maxLength={4} />
            </div>
            <input className="field" required placeholder="Name on card" autoComplete="cc-name" />
            <p className="field-note">
              UPI & net banking also available at payment. This is a demonstration — no real payment
              is processed.
            </p>
          </section>
        </div>
        <aside className="summary-card sticky">
          <h2>Your order</h2>
          {cartProducts.map(({ product: p, qty }) => (
            <div key={p.id} className="foot-row mini">
              <span>
                {p.name} <span className="qty-x">× {qty}</span>
              </span>
              <span>{formatPrice(p.price * qty)}</span>
            </div>
          ))}
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
            <span>Free</span>
          </div>
          <div className="foot-row grand">
            <span>TOTAL</span>
            <span>{formatPrice(total)}</span>
          </div>
          <button className="btn-ink block" type="submit">
            Place order · {formatPrice(total)}
          </button>
          <p className="secure-line">
            <LockIcon /> Encrypted with SSL — your details never touch our servers
          </p>
        </aside>
      </form>
    </main>
  )
}
