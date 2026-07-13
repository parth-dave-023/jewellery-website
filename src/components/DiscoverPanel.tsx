import {
  METALS,
  METAL_DOTS,
  PRICE_CAP,
  PRICE_MIN,
  PRICE_STEP,
  SHAPES,
  STYLES,
  countFor,
  formatPrice,
} from '../data/products'
import { useStore } from '../store'
import ShapeGlyph from './ShapeGlyph'

export default function DiscoverPanel() {
  const { state, dispatch } = useStore()
  const f = state.filters

  return (
    <div className="discover rise">
      <div className="discover-sec">
        <h4 className="rail-title">CHOOSE A CUT</h4>
        <div className="discover-shapes">
          {SHAPES.map((sh) => (
            <button
              key={sh}
              className={`shape-tile big ${f.shapes.includes(sh) ? 'active' : ''}`}
              onClick={() => dispatch({ type: 'toggleFilter', kind: 'shapes', value: sh })}
              aria-pressed={f.shapes.includes(sh)}
            >
              <ShapeGlyph shape={sh} scale={1.2} />
              <span>{sh}</span>
              <span className="tile-count">{countFor(f, 'shapes', sh)}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="discover-row">
        <div className="discover-sec grow">
          <h4 className="rail-title">METAL</h4>
          <div className="metal-tiles">
            {METALS.map((m) => (
              <button
                key={m}
                className={`metal-tile ${f.metals.includes(m) ? 'active' : ''}`}
                onClick={() => dispatch({ type: 'toggleFilter', kind: 'metals', value: m })}
                aria-pressed={f.metals.includes(m)}
              >
                <span className="metal-dot" style={{ background: METAL_DOTS[m] }} />
                {m}
                <span className="tile-count">{countFor(f, 'metals', m)}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="discover-sec budget">
          <h4 className="rail-title">BUDGET</h4>
          <input
            type="range"
            min={PRICE_MIN}
            max={PRICE_CAP}
            step={PRICE_STEP}
            value={f.priceMax}
            onChange={(e) => dispatch({ type: 'setPrice', value: +e.target.value })}
            aria-label="Maximum budget"
          />
          <div className="price-readout">Up to {formatPrice(f.priceMax)}</div>
        </div>
      </div>
      <div className="discover-sec">
        <h4 className="rail-title">STYLE</h4>
        <div className="chip-wrap">
          {STYLES.map((st) => (
            <button
              key={st}
              className={`chip ${f.styles.includes(st) ? 'active' : ''}`}
              onClick={() => dispatch({ type: 'toggleFilter', kind: 'styles', value: st })}
              aria-pressed={f.styles.includes(st)}
            >
              {st}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
