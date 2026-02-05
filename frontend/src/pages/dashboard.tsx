import React, { useState, useEffect } from 'react';
import { tasksAPI, Task, TaskStats } from '@/utils/api';
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

export default function Dashboard() {
  const [stats, setStats] = useState<TaskStats | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const [statsData, tasksData] = await Promise.all([
        tasksAPI.getStats(),
        tasksAPI.list(),
      ]);
      setStats(statsData);
      setTasks(tasksData);
      setError('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load dashboard');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading dashboard...</div>;
  }

  if (!stats) {
    return <div className="error">Failed to load statistics</div>;
  }

  // Prepare data for visualizations
  const statusData = [
    { name: 'To Do', value: stats.todo, fill: '#95a5a6' },
    { name: 'In Progress', value: stats.in_progress, fill: '#3498db' },
    { name: 'Completed', value: stats.completed, fill: '#27ae60' },
  ];

  const priorityData = [
    {
      name: 'Low',
      count: tasks.filter((t) => t.priority === 'low').length,
      fill: '#27ae60',
    },
    {
      name: 'Medium',
      count: tasks.filter((t) => t.priority === 'medium').length,
      fill: '#f39c12',
    },
    {
      name: 'High',
      count: tasks.filter((t) => t.priority === 'high').length,
      fill: '#e74c3c',
    },
  ];

  // Tasks due this week
  const today = new Date();
  const weekLater = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
  const dueSoon = tasks.filter(
    (t) =>
      t.due_date &&
      new Date(t.due_date) <= weekLater &&
      new Date(t.due_date) >= today &&
      t.status !== 'completed'
  );

  // Overdue tasks
  const overdue = tasks.filter(
    (t) => t.due_date && new Date(t.due_date) < today && t.status !== 'completed'
  );

  return (
    <div>
      <h1>Dashboard</h1>

      {error && <div className="error">{error}</div>}

      {/* Summary Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem',
          marginBottom: '2rem',
        }}
      >
        <div className="card" style={{ textAlign: 'center' }}>
          <h3 style={{ color: '#3498db', fontSize: '2rem', margin: '0.5rem 0' }}>
            {stats.total}
          </h3>
          <p>Total Tasks</p>
        </div>
        <div className="card" style={{ textAlign: 'center' }}>
          <h3 style={{ color: '#27ae60', fontSize: '2rem', margin: '0.5rem 0' }}>
            {stats.completed}
          </h3>
          <p>Completed</p>
        </div>
        <div className="card" style={{ textAlign: 'center' }}>
          <h3 style={{ color: '#f39c12', fontSize: '2rem', margin: '0.5rem 0' }}>
            {stats.in_progress}
          </h3>
          <p>In Progress</p>
        </div>
        <div className="card" style={{ textAlign: 'center' }}>
          <h3 style={{ color: '#95a5a6', fontSize: '2rem', margin: '0.5rem 0' }}>
            {stats.completion_rate.toFixed(1)}%
          </h3>
          <p>Completion Rate</p>
        </div>
      </div>

      {/* Charts */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
          gap: '2rem',
          marginBottom: '2rem',
        }}
      >
        {/* Status Distribution */}
        <div className="card">
          <h3>Tasks by Status</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={statusData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {statusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Priority Distribution */}
        <div className="card">
          <h3>Tasks by Priority</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={priorityData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#3498db">
                {priorityData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Urgent Tasks */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
          gap: '2rem',
        }}
      >
        {/* Due Soon */}
        <div className="card">
          <h3>📅 Due This Week</h3>
          {dueSoon.length === 0 ? (
            <p style={{ color: '#666' }}>No tasks due this week</p>
          ) : (
            <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
              {dueSoon.map((task) => (
                <li
                  key={task.id}
                  style={{
                    padding: '0.75rem',
                    borderBottom: '1px solid #ecf0f1',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <div>
                    <p style={{ margin: 0, fontWeight: 500 }}>{task.title}</p>
                    <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.85rem', color: '#666' }}>
                      {new Date(task.due_date!).toLocaleDateString()}
                    </p>
                  </div>
                  <span className={`badge priority-${task.priority}`} style={{ marginLeft: '1rem' }}>
                    {task.priority}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Overdue */}
        <div className="card">
          <h3>⚠️ Overdue Tasks</h3>
          {overdue.length === 0 ? (
            <p style={{ color: '#666' }}>No overdue tasks</p>
          ) : (
            <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
              {overdue.map((task) => (
                <li
                  key={task.id}
                  style={{
                    padding: '0.75rem',
                    borderBottom: '1px solid #ecf0f1',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    background: '#ffe6e6',
                  }}
                >
                  <div>
                    <p style={{ margin: 0, fontWeight: 500, color: '#c0392b' }}>
                      {task.title}
                    </p>
                    <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.85rem', color: '#c0392b' }}>
                      Due {new Date(task.due_date!).toLocaleDateString()}
                    </p>
                  </div>
                  <span className={`badge priority-${task.priority}`} style={{ marginLeft: '1rem' }}>
                    {task.priority}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <button
        onClick={loadDashboard}
        style={{ marginTop: '2rem' }}
      >
        Refresh Dashboard
      </button>
    </div>
  );
}
