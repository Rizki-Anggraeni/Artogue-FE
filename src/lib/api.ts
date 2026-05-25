import axios from 'axios';

// Instance Axios yang terhubung ke Backend Artogue di Vercel
export const api = axios.create({
  baseURL: 'https://artogue-backend.vercel.app',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor untuk Request: Menyematkan Bearer Token sebelum request dikirim
api.interceptors.request.use(
  (config) => {
    // Ambil token dari localStorage yang disimpan saat login
    const token = localStorage.getItem('artogue_token');
    
    // Jika token ada, tambahkan ke header Authorization
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor untuk Response: Menangani error secara global (misal: 401 Unauthorized)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Token kedaluwarsa atau tidak valid, hapus sesi dan lempar ke Landing Page
      localStorage.removeItem('artogue_token');
      localStorage.removeItem('artogue_user_name');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

export default api;