import api from './api';

export async function registerUser(payload) {
  const response = await api.post('/api/auth/register', payload, { withCredentials: true });
  return response.data;
}

export async function loginUser(payload) {
  const response = await api.post('/api/auth/login', payload, { withCredentials: true });
  return response.data;
}

export async function logoutUser() {
  const response = await api.post('/api/auth/logout', {}, { withCredentials: true });
  return response.data;
}

export async function getMe() {
  const response = await api.get('/api/me', { withCredentials: true });
  return response.data;
}
