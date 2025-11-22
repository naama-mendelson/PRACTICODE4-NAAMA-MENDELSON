// import axios from "axios";

// const apiUrl = "http://localhost:5224"; // 👈 חשוב לכלול את /items כאן

// export default {
//   // 📦 שליפת משימות
//   getTasks: async () => {
//     const result = await axios.get(apiUrl);
//     return result.data;
//   },

//   // ➕ הוספת משימה
//   addTask: async (name) => {
//     console.log("addTask", name);
//     const newTask = { name, isComplete: false };
//     const result = await axios.post(apiUrl, newTask);
//     return result.data;
//   },

//   // ✅ סימון משימה כהושלמה / לא הושלמה
//   setCompleted: async (id, isComplete) => {
//     console.log("setCompleted", { id, isComplete });
//     const result = await axios.put(`${apiUrl}/${id}`, { id, isComplete });
//     return result.data;
//   },

//   // ❌ מחיקת משימה
//   deleteTask: async (id) => {
//     console.log("deleteTask", id);
//     const result = await axios.delete(`${apiUrl}/${id}`);
//     return result.data;
//   },
// };
import axios from 'axios';

// בסיס אחד וברור לכל הקריאות
const api = axios.create({
  baseURL: 'http://localhost:5224',
  withCredentials: false, // שלא ינסה לשלוח cookies מיותרים
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
