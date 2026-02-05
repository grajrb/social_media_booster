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
  const [weatherInfo, setWeatherInfo] = useState<any>(null);

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
      
      // Load weather info for the task
      try {
        const weather = await tasksAPI.getWeather(Number(id));
        setWeatherInfo(weather);
      } catch (err) {
        console.error('Weather fetch error:', err);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load task');
    } finally {
      setLoading(false);
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

          {weatherInfo && (
            <div style={{ background: '#ecf0f1', padding: '1rem', borderRadius: '4px', marginBottom: '1rem' }}>
              <h4 style={{ margin: '0 0 0.5rem 0' }}>🌤️ Due Date Status</h4>
              <p style={{ margin: 0, color: '#2c3e50' }}>
                {weatherInfo.status || weatherInfo.message || 'Weather information loaded'}
              </p>
              {weatherInfo.temperature && (
                <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.9rem', color: '#666' }}>
                  Current weather at {weatherInfo.location}: {weatherInfo.temperature}°C - {weatherInfo.description}
                </p>
              )}
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

