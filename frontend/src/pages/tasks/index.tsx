import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { tasksAPI, Task } from '@/utils/api';
import TaskCard from '@/components/TaskCard';

export default function TasksList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');

  useEffect(() => {
    loadTasks();
  }, [statusFilter, priorityFilter]);

  const loadTasks = async () => {
    setLoading(true);
    try {
      const data = await tasksAPI.list(statusFilter || undefined, priorityFilter || undefined);
      setTasks(data);
      setError('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load tasks');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await tasksAPI.delete(id);
      setTasks(tasks.filter((t) => t.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete task');
    }
  };

  return (
    <div>
      <h1>All Tasks</h1>

      {error && <div className="error">{error}</div>}

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: '150px' }}>
          <label htmlFor="statusFilter">Filter by Status:</label>
          <select
            id="statusFilter"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All Status</option>
            <option value="todo">To Do</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <div style={{ flex: 1, minWidth: '150px' }}>
          <label htmlFor="priorityFilter">Filter by Priority:</label>
          <select
            id="priorityFilter"
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
          >
            <option value="">All Priorities</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <button
          onClick={() => loadTasks()}
          style={{ alignSelf: 'flex-end' }}
        >
          Refresh
        </button>
      </div>

      {loading ? (
        <div className="loading">Loading tasks...</div>
      ) : tasks.length === 0 ? (
        <div className="card" style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '1.1rem', color: '#666' }}>No tasks found</p>
          <Link href="/tasks/new">
            <button style={{ marginTop: '1rem' }}>Create Your First Task</button>
          </Link>
        </div>
      ) : (
        <div>
          <p style={{ marginBottom: '1rem', color: '#666' }}>
            Found {tasks.length} task{tasks.length !== 1 ? 's' : ''}
          </p>
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  );
}
