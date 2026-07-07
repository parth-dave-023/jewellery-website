import type { CSSProperties } from 'react'
import type { Shape } from '../data/products'

const SHAPE_STYLES: Record<Shape, CSSProperties> = {
  Round: { width: 16, height: 16, borderRadius: '50%' },
  Oval: { width: 11, height: 16, borderRadius: '50%' },
  Emerald: { width: 11, height: 16, borderRadius: 2 },
  Princess: { width: 15, height: 15, borderRadius: 2 },
  Pear: { width: 14, height: 14, borderRadius: '50% 50% 50% 2px', transform: 'rotate(45deg)' },
  Marquise: { width: 9, height: 16, borderRadius: '50%' },
  Cushion: { width: 15, height: 15, borderRadius: 6 },
  Asscher: { width: 15, height: 15, borderRadius: 3 },
  Radiant: { width: 13, height: 16, borderRadius: 3 },
}

export default function ShapeGlyph({ shape, scale = 1 }: { shape: Shape; scale?: number }) {
  const s = SHAPE_STYLES[shape]
  return (
    <span
      aria-hidden
      style={{
        display: 'inline-block',
        border: '1.4px solid currentColor',
        boxSizing: 'border-box',
        flex: 'none',
        ...s,
        width: `calc(${typeof s.width === 'number' ? s.width : 16}px * ${scale})`,
        height: `calc(${typeof s.height === 'number' ? s.height : 16}px * ${scale})`,
      }}
    />
  )
}
