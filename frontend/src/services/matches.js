import api from './api';

export async function likePet(toPetId, fromPetId) {
  const response = await api.post(`/api/pets/${toPetId}/like`, { fromPetId }, { withCredentials: true });
  return response.data;
}

export async function listMatches() {
  const response = await api.get('/api/matches', { withCredentials: true });
  return response.data;
}

export async function listMessages(matchId) {
  const response = await api.get(`/api/matches/${matchId}/messages`, { withCredentials: true });
  return response.data;
}

export async function sendMessage(matchId, text) {
  const response = await api.post(`/api/matches/${matchId}/messages`, { text }, { withCredentials: true });
  return response.data;
}
