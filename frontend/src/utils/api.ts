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

export interface Weather {
  temperature?: number;
  description?: string;
  location?: string;
  humidity?: number;
  wind_speed?: number;
  status?: string;
  available: boolean;
}

// Tasks CRUD
export const tasksAPI = {
  list: async (status?: string, priority?: string): Promise<Task[]> => {
    const params = new URLSearchParams();
    if (status) params.append('status', status);
    if (priority) params.append('priority', priority);
    
    const { data } = await apiClient.get('/api/tasks', { params });
    return data;
  },

  get: async (id: number): Promise<Task> => {
    const { data } = await apiClient.get(`/api/tasks/${id}`);
    return data;
  },

  create: async (task: TaskCreateInput): Promise<Task> => {
    const { data } = await apiClient.post('/api/tasks', task);
    return data;
  },

  update: async (id: number, updates: Partial<TaskCreateInput>): Promise<Task> => {
    const { data } = await apiClient.put(`/api/tasks/${id}`, updates);
    return data;
  },

  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`/api/tasks/${id}`);
  },

  getStats: async (): Promise<TaskStats> => {
    const { data } = await apiClient.get('/api/tasks/stats/summary');
    return data;
  },

  getWeather: async (taskId: number): Promise<Weather> => {
    try {
      const { data } = await apiClient.get(`/api/tasks/${taskId}/weather`);
      return data;
    } catch (error) {
      console.error('Error fetching weather:', error);
      return { available: false, status: 'Could not fetch weather' };
    }
  },
};

// Weather API
export const weatherAPI = {
  getWeather: async (latitude?: number, longitude?: number, date?: string): Promise<Weather> => {
    try {
      const params = new URLSearchParams();
      if (latitude) params.append('latitude', latitude.toString());
      if (longitude) params.append('longitude', longitude.toString());
      if (date) params.append('date', date);
      
      const { data } = await apiClient.get('/api/weather', { params });
      return data;
    } catch (error) {
      console.error('Error fetching weather:', error);
      return { available: false, status: 'Could not fetch weather' };
    }
  },
};

export default apiClient;

