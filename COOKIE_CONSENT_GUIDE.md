# Cookie Consent Implementation Guide
## Google Consent Mode v2 for Pharmaceutical Compliance

---

## 📋 Overview

This implementation provides GDPR/PDPA/CCPA-compliant cookie consent management for pharmaceutical marketing, using Google Consent Mode v2.

### ✅ Compliance Features
- **No tracking before consent** - GA4 only loads after user accepts
- **IP anonymization** - User privacy protected
- **2-year audit trail** - Meets regulatory requirements
- **No advertising signals** - Pharma-compliant
- **Consent storage** - Remembers user choice in localStorage
- **Transparent disclosure** - Clear cookie information

---

## 🏗️ Implementation Components

### 1. **lib/consent.ts**
Consent state management and Google Consent Mode integration
- `getConsentState()` - Retrieve stored consent
- `saveConsentState()` - Save user choice
- `updateGoogleConsent()` - Update GA4 consent
- `initializeGoogleConsent()` - Initialize with "denied" default

### 2. **components/CookieConsent.tsx**
Cookie consent banner UI
- Professional pharmaceutical-grade design
- Accept / Decline / Show Details options
- Mobile-responsive
- Appears 1 second after page load

### 3. **components/GoogleAnalytics.tsx**
GA4 integration with consent mode
- Initializes consent mode before GA loads
- Respects user consent choice
- Compliance-friendly configuration

### 4. **lib/analytics.ts**
Event tracking utilities (respects consent)
- `trackBMICalculation()`
- `trackVideoPlay()`
- `trackFormSubmission()`
- And more...

---

## 🎯 User Journey

### First Visit (No Consent)
1. User lands on site
2. After 1 second, cookie banner appears
3. **No tracking occurs** (consent mode = "denied")
4. User sees: Accept All / Decline / Show Details

### User Accepts
1. User clicks "Accept All"
2. Consent saved to localStorage
3. Google Consent Mode updated to "granted"
4. GA4 starts tracking
5. Banner disappears

### User Declines
1. User clicks "Decline"
2. Consent saved as "declined" to localStorage
3. Google Consent Mode remains "denied"
4. **No tracking occurs**
5. Banner disappears

### Return Visit
1. User lands on site
2. System checks localStorage
3. Applies stored consent automatically
4. **No banner shown** (already decided)

---

## 🔍 What Gets Tracked

### If User Accepts:
✅ Page views  
✅ BMI calculations  
✅ Video plays  
✅ Form submissions  
✅ CTA clicks  
✅ User journey  

### If User Declines:
❌ No tracking whatsoever  
❌ No cookies set  
❌ Complete privacy  

---

## 🍪 Cookies Stored

### Consent Cookie (localStorage)
- **Name**: `cookie_consent_v1`
- **Data**: `{ analytics: true/false, timestamp: number }`
- **Purpose**: Remember user's consent choice
- **Duration**: Permanent (until user clears browser data)

### Google Analytics Cookies (Only if accepted)
- **_ga**: Main tracking (2 years)
- **_ga_[ID]**: Session tracking (2 years)
- **_gid**: User identifier (24 hours)
- **_gat**: Request throttle (1 minute)

---

## 🛠️ Testing Consent Flow

### Test Accept Flow
1. Open site in incognito/private window
2. Wait for banner to appear
3. Click "Accept All"
4. Open DevTools → Application → Local Storage
5. Verify `cookie_consent_v1` = `{"analytics":true,...}`
6. Check Network tab for GA requests
7. Refresh page - banner should NOT appear

### Test Decline Flow
1. Open site in incognito/private window
2. Wait for banner to appear
3. Click "Decline"
4. Open DevTools → Application → Local Storage
5. Verify `cookie_consent_v1` = `{"analytics":false,...}`
6. Check Network tab - NO GA requests
7. Refresh page - banner should NOT appear

### Reset Consent (For Testing)
```javascript
// Open DevTools Console and run:
localStorage.removeItem('cookie_consent_v1')
// Then refresh page
```

---

## 📊 Verifying in Google Analytics

### Check Real-time Reports
1. Go to Google Analytics
2. Navigate to: **Reports** → **Realtime**
3. Accept cookies on your site
4. Within 30 seconds, you should appear in real-time view
5. Navigate pages - verify they're tracked

### Check Consent Status
1. Open DevTools Console
2. Type: `window.dataLayer`
3. Look for consent events: `'consent', 'default'` and `'consent', 'update'`

---

## 🔐 Regulatory Compliance

### GDPR (Europe)
✅ Explicit consent before tracking  
✅ Clear cookie information  
✅ Easy opt-out  
✅ Data minimization  

### PDPA (Singapore)
✅ Transparent disclosure  
✅ User control  
✅ Purpose limitation  

### CCPA (California)
✅ Opt-out mechanism  
✅ Clear privacy notice  

### Pharmaceutical Regulations
✅ No advertising signals  
✅ Audit trail (2 years)  
✅ IP anonymization  
✅ Transparent tracking  

---

## 🎨 Customization

### Change Banner Delay
Edit `components/CookieConsent.tsx`:
```typescript
setTimeout(() => {
  setShowBanner(true)
}, 1000) // Change to 2000 for 2 seconds
```

### Change Cookie Duration
Cookie duration is controlled by GA4 config in `components/GoogleAnalytics.tsx`:
```javascript
cookie_expires: 63072000  // 2 years (in seconds)
```

### Change Banner Position
Edit `components/CookieConsent.tsx`:
```tsx
className="fixed inset-0 z-[9999] flex items-end justify-center"
// Change items-end to items-start for top position
// Change items-end to items-center for center position
```

---

## 📝 Privacy Statement Integration

The banner links to `/privacy-statement`. Ensure your privacy page includes:
- What cookies are used
- Why they're used
- How to manage preferences
- Data retention periods
- Contact information

---

## 🚀 Production Checklist

Before going live:
- [ ] Test accept flow
- [ ] Test decline flow
- [ ] Test on mobile devices
- [ ] Verify GA4 receives data only after consent
- [ ] Check Privacy Statement link works
- [ ] Test in multiple browsers (Chrome, Safari, Firefox)
- [ ] Verify consent persists across page refreshes
- [ ] Check localStorage stores consent correctly
- [ ] Review with legal/compliance team
- [ ] Document in SOPs

---

## 🔄 Future Enhancements

Consider adding:
- **Preference Center**: Let users manage cookie categories
- **Consent API**: Integrate with consent management platform
- **A/B Testing**: Test banner copy for higher acceptance
- **Analytics on Consent**: Track acceptance rates
- **Regional Detection**: Auto-show banner only in regulated regions

---

## 📞 Support

For questions or issues:
1. Check this guide first
2. Review Google Consent Mode v2 documentation
3. Consult with compliance team
4. Contact development team

---

**Implementation Date**: December 2025  
**Last Updated**: December 2025  
**Compliance Standard**: GDPR/PDPA/CCPA + Pharmaceutical Marketing

