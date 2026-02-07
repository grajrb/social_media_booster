# 🚀 Quick Start Guide

Get your Task Manager up and running in minutes!

## Option 1: Automatic Setup (Windows)

```bash
# Double-click setup.bat or run:
setup.bat
```

Then:
1. Edit `backend\.env` with your Supabase DATABASE_URL
2. Edit `frontend\.env.local` (should be set to http://localhost:8000)
3. Start servers (see "Running" section below)

## Option 2: Manual Setup

### Backend Setup (3 minutes)

```bash
# 1. Navigate to backend
cd backend

# 2. Install dependencies
pip install -r requirements.txt

# 3. Setup environment
# Edit .env file with your Supabase DATABASE_URL
# (Get from https://supabase.com → Settings → Database)

# 4. Start server
uvicorn app.main:app --reload
```

Backend will run at: `http://localhost:8000`

### Frontend Setup (2 minutes)

```bash
# 1. Open NEW terminal, navigate to frontend
cd frontend

# 2. Install dependencies
npm install

# 3. Verify environment
# Make sure .env.local has: NEXT_PUBLIC_API_URL=http://localhost:8000

# 4. Start development server
npm run dev
```

Frontend will run at: `http://localhost:3000`

## Running Both Servers

**Terminal 1 - Backend:**
```bash
cd backend
uvicorn app.main:app --reload
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

**Open Browser:** http://localhost:3000

## First Time Use

1. Open http://localhost:3000
2. Click "Create New Task"
3. Fill the form and submit
4. See your task in the list
5. Check the Dashboard to see statistics

## Troubleshooting

**"Database connection error"**
- Check `backend\.env` has correct DATABASE_URL from Supabase
- Verify Supabase project is active

**"Cannot connect to API"**
- Check backend is running on port 8000
- Verify `frontend\.env.local` has `NEXT_PUBLIC_API_URL=http://localhost:8000`

**"Port already in use"**
- Backend: Change port in command: `uvicorn app.main:app --reload --port 8001`
- Frontend: Automatic prompt to use different port

## Next Steps

- Read [README.md](README.md) for full documentation
- Follow [LOCAL_SETUP.md](LOCAL_SETUP.md) for detailed setup
- See [DEPLOYMENT.md](DEPLOYMENT.md) for deployment guide
- Check [SUBMISSION_CHECKLIST.md](SUBMISSION_CHECKLIST.md) before submitting

## API Documentation

Once backend is running:
- **Swagger UI:** http://localhost:8000/docs
- **ReDoc:** http://localhost:8000/redoc

## Project Structure

```
├── backend/          # FastAPI application
├── frontend/         # Next.js application
├── README.md         # Project overview
├── LOCAL_SETUP.md    # Detailed setup guide
├── DEPLOYMENT.md     # Deployment instructions
└── setup.bat         # Windows quick setup script
```

---

**Need help?** Check the troubleshooting sections in README.md or LOCAL_SETUP.md
