import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api/admin';

// Helper headers
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    }
  };
};

// ==========================================
// 1. LOGBOOK LAB API
// ==========================================

export const getLabLogbooks = async () => {
  const response = await axios.get(`${BASE_URL}/logbook-lab`, getAuthHeaders());
  return response.data;
};

export const getLabLogbookById = async (id) => {
  const response = await axios.get(`${BASE_URL}/logbook-lab/${id}`, getAuthHeaders());
  return response.data;
};

export const updateLabReview = async (id, payload) => {
  const response = await axios.put(`${BASE_URL}/logbook-lab/${id}/review`, payload, getAuthHeaders());
  return response.data;
};

// ==========================================
// 2. LOGBOOK ALAT API
// ==========================================

export const getAlatLogbooks = async () => {
  const response = await axios.get(`${BASE_URL}/logbook-alat`, getAuthHeaders());
  return response.data;
};

export const getAlatLogbookById = async (id) => {
  const response = await axios.get(`${BASE_URL}/logbook-alat/${id}`, getAuthHeaders());
  return response.data;
};

export const updateAlatReview = async (id, payload) => {
  const response = await axios.put(`${BASE_URL}/logbook-alat/${id}/review`, payload, getAuthHeaders());
  return response.data;
};
