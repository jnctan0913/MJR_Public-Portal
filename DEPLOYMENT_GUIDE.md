# Sanity Deployment & Setup Guide

## Current Status

✅ **Sanity Schemas are Live!**

Your Sanity schemas are already deployed and accessible. When you run `npm run dev` and visit `http://localhost:3000/studio`, the schemas are automatically available through the Sanity Studio embedded in your Next.js app.

## How Sanity Works with Next.js

Unlike traditional deployments, Sanity Studio embedded in Next.js works differently:

1. **Schemas are Code-Based**: Your Sanity schemas live in `/sanity/schemas/` as TypeScript files
2. **Studio is Self-Hosted**: The Studio runs at `/studio` route in your Next.js app
3. **Data is Cloud-Hosted**: All clinic data you create is stored in Sanity's cloud (Project: 1x3s3r3w)

## Accessing Your Live Studio

### Local Development
```bash
npm run dev
```
Then visit: `http://localhost:3000/studio`

### Production (After Next.js Deployment)
Once you deploy your Next.js app to Vercel/Netlify:
- Studio will be at: `https://your-domain.com/studio`
- Sign in with: `event.dksh@gmail.com`

## Adding Sample Clinics - Step by Step

### Quick Start
1. Run: `npm run dev`
2. Open: `http://localhost:3000/studio`
3. Sign in with: `event.dksh@gmail.com`
4. Click **"Clinic"** in the left sidebar
5. Click **"Create new Clinic"**

### Complete Sample Clinic Data

Follow the [SAMPLE_CLINICS_GUIDE.md](./SAMPLE_CLINICS_GUIDE.md) to add these 6 clinics:

1. **DKSH Healthcare Clinic - Orchard** (Featured, Both, Central)
2. **DKSH Medical Center - Raffles Place** (Featured, Clinic, Central)
3. **DKSH Wellness Clinic - Tampines** (Clinic, East)
4. **DKSH TeleHealth Services** (Telehealth only)
5. **DKSH Health Hub - Jurong East** (Both, West)
6. **DKSH Family Clinic - Woodlands** (Clinic, North)

## Verifying Your Setup

### Check Schemas are Working
1. Go to `http://localhost:3000/studio`
2. You should see two content types in the left sidebar:
   - **Clinic**
   - **Act Now Page Content**

### Test Data Flow
1. Create a test clinic in Sanity Studio
2. Visit `http://localhost:3000/act-now`
3. Your clinic should appear in the listings!

## Environment Variables

Make sure `.env.local` contains:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=1x3s3r3w
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-12-16
SANITY_API_TOKEN=skKoOKa5mgM7rjnjF4CYPP01k3R7JQIRUfnA063Zb3BrXrqfvlumJ6TpBzEuKE2XP1UPddXJLzj3lLpV7GaVTWfEKoIsY7UpmfsxuvMi0ZyDhX364HhgI9wMlf9W8ENv8ctD7zlmBjmKBtATtGKO3VmobB7o7uH204wkTmU6dYzLN47O5kV3
```

## Deploying to Production

### Step 1: Deploy Next.js App

**Vercel (Recommended)**:
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

**Or use Vercel Dashboard**:
1. Go to vercel.com
2. Import your GitHub repository
3. Add environment variables from `.env.local`
4. Deploy

### Step 2: Access Production Studio

Once deployed, your studio will be at:
```
https://your-domain.vercel.app/studio
```

### Step 3: Add Production Data

Sign in to the production studio and add your clinics using the same guide.

## Troubleshooting

### "No clinics showing on Act Now page"
- Check you've published the clinics (not just saved as draft)
- Verify environment variables are set correctly
- Check browser console for errors

### "Can't access Studio"
- Ensure you're navigating to `/studio` not just the homepage
- Check that you're signed in with `event.dksh@gmail.com`
- Verify Sanity packages are installed: `npm list sanity`

### "Schema changes not showing"
- Restart the dev server: `npm run dev`
- Hard refresh the Studio: Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows)

## File Structure

```
/sanity
  /schemas
    clinic.ts           # Clinic content type
    actNowPage.ts       # Act Now page content
    index.ts            # Schema exports
  /lib
    client.ts           # Sanity client config
    queries.ts          # GROQ queries
  config.ts             # Studio config (used by /app/studio)

/app/studio/[[...index]]
  page.tsx              # Studio route

sanity.config.ts        # Root config (for CLI)
sanity.cli.js           # CLI configuration
.env.local              # Environment variables
```

## Next Steps

1. ✅ Schemas are already deployed (live in your Next.js app)
2. ➡️ Add sample clinics through Studio at `http://localhost:3000/studio`
3. ➡️ Test the Act Now page at `http://localhost:3000/act-now`
4. ➡️ Deploy your Next.js app to production (Vercel)
5. ➡️ Add production data through `https://your-domain.com/studio`

## Support

- **Sanity Docs**: https://www.sanity.io/docs
- **Next.js Docs**: https://nextjs.org/docs
- **Project Guides**:
  - [SAMPLE_CLINICS_GUIDE.md](./SAMPLE_CLINICS_GUIDE.md)
  - [SANITY_GUIDE.md](./SANITY_GUIDE.md)
  - [ACT_NOW_README.md](./ACT_NOW_README.md)
