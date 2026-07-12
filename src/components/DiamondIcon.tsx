import type { Shape } from '../data/products'

/**
 * Faceted gemstone icons for each diamond cut — drawn as SVG so they read as
 * actual diamonds (table + facet lines) rather than plain outlines. All share a
 * 48×48 viewBox and use currentColor so hover/active states can recolour them.
 */

const FACET = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.4, strokeLinejoin: 'round' as const, strokeLinecap: 'round' as const }
const INNER = { ...FACET, strokeWidth: 1 }

function Round() {
  return (
    <>
      <circle cx="24" cy="24" r="18" {...FACET} />
      <circle cx="24" cy="24" r="10.5" {...INNER} />
      <path {...INNER} d="M24 6v7.5M42 24h-7.5M24 42v-7.5M6 24h7.5M11.3 11.3l5.3 5.3M36.7 11.3l-5.3 5.3M36.7 36.7l-5.3-5.3M11.3 36.7l5.3-5.3" />
    </>
  )
}
function Oval() {
  return (
    <>
      <ellipse cx="24" cy="24" rx="12.5" ry="18" {...FACET} />
      <ellipse cx="24" cy="24" rx="7" ry="10.5" {...INNER} />
      <path {...INNER} d="M24 6v7.5M24 42v-7.5M11.5 24h5.5M31 24h5.5" />
    </>
  )
}
function Pear() {
  return (
    <>
      <path {...FACET} d="M24 5c6 7 13 12 13 21a13 13 0 0 1-26 0C11 17 18 12 24 5Z" />
      <path {...INNER} d="M24 15c3 4 7 6 7 11a7 7 0 0 1-14 0c0-5 4-7 7-11Z" />
      <path {...INNER} d="M24 5v10M17 26h-6M31 26h6M24 40v-6" />
    </>
  )
}
function Marquise() {
  return (
    <>
      <path {...FACET} d="M24 5c8 6 12 13 12 19s-4 13-12 19c-8-6-12-13-12-19s4-13 12-19Z" />
      <ellipse cx="24" cy="24" rx="6" ry="12" {...INNER} />
      <path {...INNER} d="M24 5v7M24 43v-7M12 24h6M36 24h-6" />
    </>
  )
}
function Emerald() {
  return (
    <>
      <path {...FACET} d="M17 6h14l5 5v26l-5 5H17l-5-5V11l5-5Z" />
      <path {...INNER} d="M18 13h12v22H18zM12 11l6 2M36 11l-6 2M12 37l6-2M36 37l-6-2" />
    </>
  )
}
function Asscher() {
  return (
    <>
      <path {...FACET} d="M15 6h18l9 9v18l-9 9H15l-9-9V15l9-9Z" />
      <path {...INNER} d="M17 17h14v14H17zM6 15l11 2M42 15l-11 2M6 33l11-2M42 33l-11-2" />
    </>
  )
}
function Princess() {
  return (
    <>
      <rect x="7" y="7" width="34" height="34" rx="2" {...FACET} />
      <path {...INNER} d="M7 7l17 17 17-17M41 41L24 24 7 41M24 7v34M7 24h34" />
    </>
  )
}
function Cushion() {
  return (
    <>
      <rect x="6" y="6" width="36" height="36" rx="12" {...FACET} />
      <rect x="15" y="15" width="18" height="18" rx="5" {...INNER} />
      <path {...INNER} d="M9 9l6 6M39 9l-6 6M39 39l-6-6M9 39l6-6" />
    </>
  )
}
function Radiant() {
  return (
    <>
      <path {...FACET} d="M14 7h20l7 7v20l-7 7H14l-7-7V14l7-7Z" />
      <rect x="16" y="16" width="16" height="16" rx="2" {...INNER} />
      <path {...INNER} d="M7 14l9 2M41 14l-9 2M7 34l9-2M41 34l-9-2" />
    </>
  )
}

const SHAPE_SVG: Record<Shape, () => React.ReactElement> = {
  Round,
  Oval,
  Emerald,
  Princess,
  Pear,
  Marquise,
  Cushion,
  Asscher,
  Radiant,
}

export default function DiamondIcon({ shape, size = 46 }: { shape: Shape; size?: number }) {
  const Draw = SHAPE_SVG[shape]
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden focusable="false" className="diamond-icon">
      <Draw />
    </svg>
  )
}
