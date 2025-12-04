// Cookie Consent Management for Pharmaceutical Marketing Compliance
// Complies with GDPR, PDPA, CCPA, and pharma regulations

export type ConsentState = {
  analytics: boolean
  timestamp: number
}

const CONSENT_STORAGE_KEY = 'cookie_consent_v1'

/**
 * Get current consent state from localStorage
 */
export const getConsentState = (): ConsentState | null => {
  if (typeof window === 'undefined') return null
  
  try {
    const stored = localStorage.getItem(CONSENT_STORAGE_KEY)
    if (!stored) return null
    return JSON.parse(stored) as ConsentState
  } catch {
    return null
  }
}

/**
 * Save consent state to localStorage
 */
export const saveConsentState = (analytics: boolean): void => {
  if (typeof window === 'undefined') return
  
  const state: ConsentState = {
    analytics,
    timestamp: Date.now(),
  }
  
  try {
    localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(state))
  } catch (error) {
    console.error('Failed to save consent state:', error)
  }
}

/**
 * Update Google Consent Mode
 */
export const updateGoogleConsent = (analytics: boolean): void => {
  if (typeof window === 'undefined' || !window.gtag) return
  
  window.gtag('consent', 'update', {
    analytics_storage: analytics ? 'granted' : 'denied',
    ad_storage: 'denied', // Always denied for pharma compliance
    ad_user_data: 'denied',
    ad_personalization: 'denied',
  })
}

/**
 * Initialize Google Consent Mode with default (denied) state
 */
export const initializeGoogleConsent = (): void => {
  if (typeof window === 'undefined') return
  
  // Set default consent state (denied) before GA loads
  window.gtag = window.gtag || function() {
    (window as any).dataLayer = (window as any).dataLayer || []
    ;(window as any).dataLayer.push(arguments)
  }
  
  window.gtag('consent', 'default', {
    analytics_storage: 'denied',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    wait_for_update: 500, // Wait 500ms for user consent
  })
}

declare global {
  interface Window {
    gtag?: (
      command: 'event' | 'config' | 'set' | 'consent',
      targetId: string,
      config?: Record<string, any>
    ) => void
    dataLayer?: any[]
  }
}

