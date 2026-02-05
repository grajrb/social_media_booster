import React, { useState } from 'react';
import { Task, TaskCreateInput } from '@/utils/api';

interface TaskFormProps {
  onSubmit: (task: TaskCreateInput) => Promise<void>;
  initialValues?: Partial<Task>;
  isLoading?: boolean;
}

export default function TaskForm({ onSubmit, initialValues, isLoading }: TaskFormProps) {
  const [title, setTitle] = useState(initialValues?.title || '');
  const [description, setDescription] = useState(initialValues?.description || '');
  const [priority, setPriority] = useState(initialValues?.priority || 'medium');
  const [status, setStatus] = useState(initialValues?.status || 'todo');
  const [dueDate, setDueDate] = useState(initialValues?.due_date ? initialValues.due_date.split('T')[0] : '');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!title.trim()) {
      setError('Title is required');
      return;
    }

    setSubmitting(true);
    try {
      await onSubmit({
        title: title.trim(),
        description: description.trim(),
        priority,
        status,
        due_date: dueDate ? `${dueDate}T00:00:00` : undefined,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save task');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card">
      <h2>{initialValues ? 'Edit Task' : 'Create New Task'}</h2>

      {error && <div className="error">{error}</div>}

      <div className="form-group">
        <label htmlFor="title">Task Title *</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter task title"
          disabled={submitting || isLoading}
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter task description (optional)"
          rows={4}
          disabled={submitting || isLoading}
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div className="form-group">
          <label htmlFor="priority">Priority</label>
          <select
            id="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            disabled={submitting || isLoading}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="status">Status</label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            disabled={submitting || isLoading}
          >
            <option value="todo">To Do</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="dueDate">Due Date</label>
        <input
          type="date"
          id="dueDate"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          disabled={submitting || isLoading}
        />
      </div>

      <button
        type="submit"
        disabled={submitting || isLoading}
        style={{ cursor: submitting || isLoading ? 'not-allowed' : 'pointer', opacity: submitting || isLoading ? 0.6 : 1 }}
      >
        {submitting || isLoading ? 'Saving...' : initialValues ? 'Update Task' : 'Create Task'}
      </button>
    </form>
  );
}
