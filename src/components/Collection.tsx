import { useState } from 'react'
import { CARAT_BUCKETS, PRICE_CAP, inr, type SortKey } from '../data/products'
import { useStore } from '../store'
import FilterRail from './FilterRail'
import DiscoverPanel from './DiscoverPanel'
import ProductCard from './ProductCard'
import { CloseIcon } from './Icons'

function ActiveChips() {
  const { state, dispatch, activeChipCount } = useStore()
  const f = state.filters
  if (activeChipCount === 0) return null

  const caratLabel = (v: string) => CARAT_BUCKETS.find((b) => b.value === v)?.label ?? v
  const chips: { label: string; onRemove: () => void }[] = [
    ...f.types.map((v) => ({ label: v, onRemove: () => dispatch({ type: 'toggleFilter', kind: 'types' as const, value: v }) })),
    ...f.shapes.map((v) => ({ label: v, onRemove: () => dispatch({ type: 'toggleFilter', kind: 'shapes' as const, value: v }) })),
    ...f.metals.map((v) => ({ label: v, onRemove: () => dispatch({ type: 'toggleFilter', kind: 'metals' as const, value: v }) })),
    ...f.carats.map((v) => ({ label: caratLabel(v), onRemove: () => dispatch({ type: 'toggleFilter', kind: 'carats' as const, value: v }) })),
    ...f.styles.map((v) => ({ label: v, onRemove: () => dispatch({ type: 'toggleFilter', kind: 'styles' as const, value: v }) })),
  ]
  if (f.priceMax < PRICE_CAP) {
    chips.push({ label: `Up to ${inr(f.priceMax)}`, onRemove: () => dispatch({ type: 'setPrice', value: PRICE_CAP }) })
  }

  return (
    <div className="active-chips">
      {chips.map((c) => (
        <button key={c.label} className="chip active removable" onClick={c.onRemove}>
          {c.label} <CloseIcon size={10} strokeWidth={2} />
        </button>
      ))}
      <button className="text-link" onClick={() => dispatch({ type: 'clearFilters' })}>
        Clear all
      </button>
    </div>
  )
}

export default function Collection() {
  const { state, dispatch, results, activeChipCount } = useStore()
  const [railOpen, setRailOpen] = useState(false)
  const isRail = state.browseMode === 'rail'

  const grid = (
    <>
      <div className="toolbar">
        <span className="result-count">
          {results.length} {results.length === 1 ? 'piece' : 'pieces'}
        </span>
        <label className="sort">
          <span>SORT</span>
          <select value={state.sort} onChange={(e) => dispatch({ type: 'setSort', sort: e.target.value as SortKey })}>
            <option value="featured">Featured</option>
            <option value="price-asc">Price: Low → High</option>
            <option value="price-desc">Price: High → Low</option>
            <option value="carat-desc">Carat: High → Low</option>
          </select>
        </label>
      </div>
      {results.length > 0 ? (
        <div className="product-grid">
          {results.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      ) : (
        <div className="empty-panel">
          <p>No pieces match those filters</p>
          <button className="btn-outline" onClick={() => dispatch({ type: 'clearFilters' })}>
            Clear filters
          </button>
        </div>
      )}
    </>
  )

  return (
    <section id="shop" className="collection container">
      <div className="collection-head">
        <div>
          <span className="eyebrow">THE COLLECTION</span>
          <h2>Find your piece</h2>
        </div>
        <div className="seg" role="tablist" aria-label="Browse mode">
          <button
            role="tab"
            aria-selected={isRail}
            className={isRail ? 'on' : ''}
            onClick={() => dispatch({ type: 'setBrowse', mode: 'rail' })}
          >
            REFINE
          </button>
          <button
            role="tab"
            aria-selected={!isRail}
            className={!isRail ? 'on' : ''}
            onClick={() => dispatch({ type: 'setBrowse', mode: 'discover' })}
          >
            DISCOVER
          </button>
        </div>
      </div>
      <ActiveChips />
      {isRail ? (
        <div className="shop-grid">
          <div>
            <button className="filters-toggle btn-outline" onClick={() => setRailOpen((o) => !o)}>
              {railOpen ? 'Hide filters' : `Filters${activeChipCount ? ` (${activeChipCount})` : ''}`}
            </button>
            <FilterRail open={railOpen} />
          </div>
          <div>{grid}</div>
        </div>
      ) : (
        <div>
          <DiscoverPanel />
          {grid}
        </div>
      )}
    </section>
  )
}
