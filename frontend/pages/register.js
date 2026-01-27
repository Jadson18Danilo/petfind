import React, { useState } from 'react';
import { registerUser } from '../src/services/auth';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');
    setMessage('');

    try {
      await registerUser({ name, email, password });
      setMessage('Cadastro realizado.');
      setName('');
      setEmail('');
      setPassword('');
    } catch (err) {
      setError(err?.response?.data?.error || 'Falha no cadastro');
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-md mx-auto px-4 py-12">
        <div className="bg-white border rounded-xl p-6">
          <h1 className="text-2xl font-bold">Cadastro</h1>
          <p className="text-sm text-gray-600 mt-1">Crie sua conta para começar.</p>

          <form className="mt-5 space-y-3" onSubmit={handleSubmit}>
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
              <label className="block text-sm font-medium">Email</label>
              <input
                className="w-full border rounded px-3 py-2"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Senha</label>
              <input
                className="w-full border rounded px-3 py-2"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button className="w-full bg-black text-white rounded px-3 py-2" type="submit">
              Criar conta
            </button>
          </form>

          {message && <p className="mt-3 text-green-600">{message}</p>}
          {error && <p className="mt-3 text-red-600">{error}</p>}
        </div>
      </div>
    </div>
  );
}