import { SHAPES, countFor, EMPTY_FILTERS } from '../data/products'
import { useStore } from '../store'
import DiamondIcon from './DiamondIcon'

export default function ShapeStrip() {
  const { shopWithFilters, dispatch, scrollToShop } = useStore()

  return (
    <section className="shape-strip container">
      <div className="sec-head row">
        <div>
          <span className="eyebrow">START WITH THE STONE</span>
          <h2>Shop by shape</h2>
          <p className="sec-sub">Every cut catches the light its own way — pick a silhouette to begin.</p>
        </div>
        <button
          className="text-link"
          onClick={() => {
            dispatch({ type: 'clearFilters' })
            scrollToShop()
          }}
        >
          View all pieces →
        </button>
      </div>
      <div className="strip-scroll">
        {SHAPES.map((shape) => {
          const count = countFor(EMPTY_FILTERS, 'shapes', shape)
          return (
            <button key={shape} className="shape-card" onClick={() => shopWithFilters({ shapes: [shape] })}>
              <span className="shape-card-gem">
                <DiamondIcon shape={shape} />
              </span>
              <span className="shape-card-name">{shape}</span>
              <span className="shape-card-count">{count} {count === 1 ? 'piece' : 'pieces'}</span>
            </button>
          )
        })}
      </div>
    </section>
  )
}
