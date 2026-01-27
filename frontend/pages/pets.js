import React, { useEffect, useState } from 'react';
import { listPets, createPet } from '../src/services/pets';

export default function Pets() {
  const [pets, setPets] = useState([]);
  const [name, setName] = useState('');
  const [species, setSpecies] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  async function loadPets() {
    const data = await listPets();
    setPets(data);
  }

  useEffect(() => {
    loadPets();
  }, []);

  async function handleCreate(event) {
    event.preventDefault();
    setMessage('');
    setError('');

    try {
      await createPet({ name, species });
      setName('');
      setSpecies('');
      setMessage('Pet criado.');
      await loadPets();
    } catch (err) {
      setError(err?.response?.data?.error || 'Falha ao criar pet');
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Pets</h1>
          <span className="text-sm text-gray-600">Total: {pets.length}</span>
        </div>

        <div className="mt-4 bg-white border rounded-xl p-6">
          <h2 className="font-semibold">Cadastrar pet</h2>
          <form className="mt-3 grid md:grid-cols-2 gap-3" onSubmit={handleCreate}>
            <div>
              <label className="block text-sm font-medium">Nome</label>
              <input
                className="w-full border rounded px-3 py-2"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Espécie</label>
              <input
                className="w-full border rounded px-3 py-2"
                value={species}
                onChange={(e) => setSpecies(e.target.value)}
                required
              />
            </div>

            <div className="md:col-span-2">
              <button className="w-full bg-black text-white rounded px-3 py-2" type="submit">
                Cadastrar pet
              </button>
            </div>
          </form>

          {message && <p className="mt-3 text-green-600">{message}</p>}
          {error && <p className="mt-3 text-red-600">{error}</p>}
        </div>

        <div className="mt-6 grid md:grid-cols-3 gap-4">
          {pets.map((pet) => (
            <div key={pet.id} className="bg-white border rounded-lg p-4">
              <div className="font-semibold">{pet.name}</div>
              <div className="text-sm text-gray-600">{pet.species}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}