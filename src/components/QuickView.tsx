import { useEffect } from 'react'
import { METAL_GRADIENTS, PRODUCTS, inr, photoFor } from '../data/products'
import { useStore } from '../store'
import { CloseIcon, HeartIcon } from './Icons'

export default function QuickView() {
  const { state, dispatch } = useStore()
  const product = state.quickViewId ? PRODUCTS.find((p) => p.id === state.quickViewId) : null

  useEffect(() => {
    if (!product) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') dispatch({ type: 'closeQuick' })
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [product, dispatch])

  if (!product) return null
  const wished = state.wishlist.includes(product.id)

  const specs: [string, string][] = [
    ['Type', product.type],
    ['Diamond shape', product.shape],
    ['Metal', product.metal],
    ['Total carat', `${product.carat} ct`],
    ['Style', product.style],
    ['Certification', 'IGI / GIA'],
  ]

  return (
    <div className="overlay" onClick={() => dispatch({ type: 'closeQuick' })}>
      <div
        className="quickview rise"
        role="dialog"
        aria-modal="true"
        aria-label={product.name}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="icon-btn qv-close" aria-label="Close quick view" onClick={() => dispatch({ type: 'closeQuick' })}>
          <CloseIcon />
        </button>
        <div className="qv-media" style={{ background: METAL_GRADIENTS[product.metal] }}>
          <img
            src={photoFor(product)}
            alt={product.name}
            onError={(e) => {
              e.currentTarget.style.opacity = '0'
            }}
          />
          <span className="card-cap mono">
            {product.type.toUpperCase()} · {product.shape.toUpperCase()}
          </span>
        </div>
        <div className="qv-info">
          {product.tag && <span className={`card-tag static ${product.tag === 'New' ? 'tag-new' : 'tag-best'}`}>{product.tag}</span>}
          <h2>{product.name}</h2>
          <span className="qv-price">{inr(product.price)}</span>
          <dl className="qv-specs">
            {specs.map(([k, v]) => (
              <div key={k} className="qv-spec-row">
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
          <div className="qv-actions">
            <button className="btn-ink grow" onClick={() => dispatch({ type: 'addToCart', id: product.id })}>
              Add to bag
            </button>
            <button
              className={`btn-outline square ${wished ? 'wished' : ''}`}
              aria-label={wished ? 'Remove from wishlist' : 'Save to wishlist'}
              onClick={() => dispatch({ type: 'toggleWish', id: product.id })}
            >
              <HeartIcon size={17} filled={wished} />
            </button>
          </div>
          <p className="qv-footnote">
            <span className="lb-diamond dark tiny" aria-hidden /> Certified · complimentary insured
            shipping · lifetime care
          </p>
        </div>
      </div>
    </div>
  )
}
