import type { Filters } from './products'

const u = (id: string, w: number, h: number) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&q=75`

/* ---------------- Curated edits ---------------- */

export interface Edit {
  id: string
  title: string
  blurb: string
  img: string
  filters: Partial<Filters>
}

export const EDITS: Edit[] = [
  {
    id: 'everyday',
    title: 'The Everyday Edit',
    blurb: 'Quiet pieces that survive keyboards, commutes and school runs.',
    img: u('1590166223826-12dee1677420', 640, 780),
    filters: { styles: ['Minimalist'] },
  },
  {
    id: 'bridal',
    title: 'The Bridal Edit',
    blurb: 'Solitaires and halos for the question, and everything after it.',
    img: u('1598560917505-59a3ad559071', 640, 780),
    filters: { styles: ['Solitaire', 'Halo'] },
  },
  {
    id: 'statement',
    title: 'The Statement Edit',
    blurb: 'For the evenings the little black dress comes out.',
    img: u('1608042314453-ae338d80c427', 640, 780),
    filters: { styles: ['Statement', 'Cluster'] },
  },
  {
    id: 'gifts',
    title: 'Gifts under $750',
    blurb: 'Certain yeses — every piece here arrives gift-wrapped.',
    img: u('1512163143273-bde0e3cc7407', 640, 780),
    filters: { priceMax: 750 },
  },
]

/* ---------------- Craftsmanship story ---------------- */

export interface StoryRow {
  eyebrow: string
  title: string
  body: string
  img: string
  stat?: { value: string; label: string }
}

export const STORY_ROWS: StoryRow[] = [
  {
    eyebrow: 'THE ATELIER',
    title: 'Forty-one hands touch every piece',
    body: 'Each piece is made to order in our Jaipur atelier by master jewellers whose families have set stones for four generations. Casting, setting, polishing — nothing leaves the bench until the setter who started it signs it off.',
    img: u('1601121141461-9d6647bca1ed', 900, 1050),
    stat: { value: '2–3', label: 'weeks to hand-craft your piece' },
  },
  {
    eyebrow: 'THE MATERIALS',
    title: 'Recycled gold. Traceable stones.',
    body: 'Our gold is 100% recycled and re-refined to 14k and 18k. Every diamond above 0.3 ct arrives with an IGI or GIA certificate, and its journey — mine, cutter, atelier — is documented on your certificate card.',
    img: u('1611955167811-4711904bb9f8', 900, 1050),
    stat: { value: '100%', label: 'recycled gold across the collection' },
  },
]

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

/* ---------------- Testimonials ---------------- */

export interface Testimonial {
  quote: string
  name: string
  city: string
  piece: string
}

export const TESTIMONIALS: Testimonial[] = [
  {
    quote: 'I proposed with the Aurora and the certificate card mattered almost as much as the ring — her father is a gemmologist.',
    name: 'Arjun M.',
    city: 'Mumbai',
    piece: 'Aurora Solitaire Ring',
  },
  {
    quote: 'Wore the Thread necklace daily for a year — swimming, gym, everything. It still looks like the day it arrived.',
    name: 'Priya S.',
    city: 'Bengaluru',
    piece: 'Thread Diamond Necklace',
  },
  {
    quote: 'The resizing was genuinely free, collected and returned in five days. That is what made me a customer for life.',
    name: 'Kavita R.',
    city: 'Surat',
    piece: 'Petal Halo Ring',
  },
]

/* ---------------- Journal ---------------- */

export interface JournalPost {
  eyebrow: string
  title: string
  excerpt: string
  img: string
  readTime: string
}

export const JOURNAL: JournalPost[] = [
  {
    eyebrow: 'GUIDES',
    title: 'How to read a diamond certificate',
    excerpt: 'IGI or GIA, cut grade to fluorescence — the five lines that actually matter, explained without jargon.',
    img: u('1598560917505-59a3ad559071', 640, 460),
    readTime: '6 min read',
  },
  {
    eyebrow: 'CARE',
    title: 'The two-minute weekly clean',
    excerpt: 'Warm water, a drop of dish soap and a soft brush keep pavé bright for decades. Here is the routine our polishers use.',
    img: u('1589674781759-c21c37956a44', 640, 460),
    readTime: '3 min read',
  },
  {
    eyebrow: 'STYLE',
    title: 'Stacking rules we happily break',
    excerpt: 'Mixing metals, odd numbers, one statement per hand — and when to ignore all of it.',
    img: u('1573408301185-9146fe634ad0', 640, 460),
    readTime: '4 min read',
  },
]

/* ---------------- Gallery — “As worn” ---------------- */

export const GALLERY: { img: string; caption: string }[] = [
  { img: u('1590166223826-12dee1677420', 520, 640), caption: '@meera.k — Celeste studs' },
  { img: u('1611085583191-a3b181a88401', 520, 640), caption: '@ananya — Thread necklace' },
  { img: u('1531995811006-35cb42e1a022', 520, 640), caption: '@raenotes — layered chains' },
  { img: u('1617038220319-276d3cfab638', 520, 640), caption: '@studiofern — Dew huggies' },
  { img: u('1608042314453-ae338d80c427', 520, 640), caption: '@goldhourgirl — stacked rings' },
  { img: u('1617117811969-97f441511dee', 520, 640), caption: '@heirloomedit — Favola ring' },
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
