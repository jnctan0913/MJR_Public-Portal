// Cookie Consent Management for Singapore PDPA Compliance
// Opt-out model for Singapore pharmaceutical marketing

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
 * Check if analytics should be enabled
 * Singapore PDPA uses opt-out model (enabled by default unless user declines)
 */
export const shouldEnableAnalytics = (): boolean => {
  const consentState = getConsentState()
  
  // If no consent state exists, default to enabled (Singapore opt-out model)
  if (!consentState) return true
  
  // Otherwise, respect user's choice
  return consentState.analytics
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

