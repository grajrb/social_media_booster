# 🏠 Local Development Setup Guide

Complete instructions to setup and run the Task Manager application locally on your machine.

## Table of Contents
1. [System Requirements](#system-requirements)
2. [Database Setup (Supabase)](#database-setup-supabase)
3. [Backend Setup & Running](#backend-setup--running)
4. [Frontend Setup & Running](#frontend-setup--running)
5. [Local Testing](#local-testing)
6. [Troubleshooting](#troubleshooting)

---

## System Requirements

### Windows PC

- **Node.js**: 16+ (for frontend)
  - Download: https://nodejs.org
  - Check: `node --version` (should show v16 or higher)

- **Python**: 3.9+
  - Download: https://www.python.org
  - Check: `python --version`
  - ⚠️ During installation, check "Add Python to PATH"

- **Git**: Latest version
  - Download: https://git-scm.com
  - Check: `git --version`

- **PostgreSQL Client Tools**: (Optional, for database management)
  - Download: https://www.postgresql.org/download

### Verify Installation

Open Command Prompt (cmd) or PowerShell and run:

```bash
node --version      # Should show v16+
npm --version       # Should show 8+
python --version    # Should show 3.9+
git --version       # Should show latest
```

---

## Database Setup (Supabase)

### Step 1: Create Supabase Account

1. Go to https://supabase.com
2. Sign up with GitHub or email
3. Create new organization and project
4. Wait for database creation (2-3 minutes)

### Step 2: Get Database Connection String

1. In Supabase dashboard, go to **Settings** (gear icon)
2. Select **Database** → **Connection Pooling**
3. Copy connection string starting with `postgresql://`
4. Example format:
   ```
   postgresql://postgres.abc123:[PASSWORD]@db.abc123.supabase.co:5432/postgres
   ```

### Step 3: Save Connection String

You'll need this when setting up the backend `.env` file.

---

## Backend Setup & Running

### Step 1: Open Terminal in Backend Folder

```bash
# Navigate to the project
cd "d:\Projects\social media\backend"

# Verify you're in the right place
dir         # Should show: app/, requirements.txt, .env.example
```

### Step 2: Create Virtual Environment (Recommended)

```bash
# Create virtual environment


# Activate it
# On Windows:
venv\Scripts\activate

# Or on PowerShell:
.\venv\Scripts\Activate.ps1

# You should see (venv) at start of command line when active
```

### Step 3: Install Python Dependencies

```bash
# Make sure you're in backend/ folder AND venv is active
pip install -r requirements.txt

# This will install:
# - fastapi
# - uvicorn
# - sqlalchemy
# - psycopg2
# - python-dotenv
# - etc.

# Verify installation
pip list | findstr fastapi    # Should show fastapi version
```

### Step 4: Configure Environment Variables

```bash
# Create .env file from example
copy .env.example .env

# Or manually create .env with:
# DATABASE_URL=postgresql://...  (from Supabase)
# WEATHER_API_KEY=your_key_here  (optional)
```

Edit `.env` file with your Supabase connection string:

```env
DATABASE_URL=postgresql://postgres.abc123:[PASSWORD]@db.abc123.supabase.co:5432/postgres
WEATHER_API_KEY=
DEBUG=True
PORT=8000
```

### Step 5: Start Backend Server

```bash
# Make sure you're in backend/ folder and venv is active
uvicorn app.main:app --reload --port 8000

# You should see:
# INFO:     Application startup complete
# INFO:     Uvicorn running on http://127.0.0.1:8000
```

### Step 6: Verify Backend is Running

Open browser and go to:
- **Home**: http://localhost:8000
- **Health Check**: http://localhost:8000/health
- **API Docs**: http://localhost:8000/docs  ← Interactive API testing!

---

## Frontend Setup & Running

### Step 1: Open New Terminal in Frontend Folder

```bash
# Keep backend running in first terminal!
# Open NEW terminal/PowerShell window

# Navigate to frontend
cd "d:\Projects\social media\frontend"

# Verify location
dir         # Should show: src/, package.json, tsconfig.json
```

### Step 2: Install Node Dependencies

```bash
# Install all packages (takes 1-2 minutes first time)
npm install

# This installs:
# - next
# - react
# - axios
# - recharts
# - typescript
# - etc.

# Verify installation
npm list | findstr next    # Should show next version
```

### Step 3: Configure Environment Variables

```bash
# Create .env.local file
copy .env.local.example .env.local

# Or manually create with:
# NEXT_PUBLIC_API_URL=http://localhost:8000
```

**Important**: Edit `.env.local` and set:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### Step 4: Start Frontend Development Server

```bash
# Make sure you're in frontend/ folder
npm run dev

# You should see:
# ▲ Next.js 14.0.0
# - Local:        http://localhost:3000
```

### Step 5: Open in Browser

Open http://localhost:3000 in your browser.

You should see the Task Manager home page with:
- Navigation bar at top
- Welcome message
- "View All Tasks", "Create New Task", "Dashboard" buttons

---

## Local Testing

Now that both servers are running, test all features:

### Test 1: Create Task

1. Click "Create New Task" (or go to http://localhost:3000/tasks/new)
2. Fill the form:
   ```
   Title: "Buy groceries"
   Description: "Milk, eggs, bread, cheese"
   Priority: "Medium"
   Status: "To Do"  
   Due Date: 2026-02-08
   ```
3. Click "Create Task"
4. ✅ Should redirect to /tasks and task appears in list

### Test 2: View Task List

1. Navigate to http://localhost:3000/tasks
2. ✅ See all your created tasks displayed as cards
3. ✅ Each card shows:
   - Task title (clickable)
   - Description
   - Priority badge (colored)
   - Status badge
   - Due date
   - Action buttons (View Details, Edit, Delete)

### Test 3: Filter Tasks

1. On /tasks page, change filters:
   - Status Filter: "To Do"
   - Priority Filter: "High"
2. ✅ List updates to show only matching tasks
3. Reset filters to see all again

### Test 4: View Task Details

1. Click "View Details" on any task
2. ✅ See full task information:
   - Complete title and description
   - Priority/Status badges
   - Due date formatted nicely
   - Weather status (e.g., "Due in 3 days")
   - Created/Updated timestamps
3. ✅ See "Edit" and "Delete" buttons

### Test 5: Edit Task

1. On task details page, click "Edit"
2. Modify the form:
   - Change Status to "In Progress"
   - Change Priority to "High"
3. Click "Update Task"
4. ✅ Form closes and changes are visible immediately
5. ✅ Check dashboard - counts should update

### Test 6: Delete Task

1. On task details page, click "Delete"
2. Confirm deletion dialog
3. ✅ Should redirect to /tasks
4. ✅ Task no longer in list

### Test 7: View Dashboard

1. Click "Dashboard" in navbar (or go to http://localhost:3000/dashboard)
2. ✅ See summary cards showing:
   - Total tasks
   - Completed count
   - In-progress count
   - Completion rate %
3. ✅ See Status Distribution pie chart
4. ✅ See Priority Distribution bar chart
5. ✅ See "Due This Week" section with upcoming tasks
6. ✅ See "Overdue Tasks" section (highlighted in red)

### Test 8: Test REST APIs

Use the Swagger UI or curl commands:

```bash
# 1. List all tasks
curl http://localhost:8000/api/tasks

# 2. Create a task
curl -X POST http://localhost:8000/api/tasks \
  -H "Content-Type: application/json" \
  -d "{\"title\": \"API Test\", \"priority\": \"high\"}"

# 3. Get single task (change 1 to actual task ID)
curl http://localhost:8000/api/tasks/1

# 4. Update task
curl -X PUT http://localhost:8000/api/tasks/1 \
  -H "Content-Type: application/json" \
  -d "{\"status\": \"completed\"}"

# 5. Delete task
curl -X DELETE http://localhost:8000/api/tasks/1

# 6. Get statistics
curl http://localhost:8000/api/tasks/stats/summary

# 7. Get task weather
curl http://localhost:8000/api/tasks/1/weather
```

Or use the **Interactive Swagger UI**: http://localhost:8000/docs
- Click "Try it out" on any endpoint
- Modify parameters
- Click "Execute"
- See response

### Test 9: Verify Data Persistence

1. Create a task
2. Refresh browser (press F5)
3. ✅ Task still exists in list
4. Navigate between pages
5. ✅ Data persists across pages

---

## Keeping Servers Running

During local development, keep both running:

```
Terminal 1 (Backend):
$ cd backend
$ venv\Scripts\activate  # if using venv
$ uvicorn app.main:app --reload

Terminal 2 (Frontend):
$ cd frontend
$ npm run dev
```

### Restarting After Changes

- **Backend**: Changes auto-reload (--reload flag)
- **Frontend**: Changes auto-reload in browser
- **Database**: No restart needed

---

## Troubleshooting

### "ModuleNotFoundError: No module named 'fastapi'"

**Problem**: Dependencies not installed

**Solution**:
```bash
# Make sure you're in backend/ folder
pip install -r requirements.txt
```

### "Connection refused" error from frontend

**Problem**: Backend not running or wrong URL

**Solution**:
1. Check backend is running in first terminal
2. Verify NEXT_PUBLIC_API_URL in `.env.local` is `http://localhost:8000`
3. Clear frontend cache: Ctrl+Shift+Delete and refresh
4. Restart frontend: Stop (Ctrl+C) and `npm run dev`

### "psycopg2 error" or "Database connection refused"

**Problem**: Wrong DATABASE_URL or database offline

**Solution**:
1. Go to Supabase dashboard
2. Verify project is "Active" (green status)
3. Copy CONNECTION STRING again very carefully
4. Paste into `.env` file
5. Ensure special characters are not double-escaped
6. Restart backend

Example correct format:
```
postgresql://postgres.abc123:ABC123def456@db.abc123.supabase.co:5432/postgres
```

### "Port 8000 already in use"

**Problem**: Another application using port 8000

**Solution**:
```bash
# Use different port
uvicorn app.main:app --reload --port 8001

# Then update frontend .env.local:
# NEXT_PUBLIC_API_URL=http://localhost:8001
```

### "npm install failing"

**Problem**: Node modules corrupted or network issue

**Solution**:
```bash
# Delete node_modules
rmdir /s node_modules    # on Windows CMD
# or: rm -r node_modules  # on PowerShell

# Clear npm cache
npm cache clean --force

# Reinstall
npm install
```

### Tasks not appearing in frontend after creation

**Problem**: API URL mismatch or CORS issue

**Solution**:
1. Check browser DevTools → Console for errors
2. Check Network tab → see if API requests are failing
3. Verify NEXT_PUBLIC_API_URL is correct
4. Check backend CORS is enabled (it should be by default)

---

## Development Tips

### Hot Reload

Both servers support hot reload:

**Backend**: Edit `app/routes/tasks.py` → saves automatically
**Frontend**: Edit `src/pages/tasks.tsx` → reloads in browser

### Debugging Frontend

1. Open Browser DevTools: F12
2. Go to **Console** tab for errors
3. Go to **Network** tab to see API calls
4. Go to **Application** → **Storage** to see local data

### Debugging Backend

1. Check terminal output for errors
2. Add print statements in Python code
3. Use Swagger UI to test endpoints: http://localhost:8000/docs
4. Check FastAPI automatic documentation: http://localhost:8000/redoc

### Database Schema

Tables created automatically, but to view:

1. Go to Supabase Dashboard
2. Click **SQL Editor**
3. Run: `SELECT * FROM tasks;`
4. See all tasks in database

---

## Next Steps

Once local testing is complete:

1. ✅ All CRUD operations working
2. ✅ Dashboard shows correct data
3. ✅ REST APIs accessible
4. ✅ Weather feature working

See [DEPLOYMENT.md](DEPLOYMENT.md) for deploying to Railway and Vercel.

---

## Quick Command Reference

```bash
# Backend
cd backend
python -m venv venv
venv\Scripts\activate          # Windows
pip install -r requirements.txt
copy .env.example .env
# Edit .env with DATABASE_URL
uvicorn app.main:app --reload

# Frontend (in new terminal)
cd frontend
npm install
copy .env.local.example .env.local
# Ensure NEXT_PUBLIC_API_URL=http://localhost:8000
npm run dev

# Then open:
# Frontend: http://localhost:3000
# Backend: http://localhost:8000
# API Docs: http://localhost:8000/docs
```

---

**Happy developing! 🚀**
