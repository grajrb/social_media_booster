import React from 'react';
import Link from 'next/link';
import { Task } from '@/utils/api';

interface TaskCardProps {
  task: Task;
  onDelete?: (id: number) => Promise<void>;
}

export default function TaskCard({ task, onDelete }: TaskCardProps) {
  const [deleting, setDeleting] = React.useState(false);

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this task?')) return;

    setDeleting(true);
    try {
      await onDelete?.(task.id);
    } finally {
      setDeleting(false);
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'No due date';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const isOverdue = task.due_date && new Date(task.due_date) < new Date() && task.status !== 'completed';

  return (
    <div className={`task-card ${task.priority}`}>
      <Link href={`/tasks/${task.id}`}>
        <h3 style={{ color: '#2c3e50', cursor: 'pointer', textDecoration: 'underline' }}>
          {task.title}
        </h3>
      </Link>

      {task.description && <p style={{ color: '#666', marginBottom: '0.5rem' }}>{task.description}</p>}

      <div className="task-meta">
        <span className={`badge priority-${task.priority}`}>
          {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} Priority
        </span>
        <span className={`badge status-${task.status}`}>
          {task.status === 'in_progress' ? 'In Progress' : task.status.charAt(0).toUpperCase() + task.status.slice(1)}
        </span>
      </div>

      <div style={{ marginTop: '0.5rem', color: isOverdue ? '#c0392b' : '#666', fontSize: '0.9rem' }}>
        📅 {formatDate(task.due_date)} {isOverdue && <span style={{ fontWeight: 'bold' }}>⚠️ OVERDUE</span>}
      </div>

      <div className="actions">
        <Link href={`/tasks/${task.id}`}>
          <button>View Details</button>
        </Link>
        <Link href={`/tasks/${task.id}`}>
          <button>Edit</button>
        </Link>
        <button className="delete" onClick={handleDelete} disabled={deleting}>
          {deleting ? 'Deleting...' : 'Delete'}
        </button>
      </div>
    </div>
  );
}
