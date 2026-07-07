import { useStore } from '../store'

const NEXT_STEPS = [
  { no: '01', title: 'Hand-crafted', body: 'Your piece is made to order by our master jewellers over 2–3 weeks.' },
  { no: '02', title: 'Quality & certification', body: 'Each piece is inspected and its diamond certificate finalised.' },
  { no: '03', title: 'Insured dispatch', body: 'Fully insured, signature-on-delivery shipping to your door.' },
]

export default function Confirmation() {
  const { state, dispatch } = useStore()

  return (
    <main className="container page confirm">
      <span className="check-ring" aria-hidden>
        <svg viewBox="0 0 52 52">
          <circle className="ring-c" cx="26" cy="26" r="24" fill="none" />
          <path className="ring-t" d="M15 27l7.5 7.5L37 20" fill="none" />
        </svg>
      </span>
      <span className="eyebrow">ORDER CONFIRMED</span>
      <h1>Thank you — your order is on its way to being made</h1>
      <p className="confirm-sub">A confirmation has been sent to your email. Your order reference is</p>
      <div className="order-no">{state.orderNo}</div>
      <div className="next-grid">
        {NEXT_STEPS.map((s) => (
          <div key={s.no} className="next-card">
            <span className="next-no mono">{s.no}</span>
            <h3>{s.title}</h3>
            <p>{s.body}</p>
          </div>
        ))}
      </div>
      <button className="btn-ink" onClick={() => dispatch({ type: 'go', view: 'shop' })}>
        Continue shopping
      </button>
    </main>
  )
}
