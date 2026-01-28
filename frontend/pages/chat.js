import React, { useState } from 'react';
import Header from '../src/components/Header';
import { listMessages, sendMessage } from '../src/services/matches';

export default function Chat() {
  const [matchId, setMatchId] = useState('');
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  async function handleLoad() {
    setError('');
    setMessage('');

    try {
      const data = await listMessages(matchId);
      setMessages(data);
    } catch (err) {
      setError(err?.response?.data?.error || 'Falha ao carregar mensagens');
    }
  }

  async function handleSend(event) {
    event.preventDefault();
    setError('');
    setMessage('');

    try {
      await sendMessage(matchId, text);
      setText('');
      setMessage('Mensagem enviada.');
      await handleLoad();
    } catch (err) {
      setError(err?.response?.data?.error || 'Falha ao enviar mensagem');
    }
  }

  return (
    <div className="page">
      <Header />
      <div className="container-page py-10 max-w-2xl">
        <h1 className="section-title">Chat</h1>

        <div className="card mt-4 p-4">
          <label className="label">Match ID</label>
          <div className="flex flex-col md:flex-row gap-2 mt-2">
            <input
              className="input"
              value={matchId}
              onChange={(e) => setMatchId(e.target.value)}
            />
            <button className="btn" onClick={handleLoad}>
              Carregar
            </button>
          </div>
        </div>

        <form className="card mt-4 p-4 space-y-3" onSubmit={handleSend}>
          <div>
            <label className="label">Mensagem</label>
            <input
              className="input"
              value={text}
              onChange={(e) => setText(e.target.value)}
              required
            />
          </div>

          <button className="btn w-full" type="submit">
            Enviar
          </button>
        </form>

        {message && <p className="mt-3 text-green-600">{message}</p>}
        {error && <p className="mt-3 text-red-600">{error}</p>}

        <div className="mt-6 space-y-3">
          {messages.map((msg) => (
            <div key={msg.id} className="card card-hover p-4">
              <div className="text-sm text-slate-500">User {msg.senderId}</div>
              <div className="mt-1">{msg.text}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}