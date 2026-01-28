import React, { useState } from 'react';
import Header from '../src/components/Header';
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
    <div className="page">
      <Header />
      <div className="max-w-md mx-auto px-4 py-12">
        <div className="card p-6">
          <h1 className="section-title">Cadastro</h1>
          <p className="section-subtitle mt-1">Crie sua conta para começar.</p>

          <form className="mt-5 space-y-3" onSubmit={handleSubmit}>
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
              <label className="label">Email</label>
              <input
                className="input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="label">Senha</label>
              <input
                className="input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button className="btn w-full" type="submit">
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