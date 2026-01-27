import React, { useState } from 'react';
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
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold">Chat</h1>

      <div className="mt-4 space-y-2">
        <label className="block text-sm font-medium">Match ID</label>
        <div className="flex gap-2">
          <input
            className="flex-1 border rounded px-3 py-2"
            value={matchId}
            onChange={(e) => setMatchId(e.target.value)}
          />
          <button className="bg-black text-white rounded px-3 py-2" onClick={handleLoad}>
            Carregar
          </button>
        </div>
      </div>

      <form className="mt-4 space-y-3" onSubmit={handleSend}>
        <div>
          <label className="block text-sm font-medium">Mensagem</label>
          <input
            className="w-full border rounded px-3 py-2"
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
          />
        </div>

        <button className="w-full bg-black text-white rounded px-3 py-2" type="submit">
          Enviar
        </button>
      </form>

      {message && <p className="mt-3 text-green-600">{message}</p>}
      {error && <p className="mt-3 text-red-600">{error}</p>}

      <div className="mt-6 space-y-2">
        {messages.map((msg) => (
          <div key={msg.id} className="border rounded p-3">
            <div className="text-sm text-gray-600">User {msg.senderId}</div>
            <div>{msg.text}</div>
          </div>
        ))}
      </div>
    </div>
  );
}