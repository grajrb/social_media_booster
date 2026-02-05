import React from 'react';
import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <div className="card" style={{ textAlign: 'center', marginTop: '2rem' }}>
        <h1 style={{ marginBottom: '1rem' }}>Welcome to Task Manager</h1>
        <p style={{ fontSize: '1.1rem', marginBottom: '2rem', color: '#666' }}>
          Stay organized with our simple and powerful task management tool.
        </p>
        
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/tasks">
            <button style={{ padding: '1rem 2rem', fontSize: '1.05rem' }}>
              View All Tasks
            </button>
          </Link>
          <Link href="/tasks/new">
            <button style={{ padding: '1rem 2rem', fontSize: '1.05rem' }}>
              Create New Task
            </button>
          </Link>
          <Link href="/dashboard">
            <button style={{ padding: '1rem 2rem', fontSize: '1.05rem' }}>
              View Dashboard
            </button>
          </Link>
        </div>
      </div>
      
      <div className="card" style={{ marginTop: '3rem' }}>
        <h2>Features</h2>
        <ul style={{ listStyle: 'none', marginTop: '1rem' }}>
          <li style={{ marginBottom: '0.5rem' }}>✅ Full CRUD Operations - Create, view, edit, and delete tasks</li>
          <li style={{ marginBottom: '0.5rem' }}>📊 Dashboard - Visual insights into your task progress</li>
          <li style={{ marginBottom: '0.5rem' }}>🌤️ Weather Integration - See weather for task due dates</li>
          <li style={{ marginBottom: '0.5rem' }}>⚡ REST API - All operations available via REST endpoints</li>
          <li style={{ marginBottom: '0.5rem' }}>🎯 Priority Levels - Set task priorities (Low, Medium, High)</li>
          <li style={{ marginBottom: '0.5rem' }}>📅 Due Dates - Track task deadlines</li>
        </ul>
      </div>
      
      <div className="card" style={{ marginTop: '2rem', background: '#ecf0f1' }}>
        <h3>Getting Started</h3>
        <ol style={{ marginLeft: '1.5rem', marginTop: '1rem' }}>
          <li style={{ marginBottom: '0.5rem' }}>Click "Create New Task" to add your first task</li>
          <li style={{ marginBottom: '0.5rem' }}>Set a priority and due date for better organization</li>
          <li style={{ marginBottom: '0.5rem' }}>View your tasks in the "All Tasks" section</li>
          <li style={{ marginBottom: '0.5rem' }}>Track progress in the "Dashboard"</li>
        </ol>
      </div>
    </div>
  );
}
