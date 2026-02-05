# Task Manager Frontend

Modern React/Next.js frontend for the Task Manager application featuring full CRUD operations and an interactive dashboard.

## Features

- 🎯 **Full CRUD Operations** - Create, read, update, delete tasks from the UI
- 📊 **Interactive Dashboard** - Visualize task statistics with charts
- 🔍 **Task Filtering** - Filter tasks by status and priority
- 📱 **Responsive Design** - Works on desktop, tablet, and mobile
- 🌤️ **Weather Integration** - See task deadline context
- ⚡ **REST API Integration** - All operations via REST endpoints

## Tech Stack

- **Framework:** Next.js 14+
- **Frontend Library:** React 18+
- **Styling:** CSS-in-JS (inline styles)
- **HTTP Client:** Axios
- **Charting:** Recharts
- **Language:** TypeScript

## Local Setup

### Prerequisites

- Node.js 16+ (or 18+)
- npm or yarn
- Backend API running (see [../backend/README.md](../backend/README.md))

### Installation

1. **Install dependencies:**
   ```bash
   cd frontend
   npm install
   ```

2. **Setup environment variables:**
   ```bash
   cp .env.local.example .env.local
   ```
   Edit `.env.local` with your backend API URL:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:8000
   ```

### Running Locally

```bash
cd frontend
npm run dev
```

The frontend will be available at `http://localhost:3000`

## Building for Production

```bash
npm run build
npm start
```

## Project Structure

```
src/
├── pages/
│   ├── _app.tsx          # App wrapper with navigation
│   ├── index.tsx         # Home page
│   ├── dashboard.tsx     # Dashboard with charts
│   └── tasks/
│       ├── index.tsx     # Task list page
│       ├── new.tsx       # Create task page
│       └── [id].tsx      # Task details & edit page
├── components/
│   ├── TaskForm.tsx      # Task create/edit form
│   ├── TaskCard.tsx      # Individual task display
│   └── TaskList.tsx      # Task list component
└── utils/
    └── api.ts            # API client functions
```

## UI Pages

### 1. Home Page (`/`)
- Welcome message with features overview
- Quick links to main sections
- Getting started guide

### 2. Tasks List (`/tasks`)
- Display all tasks in card format
- Filter by status (To Do, In Progress, Completed)
- Filter by priority (Low, Medium, High)
- View, Edit, Delete actions per task
- Shows task title, description, priority, status, due date
- Highlights overdue tasks

### 3. Create Task (`/tasks/new`)
- Form to create new task
- Fields: Title (required), Description, Priority, Status, Due Date
- Form validation
- Success/Error messages
- Redirects to task list on creation

### 4. Task Details (`/tasks/{id}`)
- Full task information display
- Weather data for task deadline
- Timestamps (created_at, updated_at)
- Edit task inline
- Delete task with confirmation
- Link back to task list

### 5. Dashboard (`/dashboard`)
- Summary statistics cards:
  - Total tasks count
  - Completed tasks count
  - In-progress count
  - Completion rate percentage
- **Status Distribution Chart** - Pie chart showing tasks by status
- **Priority Distribution Chart** - Bar chart showing tasks by priority
- **Due This Week** - List of tasks due within next 7 days
- **Overdue Tasks** - Highlighted list of overdue uncompleted tasks
- Refresh button to reload dashboard data

## API Integration

All frontend operations communicate with the backend API at `NEXT_PUBLIC_API_URL`.

### Supported Operations

```typescript
// List tasks (with optional filters)
GET /api/tasks?status={status}&priority={priority}

// Get single task
GET /api/tasks/{id}

// Create task
POST /api/tasks
{
  "title": "string",
  "description": "string (optional)",
  "priority": "low|medium|high",
  "status": "todo|in_progress|completed",
  "due_date": "ISO datetime (optional)"
}

// Update task
PUT /api/tasks/{id}
{...partial fields...}

// Delete task
DELETE /api/tasks/{id}

// Get statistics
GET /api/tasks/stats/summary
```

## Testing

### Local Testing Checklist

#### 1. Create Task (UI)
1. Navigate to `/tasks/new`
2. Fill form:
   - Title: "Buy groceries"
   - Description: "Milk, eggs, bread"
   - Priority: "High"
   - Status: "To Do"
   - Due Date: Tomorrow
3. Click "Create Task"
4. Verify redirect to `/tasks` and task appears in list

#### 2. View Task List
1. Navigate to `/tasks`
2. See all created tasks displayed as cards
3. Verify task details show correctly:
   - Title, description visible
   - Priority badge colored (red=high, orange=medium, green=low)
   - Status badge showing current status
   - Due date displayed
   - Action buttons (View Details, Edit, Delete)

#### 3. View Task Details
1. Click "View Details" on any task
2. Verify full task information displayed:
   - Complete title and description
   - Priority and status badges
   - Due date and timestamps
   - Weather information (days until due)
3. Click "Edit" button

#### 4. Update Task (UI)
1. On task detail page, click "Edit"
2. Modify:
   - Title: Add " - UPDATED"
   - Status: Change to "In Progress"
   - Priority: Change to "Low"
3. Click "Update Task"
4. Verify changes reflected immediately
5. Check that `updated_at` timestamp changed

#### 5. Delete Task (UI)
1. On task detail page, click "Delete"
2. Confirm deletion in dialog
3. Verify redirect to `/tasks` and task removed from list

#### 6. Filter Tasks
1. Navigate to `/tasks`
2. Select status filter: "In Progress"
3. Verify only in-progress tasks shown
4. Change priority filter: "High"
5. Verify combined filters work
6. Click filters to reset

#### 7. Dashboard
1. Navigate to `/dashboard`
2. Verify summary cards show:
   - Total tasks count
   - Completed/in-progress/to-do counts
   - Completion rate percentage
3. Check Status Distribution chart (pie chart)
4. Check Priority Distribution chart (bar chart)
5. Verify "Due This Week" shows relevant tasks
6. Verify "Overdue Tasks" section highlights overdue items
7. Perform a CRUD operation (create/update/delete task)
8. Click "Refresh Dashboard" and verify updated numbers

### API Testing

#### Test with curl:

```bash
# 1. Create task
curl -X POST http://localhost:3000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test task from API",
    "priority": "high",
    "status": "todo"
  }'

# 2. List tasks
curl http://localhost:3000/api/tasks

# 3. Get single task
curl http://localhost:3000/api/tasks/1

# 4. Update task
curl -X PUT http://localhost:3000/api/tasks/1 \
  -H "Content-Type: application/json" \
  -d '{"status": "completed"}'

# 5. Delete task
curl -X DELETE http://localhost:3000/api/tasks/1

# 6. Get stats
curl http://localhost:3000/api/tasks/stats/summary
```

**Note:** Replace URLs with your actual backend URL when deployed.

## Deployment to Vercel

### 1. Setup

1. Create account at [Vercel.com](https://vercel.com)
2. Connect your GitHub repository

### 2. Configure

In Vercel dashboard:
- **Framework Preset:** Next.js
- **Build Command:** `npm run build`
- **Output Directory:** `.next`
- **Environment Variables:**
  - Key: `NEXT_PUBLIC_API_URL`
  - Value: Your Railway backend URL (e.g., `https://your-app-railway.up.railway.app`)

### 3. Deploy

1. Push code to GitHub
2. Vercel automatically deploys on push
3. Get public URL from Vercel dashboard (e.g., `https://task-manager-app.vercel.app`)

### 4. Troubleshooting

**Issue:** 404 errors on task routes
- Check that all pages exist in `src/pages`
- Verify `[id].tsx` syntax is correct for dynamic routes

**Issue:** API calls failing
- Verify `NEXT_PUBLIC_API_URL` is set in Vercel environment
- Check backend API is accessible and running
- Check CORS is enabled on backend

**Issue:** Charts not rendering
- Ensure recharts is installed: `npm install recharts`
- Use ResponsiveContainer for proper sizing

## Environment Variables Reference

### Development (`.env.local`)
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### Production (Vercel)
```env
NEXT_PUBLIC_API_URL=https://your-railway-backend-url.up.railway.app
```

## Notes

- All API calls include error handling with user-friendly messages
- Forms validate before submission
- Loading states shown during API calls
- Weather information updates based on task due date
- Dashboard refreshes on demand
- Responsive design uses CSS Grid for modern layouts
- Navigation bar appears on all pages for easy access

## Troubleshooting

**Issue:** "API connection refused"
- Verify backend is running
- Check `NEXT_PUBLIC_API_URL` in `.env.local`
- Ensure backend CORS allows frontend origin

**Issue:** "Tasks not showing"
- Check browser console for errors
- Verify backend `/api/tasks` endpoint returns data
- Try refreshing the page

**Issue:** "Dashboard charts not rendering"
- Ensure browser has JavaScript enabled
- Check for console errors
- Try clearing browser cache

---

See [../README.md](../README.md) for full project overview.
