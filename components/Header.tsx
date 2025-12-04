'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

export default function Header() {
  const [activeLink, setActiveLink] = useState('home')
  const [hideGlobalNav, setHideGlobalNav] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navLinks = [
    { id: 'home', label: 'Now We Know' },
    { id: 'understanding', label: 'Understanding obesity' },
    { id: 'act-now', label: 'Act Now!' },
  ]

  useEffect(() => {
    const bmiSection = document.getElementById('bmi-section')
    if (!bmiSection) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Hide global nav when BMI section is near top of viewport
        const rect = entry.boundingClientRect
        const isNearTop = rect.top < 200 && rect.top > -rect.height
        setHideGlobalNav(isNearTop)
      },
      {
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5], // Multiple thresholds for smoother detection
        rootMargin: '0px 0px 0px 0px'
      }
    )

    observer.observe(bmiSection)
    return () => observer.disconnect()
  }, [])

  return (
    <header className="bg-white w-full shadow-md">
      {/* Global Nav - Trapezium Shape covering 2/3 of page - Hidden on mobile */}
      <div
        className={`hidden lg:block relative w-full bg-white overflow-hidden transition-all duration-300 ease-in-out ${
          hideGlobalNav ? 'h-0 opacity-0' : 'h-11 opacity-100'
        }`}
      >
        {/* Trapezium Background */}
        <div
          className="absolute right-0 h-full bg-dksh-light-gray"
          style={{
            width: '66.67%', // 2/3 of page
            clipPath: 'polygon(8% 0, 100% 0, 100% 100%, 0% 100%)',
          }}
        />

        {/* Content Container */}
        <div className="relative max-w-[1600px] mx-auto h-full flex items-center justify-end pr-4 md:pr-8 lg:pr-20">
          <div className="flex items-center gap-4 md:gap-8">
            {/* DKSH Icon */}
            <Image
              src="/images/DKSH-icon.png"
              alt="DKSH"
              width={80}
              height={77}
              className="object-contain"
            />

            {/* Global Nav Buttons */}
            <div className="flex gap-2 md:gap-4">
              <button
                onClick={() => {
                  const bmiSection = document.getElementById('bmi-section')
                  if (bmiSection) {
                    bmiSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
                  }
                }}
                className="h-[33px] px-3 md:px-6 bg-white border border-[#c6c6c6] rounded-button text-dksh-dark-gray text-xs md:text-sm font-bold font-poppins hover:bg-dksh-off-white hover:border-dksh-red transition-all duration-300 whitespace-nowrap"
              >
                BMI Calculator
              </button>
              <button
                className="h-[33px] px-3 md:px-6 bg-dksh-red border border-dksh-red rounded-button text-white text-xs md:text-sm font-bold font-poppins hover:bg-dksh-dark-red hover:border-dksh-dark-red transition-all duration-300 shadow-sm whitespace-nowrap"
              >
                Talk to A Doctor
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header Content */}
      <div className="max-w-[1600px] mx-auto">
        <div className="flex items-center justify-between h-[60px] md:h-[74px] px-4 md:px-8 lg:px-20 border-b border-[#ececec]">
          {/* Logo */}
          <a href="/" className="flex items-center">
            <div className="w-[180px] md:w-[220px] lg:w-[250px] h-[50px] md:h-[60px] lg:h-[69px] relative">
              <Image
                src="/images/OIAD.png"
                alt="DKSH"
                fill
                className="object-contain object-left"
                priority
              />
            </div>
          </a>

          {/* Mobile Menu Button with DKSH Icon */}
          <div className="lg:hidden flex items-center gap-3">
            {/* DKSH Icon for Mobile */}
            <div className="relative w-[72px] h-[72px]">
              <Image
                src="/images/DKSH-icon.png"
                alt="DKSH"
                fill
                className="object-contain"
              />
            </div>

            {/* Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-dksh-black hover:bg-gray-100 rounded-lg transition-colors min-h-[44px] min-w-[44px] touch-manipulation"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Desktop Primary Navigation */}
          <nav className="hidden lg:flex h-[72px]">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => {
                  e.preventDefault()
                  setActiveLink(link.id)
                }}
                className={`
                  px-3 flex items-center justify-center text-base font-poppins transition-colors duration-300 relative
                  ${activeLink === link.id
                    ? 'font-bold text-dksh-black'
                    : 'font-normal text-dksh-black hover:bg-dksh-off-white/70'
                  }
                `}
              >
                {link.label}
                {activeLink === link.id && (
                  <span className="absolute bottom-0 left-3 right-3 h-[3px] bg-dksh-red"></span>
                )}
              </a>
            ))}
          </nav>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden bg-white border-b border-[#ececec] overflow-hidden transition-all duration-300 ease-in-out ${
          mobileMenuOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <nav className="px-4 py-4 space-y-2">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={(e) => {
                e.preventDefault()
                setActiveLink(link.id)
                setMobileMenuOpen(false)
              }}
              className={`block px-4 py-3 rounded-lg font-poppins transition-colors min-h-[44px] touch-manipulation relative ${
                activeLink === link.id
                  ? 'font-bold text-dksh-black'
                  : 'font-normal text-dksh-black hover:bg-dksh-off-white/70'
              }`}
            >
              {link.label}
              {activeLink === link.id && (
                <span className="absolute left-0 top-0 bottom-0 w-[3px] bg-dksh-red rounded-r"></span>
              )}
            </a>
          ))}

          {/* Mobile Action Buttons */}
          <div className="pt-4 space-y-2 border-t border-gray-200">
            <button
              onClick={() => {
                const bmiSection = document.getElementById('bmi-section')
                if (bmiSection) {
                  bmiSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
                  setMobileMenuOpen(false)
                }
              }}
              className="w-full px-4 py-3 bg-white border-2 border-dksh-red rounded-button text-dksh-red text-base font-bold font-poppins hover:bg-dksh-red hover:text-white transition-all duration-300 min-h-[44px] touch-manipulation"
            >
              BMI Calculator
            </button>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="w-full px-4 py-3 bg-dksh-red rounded-button text-white text-base font-bold font-poppins hover:bg-dksh-dark-red transition-all duration-300 min-h-[44px] touch-manipulation"
            >
              Talk to A Doctor
            </button>
          </div>
        </nav>
      </div>
    </header>
  )
}
