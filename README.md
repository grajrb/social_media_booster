# Task Manager with Weather Integration

A full-stack task management application built with FastAPI (backend), Next.js (frontend), PostgreSQL (Supabase), and integrated weather API for due date context.

**Features:**
- ✅ Full CRUD operations (Create, Read, Update, Delete) via UI and REST APIs
- 📊 Dashboard with task statistics and visualizations
- 🌤️ Weather API integration showing task deadline context
- 📱 Responsive UI with Next.js
- 🔒 RESTful API with FastAPI
- 🔄 Real-time data synchronization

## 🚀 Quick Links

- **Live Frontend:** [Add after deployment to Vercel]
- **Live API:** [Add after deployment to Railway]
- **API Documentation:** `{API_URL}/docs` (Swagger UI)
- **Demo Video:** [Add Google Drive link after recording]

## 💻 Local Quick Start

### Backend
```bash
cd backend
pip install -r requirements.txt
cp .env.example .env        # Edit with Supabase credentials
uvicorn app.main:app --reload
```
→ API available at `http://localhost:8000` | Docs at `/docs`

### Frontend
```bash
cd frontend
npm install
cp .env.local.example .env.local   # Set NEXT_PUBLIC_API_URL
npm run dev
```
→ UI available at `http://localhost:3000`

## 📋 Project Structure

```
.
├── backend/
│   ├── app/
│   │   ├── main.py              # FastAPI app
│   │   ├── database.py          # SQLAlchemy setup
│   │   ├── models.py            # Database models
│   │   ├── schemas.py           # Pydantic schemas
│   │   ├── routes/
│   │   │   └── tasks.py         # CRUD + Weather API endpoints
│   │   └── services/
│   │       └── weather.py       # Weather service
│   ├── requirements.txt
│   ├── .env.example
│   └── README.md
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── _app.tsx         # App wrapper + navbar
│   │   │   ├── index.tsx        # Home page
│   │   │   ├── dashboard.tsx    # Dashboard with charts
│   │   │   └── tasks/
│   │   │       ├── index.tsx    # Task list page
│   │   │       ├── new.tsx      # Create task page
│   │   │       └── [id].tsx     # Task details/edit page
│   │   ├── components/
│   │   │   ├── TaskForm.tsx     # Reusable form
│   │   │   └── TaskCard.tsx     # Task display card
│   │   └── utils/
│   │       └── api.ts           # API client
│   ├── package.json
│   ├── tsconfig.json
│   ├── next.config.js
│   ├── .env.local.example
│   └── README.md
├── .gitignore
└── README.md (this file)
```

## Tech Stack

| Component | Tech |
|-----------|------|
| Backend | FastAPI, SQLAlchemy, Psycopg2 |
| Frontend | Next.js 14+, React 18+, Recharts |
| Database | PostgreSQL (Supabase) |
| API Integration | OpenWeatherMap |
| Deployment | Railway (Backend), Vercel (Frontend) |

## 🔧 Local Testing Guide

### 1. Setup Local Environment

**Step 1: Start Backend**
```bash
cd backend
pip install -r requirements.txt
cp .env.example .env
# Edit .env with Supabase DATABASE_URL
uvicorn app.main:app --reload --port 8000
```

**Step 2: Start Frontend**
```bash
# In new terminal
cd frontend
npm install
cp .env.local.example .env.local
# Ensure NEXT_PUBLIC_API_URL=http://localhost:8000
npm run dev
```

### 2. Test CRUD via UI

**Create Task:**
1. Open http://localhost:3000
2. Click "Create New Task" or navigate to /tasks/new
3. Fill form:
   - Title: "Complete demo setup"
   - Description: "Setup and test the task manager"
   - Priority: "High"
   - Status: "In Progress"
   - Due Date: Feb 10, 2026
4. Click "Create Task"
5. ✅ Verify: Task appears in list at /tasks

**View Task List:**
1. Navigate to /tasks
2. ✅ Verify: All created tasks displayed as cards
3. ✅ Verify: Priority badges show correct colors
4. ✅ Verify: Status badges show correct values
5. ✅ Verify: Due dates formatted correctly

**View Task Details:**
1. Click "View Details" on any task
2. ✅ Verify: Full task information displayed
3. ✅ Verify: Weather status showing (e.g., "Due in 5 days")
4. ✅ Verify: Created/Updated timestamps shown

**Update Task (UI):**
1. On task detail page, click "Edit"
2. Modify: Change status to "Completed" and priority to "Low"
3. Click "Update Task"
4. ✅ Verify: Changes reflected immediately
5. ✅ Verify: Dashboard show increased completed count

**Delete Task (UI):**
1. On task detail page, click "Delete"
2. Confirm deletion
3. ✅ Verify: Redirected to /tasks
4. ✅ Verify: Task removed from list

**Filter Tasks:**
1. On /tasks page
2. Select "Status Filter": "Completed"
3. ✅ Verify: Only completed tasks shown
4. Select "Priority Filter": "High"
5. ✅ Verify: Combined filters work correctly
6. Reset filters to view all

### 3. Test REST API Endpoints

**Create Task via API:**
```bash
curl -X POST http://localhost:8000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "title": "API Test Task",
    "description": "Created via REST API",
    "priority": "high",
    "status": "todo",
    "due_date": "2026-02-08T18:00:00"
  }'
```

**List Tasks via API:**
```bash
curl http://localhost:8000/api/tasks
```

**Get Single Task:**
```bash
curl http://localhost:8000/api/tasks/1
```

**Update Task via API:**
```bash
curl -X PUT http://localhost:8000/api/tasks/1 \
  -H "Content-Type: application/json" \
  -d '{"status": "completed", "priority": "low"}'
```

**Delete Task via API:**
```bash
curl -X DELETE http://localhost:8000/api/tasks/1
```

**Get Statistics:**
```bash
curl http://localhost:8000/api/tasks/stats/summary
```

**Get Weather for Task:**
```bash
curl http://localhost:8000/api/tasks/1/weather
```

### 4. Test Dashboard

1. Navigate to http://localhost:3000/dashboard
2. ✅ Verify: Summary cards show accurate counts:
   - Total tasks
   - Completed count
   - In-progress count
   - Completion rate %
3. ✅ Verify: Status Distribution pie chart displays
4. ✅ Verify: Priority Distribution bar chart displays
5. ✅ Verify: "Due This Week" section shows relevant tasks
6. ✅ Verify: "Overdue Tasks" section highlights past-due items
7. Create a new task and click "Refresh Dashboard"
8. ✅ Verify: Dashboard updates with new task count

### 5. Test Weather Integration

1. Create a task with a due date
2. Navigate to task details
3. ✅ Verify: Weather status shows (e.g., "Due in 5 days")
4. Edit task due date to today
5. ✅ Verify: Status updates to "Due today"
6. Edit task due date to yesterday (past)
7. ✅ Verify: Status shows overdue (if not completed)

## 🚀 Deployment

### Deploy Backend to Railway

1. **Create Railway Account:** https://railway.app
2. **Connect GitHub:** Deploy → Select this repository
3. **Set Environment Variables:**
   - `DATABASE_URL`: Supabase PostgreSQL connection string
   - `WEATHER_API_KEY`: Optional OpenWeatherMap key
4. **Configure Build:**
   - Build: `pip install -r backend/requirements.txt`
   - Start: `uvicorn backend.app.main:app --host 0.0.0.0 --port $PORT`
5. **Deploy:** Railway auto-deploys; get public URL
6. **Save URL:** Use in frontend deployment

### Deploy Frontend to Vercel

1. **Create Vercel Account:** https://vercel.com
2. **Connect GitHub:** Import project
3. **Configure:**
   - Root Directory: `frontend`
   - Framework: Next.js
   - Build: `npm run build`
   - Environment Variable:
     - `NEXT_PUBLIC_API_URL`: Your Railway backend URL
4. **Deploy:** Vercel auto-deploys on push
5. **Get URL:** Used in submission

## 📊 API Endpoints Reference

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Health check |
| GET | `/health` | API status |
| **Tasks:** |
| POST | `/api/tasks` | Create task |
| GET | `/api/tasks` | List tasks (with filters) |
| GET | `/api/tasks/{id}` | Get task by ID |
| PUT | `/api/tasks/{id}` | Update task |
| DELETE | `/api/tasks/{id}` | Delete task |
| GET | `/api/tasks/stats/summary` | Get statistics |
| **Weather:** |
| GET | `/api/weather` | Get weather by location |
| GET | `/api/tasks/{id}/weather` | Get weather for task due date |
| **Docs:** |
| GET | `/docs` | Swagger API docs (interactive) |
| GET | `/redoc` | ReDoc documentation |

## 📱 UI Pages

| Page | Path | Features |
|------|------|----------|
| Home | `/` | Welcome, features overview, quick links |
| Task List | `/tasks` | All tasks, filters, actions |
| Create Task | `/tasks/new` | Form to create new task |
| Task Details | `/tasks/{id}` | Full details, edit, delete, weather |
| Dashboard | `/dashboard` | Charts, statistics, upcoming/overdue |

## ✅ Submission Checklist

- [ ] **Code**: Both backend and frontend fully implemented
- [ ] **Git**: Code pushed to public GitHub repo(s)
- [ ] **Live Links**: 
  - [ ] Frontend deployed to Vercel (working UI)
  - [ ] Backend deployed to Railway (working API)
- [ ] **CRUD**: All operations tested and working:
  - [ ] Create task via UI
  - [ ] View task list
  - [ ] View task details
  - [ ] Update task
  - [ ] Delete task
  - [ ] All via REST APIs
- [ ] **Dashboard**: Statistics and charts reflecting database data
- [ ] **Weather**: Third-party API integrated and working
- [ ] **README**: Includes setup, deployment, testing steps
- [ ] **Video**: 3-5 minute screen recording on Google Drive showing:
  - [ ] Live link opens
  - [ ] CRUD via UI (create → view → update → delete)
  - [ ] Dashboard working
  - [ ] Weather feature working
  - [ ] API calls working

## 📚 Setup Guides

- **Backend Setup**: See [backend/README.md](backend/README.md)
- **Frontend Setup**: See [frontend/README.md](frontend/README.md)

## 🐛 Troubleshooting

**Backend connection fails:**
- Check DATABASE_URL in .env
- Verify Supabase project is active
- Check psycopg2 is installed

**Frontend can't reach API:**
- Check NEXT_PUBLIC_API_URL in .env.local
- Verify backend is running
- Check CORS is enabled

**Database tables not creating:**
- Ensure DATABASE_URL is correct
- Tables auto-create on app start
- Check database user has permissions

**Weather API not working:**
- WEATHER_API_KEY is optional
- App works without weather data
- Check API key validity if provided

## 📝 Additional Notes

- Database tables created automatically on first run
- CRUD works both via UI and REST API
- Dashboard auto-updates without refresh
- Responsive design works on mobile/tablet
- All timestamps in UTC
- Overdue tasks highlighted in red

---

**Last Updated:** February 5, 2026
**Status:** ✅ Ready for deployment and testing

