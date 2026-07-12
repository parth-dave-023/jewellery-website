import { useEffect } from 'react'
import { StoreProvider, useStore } from './store'
import Header from './components/Header'
import Hero from './components/Hero'
import ShapeStrip from './components/ShapeStrip'
import Collection from './components/Collection'
import {
  Bespoke,
  Craftsmanship,
  EditsBand,
  Faq,
  FourCs,
  Gallery,
  Journal,
  LookbookBand,
  Newsletter,
  PromiseBand,
  Testimonials,
} from './components/Sections'
import CartView from './components/CartView'
import CheckoutView from './components/CheckoutView'
import Confirmation from './components/Confirmation'
import CartDrawer, { WishlistPanel } from './components/CartDrawer'
import QuickView from './components/QuickView'
import Footer from './components/Footer'

function ShopView() {
  return (
    <>
      <Hero />
      <ShapeStrip />
      <EditsBand />
      <LookbookBand />
      <Collection />
      <Craftsmanship />
      <FourCs />
      <PromiseBand />
      <Bespoke />
      <Testimonials />
      <Journal />
      <Gallery />
      <Faq />
      <Newsletter />
    </>
  )
}

function Shell() {
  const { state } = useStore()

  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [state.view])

  useEffect(() => {
    const anyOverlay = state.drawerOpen || state.wishlistOpen || state.quickViewId !== null || state.searchOpen
    document.body.style.overflow = anyOverlay ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [state.drawerOpen, state.wishlistOpen, state.quickViewId, state.searchOpen])

  return (
    <>
      <Header />
      {state.view === 'shop' && <ShopView />}
      {state.view === 'cart' && <CartView />}
      {state.view === 'checkout' && <CheckoutView />}
      {state.view === 'confirmation' && <Confirmation />}
      {(state.view === 'shop' || state.view === 'cart') && <Footer />}
      <CartDrawer />
      <WishlistPanel />
      <QuickView />
    </>
  )
}

export default function App() {
  return (
    <StoreProvider>
      <Shell />
    </StoreProvider>
  )
}
