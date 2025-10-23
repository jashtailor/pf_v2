# FinFlow Deployment Guide

## Quick Access Options

### Option 1: ngrok (Fastest for Testing)

#### Step 1: Install ngrok
```bash
# Visit https://ngrok.com/download and download for your OS
# Or use package manager:
brew install ngrok  # macOS
snap install ngrok  # Linux
choco install ngrok # Windows
```

#### Step 2: Start Backend Tunnel
```bash
cd finflow-mvp/backend
node server.js &
ngrok http 3001
```
Copy the URL (e.g., `https://abc123.ngrok.io`)

#### Step 3: Update Frontend
Edit `frontend/src/App.jsx` and change line 5:
```javascript
const API_URL = 'https://abc123.ngrok.io/api';  // Use your ngrok URL
```

#### Step 4: Start Frontend Tunnel (new terminal)
```bash
cd finflow-mvp/frontend
npm run dev &
ngrok http 5173
```

Access the app at the frontend ngrok URL!

---

### Option 2: Deploy to Render (Free Forever)

#### Step 1: Push to GitHub
```bash
git push origin main
```

#### Step 2: Deploy Backend
1. Go to [render.com](https://render.com)
2. Sign up (free)
3. Click "New +" → "Web Service"
4. Connect your GitHub repo
5. Configure:
   - **Root Directory**: `finflow-mvp/backend`
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
   - **Environment Variables**: Add `JWT_SECRET=your-secret-here`
6. Click "Create Web Service"
7. Copy your backend URL (e.g., `https://finflow-api.onrender.com`)

#### Step 3: Deploy Frontend
1. Update `frontend/src/App.jsx` line 5:
   ```javascript
   const API_URL = 'https://finflow-api.onrender.com/api';
   ```
2. In Render, click "New +" → "Static Site"
3. Connect same GitHub repo
4. Configure:
   - **Root Directory**: `finflow-mvp/frontend`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`
5. Click "Create Static Site"

Your app is now live at `https://your-app.onrender.com`!

---

### Option 3: Cloudflare Tunnel (Advanced)

#### Step 1: Install Cloudflare Tunnel
```bash
# Download from: https://developers.cloudflare.com/cloudflare-one/connections/connect-apps/install-and-setup/installation/

# Or via package manager:
brew install cloudflared  # macOS
```

#### Step 2: Authenticate
```bash
cloudflared tunnel login
```

#### Step 3: Create Tunnel
```bash
cloudflared tunnel create finflow
```

#### Step 4: Configure
Create `config.yml`:
```yaml
tunnel: <your-tunnel-id>
credentials-file: /path/to/credentials.json

ingress:
  - hostname: finflow.example.com
    service: http://localhost:5173
  - hostname: api.finflow.example.com
    service: http://localhost:3001
  - service: http_status:404
```

#### Step 5: Run Tunnel
```bash
cloudflared tunnel run finflow
```

---

## Comparison

| Service | Setup Time | Free Tier | Best For |
|---------|-----------|-----------|----------|
| **ngrok** | 5 min | Random URL | Quick demos |
| **Render** | 15 min | 750 hrs/mo | Production |
| **Railway** | 10 min | $5 credit/mo | Full-stack |
| **Cloudflare** | 20 min | Unlimited | Advanced users |

---

## Recommended: Start with ngrok!

It's the fastest way to see your app live from anywhere.

Questions? Check the main README.md
