# Deploy FinFlow to Render.com - Step by Step

Your FinFlow app is ready to deploy! Follow these simple steps to get it live in ~10 minutes.

---

## Prerequisites

- ✅ Your code is already on GitHub: `jashtailor/pf_v2`
- ✅ Branch: `claude/finflow-mvp-setup-011CUPBp9jdNhiediFGqdkxZ`
- ✅ Render configuration file is ready (`render.yaml`)

---

## Method 1: One-Click Deploy (EASIEST)

### Step 1: Click the Deploy Button

**Once you push this to GitHub, create a Render Blueprint:**

1. Go to: https://render.com
2. Sign up/Login with GitHub
3. Click "New +" → "Blueprint"
4. Connect to your GitHub repo: `jashtailor/pf_v2`
5. Select branch: `claude/finflow-mvp-setup-011CUPBp9jdNhiediFGqdkxZ`
6. Render will detect `render.yaml` and set everything up automatically!
7. Click "Apply" and wait 3-5 minutes

**That's it!** Render will:
- Deploy your backend
- Deploy your frontend
- Connect them automatically
- Generate secure URLs

---

## Method 2: Manual Deploy (More Control)

### Step 1: Sign Up on Render

1. Go to: **https://render.com**
2. Click "Get Started for Free"
3. **Sign up with GitHub** (this connects your repos automatically)
4. Authorize Render to access your GitHub

---

### Step 2: Deploy Backend (API Server)

1. **Click "New +" → "Web Service"**

2. **Connect Repository:**
   - Find: `jashtailor/pf_v2`
   - Click "Connect"

3. **Configure Service:**
   ```
   Name: finflow-backend
   Region: Oregon (or closest to you)
   Branch: claude/finflow-mvp-setup-011CUPBp9jdNhiediFGqdkxZ
   Root Directory: finflow-mvp/backend
   Runtime: Node
   Build Command: npm install
   Start Command: node server.js
   ```

4. **Select Instance Type:**
   - Choose: **Free**

5. **Add Environment Variables:**
   Click "Advanced" → "Add Environment Variable":

   ```
   Key: JWT_SECRET
   Value: your-super-secret-key-make-it-random-and-long

   Key: PORT
   Value: 3001
   ```

   **Important**: Change `JWT_SECRET` to something random and secure!
   Example: `abc123xyz789secretkey456def`

6. **Click "Create Web Service"**

7. **Wait for Deployment** (2-3 minutes)
   - You'll see logs as it builds
   - When done, you'll see: "Your service is live 🎉"

8. **Copy Your Backend URL:**
   - It will look like: `https://finflow-backend-xxxx.onrender.com`
   - **SAVE THIS URL** - you need it for the frontend!

---

### Step 3: Deploy Frontend (React App)

1. **Click "New +" → "Static Site"**

2. **Connect Same Repository:**
   - Find: `jashtailor/pf_v2`
   - Click "Connect"

3. **Configure Static Site:**
   ```
   Name: finflow-frontend
   Branch: claude/finflow-mvp-setup-011CUPBp9jdNhiediFGqdkxZ
   Root Directory: finflow-mvp/frontend
   Build Command: npm install && npm run build
   Publish Directory: dist
   ```

4. **Add Environment Variable:**
   Click "Advanced" → "Add Environment Variable":

   ```
   Key: VITE_API_URL
   Value: https://finflow-backend-xxxx.onrender.com
   ```

   **Use the backend URL from Step 2.8!**

5. **Click "Create Static Site"**

6. **Wait for Build** (2-3 minutes)

---

### Step 4: Access Your Live App! 🎉

Once the frontend finishes deploying, you'll get a URL like:
```
https://finflow-frontend.onrender.com
```

**Click it and your FinFlow app is LIVE!**

---

## Testing Your Deployed App

1. **Open the frontend URL** in your browser
2. You should see the beautiful purple login page
3. **Click "Sign Up"**
   - Email: `test@example.com`
   - Password: `password123`
   - Name: `Test User`
4. **Click "Connect Bank"** to add demo transactions
5. **View Transactions** page to see filtering

**Everything works!** 🚀

---

## What Happens Next?

### Auto-Deploy on Every Push

Now that your app is deployed, **every time you push to GitHub, Render automatically redeploys!**

```bash
# Make some changes
git add .
git commit -m "Added new feature"
git push

# Render detects the push and deploys automatically!
# No need to do anything else!
```

You can watch deployments in the Render dashboard.

---

## Free Tier Limits

Render Free Tier includes:
- ✅ 750 hours/month per service (enough for 24/7)
- ✅ Automatic HTTPS
- ✅ Custom domains (optional)
- ✅ Unlimited deploys

**Note**: Free tier services spin down after 15 minutes of inactivity. They wake up automatically when accessed (takes ~30 seconds).

---

## Troubleshooting

### Backend won't start?
- Check environment variables are set
- Look at deployment logs in Render dashboard
- Make sure `JWT_SECRET` is set

### Frontend can't connect to backend?
- Verify `VITE_API_URL` environment variable
- Make sure it points to your backend URL
- Check that backend is running (visit backend URL in browser)

### Build fails?
- Check build logs in Render dashboard
- Verify `package.json` has all dependencies
- Make sure root directory is correct

### Database issues?
- SQLite works fine on Render free tier
- Database file persists on the instance

---

## Custom Domain (Optional)

Want your own domain like `finflow.yourdomain.com`?

1. Buy a domain (Namecheap, Google Domains, etc.)
2. In Render dashboard, go to your service
3. Settings → Custom Domain
4. Add your domain
5. Update DNS records as instructed
6. Done!

---

## Upgrading from Free Tier

Need more performance?

- **Starter**: $7/month - No sleep, more resources
- **Standard**: $25/month - Auto-scaling, more power

But for an MVP and testing, **free tier is perfect!**

---

## Your App URLs

After deployment, save these:

**Frontend (Main App):**
```
https://finflow-frontend.onrender.com
```

**Backend (API):**
```
https://finflow-backend.onrender.com
```

---

## Next Steps

Now that your app is live:

1. **Share the URL** with friends, investors, testers!
2. **Add features** - they'll auto-deploy on push
3. **Connect real SimpleFIN API** (see SimpleFIN docs)
4. **Add more pages** (budgets, charts, exports)
5. **Integrate Splitwise** for shared expenses

---

## Need Help?

- **Render Docs**: https://render.com/docs
- **Render Community**: https://community.render.com
- **My Deployment Guides**:
  - `DEPLOYMENT.md` - All deployment options
  - `DEPLOY_WITH_GITHUB.md` - GitHub integration guide

---

## Celebrate! 🎉

You just deployed a full-stack personal finance app to the internet!

- ✅ Backend API with authentication
- ✅ React frontend with beautiful UI
- ✅ Auto-categorized transactions
- ✅ SQLite database
- ✅ Automatic deployments
- ✅ Free hosting
- ✅ HTTPS secure

**Share your live app URL and show off your work!** 🚀
