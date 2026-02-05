import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { tasksAPI, Task, TaskCreateInput } from '@/utils/api';
import TaskForm from '@/components/TaskForm';

export default function TaskDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editing, setEditing] = useState(false);
  const [weather, setWeather] = useState<any>(null);

  useEffect(() => {
    if (id) {
      loadTask();
    }
  }, [id]);

  const loadTask = async () => {
    try {
      const data = await tasksAPI.get(Number(id));
      setTask(data);
      setError('');
      
      // Load weather if due_date exists
      if (data.due_date) {
        loadWeather(data.due_date);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load task');
    } finally {
      setLoading(false);
    }
  };

  const loadWeather = async (dueDate: string) => {
    try {
      // Simple weather fetching - in production would use full weather API
      const date = new Date(dueDate);
      const daysFrom = Math.floor((date.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
      
      let weatherInfo = 'Unknown weather';
      if (daysFrom < 0) {
        weatherInfo = 'Date has passed ⏰';
      } else if (daysFrom === 0) {
        weatherInfo = 'Due today 📅';
      } else if (daysFrom === 1) {
        weatherInfo = 'Due tomorrow 📅';
      } else {
        weatherInfo = `Due in ${daysFrom} days 📅`;
      }
      
      setWeather(weatherInfo);
    } catch (err) {
      console.error('Weather loading error:', err);
    }
  };

  const handleSubmit = async (updates: TaskCreateInput) => {
    try {
      const updated = await tasksAPI.update(Number(id), updates);
      setTask(updated);
      setEditing(false);
      setError('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update task');
      throw err;
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this task?')) return;

    try {
      await tasksAPI.delete(Number(id));
      router.push('/tasks');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete task');
    }
  };

  if (loading) {
    return <div className="loading">Loading task...</div>;
  }

  if (!task) {
    return (
      <div className="card" style={{ textAlign: 'center' }}>
        <p>Task not found</p>
        <Link href="/tasks">
          <button>Back to Tasks</button>
        </Link>
      </div>
    );
  }

  return (
    <div>
      <Link href="/tasks">
        <button style={{ marginBottom: '1rem' }}>← Back to Tasks</button>
      </Link>

      {error && <div className="error">{error}</div>}

      {!editing ? (
        <div className="card">
          <h1>{task.title}</h1>

          {task.description && (
            <p style={{ color: '#666', marginBottom: '1rem', lineHeight: '1.6' }}>
              {task.description}
            </p>
          )}

          <div className="task-meta" style={{ marginBottom: '1rem' }}>
            <span className={`badge priority-${task.priority}`}>
              {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} Priority
            </span>
            <span className={`badge status-${task.status}`}>
              {task.status === 'in_progress' ? 'In Progress' : task.status.charAt(0).toUpperCase() + task.status.slice(1)}
            </span>
          </div>

          {weather && (
            <div style={{ background: '#ecf0f1', padding: '1rem', borderRadius: '4px', marginBottom: '1rem' }}>
              🌤️ {weather}
            </div>
          )}

          <div style={{ color: '#666', marginBottom: '1.5rem' }}>
            <p>
              <strong>Due Date:</strong> {task.due_date ? new Date(task.due_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : 'No due date'}
            </p>
            <p>
              <strong>Created:</strong> {new Date(task.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
            </p>
            <p>
              <strong>Last Updated:</strong> {new Date(task.updated_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
            </p>
          </div>

          <div className="actions">
            <button onClick={() => setEditing(true)}>Edit</button>
            <button className="delete" onClick={handleDelete}>Delete</button>
          </div>
        </div>
      ) : (
        <TaskForm
          initialValues={task}
          onSubmit={handleSubmit}
          isLoading={false}
        />
      )}

      {editing && (
        <button
          onClick={() => setEditing(false)}
          style={{ marginTop: '1rem', background: '#95a5a6' }}
        >
          Cancel
        </button>
      )}
    </div>
  );
}
