import { useStore } from '../store'
import { asset } from '../shopifyAssets'

export default function Hero() {
  const { scrollToShop } = useStore()

  return (
    <section className="hero-photo" aria-label="Minimalist Jewellery">
        <h1 className="sr-only">Minimalist Jewellery — everyday fine jewellery</h1>
        <img className="hero-photo-img" src={asset('/img/hero.png')} alt="A woman wearing a delicate diamond pendant and studs in warm daylight" fetchPriority="high" />
        <div className="hero-photo-scrim" aria-hidden />
        <div className="container hero-photo-inner">
          <div className="hero-photo-copy rise">
            <span className="eyebrow">EVERYDAY FINE JEWELLERY</span>
            <p className="hero-photo-lede">Certified diamonds and recycled gold, cut into pieces made for real days — designed to be worn for life.</p>
            <div className="hero-ctas">
              <button className="btn-ink" onClick={scrollToShop}>
                Shop the collection
              </button>
              <a className="text-link" href="#promise">
                Our promise
              </a>
            </div>
          </div>
        </div>
        <button className="hero-scroll" onClick={scrollToShop} aria-label="Scroll to the collection">
          <span>Scroll</span>
          <span className="hero-scroll-line" aria-hidden />
        </button>
    </section>
  )
}
