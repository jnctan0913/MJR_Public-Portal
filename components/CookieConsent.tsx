'use client'

import { useState, useEffect } from 'react'
import { getConsentState, saveConsentState, updateGoogleConsent } from '@/lib/consent'

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false)
  const [showDetails, setShowDetails] = useState(false)

  useEffect(() => {
    // Check if user has already made a choice
    const consentState = getConsentState()
    
    if (!consentState) {
      // No consent recorded, show banner after short delay
      const timer = setTimeout(() => {
        setShowBanner(true)
      }, 1000)
      return () => clearTimeout(timer)
    } else {
      // Apply stored consent
      updateGoogleConsent(consentState.analytics)
    }
  }, [])

  const handleAccept = () => {
    saveConsentState(true)
    updateGoogleConsent(true)
    setShowBanner(false)
  }

  const handleDecline = () => {
    saveConsentState(false)
    updateGoogleConsent(false)
    setShowBanner(false)
  }

  if (!showBanner) return null

  return (
    <div className="fixed inset-0 z-[9999] flex items-end justify-center pointer-events-none">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm pointer-events-auto" />
      
      {/* Cookie Banner */}
      <div className="relative w-full max-w-7xl mx-4 mb-4 lg:mb-8 pointer-events-auto">
        <div className="bg-white rounded-2xl shadow-2xl border-2 border-dksh-red/20 overflow-hidden">
          <div className="p-6 lg:p-8">
            <div className="flex items-start gap-4 mb-4">
              <div className="flex-shrink-0 w-12 h-12 bg-dksh-red/10 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-dksh-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-xl lg:text-2xl font-bold text-dksh-black font-poppins mb-2">
                  Cookie Consent
                </h3>
                <p className="text-sm lg:text-base text-gray-700 font-poppins leading-relaxed">
                  We use cookies to enhance your browsing experience and analyze our website traffic. 
                  This helps us understand how visitors interact with our site and improve our services.
                </p>
                
                {showDetails && (
                  <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <h4 className="font-semibold text-dksh-black mb-2 font-poppins">Cookie Details:</h4>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li className="flex items-start">
                        <span className="font-medium min-w-[140px]">Analytics Cookies:</span>
                        <span>Google Analytics (_ga, _gid) - Help us understand site usage and improve user experience. Valid for 2 years.</span>
                      </li>
                      <li className="flex items-start">
                        <span className="font-medium min-w-[140px]">Data Processing:</span>
                        <span>Your IP address is anonymized. No advertising or personalization data is collected.</span>
                      </li>
                      <li className="flex items-start">
                        <span className="font-medium min-w-[140px]">Your Rights:</span>
                        <span>You can change your preferences at any time via our Privacy Statement.</span>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              <button
                onClick={handleAccept}
                className="flex-1 sm:flex-initial sm:min-w-[160px] px-6 py-3 bg-dksh-red text-white rounded-full font-semibold font-poppins hover:bg-dksh-red/90 transition-all duration-300 shadow-md hover:shadow-lg"
              >
                Accept All
              </button>
              <button
                onClick={handleDecline}
                className="flex-1 sm:flex-initial sm:min-w-[160px] px-6 py-3 bg-gray-200 text-dksh-black rounded-full font-semibold font-poppins hover:bg-gray-300 transition-all duration-300"
              >
                Decline
              </button>
              <button
                onClick={() => setShowDetails(!showDetails)}
                className="flex-1 sm:flex-initial sm:min-w-[160px] px-6 py-3 border-2 border-gray-300 text-dksh-black rounded-full font-semibold font-poppins hover:border-dksh-red hover:text-dksh-red transition-all duration-300"
              >
                {showDetails ? 'Hide Details' : 'Show Details'}
              </button>
            </div>

            <p className="mt-4 text-xs text-gray-500 text-center font-poppins">
              By clicking "Accept All", you consent to our use of cookies. 
              View our <a href="/privacy-statement" className="text-dksh-red hover:underline">Privacy Statement</a> for more information.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

