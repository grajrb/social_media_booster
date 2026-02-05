import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface Task {
  id: number;
  title: string;
  description?: string;
  priority: string;
  status: string;
  due_date?: string;
  created_at: string;
  updated_at: string;
}

export interface TaskCreateInput {
  title: string;
  description?: string;
  priority: string;
  status: string;
  due_date?: string;
}

export interface TaskStats {
  total: number;
  completed: number;
  in_progress: number;
  todo: number;
  completion_rate: number;
}

// Tasks CRUD
export const tasksAPI = {
  list: async (status?: string, priority?: string): Promise<Task[]> => {
    const params = new URLSearchParams();
    if (status) params.append('status', status);
    if (priority) params.append('priority', priority);
    
    const { data } = await apiClient.get('/tasks', { params });
    return data;
  },

  get: async (id: number): Promise<Task> => {
    const { data } = await apiClient.get(`/tasks/${id}`);
    return data;
  },

  create: async (task: TaskCreateInput): Promise<Task> => {
    const { data } = await apiClient.post('/tasks', task);
    return data;
  },

  update: async (id: number, updates: Partial<TaskCreateInput>): Promise<Task> => {
    const { data } = await apiClient.put(`/tasks/${id}`, updates);
    return data;
  },

  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`/tasks/${id}`);
  },

  getStats: async (): Promise<TaskStats> => {
    const { data } = await apiClient.get('/tasks/stats/summary');
    return data;
  },
};

export default apiClient;
