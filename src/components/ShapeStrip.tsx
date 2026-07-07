import { SHAPES } from '../data/products'
import { useStore } from '../store'
import ShapeGlyph from './ShapeGlyph'

export default function ShapeStrip() {
  const { shopWithFilters, dispatch, scrollToShop } = useStore()

  return (
    <section className="shape-strip container">
      <div className="strip-head">
        <span className="eyebrow">SHOP BY SHAPE</span>
        <button
          className="text-link"
          onClick={() => {
            dispatch({ type: 'clearFilters' })
            scrollToShop()
          }}
        >
          View all →
        </button>
      </div>
      <div className="strip-scroll">
        {SHAPES.map((shape) => (
          <button key={shape} className="shape-card" onClick={() => shopWithFilters({ shapes: [shape] })}>
            <ShapeGlyph shape={shape} scale={1.15} />
            <span>{shape}</span>
          </button>
        ))}
      </div>
    </section>
  )
}
