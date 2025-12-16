# Deploying Sanity Studio to Sanity Cloud

Due to CLI limitations with interactive prompts, here's the manual process to deploy your Sanity Studio to the cloud.

## Quick Deploy Method (Recommended)

### Option 1: Use Sanity Web Interface

1. **Open Sanity Project Settings**
   ```bash
   npx sanity manage
   ```
   This will open: https://www.sanity.io/manage/project/1x3s3r3w

2. **Set Studio Hostname**
   - Navigate to **Settings** → **Studio**
   - Under "Studio hostname", enter: `mjr-obesity-trial`
   - Click **Save**

3. **Deploy via Web Interface**
   - In the same page, click **"Deploy Studio"** button
   - This will deploy your locally built studio to the cloud

   OR

   Run this command after setting the hostname:
   ```bash
   SANITY_AUTH_TOKEN="skKoOKa5mgM7rjnjF4CYPP01k3R7JQIRUfnA063Zb3BrXrqfvlumJ6TpBzEuKE2XP1UPddXJLzj3lLpV7GaVTWfEKoIsY7UpmfsxuvMi0ZyDhX364HhgI9wMlf9W8ENv8ctD7zlmBjmKBtATtGKO3VmobB7o7uH204wkTmU6dYzLN47O5kV3" npx sanity deploy --no-build
   ```

### Option 2: Deploy Using GraphQL Studio (Alternative)

If you want to use GraphQL Studio for deployment:

1. **Enable GraphQL API**
   ```bash
   npx sanity manage
   ```
   - Go to **API** → **GraphQL**
   - Click **Deploy GraphQL API**

2. **Access GraphQL Studio**
   - This creates a GraphQL playground at your dataset

## After Deployment

Once deployed, your studio will be available at:
```
https://mjr-obesity-trial.sanity.studio
```

You can then:
- Sign in with `event.dksh@gmail.com`
- Add sample clinics using the SAMPLE_CLINICS_GUIDE.md
- Manage content from anywhere

## Current Status

✅ Studio Bundle Built
- Location: `dist/` folder (created by `npx sanity build`)
- Build Status: Successful

✅ Schemas Deployed
- Available in embedded studio at: `http://localhost:3000/studio`
- Project ID: 1x3s3r3w
- Dataset: production

⏳ Cloud Deployment
- Waiting for hostname configuration
- Ready to deploy once hostname is set

## Troubleshooting

### "Cannot deploy - no hostname"
The CLI requires the hostname to be set first. Use the web interface method above.

### "Permission denied"
Make sure you're signed in with `event.dksh@gmail.com` account that has admin access to project `1x3s3r3w`.

### "Build failed"
If you need to rebuild:
```bash
npx sanity build
```

## Alternative: Keep Using Embedded Studio

If you prefer to skip cloud deployment, you can continue using the embedded studio:

**Pros:**
- Already working at `/studio` route
- No additional hosting needed
- Full schema access
- Same editing experience

**Cons:**
- Only accessible when Next.js app is running
- Can't edit content independently of the app

**To use embedded studio in production:**
Just deploy your Next.js app to Vercel, and the studio will be available at:
```
https://your-domain.vercel.app/studio
```

## Recommendation

For this project, I recommend **using the embedded studio** since:
1. It's already configured and working
2. It's simpler for small teams
3. It deploys automatically with your Next.js app
4. You get the same editing experience

The cloud-hosted studio is mainly beneficial when:
- You need content editors to work independently of the app
- You have multiple apps using the same Sanity project
- You want a dedicated content management URL

## Next Steps

1. Choose deployment method (embedded vs cloud)
2. If using embedded: Deploy Next.js app to Vercel
3. If using cloud: Follow Option 1 above
4. Add sample clinics using SAMPLE_CLINICS_GUIDE.md
5. Test the Act Now page with real data
