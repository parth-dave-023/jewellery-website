import { useEffect, useState } from 'react'
import { PRODUCTS, canBuy, formatPrice, mediaBackground, priceLabel, sized } from '../data/products'
import { useStore } from '../store'
import { CloseIcon, HeartIcon } from './Icons'

export default function QuickView() {
  const { state, dispatch } = useStore()
  const product = state.quickViewId ? PRODUCTS.find((p) => p.id === state.quickViewId) : null

  // Media gallery: images followed by an optional video slide ('video').
  const media: string[] = product ? [...product.images, ...(product.video ? ['video'] : [])] : []
  const [active, setActive] = useState(0)
  const [variantId, setVariantId] = useState<number | null>(null)

  useEffect(() => {
    setActive(0)
    setVariantId(null)
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
  const current = media[active]
  const isVideo = current === 'video'
  const poster = product.video?.poster ?? product.images[0]

  // Options (e.g. hoop sizes) become a picker once the piece can be bought;
  // until it is priced they are simply listed with the other details.
  const priced = product.price > 0
  const variant = product.variants?.find((v) => v.id === variantId)
  const needsChoice = !!product.variants && !variant
  const optionName = product.optionName ?? 'Option'

  const specs = (
    [
      ['Type', product.type],
      ['Stone shape', product.shape],
      ['Metal', product.metal],
      ['Total carat', product.carat !== undefined ? `${product.carat} ct` : undefined],
      ['Style', product.style],
      [optionName, !priced ? product.variants?.map((v) => v.label).join(' · ') : undefined],
    ] as [string, string | undefined][]
  ).filter((row): row is [string, string] => !!row[1])

  return (
    <div className="overlay" onClick={() => dispatch({ type: 'closeQuick' })}>
      <div
        className={`quickview rise ${media.length ? 'has-gallery' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label={product.name}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="icon-btn qv-close" aria-label="Close quick view" onClick={() => dispatch({ type: 'closeQuick' })}>
          <CloseIcon />
        </button>

        {media.length ? (
          <div className="qv-gallery">
            <div className="qv-stage">
              {isVideo && product.video ? (
                <video key="video" poster={poster && sized(poster, 1200)} controls autoPlay muted loop playsInline>
                  {product.video.sources.map((s) => (
                    <source key={s.src} src={s.src} type={s.type} />
                  ))}
                </video>
              ) : (
                <img key={current} src={sized(current, 1200)} alt={product.name} />
              )}
            </div>
            {media.length > 1 && (
              <div className="qv-thumbs" role="tablist" aria-label="Product media">
                {media.map((m, i) => {
                  const vid = m === 'video'
                  const thumb = vid ? poster : m
                  return (
                    <button
                      key={m + i}
                      role="tab"
                      aria-selected={active === i}
                      className={`qv-thumb ${active === i ? 'on' : ''} ${vid ? 'is-video' : ''}`}
                      onClick={() => setActive(i)}
                      aria-label={vid ? 'Play product video' : `View angle ${i + 1}`}
                    >
                      {thumb && <img src={sized(thumb, 200)} alt="" />}
                      {vid && <span className="qv-thumb-play" aria-hidden>▶</span>}
                    </button>
                  )
                })}
              </div>
            )}
          </div>
        ) : (
          <div className="qv-media" style={{ background: mediaBackground(product) }} />
        )}

        <div className="qv-info">
          {product.tag && <span className={`card-tag static ${product.tag === 'New' ? 'tag-new' : 'tag-best'}`}>{product.tag}</span>}
          <h2>{product.name}</h2>
          <span className="qv-price">{variant && variant.price > 0 ? formatPrice(variant.price) : priceLabel(product)}</span>
          {product.blurb && <p className="qv-blurb">{product.blurb}</p>}
          {priced && product.variants && (
            <div className="qv-option">
              <span className="qv-option-label">{optionName}</span>
              <div className="chip-wrap" role="radiogroup" aria-label={optionName}>
                {product.variants.map((v) => (
                  <button
                    key={v.id}
                    role="radio"
                    aria-checked={v.id === variantId}
                    className={`chip ${v.id === variantId ? 'active' : ''}`}
                    disabled={!canBuy(product, v)}
                    onClick={() => setVariantId(v.id)}
                  >
                    {v.label}
                  </button>
                ))}
              </div>
            </div>
          )}
          {specs.length > 0 && (
            <dl className="qv-specs">
              {specs.map(([k, v]) => (
                <div key={k} className="qv-spec-row">
                  <dt>{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
          )}
          <div className="qv-actions">
            {priced ? (
              <>
                {!product.available ? (
                  <button className="btn-ink grow" disabled>
                    Sold out
                  </button>
                ) : needsChoice ? (
                  <button className="btn-ink grow" disabled>
                    Select {optionName.toLowerCase()}
                  </button>
                ) : (
                  <button
                    className="btn-ink grow"
                    onClick={() => dispatch({ type: 'addToCart', id: product.id, variantId: variant?.id })}
                  >
                    Add to bag
                  </button>
                )}
                <button
                  className={`btn-outline square ${wished ? 'wished' : ''}`}
                  aria-label={wished ? 'Remove from wishlist' : 'Save to wishlist'}
                  onClick={() => dispatch({ type: 'toggleWish', id: product.id })}
                >
                  <HeartIcon size={17} filled={wished} />
                </button>
              </>
            ) : (
              <button
                className={`btn-outline grow ${wished ? 'wished' : ''}`}
                aria-pressed={wished}
                onClick={() => dispatch({ type: 'toggleWish', id: product.id })}
              >
                <HeartIcon size={15} filled={wished} />
                {wished ? 'Saved to wishlist' : 'Save to wishlist'}
              </button>
            )}
          </div>
          <p className="qv-footnote">
            <span className="lb-diamond dark tiny" aria-hidden /> Complimentary insured shipping · lifetime care
          </p>
        </div>
      </div>
    </div>
  )
}
