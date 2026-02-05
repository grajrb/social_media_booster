from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import Task
from app.schemas import TaskCreate, TaskUpdate, TaskResponse
from app.services.weather import WeatherService
from typing import List, Optional

router = APIRouter()


@router.post("/tasks", response_model=TaskResponse)
def create_task(task: TaskCreate, db: Session = Depends(get_db)):
    """Create a new task"""
    db_task = Task(**task.dict())
    db.add(db_task)
    db.commit()
    db.refresh(db_task)
    return db_task


@router.get("/tasks", response_model=List[TaskResponse])
def list_tasks(
    status: str = None,
    priority: str = None,
    db: Session = Depends(get_db)
):
    """Get all tasks with optional filters"""
    query = db.query(Task)
    
    if status:
        query = query.filter(Task.status == status)
    if priority:
        query = query.filter(Task.priority == priority)
    
    tasks = query.order_by(Task.created_at.desc()).all()
    return tasks


@router.get("/tasks/{task_id}", response_model=TaskResponse)
def get_task(task_id: int, db: Session = Depends(get_db)):
    """Get a specific task by ID"""
    task = db.query(Task).filter(Task.id == task_id).first()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    return task


@router.put("/tasks/{task_id}", response_model=TaskResponse)
def update_task(
    task_id: int,
    task_update: TaskUpdate,
    db: Session = Depends(get_db)
):
    """Update a task"""
    task = db.query(Task).filter(Task.id == task_id).first()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    
    update_data = task_update.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(task, key, value)
    
    db.add(task)
    db.commit()
    db.refresh(task)
    return task


@router.delete("/tasks/{task_id}")
def delete_task(task_id: int, db: Session = Depends(get_db)):
    """Delete a task"""
    task = db.query(Task).filter(Task.id == task_id).first()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    
    db.delete(task)
    db.commit()
    return {"message": "Task deleted successfully"}


@router.get("/tasks/stats/summary")
def get_task_stats(db: Session = Depends(get_db)):
    """Get task statistics"""
    total_tasks = db.query(Task).count()
    completed_tasks = db.query(Task).filter(Task.status == "completed").count()
    in_progress_tasks = db.query(Task).filter(Task.status == "in_progress").count()
    todo_tasks = db.query(Task).filter(Task.status == "todo").count()
    
    return {
        "total": total_tasks,
        "completed": completed_tasks,
        "in_progress": in_progress_tasks,
        "todo": todo_tasks,
        "completion_rate": (completed_tasks / total_tasks * 100) if total_tasks > 0 else 0
    }


@router.get("/weather")
def get_weather(
    latitude: Optional[float] = None,
    longitude: Optional[float] = None,
    date: Optional[str] = None
):
    """Get weather information for a location"""
    from datetime import datetime as dt
    
    parsed_date = None
    if date:
        try:
            parsed_date = dt.fromisoformat(date)
        except ValueError:
            raise HTTPException(status_code=400, detail="Invalid date format. Use ISO format.")
    
    weather = WeatherService.get_weather(latitude, longitude, parsed_date)
    return weather


@router.get("/tasks/{task_id}/weather")
def get_task_weather(task_id: int, db: Session = Depends(get_db)):
    """Get weather status for a task's due date"""
    task = db.query(Task).filter(Task.id == task_id).first()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    
    status = WeatherService.get_due_date_status(task.due_date)
    return {
        "task_id": task_id,
        "due_date": task.due_date,
        "status": status,
        "description": f"Task: {task.title}"
    }

