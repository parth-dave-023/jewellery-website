import { TYPES } from '../data/products'
import { useStore } from '../store'

const COMPANY = ['Our story', 'Journal', 'Sustainability', 'Stores']
const SUPPORT = ['Contact', 'Shipping', 'Returns', 'Ring sizing', 'Care & repair']

export default function Footer() {
  const { shopWithFilters } = useStore()

  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <span className="footer-mark">MINIMALIST JEWELLERY</span>
          <p>
            Everyday fine jewellery. Certified diamonds, recycled gold, crafted to order in India —
            made to be worn for life.
          </p>
        </div>
        <div className="footer-col">
          <h3>SHOP</h3>
          <ul>
            {TYPES.map((t) => (
              <li key={t}>
                <button onClick={() => shopWithFilters({ types: [t] })}>{t}</button>
              </li>
            ))}
          </ul>
        </div>
        <div className="footer-col">
          <h3>COMPANY</h3>
          <ul>
            {COMPANY.map((l) => (
              <li key={l}>
                <button title="Coming with the full launch">{l}</button>
              </li>
            ))}
          </ul>
        </div>
        <div className="footer-col">
          <h3>SUPPORT</h3>
          <ul>
            {SUPPORT.map((l) => (
              <li key={l}>
                <button title="Coming with the full launch">{l}</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="container footer-base">
        <span>© {new Date().getFullYear()} Minimalist Jewellery. A demonstration storefront.</span>
        <span className="mono">IGI · GIA CERTIFIED / SECURE CHECKOUT / MADE IN INDIA</span>
      </div>
    </footer>
  )
}
