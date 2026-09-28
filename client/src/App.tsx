import React from 'react';

export const App: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
      <div className="text-center p-8 bg-slate-800 rounded-xl shadow-2xl border border-slate-700">
        <h1 className="text-3xl font-bold text-emerald-400 mb-2">🐌 SnailBet Simulator</h1>
        <p className="text-slate-400">Plataforma de Simulación de Carreras y Apuestas</p>
      </div>
    </div>
  );
};

export default App;
