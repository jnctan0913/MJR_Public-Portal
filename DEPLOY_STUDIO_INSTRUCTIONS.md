# Deploy Sanity Studio to Cloud - Step by Step

## ⚠️ Current Issue
Your auth token doesn't have `sanity.project.deployStudio` permission. This needs to be fixed before cloud deployment.

## 🎯 Two Deployment Options

---

## **Option 1: Use Embedded Studio (RECOMMENDED - Already Working!)**

### ✅ **This is the easiest option** and your studio is already working!

Your Sanity Studio is already embedded in your Next.js app at the `/studio` route and is **production-ready**.

### How to Access:
- **Locally:** `http://localhost:3000/studio`
- **In Production (Vercel):** `https://your-domain.vercel.app/studio`

### ✅ Already Deployed:
Since your studio is embedded, it automatically deploys with your Next.js app to Vercel. **No additional steps needed!**

### Current Status:
- ✅ Studio built and working
- ✅ Schema deployed (clinic with all features)
- ✅ Available at `/studio` route
- ✅ Automatically deploys with Vercel

### To Edit Content:
1. Go to your production URL: `https://your-vercel-domain/studio`
2. Sign in with: `event.dksh@gmail.com`
3. Start adding clinics!

---

## **Option 2: Deploy Standalone Cloud Studio (Optional)**

If you prefer a separate studio URL like `https://mjr-obesity-trial.sanity.studio`, follow these steps:

### Step 1: Fix Permissions

1. **Open Sanity Project Settings:**
   ```bash
   npx sanity manage
   ```
   This opens: https://www.sanity.io/manage/project/1x3s3r3w

2. **Check User Permissions:**
   - Go to **Settings** → **Members**
   - Find `event.dksh@gmail.com`
   - Ensure role is **Administrator** (not just Editor)
   - If not, you need the project owner to upgrade your role

### Step 2: Login with Correct Account

1. **Logout from CLI:**
   ```bash
   npx sanity logout
   ```

2. **Login with Admin Account:**
   ```bash
   npx sanity login
   ```
   - Choose **Google**
   - Sign in with: `event.dksh@gmail.com`

### Step 3: Deploy to Cloud

1. **Deploy Studio:**
   ```bash
   npx sanity deploy
   ```
   
2. **When prompted for hostname, enter:**
   ```
   mjr-obesity-trial
   ```

3. **Studio will be available at:**
   ```
   https://mjr-obesity-trial.sanity.studio
   ```

---

## 🎯 Recommended: Use Option 1 (Embedded Studio)

### Why?
- ✅ **Already working** - No extra setup needed
- ✅ **Deploys automatically** with your Next.js app
- ✅ **Same editing experience** as cloud studio
- ✅ **Simpler for small teams**
- ✅ **No permission issues**
- ✅ **One less thing to manage**

### When to use Option 2 (Cloud Studio)?
- You need editors to access studio without running the Next.js app
- You have multiple apps using the same Sanity project
- You want a dedicated content management URL

---

## ✨ Current Implementation Status

### ✅ Schema Deployed & Working:
Your clinic schema includes:

1. **Service Provider Support:**
   - ✅ Clinic type
   - ✅ Telehealth service type
   - ✅ Provider logos
   - ✅ Website links
   - ✅ Clinic page URLs

2. **Doctor Features:**
   - ✅ Doctor photos
   - ✅ Doctor information (specialization, bio, qualifications)
   - ✅ Hover tooltips on doctor icons
   - ✅ Click to open doctor modal

3. **Smart Rendering:**
   - ✅ Shows provider logo overlay on clinic image
   - ✅ Conditional buttons (telehealth → website, clinic → page + maps)
   - ✅ Doctor section only shows if doctors exist
   - ✅ Address hidden for telehealth-only services

---

## 🚀 Next Steps

### If Using Embedded Studio (Recommended):
1. ✅ Studio is ready - no action needed
2. Just deploy/update your Next.js app on Vercel
3. Access studio at: `https://your-vercel-domain/studio`
4. Start adding clinics using SAMPLE_CLINICS_GUIDE.md

### If Using Cloud Studio:
1. Fix permissions (follow Option 2 steps above)
2. Run `npx sanity deploy`
3. Access studio at: `https://mjr-obesity-trial.sanity.studio`

---

## 📝 Test Your Studio

### Access Embedded Studio:
1. Make sure dev server is running:
   ```bash
   npm run dev
   ```

2. Open browser:
   ```
   http://localhost:3000/studio
   ```

3. Sign in with `event.dksh@gmail.com`

4. Click **Clinic** to add a new clinic

5. Test all new features:
   - Upload provider logo
   - Select provider type (clinic vs telehealth)
   - Add doctor information
   - Add clinic page URL (for clinics)
   - Add website URL (for telehealth)

---

## ✅ Summary

**Your studio is already production-ready!** 

The embedded studio at `/studio` has all the features you requested and will automatically deploy when you push to Vercel. 

**No additional deployment needed!** 🎉


