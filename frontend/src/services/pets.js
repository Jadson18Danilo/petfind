import api from './api';

export async function listPets() {
  const response = await api.get('/api/pets');
  return response.data;
}

export async function createPet(payload) {
  const response = await api.post('/api/pets', payload, { withCredentials: true });
  return response.data;
}

export async function updatePet(id, payload) {
  const response = await api.put(`/api/pets/${id}`, payload, { withCredentials: true });
  return response.data;
}

export async function deletePet(id) {
  const response = await api.delete(`/api/pets/${id}`, { withCredentials: true });
  return response.data;
}
