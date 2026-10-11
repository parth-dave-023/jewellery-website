import { useState } from 'react'
import {
  canBuy,
  cardImageFor,
  hoverImageFor,
  mediaBackground,
  priceLabel,
  sized,
  specLine,
  type Product,
} from '../data/products'
import { useStore } from '../store'
import { HeartIcon } from './Icons'

/** Width requested for card photos — covers a ~360px card on a 2× screen. */
const CARD_PHOTO = 720

export default function ProductCard({ product }: { product: Product }) {
  const { state, dispatch } = useStore()
  const [hovered, setHovered] = useState(false)
  const wished = state.wishlist.includes(product.id)
  const base = cardImageFor(product)
  const alt = hoverImageFor(product)
  const spec = specLine(product)
  const caption = [product.type, product.shape].filter(Boolean).join(' · ').toUpperCase()
  const openQuick = () => dispatch({ type: 'openQuick', id: product.id })

  return (
    <article className="card">
      <div
        className={`card-media ${base ? 'has-photo' : ''}`}
        style={{ background: mediaBackground(product) }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={openQuick}
        role="button"
        tabIndex={0}
        aria-label={`Quick view ${product.name}`}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            openQuick()
          }
        }}
      >
        {base && (
          <img
            src={sized(base, CARD_PHOTO)}
            alt={product.name}
            loading="lazy"
            className={`${hovered ? 'zoomed' : ''} ${alt && hovered ? 'fade-out' : ''}`}
            onError={(e) => {
              e.currentTarget.style.opacity = '0'
            }}
          />
        )}
        {alt && (
          <img
            src={sized(alt, CARD_PHOTO)}
            alt=""
            aria-hidden
            loading="lazy"
            className={`card-hover-img ${hovered ? 'show zoomed' : ''}`}
          />
        )}
        {product.video && <span className="card-video-tag" aria-hidden>▶ VIDEO</span>}
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
        {!product.video && (
          <>
            {caption && <span className={`card-cap mono ${hovered ? 'hide' : ''}`}>{caption}</span>}
            {product.hover && <span className={`card-cap mono alt ${hovered ? '' : 'hide'}`}>{product.hover}</span>}
          </>
        )}
        <span className="card-sheen" aria-hidden data-on={hovered} />
        <span className={`card-quick ${hovered ? 'show' : ''}`}>Quick view</span>
      </div>
      <div className="card-info">
        <h3>{product.name}</h3>
        {spec && <p className="card-spec">{spec}</p>}
        <div className="card-foot">
          <span className={`card-price ${product.price > 0 ? '' : 'on-request'}`}>{priceLabel(product)}</span>
          {canBuy(product) ? (
            product.variants ? (
              <button className="btn-outline small" onClick={openQuick}>
                Select
              </button>
            ) : (
              <button className="btn-outline small" onClick={() => dispatch({ type: 'addToCart', id: product.id })}>
                Add
              </button>
            )
          ) : product.price > 0 ? (
            <button className="btn-outline small" disabled>
              Sold out
            </button>
          ) : (
            <button className="btn-outline small" onClick={openQuick}>
              View
            </button>
          )}
        </div>
      </div>
    </article>
  )
}
