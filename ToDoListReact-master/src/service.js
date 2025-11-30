import axios from 'axios';

// === BASE URL אמיתי של השרת שלך ברנדר ===
const api = axios.create({
  baseURL: 'https://authserver-lkto.onrender.com',
  withCredentials: false,
});

// (רשות) Interceptor לשגיאות – יעזור לדיבוג
api.interceptors.response.use(
  (res) => res,
  (err) => {
    console.error('API error:', {
      url: err.config?.baseURL + err.config?.url,
      method: err.config?.method,
      message: err.message,
      status: err.response?.status,
      data: err.response?.data,
    });
    return Promise.reject(err);
  }
);

export default {
  getTasks: async () => {
    const res = await api.get('/items');
    return res.data;
  },

  addTask: async (name) => {
    const res = await api.post('/items', { name, isComplete: false });
    return res.data;
  },

  setCompleted: async (id, name, isComplete) => {
    const res = await api.put(`/items/${id}`, { id, name, isComplete });
    return res.data;
  },

  deleteTask: async (id) => {
    await api.delete(`/items/${id}`);
  },
};
