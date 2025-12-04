// Google Analytics Event Tracking Utilities
// For pharmaceutical marketing compliance tracking

declare global {
  interface Window {
    gtag?: (
      command: 'event' | 'config' | 'set',
      targetId: string,
      config?: Record<string, any>
    ) => void
  }
}

/**
 * Track custom events for compliance reporting
 * @param eventName - Name of the event (e.g., 'bmi_calculator_used')
 * @param parameters - Additional event parameters
 */
export const trackEvent = (
  eventName: string,
  parameters?: Record<string, any>
) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, parameters)
  }
}

/**
 * Track page views manually (useful for SPA navigation)
 * @param url - Page URL
 * @param title - Page title
 */
export const trackPageView = (url: string, title?: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'page_view', {
      page_path: url,
      page_title: title || document.title,
    })
  }
}

// Predefined events for pharma compliance tracking

export const trackBMICalculation = (bmi: number, category: string) => {
  trackEvent('bmi_calculation', {
    bmi_value: bmi,
    bmi_category: category,
    event_category: 'engagement',
  })
}

export const trackVideoPlay = (videoTitle: string, section: string) => {
  trackEvent('video_play', {
    video_title: videoTitle,
    section: section,
    event_category: 'engagement',
  })
}

export const trackFormSubmission = (formName: string, formType: string) => {
  trackEvent('form_submission', {
    form_name: formName,
    form_type: formType,
    event_category: 'conversion',
  })
}

export const trackButtonClick = (buttonName: string, buttonLocation: string) => {
  trackEvent('button_click', {
    button_name: buttonName,
    button_location: buttonLocation,
    event_category: 'interaction',
  })
}

export const trackCTAClick = (ctaText: string, ctaDestination: string) => {
  trackEvent('cta_click', {
    cta_text: ctaText,
    cta_destination: ctaDestination,
    event_category: 'conversion',
  })
}

export const trackExternalLink = (linkUrl: string, linkText: string) => {
  trackEvent('outbound_link', {
    link_url: linkUrl,
    link_text: linkText,
    event_category: 'navigation',
  })
}

