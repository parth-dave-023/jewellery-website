import { EMPTY_FILTERS, PRODUCTS, SHAPES, passes, type Filters, type Product } from './products'

/* ---------------- Photography ---------------- */

export interface Photo {
  src: string
  /** The piece shown — used as alt text and caption. */
  alt: string
  productId: string
}

const shown = new Set<string>()

/**
 * Picks a catalogue photo for an editorial slot. Every picture on the page is a
 * real piece from the store: each slot takes the next piece that fits and hasn't
 * been pictured yet, reusing one only if the catalogue runs out.
 * `shot` is which of the piece's photos to use (0 = the main one).
 */
const photoOf = (fits: (p: Product) => boolean = () => true, shot = 1): Photo | undefined => {
  const pool = PRODUCTS.filter((p) => p.images.length > 0 && fits(p))
  const p = pool.find((x) => !shown.has(x.id)) ?? pool[0]
  if (!p) return undefined
  shown.add(p.id)
  return { src: p.images[Math.min(shot, p.images.length - 1)], alt: p.name, productId: p.id }
}

/* ---------------- Curated edits ---------------- */

export interface Edit {
  id: string
  title: string
  blurb: string
  photo: Photo
  filters: Partial<Filters>
}

const FANCY_SHAPES = SHAPES.filter((s) => s !== 'Round')

const EDIT_LIST: (Omit<Edit, 'photo'> & { shot?: number })[] = [
  {
    id: 'bracelets',
    title: 'The Bracelet Edit',
    blurb: 'Lines of light for the wrist — from petite to bold.',
    filters: { types: ['Bracelets'] },
  },
  {
    id: 'necklaces',
    title: 'The Necklace Edit',
    blurb: 'Collar-length lines and drops, made for an open neckline.',
    filters: { types: ['Necklaces'] },
  },
  {
    id: 'fancy',
    title: 'The Fancy-Cut Edit',
    blurb: 'Step cuts, pears and radiants — every shape that isn’t round.',
    filters: { shapes: FANCY_SHAPES },
    shot: 0,
  },
  {
    id: 'statement',
    title: 'The Statement Edit',
    blurb: 'For the evenings the little black dress comes out.',
    filters: { styles: ['Statement'] },
  },
]

/** Only edits that actually have pieces in the catalogue are shown. */
export const EDITS: Edit[] = EDIT_LIST.flatMap(({ shot, ...edit }) => {
  if (edit.id === 'fancy' && FANCY_SHAPES.length === 0) return []
  const photo = photoOf((p) => passes(p, { ...EMPTY_FILTERS, ...edit.filters }), shot)
  return photo ? [{ ...edit, photo }] : []
})

/* ---------------- Craftsmanship story ---------------- */

export interface StoryRow {
  eyebrow: string
  title: string
  body: string
  photo?: Photo
  stat?: { value: string; label: string }
}

export const STORY_ROWS: StoryRow[] = [
  {
    eyebrow: 'THE ATELIER',
    title: 'Forty-one hands touch every piece',
    body: 'Each piece is made to order in our Jaipur atelier by master jewellers whose families have set stones for four generations. Casting, setting, polishing — nothing leaves the bench until the setter who started it signs it off.',
    photo: photoOf(),
    stat: { value: '2–3', label: 'weeks to hand-craft your piece' },
  },
  {
    eyebrow: 'THE MATERIALS',
    title: 'Recycled gold. Traceable stones.',
    body: 'Our gold is 100% recycled and re-refined to 14k and 18k. Every diamond above 0.3 ct arrives with an IGI or GIA certificate, and its journey — mine, cutter, atelier — is documented on your certificate card.',
    photo: photoOf((p) => p.type === 'Necklaces', 0) ?? photoOf(),
    stat: { value: '100%', label: 'recycled gold across the collection' },
  },
]

/* ---------------- Bespoke ---------------- */

export const BESPOKE_PHOTO: Photo | undefined = photoOf()

/* ---------------- Close-ups ---------------- */

/** A strip of the pieces not pictured elsewhere on the page, each in its last (detail) shot. */
export const CLOSE_UPS: Photo[] = PRODUCTS.filter((p) => p.images.length > 0 && !shown.has(p.id))
  .slice(0, 8)
  .map((p) => ({ src: p.images[p.images.length - 1], alt: p.name, productId: p.id }))

/* ---------------- The 4 Cs ---------------- */

export interface FourC {
  letter: string
  name: string
  short: string
  body: string
}

export const FOUR_CS: FourC[] = [
  {
    letter: 'C',
    name: 'Cut',
    short: 'How it returns light',
    body: 'The only C determined entirely by human hands. We cut for fire over size — an Excellent-cut stone will out-sparkle a larger, duller one every time.',
  },
  {
    letter: 'C',
    name: 'Colour',
    short: 'How white it reads',
    body: 'Graded D (colourless) to Z. We buy D–G exclusively, so every stone reads icy white against both gold and platinum.',
  },
  {
    letter: 'C',
    name: 'Clarity',
    short: 'What the loupe finds',
    body: 'Most inclusions are invisible without magnification. We select VS2 and above — clean to the eye, sensible on the price tag.',
  },
  {
    letter: 'C',
    name: 'Carat',
    short: 'What it weighs',
    body: 'Weight, not size. A well-cut 0.9 ct can face up larger than a deep 1.0 ct — which is why we list measurements alongside weight on every certificate.',
  },
]

/* ---------------- FAQ ---------------- */

export interface Faq {
  q: string
  a: string
}

export const FAQS: Faq[] = [
  {
    q: 'Are your diamonds certified?',
    a: 'Yes — every diamond above 0.3 ct ships with an independent IGI or GIA certificate, and the grading report number is laser-inscribed on the girdle so you can verify it yourself.',
  },
  {
    q: 'How long does my piece take to arrive?',
    a: 'Everything is made to order in 2–3 weeks, then shipped fully insured with signature-on-delivery anywhere in India in 2–4 days. You will receive tracking the moment it leaves the atelier.',
  },
  {
    q: 'What if the ring does not fit?',
    a: 'Resizing is complimentary, forever. We arrange an insured pickup, resize at the atelier and return your piece within about a week.',
  },
  {
    q: 'Can I return or exchange a piece?',
    a: '30-day returns on unworn pieces in original condition, full refund to the original payment method. Engraved and bespoke pieces are exchange-only.',
  },
  {
    q: 'Do you make bespoke pieces?',
    a: 'We do. Share a sketch, an heirloom to rework, or just an idea — our design team will send CAD renders within a week and a firm quote before anything is made.',
  },
  {
    q: 'Is the gold really recycled?',
    a: 'All our gold is certified 100% recycled, re-refined to virgin quality. Chemically it is identical to newly-mined gold — the only difference is that no new earth was moved for it.',
  },
]
