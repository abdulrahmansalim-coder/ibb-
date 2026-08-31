import axios from 'axios';

const axiosClient = axios.create({
    baseURL: 'http://localhost:5000', // Alamat Backend Express
    headers: { 'Content-Type': 'application/json' }
});

// Tambahkan interceptor untuk otomatis attach token jika ada
axiosClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default axiosClient;