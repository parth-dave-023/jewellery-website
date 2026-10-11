// LOCAL PREVIEW ONLY. A snapshot of the live Shopify catalogue (taken 2026-10-11)
// so `npm run dev` has the real pieces to show. It is never used on the store:
// there the theme injects the live catalogue, and this file is dropped from the
// production build. Prices and stock here mirror Shopify at the time of the
// snapshot — Shopify admin is the only place to change them.
import type { InjectedProduct } from '../shopify'

const CDN = 'https://cdn.shopify.com'
const FILES = `${CDN}/s/files/1/0715/0252/8621/files`

const photos = (handle: string, count: number): string[] =>
  Array.from({ length: count }, (_, i) => `${FILES}/${handle}-${i + 1}.jpg`)

const clip = (key: string, id: number): InjectedProduct['video'] => ({
  poster: `${FILES}/preview_images/${key}.thumbnail.0000000000.jpg`,
  sources: [
    { url: `${CDN}/videos/c/vp/${key}/${key}.SD-480p-1.5Mbps-${id}.mp4`, format: 'mp4', height: 480 },
    { url: `${CDN}/videos/c/vp/${key}/${key}.HD-720p-4.5Mbps-${id}.mp4`, format: 'mp4', height: 720 },
    { url: `${CDN}/videos/c/vp/${key}/${key}.HD-1080p-7.2Mbps-${id}.mp4`, format: 'mp4', height: 1080 },
    { url: `${CDN}/videos/c/vp/${key}/${key}.m3u8`, format: 'm3u8', height: 1080 },
  ],
})

interface Row {
  id: number
  handle: string
  title: string
  type: string
  shape: string
  style: string
  blurb: string
  video: [key: string, id: number]
  /** Variant ids — one for a single-option piece, or [label, id] pairs. */
  variants: number | [label: string, id: number][]
  photos?: number
  hover?: string
}

const ROWS: Row[] = [
  {
    id: 15376581230701, handle: 'asscher-cut-tennis-bracelet-yellow', title: 'Asscher-Cut Tennis Bracelet in Yellow',
    type: 'Bracelets', shape: 'Asscher', style: 'Eternity', variants: 67696735977581,
    video: ['42b230e47df74a2b971bcb14b0220c4d', 97090816],
    blurb: 'A full line of step-cut asscher stones in a yellow-toned setting. Fastened with a box clasp.',
  },
  {
    id: 15376581197933, handle: 'azure-white-tennis-bracelet', title: 'Azure & White Tennis Bracelet',
    type: 'Bracelets', shape: 'Round', style: 'Eternity', variants: 67696735944813,
    video: ['f820e4a816c5479791f3e8698197be6a', 97090815],
    blurb: 'Azure-blue and white round stones alternate in a classic tennis line. Fastened with a box clasp.',
  },
  {
    id: 15376581066861, handle: 'blush-accent-tennis-bracelet', title: 'Blush Accent Tennis Bracelet',
    type: 'Bracelets', shape: 'Round', style: 'Eternity', variants: 67696735813741,
    video: ['ac509d2dc7a548bd88d4bafd30d2d810', 97090811],
    blurb: 'A slim line of round brilliant-cut stones, punctuated at intervals by blush-pink cushion-cut accents. Fastened with a box clasp.',
  },
  {
    id: 15376581460077, handle: 'blush-pear-drop-necklace', title: 'Blush Pear Drop Necklace',
    type: 'Necklaces', shape: 'Pear', style: 'Statement', variants: 67696736731245,
    video: ['499c1a1e247e4d5caf5bc866338d85dc', 97090821],
    blurb: 'A graduated line of pear-cut stones that meets at the centre and falls to a single blush-pink pear drop.',
  },
  {
    id: 15376581427309, handle: 'classic-round-tennis-bracelet', title: 'Classic Round Tennis Bracelet',
    type: 'Bracelets', shape: 'Round', style: 'Eternity', variants: 67696736698477,
    video: ['2ef79dfe53f6456aa762cc5599406a49', 97090820],
    blurb: 'The classic tennis bracelet: one continuous line of round brilliant-cut stones. Fastened with a box clasp.',
  },
  {
    id: 15376581492845, handle: 'classic-tennis-necklace', title: 'Classic Tennis Necklace',
    type: 'Necklaces', shape: 'Round', style: 'Eternity', variants: 67696736764013,
    video: ['41e12e1e1c8141888cf3313c6275549b', 97090822],
    blurb: 'One continuous line of round brilliant-cut stones that sits close to the collarbone.',
  },
  {
    id: 15376581525613, handle: 'emerald-cut-statement-necklace', title: 'Emerald-Cut Statement Necklace',
    type: 'Necklaces', shape: 'Emerald', style: 'Statement', variants: 67696736796781,
    video: ['ea3ba23c95954576b109df2527bdaa10', 97090823],
    blurb: 'Emerald-cut stones linked by clusters of pear-cut stones, all the way round.',
  },
  {
    id: 15376581558381, handle: 'pave-hoop-earrings', title: 'Pavé Hoop Earrings',
    type: 'Earrings', shape: 'Round', style: 'Pave', photos: 6, hover: 'ALL SIZES',
    variants: [
      ['8 mm', 67696736829549],
      ['9 mm', 67696736862317],
      ['10 mm', 67696736895085],
      ['12 mm', 67696736927853],
      ['14 mm', 67696736960621],
    ],
    video: ['112d649aaa6044d88203c3fb7e562c8d', 97090643],
    blurb: 'Slim hoops with a row of round brilliant-cut stones along the front. Shown in five diameters: 8, 9, 10, 12 and 14 mm.',
  },
  {
    id: 15376581263469, handle: 'pear-cut-tennis-bracelet', title: 'Pear-Cut Tennis Bracelet',
    type: 'Bracelets', shape: 'Pear', style: 'Eternity', variants: 67696736010349,
    video: ['cdb91dff03cd451484b0f610203fc96f', 97090817],
    blurb: 'Pear-cut stones set tip to tail in one continuous line. Fastened with a box clasp.',
  },
  {
    id: 15376581361773, handle: 'petite-tennis-bracelet-white', title: 'Petite Tennis Bracelet in White',
    type: 'Bracelets', shape: 'Round', style: 'Minimalist', variants: 67696736632941,
    video: ['b91b5f9d5e8d4b8db3bece226514cc05', 97090818],
    blurb: 'A fine, flexible line of small round brilliant-cut stones in a white-toned setting, fastened with a lobster clasp.',
  },
  {
    id: 15376581394541, handle: 'petite-tennis-bracelet-yellow', title: 'Petite Tennis Bracelet in Yellow',
    type: 'Bracelets', shape: 'Round', style: 'Minimalist', variants: 67696736665709,
    video: ['4044e1fa26a044a78494fe48fbe17cd7', 97090819],
    blurb: 'A fine, flexible line of small round brilliant-cut stones in a yellow-toned setting, fastened with a lobster clasp.',
  },
  {
    id: 15376581165165, handle: 'rose-pear-accent-tennis-bracelet', title: 'Rose Pear Accent Tennis Bracelet',
    type: 'Bracelets', shape: 'Round', style: 'Eternity', variants: 67696735912045,
    video: ['728b8174886f4c629945b2dd2f69d5f6', 97090814],
    blurb: 'Round brilliant-cut stones with rose-pink pear-cut accents set at intervals. Fastened with a box clasp.',
  },
  {
    id: 15376581132397, handle: 'scarlet-accent-tennis-bracelet', title: 'Scarlet Accent Tennis Bracelet',
    type: 'Bracelets', shape: 'Round', style: 'Eternity', variants: 67696735879277,
    video: ['1bc117fc7d924444aaca8875df2bcaa3', 97090813],
    blurb: 'Round brilliant-cut stones broken up by vivid scarlet rectangular-cut accents in warm-toned settings. Fastened with a box clasp.',
  },
  {
    id: 15376581099629, handle: 'yellow-radiant-white-oval-bracelet', title: 'Yellow Radiant & White Oval Bracelet',
    type: 'Bracelets', shape: 'Radiant', style: 'Statement', variants: 67696735846509,
    video: ['966c4ebe749f456c90ad08089ad9b45b', 97090812],
    blurb: 'Yellow radiant-cut and white oval-cut stones alternate all the way round, each colour held in its own matching setting. Fastened with a box clasp.',
  },
]

// Not priced or stocked in Shopify yet, so every option is 0 / unavailable.
const option = (title: string, id: number) => ({ id, title, price: 0, available: false, max: 0 })

/** Built on demand (not at import) so the production build can drop this file entirely. */
export const previewProducts = (): InjectedProduct[] => ROWS.map((r) => ({
  id: r.id,
  handle: r.handle,
  title: r.title,
  productType: r.type,
  optionName: typeof r.variants === 'number' ? 'Title' : 'Size',
  variants:
    typeof r.variants === 'number'
      ? [option('Default Title', r.variants)]
      : r.variants.map(([label, id]) => option(label, id)),
  images: photos(r.handle, r.photos ?? 3),
  video: clip(...r.video),
  type: r.type,
  shape: r.shape,
  style: r.style,
  hover: r.hover ?? 'ON DISPLAY',
  blurb: r.blurb,
}))
