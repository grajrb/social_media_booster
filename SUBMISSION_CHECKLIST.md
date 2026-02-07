# 📋 Final Submission Checklist

Use this checklist before submitting your demo task to Social Booster Media.

## ✅ Pre-Submission Verification

### 1. Code Completion

- [x] Backend (FastAPI) fully implemented
- [x] Frontend (Next.js) fully implemented
- [x] Database models and migrations ready
- [x] REST API endpoints working (GET, POST, PUT, DELETE)
- [x] Weather API integration implemented
- [x] Dashboard with charts implemented
- [x] All UI pages created (home, tasks list, create, edit, dashboard)

### 2. GitHub Repository

- [ ] Code pushed to GitHub (public repository)
- [ ] Repository has clear name (e.g., "task-manager-demo" or "social-booster-task-app")
- [ ] All commits pushed
- [ ] `.env` files NOT committed (check .gitignore)
- [ ] README.md is comprehensive and clear

**GitHub Repo Structure:**
```
✓ backend/ folder exists
✓ frontend/ folder exists
✓ README.md in root
✓ backend/README.md exists
✓ frontend/README.md exists
✓ DEPLOYMENT.md exists
✓ LOCAL_SETUP.md exists
✓ .gitignore properly configured
```

### 3. Database Setup

- [ ] Supabase project created and active
- [ ] Database connection string obtained
- [ ] Tables created successfully (tasks table exists)
- [ ] Database is accessible from backend

**Test Database Connection:**
```bash
# From backend folder
python -c "from app.database import engine; print('Connected!' if engine else 'Failed')"
```

### 4. Local Testing (Before Deployment)

#### Backend Tests:
- [ ] Backend starts without errors
- [ ] Health endpoint works: `http://localhost:8000/health`
- [ ] API docs accessible: `http://localhost:8000/docs`
- [ ] Create task via API works
- [ ] List tasks via API works
- [ ] Update task via API works
- [ ] Delete task via API works
- [ ] Stats endpoint returns data
- [ ] Weather endpoint returns status

**Quick API Test:**
```bash
# Test health
curl http://localhost:8000/health

# Test list tasks
curl http://localhost:8000/api/tasks

# Test stats
curl http://localhost:8000/api/tasks/stats/summary
```

#### Frontend Tests:
- [ ] Frontend starts on port 3000
- [ ] Homepage loads with navigation
- [ ] Tasks list page displays
- [ ] Create task form works
- [ ] Task details page shows correctly
- [ ] Edit task functionality works
- [ ] Delete task functionality works
- [ ] Dashboard page loads with charts
- [ ] Weather information displays on task details
- [ ] Filters work on tasks list
- [ ] No console errors in browser (check DevTools)

**Quick UI Test:**
1. Open http://localhost:3000
2. Create a task
3. View it in list
4. Check dashboard updates
5. Edit the task
6. Delete the task

### 5. Deployment

#### Backend (Railway):
- [ ] Railway account created
- [ ] Project deployed to Railway
- [ ] Environment variables set (`DATABASE_URL`, `WEATHER_API_KEY`)
- [ ] Deployment successful (green status)
- [ ] Public URL obtained (e.g., `https://xxx.up.railway.app`)
- [ ] Live health check works: `{railway_url}/health`
- [ ] Live API endpoints accessible

**Test Live Backend:**
```bash
# Replace with your Railway URL
curl https://your-railway-url.up.railway.app/health
curl https://your-railway-url.up.railway.app/api/tasks
```

#### Frontend (Vercel):
- [ ] Vercel account created
- [ ] Project deployed to Vercel
- [ ] Root directory set to "frontend"
- [ ] Environment variable set: `NEXT_PUBLIC_API_URL` = Railway URL
- [ ] Deployment successful
- [ ] Public URL obtained (e.g., `https://xxx.vercel.app`)
- [ ] Live URL opens and displays homepage
- [ ] All pages accessible from live deployment

**Test Live Frontend:**
- Open Vercel URL in browser
- Navigate through all pages
- Create, edit, delete tasks
- View dashboard

### 6. End-to-End Testing on Live Deployment

Perform these tests on your LIVE Vercel URL:

1. **CRUD via UI:**
   - [ ] Create task: Fill form, submit, verify in list
   - [ ] View task: Click task, see details page with weather
   - [ ] Update task: Edit task, save, see changes
   - [ ] Delete task: Delete task, confirm removal

2. **Dashboard:**
   - [ ] Navigate to /dashboard
   - [ ] See summary cards with counts
   - [ ] Status pie chart displays correctly
   - [ ] Priority bar chart displays correctly
   - [ ] "Due This Week" section shows tasks
   - [ ] "Overdue Tasks" section highlights overdue items
   - [ ] Create a task, refresh dashboard, see updated count

3. **Weather API:**
   - [ ] Create task with due date
   - [ ] View task details
   - [ ] Weather status displays (e.g., "Due in 5 days")

4. **REST API via Live Backend:**
   ```bash
   # Replace with your Railway URL
   BACKEND_URL="https://your-railway-url.up.railway.app"
   
   # Create task
   curl -X POST $BACKEND_URL/api/tasks \
     -H "Content-Type: application/json" \
     -d '{"title":"API Test","priority":"high","status":"todo"}'
   
   # List tasks
   curl $BACKEND_URL/api/tasks
   
   # Get stats
   curl $BACKEND_URL/api/tasks/stats/summary
   ```

### 7. Documentation Quality

#### Root README.md:
- [ ] Project title and description
- [ ] Features list
- [ ] Tech stack outlined
- [ ] Quick start instructions
- [ ] Links to backend/frontend READMEs
- [ ] Live deployment URLs included
- [ ] Demo video link included (after recording)

#### backend/README.md:
- [ ] Setup instructions clear
- [ ] Environment variables documented
- [ ] Database setup explained
- [ ] How to run locally
- [ ] API endpoints documented
- [ ] Testing steps included
- [ ] Deployment notes present

#### frontend/README.md:
- [ ] Setup instructions clear
- [ ] Environment variables documented
- [ ] How to run locally
- [ ] UI pages described
- [ ] Testing steps included
- [ ] Deployment notes present

### 8. Screen Recording (3-5 minutes)

Record your screen showing:

**Script to Follow:**

1. **Introduction (10 seconds):**
   - "This is my Task Manager demo for Social Booster Media"
   - Show live Vercel URL in browser

2. **CRUD via UI (2 minutes):**
   - Open live frontend
   - Click "Create New Task"
   - Fill form: Title, description, priority, status, due date
   - Submit and show task in list
   - Click task to view details (show weather info)
   - Click "Edit", change status/priority
   - Save and show changes
   - Click "Delete" and confirm removal

3. **Dashboard (1 minute):**
   - Navigate to Dashboard
   - Show summary cards
   - Point out pie chart (status distribution)
   - Point out bar chart (priority distribution)
   - Show "Due This Week" section
   - Show "Overdue Tasks" if any

4. **Third-Party API (30 seconds):**
   - Show weather information on a task details page
   - Explain it shows status based on due date

5. **REST API (1 minute):**
   - Open terminal or Postman
   - Show API call: `curl {railway_url}/api/tasks`
   - Show response with JSON data
   - Show stats API: `curl {railway_url}/api/tasks/stats/summary`

6. **Wrap up (10 seconds):**
   - "All features working on live deployment"
   - "Thank you!"

**Recording Tools:**
- Windows: Xbox Game Bar (Win + G) or OBS Studio
- Upload to Google Drive
- Set permissions to "Anyone with the link can view"
- Copy shareable link

### 9. Submission Email/Form

Prepare these for submission:

**Required Links:**
1. **Frontend Live URL:** `https://[your-app].vercel.app`
2. **Backend Live URL:** `https://[your-app].up.railway.app`
3. **GitHub Repository:** `https://github.com/[username]/[repo-name]`
4. **Demo Video (Google Drive):** `https://drive.google.com/file/d/[file-id]/view`

**Email Template:**

```
Subject: Demo Task Submission - [Your Name] - Full Stack Developer

Hi Social Booster Media Team,

I'm excited to submit my completed demo task for the Full Stack Developer role.

LIVE DEPLOYMENT:
- Frontend: https://[your-app].vercel.app
- Backend API: https://[your-app].up.railway.app
- API Documentation: https://[your-app].up.railway.app/docs

GITHUB REPOSITORY:
- Repository: https://github.com/[username]/[repo-name]
- README with setup/testing: See root README.md

DEMO VIDEO (3-5 min):
- Google Drive Link: https://drive.google.com/file/d/[id]/view
  (Shows: CRUD via UI, Dashboard, Weather API, REST API endpoints)

TECH STACK:
- Backend: FastAPI + PostgreSQL (Supabase)
- Frontend: Next.js + React + Recharts
- Third-Party API: Weather API integration
- Deployment: Vercel (Frontend) + Railway (Backend)

FEATURES IMPLEMENTED:
✅ Full CRUD operations (UI + REST APIs)
✅ Dashboard with status/priority visualizations
✅ Weather API integration for task due dates
✅ All working on live deployment
✅ Comprehensive README with setup/testing steps

TESTING NOTES:
- Live frontend opens at Vercel URL and is fully functional
- All CRUD operations work end-to-end on live deployment
- Dashboard reflects real-time database data
- Weather information displays on task details
- REST APIs accessible via live backend URL

Please let me know if you need any additional information or clarification.

Best regards,
[Your Name]
[Your Email]
[Your Phone]
```

---

## 🚨 Common Issues to Check Before Submission

### Issue: Live frontend shows blank page
- Check browser console for errors
- Verify `NEXT_PUBLIC_API_URL` is set in Vercel environment
- Ensure backend is deployed and accessible
- Check CORS is enabled in backend

### Issue: API calls return 404/500
- Verify Railway deployment is successful
- Check DATABASE_URL is correct in Railway
- Check database is active in Supabase
- Test endpoints with curl or Postman

### Issue: Dashboard shows 0 tasks but tasks exist
- Create a task via UI first
- Refresh the page
- Check browser console for errors
- Verify API calls are reaching backend

### Issue: Weather not showing
- Weather is optional - app works without it
- If you want it working, add `WEATHER_API_KEY` to Railway
- Weather shows "Due in X days" even without API key

### Issue: README not clear
- Follow the examples in backend/README.md and frontend/README.md
- Include all sections: Setup, Environment, Running, Testing, Deployment
- Use code blocks for commands
- Include screenshots if helpful

---

## 📝 Final Checklist Summary

Before clicking submit:

- [ ] ✅ All code complete and tested locally
- [ ] ✅ GitHub repo public with comprehensive README
- [ ] ✅ Backend deployed to Railway (live and working)
- [ ] ✅ Frontend deployed to Vercel (live and working)
- [ ] ✅ Live frontend URL opens and works
- [ ] ✅ CRUD works end-to-end on live deployment
- [ ] ✅ Dashboard displays with charts
- [ ] ✅ Weather API feature visible
- [ ] ✅ REST APIs accessible via live backend
- [ ] ✅ Screen recording completed (3-5 min)
- [ ] ✅ Demo video uploaded to Google Drive with public link
- [ ] ✅ README includes setup, testing, and deployment steps
- [ ] ✅ All required links ready (frontend, backend, GitHub, video)
- [ ] ✅ Submission email/form prepared

---

## 🎉 You're Ready!

Once all checkboxes are complete, submit with confidence!

**Good luck with your application! 🚀**

---

**Last Updated:** February 5, 2026
