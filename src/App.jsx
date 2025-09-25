import React from 'react'
import { CurrencyProvider } from './context/CurrencyContext'
import Header from './components/Header'
import Hero from './components/Hero'
import Features from './components/Features'
import About from './components/About'
import Services from './components/Services'
import Portfolio from './components/Portfolio'
import Contact from './components/Contact'
import Footer from './components/Footer'

function App() {
  return (
    <CurrencyProvider>
      <div className="min-h-screen bg-neutral-50">
        <Header />
        <main>
          <Hero />
          <Features />
          <About />
          <Services />
          <Portfolio />
          <Contact />
        </main>
        <Footer />
      </div>
    </CurrencyProvider>
  )
}

export default App
