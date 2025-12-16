# Sanity Studio Access Guide

## 🌐 Cloud Studio (Production)

Your Sanity Studio is now deployed and accessible at:

**https://mjr-public-portal.sanity.studio**

### Accessing the Cloud Studio

1. Visit: https://mjr-public-portal.sanity.studio
2. Sign in with: `event.dksh@gmail.com`
3. Start adding clinics!

## 💻 Local Studio (Development)

You can also access the studio locally during development:

1. Run: `npm run dev`
2. Visit: `http://localhost:3000/studio`
3. Sign in with: `event.dksh@gmail.com`

## 📝 Adding Sample Clinics

Follow the step-by-step guide in [SAMPLE_CLINICS_GUIDE.md](./SAMPLE_CLINICS_GUIDE.md) to add:

1. DKSH Healthcare Clinic - Orchard (Featured, Both, Central)
2. DKSH Medical Center - Raffles Place (Featured, Clinic, Central)
3. DKSH Wellness Clinic - Tampines (Clinic, East)
4. DKSH TeleHealth Services (Telehealth only)
5. DKSH Health Hub - Jurong East (Both, West)
6. DKSH Family Clinic - Woodlands (Clinic, North)

## 🔄 Redeploying the Studio

If you make changes to the Sanity schemas and need to redeploy:

```bash
# Build the studio
npx sanity build

# Deploy to cloud (hostname is saved in sanity.cli.js)
SANITY_AUTH_TOKEN="skvOAz6HLHZAQoILxeOkgHPZg2ZRVcmPNvNzVSZreDoAhT2cwts6h8tXu9CQivo4mKQrFVbgUgna5GfPpdcT9kjmWGJigzfYIDFALqO3rX2duNo2X91YeAYpFYGVF7dGqgJ2i0qp1NlUWvSaPjGbm3IU4jvikJIUIzNIoSwzbfdyFjPyT2qI" npx sanity deploy
```

## 📊 Project Details

- **Project ID**: 1x3s3r3w
- **Dataset**: production
- **Organization**: ozc21zjD9
- **Studio Hostname**: mjr-public-portal
- **Cloud URL**: https://mjr-public-portal.sanity.studio
- **Local URL**: http://localhost:3000/studio

## 🔑 Access & Permissions

- **Email**: event.dksh@gmail.com
- **Role**: Admin (full access)
- **Deploy Token**: Stored in `.env.local`

## ✅ Next Steps

1. ✅ Studio deployed to Sanity Cloud
2. ➡️ Visit https://mjr-public-portal.sanity.studio
3. ➡️ Sign in and add sample clinics
4. ➡️ Test the Act Now page at http://localhost:3000/act-now
5. ➡️ Deploy Next.js app to production (Vercel)

## 🎯 Using the Studio

### Creating a New Clinic

1. Click **"Clinic"** in the left sidebar
2. Click **"+ Create"** button
3. Fill in the required fields:
   - Name (required)
   - Slug (auto-generated from name)
   - Clinic Type: Physical Clinic / Telehealth / Both
   - Area in Singapore (if physical clinic)
   - Address details
   - Contact information
   - Operating hours
   - Services offered
4. Click **"Publish"** to make it live

### Editing Page Content

1. Click **"Act Now Page Content"** in the left sidebar
2. Edit the hero section, intro text, or CTA
3. Click **"Publish"** to update

## 📱 Viewing Your Changes

After publishing content in the studio:

1. Local: Visit http://localhost:3000/act-now
2. Production: Visit your deployed Vercel URL + /act-now

Changes appear immediately (real-time updates).

## 🆘 Troubleshooting

### Can't Access Cloud Studio
- Make sure you're signed in with `event.dksh@gmail.com`
- Check that you have admin access to project `1x3s3r3w`

### Changes Not Showing
- Make sure you clicked **"Publish"** (not just "Save draft")
- Hard refresh your browser (Cmd+Shift+R / Ctrl+Shift+R)
- Check that you're viewing the correct environment (local vs production)

### Need to Redeploy
If you make schema changes, you must redeploy the studio using the commands above.
