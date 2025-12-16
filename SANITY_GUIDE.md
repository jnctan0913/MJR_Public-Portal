# Sanity CMS Guide for MJR Trial Website

## Overview

This website uses Sanity CMS to manage clinic locations and page content. This guide will help you update content easily without needing to touch code.

## Accessing Sanity Studio

There are two ways to access the Sanity Studio:

### Option 1: Local Studio (Recommended for Development)
1. Run the development server: `npm run dev`
2. Navigate to: `http://localhost:3000/studio`
3. Sign in with your Sanity account: `event.dksh@gmail.com`

### Option 2: Sanity Cloud Studio
1. Visit: `https://1x3s3r3w.sanity.studio` (once deployed)
2. Sign in with your Sanity account

## Managing Clinics

### Adding a New Clinic

1. Open Sanity Studio
2. Click on **"Clinic"** in the left sidebar
3. Click the **"+"** button or **"Create new Clinic"**
4. Fill in the required fields:
   - **Clinic Name**: The full name of the clinic
   - **Slug**: Click "Generate" to auto-create from name (used in URLs)
   - **Featured Clinic**: Toggle ON if this clinic should appear prominently
   - **Address**:
     - Street Address (required)
     - Unit/Floor (optional)
     - City (required)
     - Postal Code (required)
     - Country (defaults to Singapore)
   - **Map Location**: Click "Edit" and pin the exact location on the map
     - You can search for the address or drag the pin
     - This is used for Google Maps integration
   - **Contact Information**:
     - Phone Number (required)
     - Email Address (required)
     - Fax Number (optional)
   - **Operating Hours**: Set hours for each day of the week
     - Use format: "9:00 AM - 6:00 PM" or "Closed"
   - **Services Offered**: Click "Add item" for each service
     - Examples: "Obesity Management", "Weight Loss Consultation"
   - **Clinic Image**: Upload a photo of the clinic (optional but recommended)
     - Click "Upload" and select an image
     - Add Alternative Text for SEO
   - **Description**: Brief description of the clinic (optional)

5. Click **"Publish"** in the bottom right

### Editing an Existing Clinic

1. Open Sanity Studio
2. Click on **"Clinic"** in the left sidebar
3. Find and click on the clinic you want to edit
4. Make your changes
5. Click **"Publish"** to save

### Deleting a Clinic

1. Open Sanity Studio
2. Click on **"Clinic"** in the left sidebar
3. Find and click on the clinic you want to delete
4. Click the **three dots menu** (•••) in the top right
5. Select **"Delete"**
6. Confirm deletion

### Featured Clinics

- Toggle the **"Featured Clinic"** switch to ON for clinics you want to highlight
- Featured clinics appear first in the listing with a special badge
- You can have multiple featured clinics

## Managing Act Now Page Content

### Editing Hero Section

1. Open Sanity Studio
2. Click on **"Act Now Page Content"** in the left sidebar
3. There should be only one document - click on it
4. Under **"Hero Section"**:
   - **Main Heading**: Edit the large heading text
   - **Subheading**: Edit the smaller text below the heading
   - **Hero Background Image (Desktop)**: Upload a desktop background image
   - **Hero Background Image (Mobile)**: Upload a mobile background image
5. Click **"Publish"**

### Editing Introduction Section

1. In the same Act Now Page Content document
2. Under **"Introduction Section"**:
   - Use the rich text editor to format content
   - **Bold** text: Select text and click the **B** button
   - **Italic** text: Select text and click the **I** button
   - **Headings**: Use the dropdown to select H2 or H3
   - **Superscript** (for references like ¹²³): Select text and click the superscript button
3. Click **"Publish"**

### Editing Call-to-Action Section

1. In the same Act Now Page Content document
2. Under **"Call to Action Section"**:
   - **Section Heading**: Main heading above clinic listings (default: "Find a Doctor Near You")
   - **Section Description**: Optional description text below the heading
3. Click **"Publish"**

### Editing SEO Settings

1. In the same Act Now Page Content document
2. Under **"SEO Settings"**:
   - **Meta Title**: The page title that appears in search results and browser tabs
   - **Meta Description**: The description that appears in search results
3. Click **"Publish"**

## Important Notes

### Content Updates
- Changes are **NOT** live immediately
- After publishing in Sanity, you need to **rebuild and redeploy** the website
- For local development: The page will update after a few seconds (Next.js cache)
- For production: Trigger a new deployment on your hosting platform

### Images
- **Recommended sizes**:
  - Clinic images: 800x600px or larger
  - Hero desktop: 1920x800px or larger
  - Hero mobile: 800x1000px or larger
- Supported formats: JPG, PNG, WebP
- Maximum file size: 10MB (keep images optimized for web)

### Clinic Location Map
- The map pin is crucial for Google Maps integration
- Make sure to set the exact location by:
  1. Searching for the address in the map search
  2. OR dragging the pin to the correct location
  3. Verifying the coordinates are correct

### Contact Information
- **Phone numbers**: Use international format: +65 6123 4567
- **Email addresses**: Must be valid email format
- These will be clickable links on the website (tel: and mailto:)

## Troubleshooting

### "Content not showing on website"
- Make sure you clicked **"Publish"** (not just save)
- Wait 30 seconds for cache to clear
- Hard refresh the website (Cmd+Shift+R on Mac, Ctrl+Shift+R on Windows)
- If still not showing, rebuild and redeploy the website

### "Can't upload images"
- Check file size is under 10MB
- Ensure file is a supported format (JPG, PNG, WebP)
- Try compressing the image first

### "Map location not accurate"
- Click "Edit" on the Map Location field
- Use the search box to find the exact address
- Drag the pin to adjust the precise location
- Click "Confirm" to save

## Data Structure

### Clinic Schema
```
Clinic
├── Name
├── Slug (auto-generated from name)
├── Featured (yes/no)
├── Address
│   ├── Street
│   ├── Unit
│   ├── City
│   ├── Postal Code
│   └── Country
├── Location (lat/lng coordinates)
├── Contact
│   ├── Phone
│   ├── Email
│   └── Fax
├── Hours (Monday-Sunday)
├── Services (array)
├── Image
└── Description
```

### Act Now Page Schema
```
Act Now Page
├── Hero Section
│   ├── Heading
│   ├── Subheading
│   ├── Background Image (Desktop)
│   └── Background Image (Mobile)
├── Introduction Section
│   └── Content (rich text)
├── Call to Action Section
│   ├── Heading
│   └── Description
└── SEO Settings
    ├── Meta Title
    └── Meta Description
```

## Getting Help

If you encounter issues or need help:
1. Check this guide first
2. Review the Sanity documentation: https://www.sanity.io/docs
3. Contact your development team

## Project Details

- **Sanity Project ID**: 1x3s3r3w
- **Dataset**: production
- **Organization ID**: ozc21zjD9
- **Account**: event.dksh@gmail.com
