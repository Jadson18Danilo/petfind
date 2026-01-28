import React, { useEffect, useState } from 'react';
import Header from '../src/components/Header';
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
    <div className="page">
      <Header />
      <div className="container-page py-10">
        <div className="flex items-center justify-between">
          <h1 className="section-title">Pets</h1>
          <span className="badge">Total: {pets.length}</span>
        </div>

        <div className="card mt-4 p-6">
          <h2 className="text-lg font-semibold">Cadastrar pet</h2>
          <form className="mt-3 grid md:grid-cols-2 gap-3" onSubmit={handleCreate}>
            <div>
              <label className="label">Nome</label>
              <input
                className="input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="label">Espécie</label>
              <input
                className="input"
                value={species}
                onChange={(e) => setSpecies(e.target.value)}
                required
              />
            </div>

            <div className="md:col-span-2">
              <button className="btn w-full" type="submit">
                Cadastrar pet
              </button>
            </div>
          </form>

          {message && <p className="mt-3 text-green-600">{message}</p>}
          {error && <p className="mt-3 text-red-600">{error}</p>}
        </div>

        <div className="mt-6 grid md:grid-cols-3 gap-4">
          {pets.map((pet) => (
            <div key={pet.id} className="card card-hover p-4">
              <div className="flex items-center justify-between">
                <div className="font-semibold">{pet.name}</div>
                <span className="badge">{pet.species}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}