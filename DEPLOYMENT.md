# 📦 Deployment Guide

Complete step-by-step instructions to deploy the Task Manager application to Railway (Backend) and Vercel (Frontend).

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Prepare for Deployment](#prepare-for-deployment)
3. [Deploy Backend to Railway](#deploy-backend-to-railway)
4. [Deploy Frontend to Vercel](#deploy-frontend-to-vercel)
5. [Post-Deployment Testing](#post-deployment-testing)
6. [Troubleshooting](#troubleshooting)

---

## Prerequisites

Before you start, you'll need:

1. **GitHub Account** - For version control and deployment
2. **Railway Account** - Free account at https://railway.app
3. **Vercel Account** - Free account at https://vercel.com
4. **Supabase Account** - PostgreSQL database at https://supabase.com
5. **Git Installed** - On your local machine
6. **Code Pushed** - All code committed and pushed to GitHub

### Step 0: Prepare Your GitHub Repository

```bash
# Make sure all changes are committed
cd "d:\Projects\social media"
git status

# If changes exist, commit them
git add -A
git commit -m "Prepare for deployment"

# Push to GitHub (if not already done)
git push origin main
```

---

## Prepare for Deployment

### 1. Create Supabase Database (PostgreSQL)

1. Go to https://supabase.com and create new project
2. Wait for database creation (~2-3 minutes)
3. Go to **Settings** → **Database** → **Connection Info**
4. Copy the **Connection String** (looks like: `postgresql://user:password@host:5432/postgres`)
5. **Save this** - you'll need it for Railway and backend testing

### 2. Get OpenWeatherMap API Key (Optional)

For weather integration (optional):
1. Go to https://openweathermap.org/api
2. Sign up for free account
3. Generate API key from account dashboard
4. **Save this** - you'll need it for Railway

---

## Deploy Backend to Railway

### Step 1: Create Railway Account & Project

1. Go to https://railway.app and sign up
2. Click **"New Project"**
3. Select **"Deploy from GitHub"**

### Step 2: Connect GitHub Repository

1. Click **"GitHub"** option
2. Authorize Railway to access your GitHub
3. Select your repository (the one with backend/frontend folders)
4. Click **"Deploy Now"**

### Step 3: Configure Build Settings

Railway should auto-detect the setup, but verify:

1. Go to your **Railway Project Dashboard**
2. Click on the deployment
3. Go to **"Settings"** tab
4. Ensure **Builder** is set to **"Dockerfile"** or **"Buildpack"**
5. Check **Build Command** (should be something like):
   ```
   pip install -r backend/requirements.txt
   ```
6. Check **Start Command**:
   ```
   uvicorn backend.app.main:app --host 0.0.0.0 --port $PORT
   ```

If these aren't set, edit them:
- Go to **Variables** tab
- Add environment variables

### Step 4: Add Environment Variables to Railway

1. In Railway Project, go to **"Variables"** tab
2. Click **"+ New Variable"**
3. Add these variables:

**Variable 1: DATABASE_URL**
- **Key**: `DATABASE_URL`
- **Value**: Your Supabase connection string (from Step 0.1)
  ```
  postgresql://user:password@host.supabase.co:5432/postgres
  ```

**Variable 2: WEATHER_API_KEY** (Optional)
- **Key**: `WEATHER_API_KEY`
- **Value**: Your OpenWeatherMap API key (from Step 0.2)

**Variable 3: DEBUG** (Optional)
- **Key**: `DEBUG`
- **Value**: `False`

4. Click **"Deploy"** button

### Step 5: Monitor Deployment

1. Go to **"Deployments"** tab
2. Watch the build progress
3. Once it shows **"✓ Success"**, your backend is deployed!
4. Go to **"Settings"** to find your public URL
   - Look for **"Domain"** section
   - Copy the URL (looks like: `https://task-manager-backend-production.up.railway.app`)

### Step 6: Test Backend Deployment

```bash
# Replace with your Railway URL
curl https://your-railway-url.up.railway.app/health

# Should return: {"status":"ok"}
```

---

## Deploy Frontend to Vercel

### Step 1: Create Vercel Account & Import Project

1. Go to https://vercel.com and sign up
2. Click **"Add New..."** → **"Project"**
3. Under **"Import Git Repository"**, select your GitHub repo
4. Click **"Import"**

### Step 2: Configure Frontend Setup

On the import screen:

1. **Framework Preset**: Select **"Next.js"**
2. **Root Directory**: Click **"Edit"** and select **"frontend"** folder
3. **Environment Variables**: Add the following:

| Key | Value | Notes |
|-----|-------|-------|
| `NEXT_PUBLIC_API_URL` | `https://your-railway-url.up.railway.app` | Your Railway backend URL from previous step |

### Step 3: Deploy

1. Click **"Deploy"** button
2. Wait for deployment to complete (~2-5 minutes)
3. Once complete, Vercel gives you a **Production URL**
   - Looks like: `https://task-manager-frontend.vercel.app`
   - Click the URL to open your live app!

### Step 4: Verify Deployment

1. Open your Vercel URL in browser
2. You should see the Task Manager home page
3. Navigate to `/tasks` to test API connectivity

---

## Post-Deployment Testing

### Test 1: Frontend Loads

1. Open your Vercel URL in browser
2. ✅ Homepage displays
3. ✅ Navigation bar shows all links
4. ✅ Styles load correctly

### Test 2: Create Task (UI)

1. Click "Create New Task"
2. Fill form:
   - Title: "Deployment Test"
   - Description: "Testing live deployment"
   - Priority: "High"
   - Status: "Todo"
   - Due Date: Feb 10, 2026
3. Click "Create Task"
4. ✅ Task appears in list

### Test 3: View Dashboard

1. Click "Dashboard" in navbar
2. ✅ Charts load
3. ✅ Statistics show correct count
4. ✅ Due this week section works

### Test 4: REST API Access

```bash
# List tasks (replace with your Railway URL)
curl https://your-railroad-url.up.railway.app/api/tasks

# Should return JSON array of tasks

# Get weather
curl https://your-railway-url.up.railway.app/api/tasks/1/weather

# Should return weather status
```

### Test 5: Update & Delete

1. Go to task details
2. Click "Edit", change status
3. ✅ Update works
4. Click "Delete"
5. ✅ Task removed from list

---

## Environment Variables Reference

### Backend (Railway)

```env
# Required
DATABASE_URL=postgresql://user:password@host:5432/database

# Optional
WEATHER_API_KEY=your_openweathermap_key
DEBUG=False
```

### Frontend (Vercel)

```env
# Required
NEXT_PUBLIC_API_URL=https://your-railway-backend-url.up.railway.app
```

---

## Troubleshooting

### "Frontend shows 404 or blank page"

**Cause**: Wrong API URL or backend not responding

**Solution**:
1. Check Vercel environment variable: `NEXT_PUBLIC_API_URL`
2. Verify it's the correct Railway URL
3. Test Railway backend is accessible:
   ```bash
   curl https://your-railway-url/health
   ```
4. Re-deploy frontend after fixing environment variable

### "API calls failing (CORS or 502)"

**Cause**: Backend not properly deployed or database issue

**Solution**:
1. Check Railway logs: Go to Deployment → **"Logs"** tab
2. Look for database connection errors
3. Verify `DATABASE_URL` is correct in Railway variables
4. Check database is running in Supabase
5. Re-deploy backend: Click **"Deploy"** → **"Redeploy"**

### "Database connection refused"

**Cause**: Wrong connection string or Supabase down

**Solution**:
1. Go to Supabase dashboard
2. Copy connection string again - make sure it's for PostgreSQL
3. Update `DATABASE_URL` in Railway
4. Ensure it includes the password with special characters escaped
5. Re-deploy Railway backend

### "Task creation works but dashboard shows 0 tasks"

**Cause**: Frontend and backend on different databases

**Solution**:
1. Verify same `DATABASE_URL` used in Rail way
2. Check no cached data in browser
3. Clear browser cache: DevTools → Application → Clear storage
4. Refresh page

### "Weather API not working"

**Cause**: Weather is optional and will work without it

**Solution**:
1. `WEATHER_API_KEY` is optional - app works without it
2. If you want weather: Get free key from OpenWeatherMap
3. Add to Railway environment variables
4. Re-deploy

---

## Deployment Checklist

- [ ] Supabase database created
- [ ] GitHub repository pushed with all code
- [ ] Railway account created
- [ ] Backend environment variables set in Railway
- [ ] Backend deployed successfully
- [ ] Backend URL obtained and working
- [ ] Vercel account created
- [ ] Frontend root directory set to "frontend"
- [ ] `NEXT_PUBLIC_API_URL` set in Vercel
- [ ] Frontend deployed successfully
- [ ] Frontend URL obtained
- [ ] Frontend loads without errors
- [ ] API connectivity working (tasks load)
- [ ] CRUD operations work via UI
- [ ] Weather feature working
- [ ] Dashboard displays stats

---

## Getting Your Deployment URLs

After deployment, you'll need these for final submission:

**Frontend URL** (from Vercel):
```
https://[your-project].vercel.app
```

**Backend API URL** (from Railway):
```
https://[your-service]-production.up.railway.app
```

**API Docs** (add /docs to backend URL):
```
https://[your-service]-production.up.railway.app/docs
```

---

## Next Steps

1. ✅ Update main README.md with live URLs
2. ✅ Test the application thoroughly
3. ✅ Record demo video showing full functionality
4. ✅ Create Google Drive link for video submission
5. ✅ Prepare final submission materials

---

**Note**: Deployments can take 2-10 minutes depending on build sizes. Be patient and check deployment logs if issues occur.
