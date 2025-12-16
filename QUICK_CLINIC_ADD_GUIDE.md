# Quick Guide: Adding Sample Clinics via Sanity Studio

Since API tokens require additional permissions, the easiest way to add clinics is through the Sanity Studio UI.

## Access the Studio

Visit: **https://mjr-public-portal.sanity.studio**

Sign in with: **event.dksh@gmail.com**

## Quick Add: 6 Sample Clinics

### 1. DKSH Healthcare Clinic - Orchard ⭐ Featured

Click **"Clinic"** → **"+ Create"**

**Basic Info:**
- Name: `DKSH Healthcare Clinic - Orchard`
- Clinic Type: `Both Clinic & Telehealth`
- Area: `Central`
- Featured: `✓ Yes`

**Address:**
- Street: `391A Orchard Road`
- Unit: `#05-01 Ngee Ann City Tower A`
- City: `Singapore`
- Postal Code: `238873`
- Country: `Singapore`

**Location (click map):**
- Latitude: `1.3027`
- Longitude: `103.8346`

**Contact:**
- Phone: `+65 6734 5678`
- Email: `orchard@dkshhealthcare.com.sg`
- Fax: `+65 6734 5679`

**Hours:**
- Mon-Fri: `9:00 AM - 6:00 PM`
- Saturday: `9:00 AM - 1:00 PM`
- Sunday: `Closed`

**Services:**
- Obesity Management
- Weight Loss Consultation
- Nutritional Counseling
- Metabolic Health Assessment
- Telehealth Consultations

**Description:**
```
Our flagship clinic in the heart of Orchard offers comprehensive obesity management services with both in-person and telehealth options.
```

Click **"Publish"**

---

### 2. DKSH Medical Center - Raffles Place ⭐ Featured

**Basic Info:**
- Name: `DKSH Medical Center - Raffles Place`
- Clinic Type: `Physical Clinic`
- Area: `Central`
- Featured: `✓ Yes`

**Address:**
- Street: `6 Battery Road`
- Unit: `#15-01`
- City: `Singapore`
- Postal Code: `049909`
- Country: `Singapore`

**Location:**
- Latitude: `1.2854`
- Longitude: `103.8510`

**Contact:**
- Phone: `+65 6532 1234`
- Email: `raffles@dkshhealthcare.com.sg`

**Hours:**
- Mon-Fri: `8:00 AM - 5:00 PM`
- Sat-Sun: `Closed`

**Services:**
- Obesity Management
- Executive Health Screening
- Weight Loss Programs
- Dietary Planning

**Description:**
```
Conveniently located in the CBD, perfect for working professionals seeking obesity management solutions.
```

Click **"Publish"**

---

### 3. DKSH Wellness Clinic - Tampines

**Basic Info:**
- Name: `DKSH Wellness Clinic - Tampines`
- Clinic Type: `Physical Clinic`
- Area: `East`
- Featured: `☐ No`

**Address:**
- Street: `201E Tampines Street 23`
- Unit: `#02-123`
- City: `Singapore`
- Postal Code: `527201`
- Country: `Singapore`

**Location:**
- Latitude: `1.3520`
- Longitude: `103.9446`

**Contact:**
- Phone: `+65 6788 4567`
- Email: `tampines@dkshhealthcare.com.sg`

**Hours:**
- Mon-Fri: `9:00 AM - 9:00 PM`
- Saturday: `9:00 AM - 5:00 PM`
- Sunday: `9:00 AM - 1:00 PM`

**Services:**
- Obesity Management
- Weight Loss Consultation
- Family Health Services
- Nutrition Counseling

**Description:**
```
Community-focused clinic in the East, offering extended hours for families seeking weight management support.
```

Click **"Publish"**

---

### 4. DKSH TeleHealth Services

**Basic Info:**
- Name: `DKSH TeleHealth Services`
- Clinic Type: `Telehealth`
- Area: `(leave empty)`
- Featured: `☐ No`

**Address:**
- Street: `Online Consultation`
- Unit: `(leave empty)`
- City: `Singapore`
- Postal Code: `000000`
- Country: `Singapore`

**Location:** `(leave empty for telehealth)`

**Contact:**
- Phone: `+65 6000 1234`
- Email: `telehealth@dkshhealthcare.com.sg`

**Hours:**
- Mon-Fri: `8:00 AM - 10:00 PM`
- Sat-Sun: `9:00 AM - 6:00 PM`

**Services:**
- Virtual Obesity Consultations
- Online Weight Management
- Remote Monitoring
- Digital Health Coaching

**Description:**
```
Access expert obesity management from the comfort of your home with our comprehensive telehealth services.
```

Click **"Publish"**

---

### 5. DKSH Health Hub - Jurong East

**Basic Info:**
- Name: `DKSH Health Hub - Jurong East`
- Clinic Type: `Both Clinic & Telehealth`
- Area: `West`
- Featured: `☐ No`

**Address:**
- Street: `3 Venture Drive`
- Unit: `#01-23`
- City: `Singapore`
- Postal Code: `608526`
- Country: `Singapore`

**Location:**
- Latitude: `1.3294`
- Longitude: `103.7443`

**Contact:**
- Phone: `+65 6567 8901`
- Email: `jurong@dkshhealthcare.com.sg`

**Hours:**
- Mon-Fri: `9:00 AM - 7:00 PM`
- Saturday: `9:00 AM - 2:00 PM`
- Sunday: `Closed`

**Services:**
- Obesity Management
- Weight Loss Programs
- Fitness Assessment
- Nutritional Counseling
- Telehealth Options

**Description:**
```
Modern health hub serving the West region with flexible in-person and virtual consultation options.
```

Click **"Publish"**

---

### 6. DKSH Family Clinic - Woodlands

**Basic Info:**
- Name: `DKSH Family Clinic - Woodlands`
- Clinic Type: `Physical Clinic`
- Area: `North`
- Featured: `☐ No`

**Address:**
- Street: `21 Woodlands Close`
- Unit: `#03-45 Primz Bizhub`
- City: `Singapore`
- Postal Code: `737854`
- Country: `Singapore`

**Location:**
- Latitude: `1.4355`
- Longitude: `103.8048`

**Contact:**
- Phone: `+65 6363 7890`
- Email: `woodlands@dkshhealthcare.com.sg`

**Hours:**
- Mon-Fri: `8:30 AM - 8:00 PM`
- Saturday: `8:30 AM - 4:00 PM`
- Sunday: `Closed`

**Services:**
- Obesity Management
- Family Health Services
- Weight Loss Consultation
- Lifestyle Modification Programs

**Description:**
```
Family-oriented clinic in the North offering personalized obesity management for all ages.
```

Click **"Publish"**

---

## Verify Your Clinics

After adding all 6 clinics:

1. **In Sanity Studio:**
   - You should see all 6 clinics listed
   - 2 should show as "Featured"

2. **On Your Website:**
   - Run: `npm run dev`
   - Visit: http://localhost:3000/act-now
   - You should see all 6 clinics displayed
   - Test the filters (Clinic Type and Area)

## Tips

- **Slug auto-generation:** The slug will auto-generate from the name
- **Location field:** Click the map to set coordinates, or enter manually
- **Services:** Press Enter after each service to add a new one
- **Required fields:** Name, Clinic Type, and Slug are required
- **Save vs Publish:** Always click "Publish" to make clinics visible on the website

## Summary

**Clinic Distribution:**
- Central: 2 (both Featured)
- East: 1
- West: 1
- North: 1
- Telehealth only: 1

**Clinic Types:**
- Physical Clinic: 3
- Telehealth: 1
- Both: 2
