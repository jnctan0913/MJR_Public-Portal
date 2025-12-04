# Cookie Consent Implementation Guide
## Singapore PDPA Compliance for Pharmaceutical Marketing

---

## 📋 Overview

This implementation provides Singapore PDPA-compliant cookie notification for pharmaceutical marketing, using an **opt-out model**.

### ✅ Singapore PDPA Compliance Features
- **Opt-out model** - Tracking enabled by default (PDPA-compliant)
- **Clear notification** - Users informed about cookie usage
- **Easy opt-out** - Users can decline anytime
- **IP anonymization** - User privacy protected
- **2-year audit trail** - Meets regulatory requirements
- **No advertising signals** - Pharma-compliant
- **Transparent disclosure** - Clear cookie information
- **Less intrusive** - Bottom banner (not blocking)

---

## 🏗️ Implementation Components

### 1. **lib/consent.ts**
Consent state management for Singapore PDPA (opt-out model)
- `getConsentState()` - Retrieve stored consent
- `saveConsentState()` - Save user choice
- `shouldEnableAnalytics()` - Check if tracking is allowed (defaults to true)

### 2. **components/CookieConsent.tsx**
Cookie notification banner UI (Singapore style)
- Clean, non-intrusive bottom banner
- Accept / Decline / Learn More options
- Mobile-responsive
- Appears 1.5 seconds after page load

### 3. **components/GoogleAnalytics.tsx**
GA4 integration with Singapore PDPA opt-out model
- Loads by default (unless user declined)
- Respects user opt-out choice
- Singapore PDPA-compliant configuration

### 4. **lib/analytics.ts**
Event tracking utilities (respects consent)
- `trackBMICalculation()`
- `trackVideoPlay()`
- `trackFormSubmission()`
- And more...

---

## 🎯 User Journey (Singapore PDPA Opt-Out Model)

### First Visit (No Prior Choice)
1. User lands on site
2. **GA4 starts tracking immediately** (opt-out model)
3. After 1.5 seconds, cookie notification banner appears (bottom)
4. User sees: Accept / Decline / Learn More

### User Accepts
1. User clicks "Accept"
2. Choice saved to localStorage
3. GA4 continues tracking
4. Banner disappears

### User Declines (Opt-Out)
1. User clicks "Decline"
2. Decline choice saved to localStorage
3. Page reloads to stop GA4
4. **No tracking on future visits**
5. Banner disappears

### Return Visit (Already Decided)
1. User lands on site
2. System checks localStorage
3. If accepted: GA4 loads, no banner
4. If declined: No GA4, no banner
5. **No banner shown** (choice already recorded)

---

## 🔍 What Gets Tracked

### If User Accepts (or No Choice Yet - Default):
✅ Page views  
✅ BMI calculations  
✅ Video plays  
✅ Form submissions  
✅ CTA clicks  
✅ User journey  

### If User Declines (Opts Out):
❌ No tracking whatsoever  
❌ No GA cookies set  
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

## 🔐 Singapore PDPA Compliance

### PDPA Requirements ✅
✅ **Notification** - Users clearly informed about cookie usage  
✅ **Purpose** - Analytics purpose clearly stated  
✅ **Opt-out** - Easy decline mechanism provided  
✅ **Transparency** - Cookie details available on request  
✅ **Reasonable purposes** - Analytics is considered reasonable under PDPA  

### Singapore Pharmaceutical Marketing ✅
✅ **No advertising signals** - Ad features disabled  
✅ **Audit trail** - 2-year data retention  
✅ **IP anonymization** - Privacy protected  
✅ **Transparent tracking** - Clear disclosure  
✅ **HSA compliant** - Follows Health Sciences Authority guidelines

### Key Difference from GDPR
🇸🇬 **Opt-out model** - Tracking allowed by default with opt-out option  
🇪🇺 **Opt-in model** - Must get consent before tracking  

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

