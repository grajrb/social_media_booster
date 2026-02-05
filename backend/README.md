# Task Manager Backend API

FastAPI-based REST API for task management with PostgreSQL (Supabase) database.

## Features

- ✅ Full CRUD operations for tasks
- 📊 Task statistics endpoint
- 🌤️ Weather API integration ready
- 📝 Automatic timestamp tracking (created_at, updated_at)
- 🔍 Task filtering by status and priority

## Tech Stack

- **Framework:** FastAPI
- **ORM:** SQLAlchemy
- **Database:** PostgreSQL (Supabase)
- **Server:** Uvicorn

## Local Setup

### Prerequisites

- Python 3.9+
- PostgreSQL (or Supabase account)
- pip

### Installation

1. **Install dependencies:**
   ```bash
   cd backend
   pip install -r requirements.txt
   ```

2. **Setup environment variables:**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` with your Supabase credentials:
   ```
   DATABASE_URL=postgresql://user:password@host:5432/database_name
   WEATHER_API_KEY=your_openweathermap_key
   ```

3. **Create Supabase PostgreSQL Database:**
   - Go to [Supabase](https://supabase.com)
   - Create a new project
   - Copy the connection string from Settings → Database
   - Paste into `DATABASE_URL` in `.env`

4. **Run migrations/create tables:**
   ```bash
   # Tables are created automatically when the FastAPI app starts
   # Just run the server below
   ```

### Running Locally

```bash
cd backend
uvicorn app.main:app --reload
```

The API will be available at `http://localhost:8000`

**Swagger API Documentation:** http://localhost:8000/docs

## API Endpoints

### Tasks

#### Create Task
```bash
POST /api/tasks
Content-Type: application/json

{
  "title": "Buy groceries",
  "description": "Milk, eggs, bread",
  "priority": "medium",
  "status": "todo",
  "due_date": "2026-02-10T18:00:00"
}
```

#### List Tasks (with optional filters)
```bash
GET /api/tasks
GET /api/tasks?status=todo
GET /api/tasks?priority=high
GET /api/tasks?status=in_progress&priority=high
```

#### Get Task Details
```bash
GET /api/tasks/{task_id}
```

#### Update Task
```bash
PUT /api/tasks/{task_id}
Content-Type: application/json

{
  "status": "completed",
  "priority": "low"
}
```

#### Delete Task
```bash
DELETE /api/tasks/{task_id}
```

#### Get Task Statistics
```bash
GET /api/tasks/stats/summary
```

Response:
```json
{
  "total": 10,
  "completed": 3,
  "in_progress": 4,
  "todo": 3,
  "completion_rate": 30.0
}
```

## Database Schema

### Tasks Table

```sql
CREATE TABLE tasks (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  priority VARCHAR(50) DEFAULT 'medium',
  status VARCHAR(50) DEFAULT 'todo',
  due_date TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Columns:**
- `id`: Unique task identifier
- `title`: Task name (required)
- `description`: Task details (optional)
- `priority`: low, medium, high
- `status`: todo, in_progress, completed
- `due_date`: When task is due (optional)
- `created_at`: Auto-set creation timestamp
- `updated_at`: Auto-updated modification timestamp

## Testing

### 1. Test Create Task (via API)

```bash
curl -X POST http://localhost:8000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Complete project documentation",
    "description": "Write comprehensive README files",
    "priority": "high",
    "status": "in_progress",
    "due_date": "2026-02-07T23:59:59"
  }'
```

### 2. Test List Tasks

```bash
curl http://localhost:8000/api/tasks
```

### 3. Test Get Single Task

```bash
curl http://localhost:8000/api/tasks/1
```

### 4. Test Update Task

```bash
curl -X PUT http://localhost:8000/api/tasks/1 \
  -H "Content-Type: application/json" \
  -d '{
    "status": "completed",
    "priority": "low"
  }'
```

### 5. Test Delete Task

```bash
curl -X DELETE http://localhost:8000/api/tasks/1
```

### 6. Test Statistics

```bash
curl http://localhost:8000/api/tasks/stats/summary
```

## Deployment to Railway

1. **Create a Railway account** at [railway.app](https://railway.app)

2. **Connect your GitHub repository** to Railway

3. **Set environment variables** in Railway dashboard:
   - `DATABASE_URL`: Your Supabase PostgreSQL connection string
   - `WEATHER_API_KEY`: OpenWeatherMap API key

4. **Configure build/run commands:**
   - Build: `pip install -r backend/requirements.txt`
   - Start: `uvicorn backend.app.main:app --host 0.0.0.0 --port $PORT`

5. **Deploy** - Railway will automatically deploy your app

6. **Get the public URL** from Railway dashboard and use it in your frontend `.env.local`

## Environment Variables Reference

```env
# Required
DATABASE_URL=postgresql://user:password@db.supabase.co:5432/postgres

# Optional
WEATHER_API_KEY=your_openweathermap_api_key
DEBUG=True
PORT=8000
```

## Notes

- Database tables are created automatically on first run
- CORS is enabled for all origins (configure in production)
- API includes Swagger documentation at `/docs`
- All timestamps are in UTC

## Troubleshooting

**Issue:** `DATABASE_URL not set` error
- **Solution:** Make sure `.env` file exists and `DATABASE_URL` is set correctly

**Issue:** Connection timeout to database
- **Solution:** Check your Supabase credentials and ensure the database is online

**Issue:** Tables not creating
- **Solution:** Ensure `DATABASE_URL` is correct and manually run initial migrations if needed

---

See [../README.md](../README.md) for full project documentation.
