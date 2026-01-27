import React, { useEffect, useState } from 'react';
import { listMatches } from '../src/services/matches';

export default function MatchList() {
  const [matches, setMatches] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadMatches() {
      try {
        const data = await listMatches();
        setMatches(data);
      } catch (err) {
        setError(err?.response?.data?.error || 'Falha ao carregar matches');
      }
    }

    loadMatches();
  }, []);

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold">Matches</h1>

      {error && <p className="mt-3 text-red-600">{error}</p>}

      <div className="mt-4 space-y-2">
        {matches.map((match) => (
          <div key={match.id} className="border rounded p-3">
            <div className="font-semibold">Match #{match.id}</div>
            <div className="text-sm text-gray-600">
              Pets {match.petAId} & {match.petBId} ({match.status})
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}