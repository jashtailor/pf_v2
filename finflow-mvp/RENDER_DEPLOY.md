# Deploy FinFlow to Render.com - UPDATED INSTRUCTIONS

## Important: Use Manual Deployment (Not Blueprint)

Because your project has subdirectories (`finflow-mvp/backend` and `finflow-mvp/frontend`), you need to deploy each service manually. This is actually very easy!

---

## Step-by-Step Deployment

### Step 1: Sign Up on Render

1. Go to: **https://render.com**
2. Click **"Get Started for Free"**
3. **Sign up with GitHub**
4. Authorize Render to access your repositories

---

### Step 2: Deploy Backend (5 minutes)

1. **Click "New +" → "Web Service"**

2. **Connect Repository:**
   - Find and select: **`jashtailor/pf_v2`**
   - Click **"Connect"**

3. **Configure the Service:**

   **Unique Name:** `finflow-backend-YOUR-NAME` (make it unique!)

   **Region:** Oregon (or closest to you)

   **Branch:** `claude/finflow-mvp-setup-011CUPBp9jdNhiediFGqdkxZ`

   **Root Directory:** `finflow-mvp/backend` ⚠️ **IMPORTANT!**

   **Runtime:** Node

   **Build Command:** `npm install`

   **Start Command:** `node server.js`

4. **Select Instance Type:**
   - **Free** (scroll down to find it)

5. **Environment Variables:**

   Click **"Advanced"** → **"Add Environment Variable"**

   Add these TWO variables:

   ```
   Variable 1:
   Key: JWT_SECRET
   Value: finflow-secret-key-change-this-to-something-random-12345

   Variable 2:
   Key: PORT
   Value: 10000
   ```

   **Note:** Change the JWT_SECRET to something random and secure!

6. **Click "Create Web Service"**

7. **Wait for Deployment** (3-5 minutes)
   - Watch the logs scroll
   - You'll see: "✅ Database initialized"
   - You'll see: "✅ Server running..."
   - Status will show: **"Live"** with a green dot

8. **SAVE YOUR BACKEND URL:**

   At the top of the page, you'll see a URL like:
   ```
   https://finflow-backend-YOUR-NAME.onrender.com
   ```

   **COPY THIS ENTIRE URL** - you need it for Step 3!

---

### Step 3: Deploy Frontend (5 minutes)

1. **Click "New +" → "Static Site"**

2. **Connect Same Repository:**
   - Select: **`jashtailor/pf_v2`**
   - Click **"Connect"**

3. **Configure the Static Site:**

   **Name:** `finflow-YOUR-NAME` (make it unique!)

   **Branch:** `claude/finflow-mvp-setup-011CUPBp9jdNhiediFGqdkxZ`

   **Root Directory:** `finflow-mvp/frontend` ⚠️ **IMPORTANT!**

   **Build Command:** `npm install && npm run build`

   **Publish Directory:** `dist`

4. **Environment Variables:**

   Click **"Advanced"** → **"Add Environment Variable"**

   ```
   Key: VITE_API_URL
   Value: [PASTE YOUR BACKEND URL FROM STEP 2.8]
   ```

   Example: `https://finflow-backend-YOUR-NAME.onrender.com`

   ⚠️ **Do NOT include /api at the end!**

5. **Click "Create Static Site"**

6. **Wait for Build** (3-5 minutes)
   - Watch build logs
   - Status will show: **"Live"**

---

### Step 4: Access Your Live App! 🎉

Your frontend URL will be:
```
https://finflow-YOUR-NAME.onrender.com
```

**Click it and test your app:**

1. You should see the purple login page ✅
2. Click "Sign Up"
3. Enter:
   - Email: `test@example.com`
   - Password: `password123`
   - Name: `Test User`
4. Click "Connect Bank"
5. See demo transactions appear! ✅

**Congratulations! Your app is LIVE! 🚀**

---

## Troubleshooting

### Backend Issues

**Error: "Can't find package.json"**
- Make sure Root Directory is EXACTLY: `finflow-mvp/backend`
- Check there are no extra spaces

**Error: "Database initialization failed"**
- Check the logs - SQLite should create automatically
- Restart the service

**Backend not responding:**
- Check Environment Variables are set (JWT_SECRET and PORT)
- Look at the logs for errors

### Frontend Issues

**Error: "Can't find package.json"**
- Make sure Root Directory is EXACTLY: `finflow-mvp/frontend`

**Blank page or "Failed to fetch":**
- Check VITE_API_URL environment variable
- Make sure it points to your backend URL
- Make sure there's NO `/api` at the end
- Redeploy frontend after fixing

**Build fails:**
- Check build logs for specific errors
- Make sure `npm install && npm run build` is the build command
- Make sure `dist` is the publish directory

### Both Services

**"Service unavailable" on first load:**
- Free tier spins down after 15 min inactivity
- Wait 30-60 seconds, it will wake up automatically
- Subsequent loads are fast!

---

## Important Settings Checklist

### Backend Web Service ✅
- [x] Root Directory: `finflow-mvp/backend`
- [x] Build Command: `npm install`
- [x] Start Command: `node server.js`
- [x] Environment: `JWT_SECRET` set
- [x] Environment: `PORT` set to `10000`
- [x] Instance Type: Free

### Frontend Static Site ✅
- [x] Root Directory: `finflow-mvp/frontend`
- [x] Build Command: `npm install && npm run build`
- [x] Publish Directory: `dist`
- [x] Environment: `VITE_API_URL` set to backend URL
- [x] Instance Type: Free

---

## After Deployment

### Auto-Deploy is Already Set Up!

Every time you push to GitHub, Render automatically redeploys:

```bash
# Make changes locally
git add .
git commit -m "Added new feature"
git push

# Render automatically detects and redeploys both services!
```

### Monitor Your Services

- Go to Render Dashboard
- Click on each service to see:
  - Deployment logs
  - Environment variables
  - Metrics
  - Settings

### Update Environment Variables

If you need to change env vars:
1. Go to service in Render Dashboard
2. Click "Environment"
3. Edit the variable
4. Service will automatically redeploy

---

## What's Next?

Now that your app is live:

✅ Share the URL with friends!
✅ Add it to your portfolio
✅ Continue developing - auto-deploys on push
✅ Connect real SimpleFIN API
✅ Add more features

---

## Free Tier Limits

- **750 hours/month per service** (enough for 24/7 uptime!)
- Services sleep after 15 min of inactivity
- Wake up automatically in ~30 seconds
- Completely FREE forever

---

## Custom Domain (Optional)

Want `app.yourdomain.com`?

1. Buy a domain (Namecheap, Google Domains, etc.)
2. In Render: Service → Settings → Custom Domain
3. Add your domain
4. Update DNS records as shown
5. Done!

---

## Need Help?

- **Render Docs**: https://render.com/docs
- **Render Support**: https://render.com/docs/support
- **Check logs** in Render Dashboard for errors

---

## Summary

You deployed TWO services:

1. **Backend** (Web Service):
   - URL: `https://finflow-backend-YOUR-NAME.onrender.com`
   - Handles API, auth, database

2. **Frontend** (Static Site):
   - URL: `https://finflow-YOUR-NAME.onrender.com`
   - The app users interact with

Both auto-deploy when you push to GitHub!

---

**Questions? Check the logs first, then review this guide!**

**Enjoy your live FinFlow app! 💰🚀**
