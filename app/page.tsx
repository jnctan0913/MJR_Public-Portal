'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/Header'
import HeroSection from '@/components/HeroSection'
import MainContentSection from '@/components/MainContentSection'
import YellowBandSection from '@/components/YellowBandSection'
import NotYourFaultSection from '@/components/NotYourFaultSection'
import WhyHardSection from '@/components/WhyHardSection'
import BMISection from '@/components/BMISection'
import ImpactSection from '@/components/ImpactSection'
import ReferencesSection from '@/components/ReferencesSection'
import Footer from '@/components/Footer'

export default function Home() {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)

  useEffect(() => {
    // Scroll to top on page load/reload
    window.scrollTo(0, 0)
  }, [])

  return (
    <main className="min-h-screen bg-white overflow-x-hidden">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-white/5 text-white px-4 py-2 rounded"
      >
        Skip to main content
      </a>
      {/* Header - Always fixed at top, slides up/down when video plays/closes */}
      <div
        className={`fixed top-0 z-50 w-full overflow-hidden transition-all duration-700 ${
          isVideoPlaying ? 'h-0' : 'h-auto'
        }`}
      >
        <div
          className={`transition-transform duration-700 ease-in-out ${
            isVideoPlaying ? '-translate-y-full' : 'translate-y-0'
          }`}
        >
          <Header />
        </div>
      </div>
      <div id="main-content" className="lg:pt-0">
        <HeroSection onVideoPlay={setIsVideoPlaying} />
        {/* Spacer to push content down below hero */}
        <div className="h-[calc(100vw*4/3+60px)] md:h-[calc(100vw*802/1600+90px)] lg:h-[calc(100vw*802/1600+80px)]"></div>
        <MainContentSection />
        <YellowBandSection />
        <NotYourFaultSection />
        <WhyHardSection />
        <BMISection />
        <ImpactSection />
        <ReferencesSection />
      </div>
      <Footer />
    </main>
  )
}

