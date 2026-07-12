import { useState } from 'react'
import { METAL_GRADIENTS, inr, cardImageFor, hoverImageFor, hasRealMedia, type Product } from '../data/products'
import { useStore } from '../store'
import { HeartIcon } from './Icons'

export default function ProductCard({ product }: { product: Product }) {
  const { state, dispatch } = useStore()
  const [hovered, setHovered] = useState(false)
  const wished = state.wishlist.includes(product.id)
  const real = hasRealMedia(product)
  const base = cardImageFor(product)
  const alt = hoverImageFor(product)

  return (
    <article className="card">
      <div
        className="card-media"
        style={{ background: METAL_GRADIENTS[product.metal] }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => dispatch({ type: 'openQuick', id: product.id })}
        role="button"
        tabIndex={0}
        aria-label={`Quick view ${product.name}`}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            dispatch({ type: 'openQuick', id: product.id })
          }
        }}
      >
        <img
          src={base}
          alt={product.name}
          loading="lazy"
          className={`${hovered ? 'zoomed' : ''} ${real && hovered ? 'fade-out' : ''}`}
          onError={(e) => {
            e.currentTarget.style.opacity = '0'
          }}
        />
        {real && alt !== base && (
          <img
            src={alt}
            alt=""
            aria-hidden
            loading="lazy"
            className={`card-hover-img ${hovered ? 'show zoomed' : ''}`}
          />
        )}
        {real && product.video && <span className="card-video-tag" aria-hidden>▶ VIDEO</span>}
        {product.tag && (
          <span className={`card-tag ${product.tag === 'New' ? 'tag-new' : 'tag-best'}`}>{product.tag}</span>
        )}
        <button
          className={`card-heart ${wished ? 'wished' : ''}`}
          aria-label={wished ? `Remove ${product.name} from wishlist` : `Save ${product.name} to wishlist`}
          onClick={(e) => {
            e.stopPropagation()
            dispatch({ type: 'toggleWish', id: product.id })
          }}
        >
          <HeartIcon size={15} filled={wished} />
        </button>
        <span className={`card-cap mono ${hovered ? 'hide' : ''}`}>
          {product.type.toUpperCase()} · {product.shape.toUpperCase()}
        </span>
        <span className={`card-cap mono alt ${hovered ? '' : 'hide'}`}>{product.hover}</span>
        <span className="card-sheen" aria-hidden data-on={hovered} />
        <span className={`card-quick ${hovered ? 'show' : ''}`}>Quick view</span>
      </div>
      <div className="card-info">
        <h3>{product.name}</h3>
        <p className="card-spec">
          {product.metal} · {product.carat} ct
        </p>
        <div className="card-foot">
          <span className="card-price">{inr(product.price)}</span>
          <button className="btn-outline small" onClick={() => dispatch({ type: 'addToCart', id: product.id })}>
            Add
          </button>
        </div>
      </div>
    </article>
  )
}
