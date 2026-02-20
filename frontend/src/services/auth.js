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

export async function updateMe(payload) {
  // payload can be FormData or plain object
  const isForm = payload instanceof FormData;
  const response = await api.put('/api/me', payload, {
    withCredentials: true,
    headers: isForm ? { 'Content-Type': 'multipart/form-data' } : undefined,
  });
  return response.data;
}
