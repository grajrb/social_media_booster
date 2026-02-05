from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import Base, engine
from app.routes import tasks

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Task Manager API", version="1.0.0")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins for now; restrict in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routes
app.include_router(tasks.router, prefix="/api")


@app.get("/")
def read_root():
    return {"message": "Task Manager API is running"}


@app.get("/health")
def health_check():
    return {"status": "ok"}
