import React from 'react';
import Header from '../src/components/Header';

export default function PetDetails() {
  return (
    <div className="page">
      <Header />
      <div className="container-page py-10">
        <div className="card p-6">
          <h1 className="section-title">Pet Details</h1>
          <p className="section-subtitle mt-1">Em breve, mais informações aqui.</p>
        </div>
      </div>
    </div>
  );
}