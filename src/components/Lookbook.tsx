import { useState } from 'react'
import { LOOKBOOK_PAGES, type LookbookPage } from '../data/content'
import { METAL_DOTS } from '../data/products'
import { useStore } from '../store'
import { ArrowIcon } from './Icons'

function PageFace({ page }: { page: LookbookPage }) {
  const { shopWithFilters } = useStore()

  if (page.kind === 'cover') {
    return (
      <div className="lb-page lb-cover">
        <div className="lb-cover-frame">
          <span className="lb-diamond" aria-hidden />
          <span className="lb-cover-brand">{page.eyebrow}</span>
          <h3 className="lb-cover-title">{page.title}</h3>
          <p className="lb-cover-sub">{page.body}</p>
          <span className="lb-cover-hint">Tap to open</span>
        </div>
      </div>
    )
  }

  if (page.kind === 'back') {
    return (
      <div className="lb-page lb-back">
        <span className="lb-diamond dark" aria-hidden />
        <h3 className="lb-back-title">{page.title}</h3>
        <p className="lb-back-sub">{page.body}</p>
        <div className="lb-metal-row" aria-hidden>
          {Object.values(METAL_DOTS).map((c) => (
            <span key={c} className="lb-metal-dot" style={{ background: c }} />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="lb-page lb-spread">
      <div className="lb-photo">
        <img src={page.img} alt={page.title} loading="lazy" />
      </div>
      <div className="lb-copy">
        <span className="eyebrow small">{page.eyebrow}</span>
        <h3>{page.title}</h3>
        <p>{page.body}</p>
        {page.cta && (
          <button
            className="text-link"
            onClick={(e) => {
              e.stopPropagation()
              shopWithFilters(page.cta!.filters)
            }}
          >
            {page.cta.label} →
          </button>
        )}
      </div>
    </div>
  )
}

/** Paper back of a turning leaf. */
function LeafBack() {
  return (
    <div className="lb-page lb-paper">
      <span className="lb-paper-mark">MINIMALIST</span>
    </div>
  )
}

export default function Lookbook() {
  const [index, setIndex] = useState(0)
  const [turn, setTurn] = useState<{ dir: 'next' | 'prev'; from: number; to: number } | null>(null)

  const last = LOOKBOOK_PAGES.length - 1

  const go = (dir: 'next' | 'prev') => {
    if (turn) return
    const to = dir === 'next' ? index + 1 : index - 1
    if (to < 0 || to > last) return
    setTurn({ dir, from: index, to })
  }

  const commit = () => {
    if (!turn) return
    setIndex(turn.to)
    setTurn(null)
  }

  // Base page shown under a turning leaf: destination when flipping forward,
  // origin when flipping back (the leaf lands on top of it).
  const basePage = turn ? (turn.dir === 'next' ? turn.to : turn.from) : index
  const leafPage = turn ? (turn.dir === 'next' ? turn.from : turn.to) : null

  return (
    <div className="lookbook">
      <div
        className="book-scene"
        role="group"
        aria-roledescription="lookbook"
        aria-label={`Lookbook, page ${index + 1} of ${LOOKBOOK_PAGES.length}`}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'ArrowRight') go('next')
          if (e.key === 'ArrowLeft') go('prev')
        }}
      >
        <div className="book">
          <span className="book-spine" aria-hidden />
          <span className="book-edges" aria-hidden />
          <div className="book-face">
            <PageFace page={LOOKBOOK_PAGES[basePage]} />
          </div>
          {turn && leafPage !== null && (
            <div
              className={`leaf ${turn.dir === 'next' ? 'leaf-fwd' : 'leaf-back'}`}
              onAnimationEnd={commit}
            >
              <div className="leaf-front">
                <PageFace page={LOOKBOOK_PAGES[leafPage]} />
              </div>
              <div className="leaf-rear">
                <LeafBack />
              </div>
            </div>
          )}
          {/* click zones */}
          <button
            className="page-zone left"
            aria-label="Previous page"
            disabled={index === 0 && !turn}
            onClick={() => go('prev')}
          />
          <button
            className="page-zone right"
            aria-label="Next page"
            disabled={index === last && !turn}
            onClick={() => go('next')}
          />
        </div>
      </div>
      <div className="lb-controls">
        <span className="lb-count mono">
          {String((turn ? turn.to : index) + 1).padStart(2, '0')} / {String(LOOKBOOK_PAGES.length).padStart(2, '0')}
        </span>
        <span className="lb-note">A printed copy ships with every order</span>
        <span className="lb-arrows">
          <button className="icon-btn" aria-label="Previous page" disabled={index === 0} onClick={() => go('prev')}>
            <ArrowIcon dir="left" />
          </button>
          <button className="icon-btn" aria-label="Next page" disabled={index === last} onClick={() => go('next')}>
            <ArrowIcon />
          </button>
        </span>
      </div>
    </div>
  )
}
