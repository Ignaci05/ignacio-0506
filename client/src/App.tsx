import React from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { AuthView } from './components/auth/AuthView';
import { DashboardView } from './components/dashboard/DashboardView';

const MainRouter: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#051424] text-slate-400 text-sm font-mono">
        <div className="flex items-center gap-3">
          <span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>Cargando plataforma...</span>
        </div>
      </div>
    );
  }

  // Protección de rutas: si no hay sesión activa, muestra login/registro
  if (!isAuthenticated) {
    return <AuthView />;
  }

  // Si hay sesión activa, muestra el Dashboard completo
  return <DashboardView />;
};

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <MainRouter />
    </AuthProvider>
  );
};

export default App;