import {
  CARAT_BUCKETS,
  METALS,
  METAL_DOTS,
  PRICE_CAP,
  PRICE_MIN,
  PRICE_STEP,
  SHAPES,
  STYLES,
  TYPES,
  countFor,
  formatPrice,
} from '../data/products'
import { useStore } from '../store'
import ShapeGlyph from './ShapeGlyph'
import { CheckIcon } from './Icons'

function CheckRow({
  label,
  count,
  active,
  onClick,
}: {
  label: string
  count: number
  active: boolean
  onClick: () => void
}) {
  return (
    <button className={`check-row ${active ? 'active' : ''}`} onClick={onClick} aria-pressed={active}>
      <span className={`checkbox ${active ? 'on' : ''}`}>{active && <CheckIcon />}</span>
      <span className="check-label">{label}</span>
      <span className="check-count">{count}</span>
    </button>
  )
}

export default function FilterRail({ open = false }: { open?: boolean }) {
  const { state, dispatch } = useStore()
  const f = state.filters

  return (
    <aside className={`rail ${open ? 'open' : ''}`} aria-label="Filters">
      <div className="rail-head">
        <span>FILTER</span>
      </div>

      <section className="rail-sec">
        <h4 className="rail-title">CATEGORY</h4>
        {TYPES.map((t) => (
          <CheckRow
            key={t}
            label={t}
            count={countFor(f, 'types', t)}
            active={f.types.includes(t)}
            onClick={() => dispatch({ type: 'toggleFilter', kind: 'types', value: t })}
          />
        ))}
      </section>

      <section className="rail-sec">
        <h4 className="rail-title">DIAMOND SHAPE</h4>
        <div className="shape-grid">
          {SHAPES.map((sh) => (
            <button
              key={sh}
              className={`shape-tile ${f.shapes.includes(sh) ? 'active' : ''}`}
              onClick={() => dispatch({ type: 'toggleFilter', kind: 'shapes', value: sh })}
              aria-pressed={f.shapes.includes(sh)}
            >
              <ShapeGlyph shape={sh} />
              <span>{sh}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="rail-sec">
        <h4 className="rail-title">METAL</h4>
        {METALS.map((m) => (
          <button
            key={m}
            className={`check-row ${f.metals.includes(m) ? 'active' : ''}`}
            onClick={() => dispatch({ type: 'toggleFilter', kind: 'metals', value: m })}
            aria-pressed={f.metals.includes(m)}
          >
            <span className="metal-dot" style={{ background: METAL_DOTS[m] }} />
            <span className="check-label">{m}</span>
            <span className="check-count">{countFor(f, 'metals', m)}</span>
          </button>
        ))}
      </section>

      <section className="rail-sec">
        <h4 className="rail-title">CARAT</h4>
        {CARAT_BUCKETS.map((b) => (
          <CheckRow
            key={b.value}
            label={b.label}
            count={countFor(f, 'carats', b.value)}
            active={f.carats.includes(b.value)}
            onClick={() => dispatch({ type: 'toggleFilter', kind: 'carats', value: b.value })}
          />
        ))}
      </section>

      <section className="rail-sec">
        <h4 className="rail-title">PRICE</h4>
        <input
          type="range"
          min={PRICE_MIN}
          max={PRICE_CAP}
          step={PRICE_STEP}
          value={f.priceMax}
          onChange={(e) => dispatch({ type: 'setPrice', value: +e.target.value })}
          aria-label="Maximum price"
        />
        <div className="price-readout">Up to {formatPrice(f.priceMax)}</div>
      </section>

      <section className="rail-sec">
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
      </section>
    </aside>
  )
}
