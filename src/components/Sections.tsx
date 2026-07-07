import { useState, type FormEvent } from 'react'
import { EDITS, FAQS, FOUR_CS, GALLERY, JOURNAL, STORY_ROWS, TESTIMONIALS } from '../data/content'
import { useStore } from '../store'
import { PlusIcon } from './Icons'

/* ---------- Curated edits ---------- */

export function EditsBand() {
  const { shopWithFilters } = useStore()
  return (
    <section className="edits container">
      <div className="sec-head">
        <span className="eyebrow">CURATED FOR YOU</span>
        <h2>Shop by moment</h2>
        <p className="sec-sub">Four edits, hand-picked from the collection — one click filters the pieces below.</p>
      </div>
      <div className="edits-grid">
        {EDITS.map((e) => (
          <button key={e.id} className="edit-card" onClick={() => shopWithFilters(e.filters)}>
            <span className="edit-media">
              <img src={e.img} alt="" loading="lazy" />
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
          <div key={row.title} className={`story-row ${i % 2 ? 'flip' : ''}`}>
            <div className="story-media">
              <img src={row.img} alt={row.title} loading="lazy" />
            </div>
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

/* ---------- The Auren promise ---------- */

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
          <span className="eyebrow">THE AUREN PROMISE</span>
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
      <div className="bespoke-inner">
        <div className="bespoke-copy">
          <span className="eyebrow small">BESPOKE</span>
          <h2>Have something in mind?</h2>
          <p>
            A sketch on a napkin, your grandmother's stones in a new setting, or a shape we don't
            carry — our design team turns ideas into CAD renders within a week, and a finished piece
            in about six.
          </p>
          <a className="btn-ink" href="mailto:bespoke@auren.example">
            Start a bespoke enquiry
          </a>
          <span className="bespoke-note mono">NO COMMITMENT UNTIL YOU APPROVE THE RENDER</span>
        </div>
        <div className="bespoke-media">
          <img
            src="https://images.unsplash.com/photo-1512163143273-bde0e3cc7407?w=900&h=1050&fit=crop&q=75"
            alt="A bespoke ring presented in a gift box"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  )
}

/* ---------- Testimonials ---------- */

export function Testimonials() {
  return (
    <section className="testimonials">
      <div className="container">
        <div className="sec-head">
          <span className="eyebrow">WORD OF MOUTH</span>
          <h2>From the people wearing it</h2>
        </div>
        <div className="quote-grid">
          {TESTIMONIALS.map((t) => (
            <figure key={t.name} className="quote-card">
              <span className="quote-mark" aria-hidden>“</span>
              <blockquote>{t.quote}</blockquote>
              <figcaption>
                <span className="quote-name">{t.name} · {t.city}</span>
                <span className="quote-piece mono">{t.piece.toUpperCase()}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------- Journal ---------- */

export function Journal() {
  return (
    <section className="journal container">
      <div className="sec-head row">
        <div>
          <span className="eyebrow">THE JOURNAL</span>
          <h2>Notes on diamonds & care</h2>
        </div>
        <span className="text-link muted" title="Journal launches with the full site">View all stories →</span>
      </div>
      <div className="journal-grid">
        {JOURNAL.map((post) => (
          <article key={post.title} className="journal-card">
            <div className="journal-media">
              <img src={post.img} alt="" loading="lazy" />
            </div>
            <span className="eyebrow small">{post.eyebrow}</span>
            <h3>{post.title}</h3>
            <p>{post.excerpt}</p>
            <span className="journal-time mono">{post.readTime.toUpperCase()}</span>
          </article>
        ))}
      </div>
    </section>
  )
}

/* ---------- Gallery — as worn ---------- */

export function Gallery() {
  return (
    <section className="gallery">
      <div className="container">
        <div className="sec-head">
          <span className="eyebrow">AS WORN</span>
          <h2>#QuietlyBrilliant</h2>
          <p className="sec-sub">Real pieces on real people — tag us to be featured.</p>
        </div>
      </div>
      <div className="gallery-scroll">
        {GALLERY.map((g) => (
          <figure key={g.caption} className="gallery-item">
            <img src={g.img} alt={g.caption} loading="lazy" />
            <figcaption className="mono">{g.caption}</figcaption>
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
