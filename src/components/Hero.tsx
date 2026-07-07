import { useStore } from '../store'
import { PRESS } from '../data/content'
import Lookbook from './Lookbook'

export default function Hero() {
  const { scrollToShop } = useStore()

  return (
    <>
      <section className="hero container">
        <div className="hero-copy rise">
          <span className="eyebrow">EVERYDAY FINE JEWELLERY</span>
          <h1>
            Quietly
            <br />
            brilliant.
          </h1>
          <p>
            Certified diamonds and recycled gold, cut into pieces made for real days — not just
            occasions. Designed in India, crafted to be worn for life.
          </p>
          <div className="hero-ctas">
            <button className="btn-ink" onClick={scrollToShop}>
              Shop the collection
            </button>
            <a className="text-link" href="#promise">
              Our promise
            </a>
          </div>
        </div>
        <div className="hero-book rise-delay">
          <Lookbook />
        </div>
      </section>
      <div className="press container" aria-label="As featured in">
        <span className="press-label">AS FEATURED IN</span>
        <ul>
          {PRESS.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
      </div>
    </>
  )
}
