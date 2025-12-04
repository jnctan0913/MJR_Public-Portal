'use client'

import { useState, useEffect } from 'react'
import { getConsentState, saveConsentState } from '@/lib/consent'

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false)
  const [showDetails, setShowDetails] = useState(false)

  useEffect(() => {
    // Check if user has already acknowledged the notice
    const consentState = getConsentState()
    
    if (!consentState) {
      // No acknowledgment recorded, show banner after short delay
      const timer = setTimeout(() => {
        setShowBanner(true)
      }, 1500)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleAccept = () => {
    saveConsentState(true)
    setShowBanner(false)
  }

  const handleDecline = () => {
    saveConsentState(false)
    setShowBanner(false)
    // Reload page to stop analytics
    window.location.reload()
  }

  if (!showBanner) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[9999] pointer-events-none">      
      {/* Cookie Banner - Singapore PDPA Style (Less Intrusive) */}
      <div className="relative w-full pointer-events-auto">
        <div className="bg-white border-t-4 border-dksh-red shadow-2xl">
          <div className="max-w-7xl mx-auto p-4 lg:p-6">
            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4">
              {/* Icon and Text */}
              <div className="flex items-start gap-3 flex-1">
                <div className="flex-shrink-0 w-10 h-10 bg-dksh-red/10 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-dksh-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-base lg:text-lg font-bold text-dksh-black font-poppins mb-1">
                    Cookie Notice
                  </h3>
                  <p className="text-xs lg:text-sm text-gray-700 font-poppins leading-relaxed">
                    We use cookies to enhance your experience and analyze site usage for improvement. 
                    Your IP is anonymized and no advertising data is collected. 
                    {!showDetails && (
                      <button 
                        onClick={() => setShowDetails(true)}
                        className="text-dksh-red hover:underline ml-1 font-medium"
                      >
                        Learn more
                      </button>
                    )}
                  </p>
                  
                  {showDetails && (
                    <div className="mt-3 p-3 bg-gray-50 rounded-lg border border-gray-200 text-xs text-gray-700">
                      <p className="mb-2"><strong>Analytics Cookies:</strong> Google Analytics (_ga, _gid) help us understand site usage. Valid for 2 years.</p>
                      <p className="mb-2"><strong>Data Privacy:</strong> IP addresses are anonymized. No advertising or personalization data is collected.</p>
                      <p><strong>Your Rights:</strong> You can opt out anytime via our <a href="/privacy-statement" className="text-dksh-red hover:underline">Privacy Statement</a>.</p>
                      <button 
                        onClick={() => setShowDetails(false)}
                        className="text-dksh-red hover:underline mt-2 font-medium"
                      >
                        Show less
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-2 w-full lg:w-auto">
                <button
                  onClick={handleAccept}
                  className="px-6 py-2.5 bg-dksh-red text-white rounded-full font-semibold font-poppins hover:bg-dksh-red/90 transition-all duration-300 shadow-md hover:shadow-lg text-sm whitespace-nowrap"
                >
                  Accept
                </button>
                <button
                  onClick={handleDecline}
                  className="px-6 py-2.5 bg-gray-200 text-dksh-black rounded-full font-semibold font-poppins hover:bg-gray-300 transition-all duration-300 text-sm whitespace-nowrap"
                >
                  Decline
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

