'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

export default function Header() {
  const [activeLink, setActiveLink] = useState('home')
  const [hideGlobalNav, setHideGlobalNav] = useState(false)

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
        // Hide global nav when BMI section is in view
        setHideGlobalNav(entry.isIntersecting)
      },
      {
        threshold: 0.1, // Trigger when 10% of the section is visible
        rootMargin: '-100px 0px 0px 0px' // Account for sticky header
      }
    )

    observer.observe(bmiSection)
    return () => observer.disconnect()
  }, [])

  return (
    <header className="bg-white w-full shadow-md">
      {/* Global Nav - Trapezium Shape covering 2/3 of page */}
      <div
        className={`relative w-full bg-white overflow-hidden transition-all duration-300 ease-in-out ${
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
        <div className="relative max-w-[1600px] mx-auto h-full flex items-center justify-end pr-20">
          <div className="flex items-center gap-8">
            {/* DKSH Icon */}
            <Image
              src="/images/DKSH-icon.png"
              alt="DKSH"
              width={80}
              height={77}
              className="object-contain"
            />

            {/* Global Nav Buttons */}
            <div className="flex gap-4">
              <button
                onClick={() => {
                  const bmiSection = document.getElementById('bmi-section')
                  if (bmiSection) {
                    bmiSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
                  }
                }}
                className="h-[33px] px-6 bg-white border border-[#c6c6c6] rounded-button text-dksh-dark-gray text-sm font-bold font-poppins hover:bg-dksh-off-white hover:border-dksh-red transition-all duration-300"
              >
                BMI Calculator
              </button>
              <button
                className="h-[33px] px-6 bg-dksh-red border border-dksh-red rounded-button text-white text-sm font-bold font-poppins hover:bg-dksh-dark-red hover:border-dksh-dark-red transition-all duration-300 shadow-sm"
              >
                Talk to A Doctor
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header Content */}
      <div className="max-w-[1600px] mx-auto">
        <div className="flex items-center justify-between h-[74px] px-20 border-b border-[#ececec]">
          {/* Logo */}
          <a href="/" className="flex items-center">
            <div className="w-[250px] h-[69px] relative">
              <Image
                src="/images/OIAD.png"
                alt="DKSH"
                width={250}
                height={69}
                className="object-contain"
                priority
              />
            </div>
          </a>

          {/* Primary Navigation */}
          <nav className="flex h-[72px]">
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
    </header>
  )
}
