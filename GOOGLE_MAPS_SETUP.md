# Google Maps Integration Setup Guide

This guide explains how to set up and use the Google Maps integration for the clinic finder feature.

## Prerequisites

1. Google Cloud Platform account
2. Google Maps JavaScript API enabled
3. Google Maps API Key

## Getting Your Google Maps API Key

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Navigate to **APIs & Services** → **Credentials**
4. Click **Create Credentials** → **API Key**
5. Copy your API key
6. (Recommended) Restrict your API key:
   - Click on your API key to edit it
   - Under "Application restrictions", select "HTTP referrers"
   - Add your website domains (e.g., `yourwebsite.com/*`, `localhost:3000/*`)
   - Under "API restrictions", select "Restrict key"
   - Enable only **Maps JavaScript API** and **Geocoding API**

## Setting Up the API Key

1. Open the `.env.local` file in the root directory
2. Replace `YOUR_GOOGLE_MAPS_API_KEY` with your actual API key:

```env
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=AIzaSy...your-actual-key-here
```

3. Save the file
4. Restart your development server if it's running

## Features

### 1. **Interactive Map View**
- Toggle between grid and map views using the view switcher
- All physical clinic locations are displayed as markers on the map
- Click on markers to see clinic details in an info window
- Telehealth-only services are excluded from the map

### 2. **Postal Code Search**
- Enter a 6-digit Singapore postal code to find nearby clinics
- Uses OneMap API (Singapore's official mapping service) - no API key required for this feature
- Automatically switches to map view and centers on the searched location
- Displays the 5 nearest clinics with distances

### 3. **Location-Based Search**
- Click "Use My Current Location" to find clinics near you
- Requires browser geolocation permission
- Shows distance to each clinic in kilometers or meters
- Sorts clinics by proximity to your location

### 4. **Address Search**
- Search by street name, building name, or any Singapore address
- Geocoding is handled by OneMap API (free service)

### 5. **Nearest Clinics List**
- When a search is performed, a list of the 5 nearest clinics is displayed
- Click on any clinic in the list to highlight it on the map
- Shows distance from your search location

## Using the Map

### Switching to Map View

1. Navigate to the "Act Now" page
2. Click the **Map** button in the view toggle
3. The map will display all clinic locations

### Searching for Nearby Clinics

**By Postal Code:**
```
Example: 238882
```

**By Address:**
```
Examples:
- Orchard Road
- Marina Bay Sands
- 1 Raffles Place
```

**By Current Location:**
- Click the "Use My Current Location" button
- Allow browser location access when prompted
- The map will center on your location and show nearby clinics

### Interacting with the Map

- **Zoom**: Use the + and - buttons or scroll wheel
- **Pan**: Click and drag the map
- **Marker Click**: Click any red marker to see clinic details
- **Get Directions**: Click "Get Directions" in the info window to open Google Maps directions

## Troubleshooting

### Map Doesn't Load

**Issue**: "Google Maps API Key Required" message appears

**Solution**:
1. Make sure you've added your API key to `.env.local`
2. Ensure the key is prefixed with `NEXT_PUBLIC_`
3. Restart your development server

### Geolocation Doesn't Work

**Issue**: "Unable to get your location" error

**Solution**:
1. Check browser permissions for location access
2. Ensure you're using HTTPS (required for geolocation)
3. Some browsers block geolocation on localhost - try using `127.0.0.1` instead

### Postal Code Search Returns No Results

**Issue**: Singapore postal code search fails

**Solution**:
1. Ensure the postal code is exactly 6 digits
2. Try a different postal code
3. Check internet connectivity (OneMap API requires internet access)

### Map Markers Don't Appear

**Issue**: Map loads but no clinic markers show

**Solution**:
1. Check that clinics have valid `location` data (lat/lng)
2. Telehealth-only services won't appear on the map (this is intentional)
3. Check browser console for any errors

## API Costs

- **Google Maps JavaScript API**:
  - First 28,000 map loads per month are free
  - After that, $7 per 1,000 loads

- **OneMap API (Singapore)**:
  - Completely free for postal code and address geocoding
  - No API key required

## Privacy Considerations

- User location data is only used temporarily for finding nearby clinics
- Location data is never stored or sent to external servers
- Users must explicitly grant permission for geolocation

## Technical Details

### Technologies Used

- **@react-google-maps/api**: React wrapper for Google Maps
- **OneMap API**: Singapore government's free geocoding service
- **Haversine Formula**: Calculate distances between coordinates
- **Browser Geolocation API**: Get user's current location

### Files Modified/Created

- `components/ClinicMap.tsx` - Main map component
- `components/ClinicMapSearch.tsx` - Search interface
- `components/ClinicsListingSection.tsx` - Integrated map and grid views
- `lib/clinics.ts` - Distance calculation utilities
- `.env.local` - API key configuration

## Future Enhancements

Potential improvements for future versions:

1. **Directions Integration**: Show route directly on the map
2. **Clustering**: Group nearby markers when zoomed out
3. **Traffic Layer**: Show real-time traffic conditions
4. **Transit Layer**: Display public transportation options
5. **Street View**: Add street view preview for clinic locations
6. **Save Favorite Clinics**: Allow users to bookmark preferred clinics
7. **Filter by Services**: Show only clinics offering specific treatments
8. **Opening Hours**: Display clinic hours directly on the map

## Support

For issues or questions:
1. Check this documentation
2. Review browser console for error messages
3. Verify API key is correctly configured
4. Ensure all dependencies are installed (`npm install`)
