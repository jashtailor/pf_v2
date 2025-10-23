# Deploy FinFlow Using GitHub Integration

Your code is already on GitHub at: **jashtailor/pf_v2**
Branch: `claude/finflow-mvp-setup-011CUPBp9jdNhiediFGqdkxZ`

## Services That Support GitHub Auto-Deploy

All these services connect to your GitHub repo and deploy automatically:

| Service | Free Tier | GitHub Integration | Setup Time |
|---------|-----------|-------------------|------------|
| **Render.com** ⭐ | 750 hrs/mo | ✅ Yes | 10 min |
| **Railway.app** | $5 credit/mo | ✅ Yes | 5 min |
| **Vercel** | Unlimited | ✅ Yes | 5 min |
| **Netlify** | 100GB/mo | ✅ Yes | 5 min |
| **Fly.io** | 3 VMs free | ✅ Yes | 15 min |

---

## Option 1: Render.com (RECOMMENDED - Best Free Tier)

### Why Render?
- ✅ No credit card required
- ✅ 750 hours/month free (enough for 24/7)
- ✅ Auto-deploys from GitHub
- ✅ Built-in HTTPS
- ✅ Environment variables support

### Step-by-Step Setup:

#### 1. Go to Render.com
Visit: https://render.com/

#### 2. Sign Up with GitHub
- Click "Get Started for Free"
- Click "Sign up with GitHub"
- Authorize Render to access your GitHub repos

#### 3. Deploy Backend (API Server)

**A. Create Web Service**
- Click "New +" button (top right)
- Select "Web Service"
- Find your repo: `jashtailor/pf_v2`
- Click "Connect"

**B. Configure Backend**
```
Name: finflow-backend
Region: Choose closest to you
Branch: claude/finflow-mvp-setup-011CUPBp9jdNhiediFGqdkxZ
Root Directory: finflow-mvp/backend
Runtime: Node
Build Command: npm install
Start Command: node server.js
```

**C. Add Environment Variables**
Click "Advanced" → "Add Environment Variable":
```
JWT_SECRET = your-super-secret-key-change-this
PORT = 3001
```

**D. Select Free Plan**
- Instance Type: "Free"
- Click "Create Web Service"

**E. Wait for Deploy** (2-3 minutes)
Once done, you'll see: `Your service is live at https://finflow-backend-xxxx.onrender.com`

**COPY THIS URL** - you'll need it for the frontend!

---

#### 4. Deploy Frontend (React App)

**A. Update API URL First**

Before deploying frontend, we need to update it to use your backend URL.

On your local machine, edit `finflow-mvp/frontend/src/App.jsx`:

Change line 5 from:
```javascript
const API_URL = `http://${window.location.hostname}:3001/api`;
```

To (use YOUR backend URL from step 3E):
```javascript
const API_URL = 'https://finflow-backend-xxxx.onrender.com/api';
```

Commit and push:
```bash
git add .
git commit -m "Update API URL for production"
git push
```

**B. Create Static Site**
Back in Render dashboard:
- Click "New +" button
- Select "Static Site"
- Find your repo: `jashtailor/pf_v2`
- Click "Connect"

**C. Configure Frontend**
```
Name: finflow-frontend
Branch: claude/finflow-mvp-setup-011CUPBp9jdNhiediFGqdkxZ
Root Directory: finflow-mvp/frontend
Build Command: npm install && npm run build
Publish Directory: dist
```

**D. Click "Create Static Site"**

Wait for build (2-3 minutes).

---

#### 5. Access Your Live App! 🎉

Once deployed, you'll get a URL like:
```
https://finflow-frontend.onrender.com
```

**Your app is now live and accessible from anywhere!**

---

## Option 2: Railway.app (FASTEST SETUP)

Railway is even easier but has $5/month credit limit.

### Setup:

1. **Go to Railway.app**
   Visit: https://railway.app/

2. **Sign in with GitHub**

3. **New Project**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose `jashtailor/pf_v2`

4. **Add Backend Service**
   - Railway auto-detects it's Node.js
   - Set root directory: `finflow-mvp/backend`
   - Add environment variables:
     ```
     JWT_SECRET=your-secret
     PORT=3001
     ```
   - Click "Deploy"

5. **Add Frontend Service**
   - Click "New"
   - Add service from same repo
   - Set root directory: `finflow-mvp/frontend`
   - Deploy

6. **Generate Domain**
   - Click on backend service
   - Settings → Generate Domain
   - Copy the URL (e.g., `finflow-backend.up.railway.app`)
   - Update frontend API_URL with this domain
   - Redeploy frontend

Done! 🚀

---

## Option 3: Vercel (Best for Frontend Only)

Vercel is perfect for the React frontend, but you'd need to deploy backend elsewhere.

### Quick Setup:

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Deploy Frontend**
   ```bash
   cd finflow-mvp/frontend
   vercel
   ```

3. **Follow prompts**
   - Link to your GitHub account
   - Confirm settings
   - Deploy!

You'll get: `https://finflow.vercel.app`

**Note**: You still need to deploy the backend to Render/Railway.

---

## Which Should You Choose?

| Scenario | Recommended |
|----------|-------------|
| Want everything free forever | **Render.com** |
| Want fastest setup | **Railway.app** |
| Frontend only (have backend elsewhere) | **Vercel** |
| Need custom domain | **Netlify** or **Render** |

---

## After Deployment

Once deployed, your app will:
- ✅ Auto-deploy when you push to GitHub
- ✅ Have HTTPS (secure)
- ✅ Be accessible from anywhere
- ✅ Have a permanent URL

### Auto-Deploy Example:
```bash
# Make changes locally
git add .
git commit -m "Added new feature"
git push

# Render/Railway automatically detects the push and deploys!
# Check deployment status in their dashboard
```

---

## Need Help?

- Check deployment logs in the service dashboard
- Make sure environment variables are set
- Verify the API URL in frontend matches your backend URL

Questions? Let me know! 🚀
