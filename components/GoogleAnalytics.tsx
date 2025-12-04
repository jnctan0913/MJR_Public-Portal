'use client'

import { useEffect } from 'react'
import Script from 'next/script'
import { initializeGoogleConsent } from '@/lib/consent'

export default function GoogleAnalytics() {
  const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

  useEffect(() => {
    // Initialize consent mode with default "denied" state before GA loads
    initializeGoogleConsent()
  }, [])

  if (!GA_MEASUREMENT_ID) {
    return null
  }

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            
            // Configure GA4 with compliance-friendly settings for pharmaceutical marketing
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
              anonymize_ip: true,  // IP anonymization for privacy compliance
              cookie_flags: 'SameSite=None;Secure',  // Cookie security
              cookie_expires: 63072000,  // 2 years retention for audit trails
              send_page_view: true,
              allow_google_signals: false,  // Disable advertising features
              allow_ad_personalization_signals: false,  // Disable ad personalization
            });
            
            // Make gtag available globally for event tracking
            window.gtag = gtag;
          `,
        }}
      />
    </>
  )
}

