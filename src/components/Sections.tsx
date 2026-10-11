import { useState, type FormEvent } from 'react'
import { BESPOKE_PHOTO, CLOSE_UPS, EDITS, FAQS, FOUR_CS, STORY_ROWS } from '../data/content'
import { sized } from '../data/products'
import { useStore } from '../store'
import { PlusIcon } from './Icons'

/* ---------- Curated edits ---------- */

export function EditsBand() {
  const { shopWithFilters } = useStore()
  if (EDITS.length === 0) return null
  return (
    <section className="edits container">
      <div className="sec-head">
        <span className="eyebrow">CURATED FOR YOU</span>
        <h2>Shop the edits</h2>
        <p className="sec-sub">A few ways into the collection — one click filters the pieces below.</p>
      </div>
      <div className="edits-grid">
        {EDITS.map((e) => (
          <button key={e.id} className="edit-card" onClick={() => shopWithFilters(e.filters)}>
            <span className="edit-media">
              <img src={sized(e.photo.src, 800)} alt="" loading="lazy" />
            </span>
            <span className="edit-title">{e.title}</span>
            <span className="edit-blurb">{e.blurb}</span>
            <span className="text-link">Explore →</span>
          </button>
        ))}
      </div>
    </section>
  )
}

/* ---------- Craftsmanship story ---------- */

export function Craftsmanship() {
  return (
    <section className="story">
      <div className="container">
        <div className="sec-head">
          <span className="eyebrow">THE HOUSE</span>
          <h2>Made slowly, on purpose</h2>
        </div>
        {STORY_ROWS.map((row, i) => (
          <div key={row.title} className={`story-row ${i % 2 ? 'flip' : ''} ${row.photo ? '' : 'solo'}`}>
            {row.photo && (
              <div className="story-media">
                <img src={sized(row.photo.src, 1200)} alt={row.photo.alt} loading="lazy" />
              </div>
            )}
            <div className="story-copy">
              <span className="eyebrow small">{row.eyebrow}</span>
              <h3>{row.title}</h3>
              <p>{row.body}</p>
              {row.stat && (
                <div className="story-stat">
                  <span className="stat-value">{row.stat.value}</span>
                  <span className="stat-label">{row.stat.label}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ---------- The 4 Cs ---------- */

export function FourCs() {
  return (
    <section className="fourcs">
      <div className="container">
        <div className="sec-head">
          <span className="eyebrow">DIAMOND EDUCATION</span>
          <h2>Know your diamond — the 4 Cs</h2>
          <p className="sec-sub">
            Five minutes here saves lakhs later. This is how we grade every stone we set.
          </p>
        </div>
        <div className="fourcs-grid">
          {FOUR_CS.map((c) => (
            <article key={c.name} className="fourc-card">
              <span className="fourc-letter">{c.letter}</span>
              <h3>{c.name}</h3>
              <span className="fourc-short mono">{c.short.toUpperCase()}</span>
              <p>{c.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------- The promise ---------- */

const PROMISES = [
  {
    title: 'Certified & graded',
    body: 'Every diamond is independently certified by IGI or GIA, with grading you can verify.',
  },
  {
    title: 'Responsibly sourced',
    body: 'Conflict-free stones and recycled gold, traceable from origin to your hand.',
  },
  {
    title: 'A lifetime of care',
    body: 'Complimentary cleaning, resizing and servicing — for as long as you wear it.',
  },
]

export function PromiseBand() {
  return (
    <section id="promise" className="promise">
      <div className="container">
        <div className="sec-head">
          <span className="eyebrow">THE MINIMALIST PROMISE</span>
          <h2>Bought once, trusted for life</h2>
        </div>
        <div className="promise-grid">
          {PROMISES.map((p) => (
            <div key={p.title} className="promise-item">
              <span className="lb-diamond dark" aria-hidden />
              <h3>{p.title}</h3>
              <p>{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------- Bespoke ---------- */

export function Bespoke() {
  return (
    <section className="bespoke container">
      <div className={`bespoke-inner ${BESPOKE_PHOTO ? '' : 'solo'}`}>
        <div className="bespoke-copy">
          <span className="eyebrow small">BESPOKE</span>
          <h2>Have something in mind?</h2>
          <p>
            A sketch on a napkin, your grandmother's stones in a new setting, or a shape we don't
            carry — our design team turns ideas into CAD renders within a week, and a finished piece
            in about six.
          </p>
          <a className="btn-ink" href="mailto:bespoke@minimalistjewellery.example">
            Start a bespoke enquiry
          </a>
          <span className="bespoke-note mono">NO COMMITMENT UNTIL YOU APPROVE THE RENDER</span>
        </div>
        {BESPOKE_PHOTO && (
          <div className="bespoke-media">
            <img src={sized(BESPOKE_PHOTO.src, 1200)} alt={BESPOKE_PHOTO.alt} loading="lazy" />
          </div>
        )}
      </div>
    </section>
  )
}

/* ---------- Close-ups ---------- */

export function Gallery() {
  const { dispatch } = useStore()
  if (CLOSE_UPS.length < 3) return null
  return (
    <section className="gallery">
      <div className="container">
        <div className="sec-head">
          <span className="eyebrow">UP CLOSE</span>
          <h2>The collection in detail</h2>
          <p className="sec-sub">Tap any piece to see it from every angle.</p>
        </div>
      </div>
      <div className="gallery-scroll">
        {CLOSE_UPS.map((g) => (
          <figure key={g.productId} className="gallery-item">
            <button onClick={() => dispatch({ type: 'openQuick', id: g.productId })} aria-label={`View ${g.alt}`}>
              <img src={sized(g.src, 640)} alt={g.alt} loading="lazy" />
            </button>
            <figcaption className="mono">{g.alt}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}

/* ---------- FAQ ---------- */

export function Faq() {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <section className="faq container">
      <div className="sec-head">
        <span className="eyebrow">QUESTIONS</span>
        <h2>Asked often, answered honestly</h2>
      </div>
      <div className="faq-list">
        {FAQS.map((f, i) => {
          const isOpen = open === i
          return (
            <div key={f.q} className={`faq-item ${isOpen ? 'open' : ''}`}>
              <button
                className="faq-q"
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? null : i)}
              >
                {f.q}
                <span className={`faq-icon ${isOpen ? 'rot' : ''}`}>
                  <PlusIcon />
                </span>
              </button>
              <div className="faq-a" hidden={!isOpen}>
                <p>{f.a}</p>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

/* ---------- Newsletter ---------- */

export function Newsletter() {
  const [done, setDone] = useState(false)
  const submit = (e: FormEvent) => {
    e.preventDefault()
    setDone(true)
  }
  return (
    <section className="newsletter">
      <div className="container newsletter-inner">
        <span className="eyebrow">THE INNER CIRCLE</span>
        <h2>First to see new pieces</h2>
        <p>One considered email a month — new drops, private previews, no noise.</p>
        {done ? (
          <p className="newsletter-done">Welcome to the circle. Your first letter arrives soon.</p>
        ) : (
          <form className="newsletter-form" onSubmit={submit}>
            <input type="email" required placeholder="Your email" aria-label="Email address" />
            <button className="btn-ink" type="submit">
              Subscribe
            </button>
          </form>
        )}
      </div>
    </section>
  )
}
