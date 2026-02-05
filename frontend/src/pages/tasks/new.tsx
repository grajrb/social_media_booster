import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { tasksAPI, TaskCreateInput } from '@/utils/api';
import TaskForm from '@/components/TaskForm';

export default function NewTask() {
  const router = useRouter();
  const [error, setError] = useState('');

  const handleSubmit = async (task: TaskCreateInput) => {
    try {
      await tasksAPI.create(task);
      router.push('/tasks');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create task');
      throw err;
    }
  };

  return (
    <div>
      {error && <div className="error">{error}</div>}
      <TaskForm onSubmit={handleSubmit} />
    </div>
  );
}
