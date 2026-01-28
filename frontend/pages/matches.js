import React, { useEffect, useState } from 'react';
import Header from '../src/components/Header';
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
    <div className="page">
      <Header />
      <div className="container-page py-10 max-w-2xl">
        <h1 className="section-title">Matches</h1>

        {error && <p className="mt-3 text-red-600">{error}</p>}

        <div className="mt-4 space-y-3">
          {matches.map((match) => (
            <div key={match.id} className="card card-hover p-4">
              <div className="flex items-center justify-between">
                <div className="font-semibold">Match #{match.id}</div>
                <span className="badge">{match.status}</span>
              </div>
              <div className="text-sm text-slate-600 mt-1">
                Pets {match.petAId} & {match.petBId}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}