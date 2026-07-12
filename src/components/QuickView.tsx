import { useEffect, useState } from 'react'
import { METAL_GRADIENTS, PRODUCTS, inr, photoFor, hasRealMedia } from '../data/products'
import { useStore } from '../store'
import { CloseIcon, HeartIcon } from './Icons'

export default function QuickView() {
  const { state, dispatch } = useStore()
  const product = state.quickViewId ? PRODUCTS.find((p) => p.id === state.quickViewId) : null

  // Media gallery: images followed by an optional video slide ('video').
  const media: string[] = product?.images ? [...product.images, ...(product.video ? ['video'] : [])] : []
  const [active, setActive] = useState(0)

  useEffect(() => {
    setActive(0)
  }, [state.quickViewId])

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
  const real = hasRealMedia(product)
  const current = media[active]
  const isVideo = current === 'video'

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
        className={`quickview rise ${real ? 'has-gallery' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label={product.name}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="icon-btn qv-close" aria-label="Close quick view" onClick={() => dispatch({ type: 'closeQuick' })}>
          <CloseIcon />
        </button>

        {real ? (
          <div className="qv-gallery">
            <div className="qv-stage">
              {isVideo ? (
                <video
                  key="video"
                  src={product.video}
                  poster={product.images![0]}
                  controls
                  autoPlay
                  muted
                  loop
                  playsInline
                />
              ) : (
                <img src={current} alt={product.name} />
              )}
            </div>
            <div className="qv-thumbs" role="tablist" aria-label="Product media">
              {media.map((m, i) => {
                const vid = m === 'video'
                return (
                  <button
                    key={m + i}
                    role="tab"
                    aria-selected={active === i}
                    className={`qv-thumb ${active === i ? 'on' : ''} ${vid ? 'is-video' : ''}`}
                    onClick={() => setActive(i)}
                    aria-label={vid ? 'Play product video' : `View angle ${i + 1}`}
                  >
                    <img src={vid ? product.images![0] : m} alt="" />
                    {vid && <span className="qv-thumb-play" aria-hidden>▶</span>}
                  </button>
                )
              })}
            </div>
          </div>
        ) : (
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
        )}

        <div className="qv-info">
          {product.tag && <span className={`card-tag static ${product.tag === 'New' ? 'tag-new' : 'tag-best'}`}>{product.tag}</span>}
          <h2>{product.name}</h2>
          <span className="qv-price">{inr(product.price)}</span>
          {product.blurb && <p className="qv-blurb">{product.blurb}</p>}
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
