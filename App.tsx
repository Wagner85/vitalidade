
import React, { useState, useCallback, useEffect } from 'react';
import { Session } from '@supabase/supabase-js';
import { supabase } from './services/supabaseClient';
import { UserData, WeeklyPlan, Profile } from './types';
import { generatePlan } from './services/geminiService';
import { getProfile, saveWeeklyPlan, updateProfile } from './services/profileService';
import Header from './components/Header';
import LandingPage from './components/LandingPage';
import Auth from './components/Auth';
import InputForm from './components/InputForm';
import PlanDisplay from './components/PlanDisplay';
import LoadingSpinner from './components/LoadingSpinner';
import Footer from './components/Footer';
import { Routes, Route, useNavigate } from 'react-router-dom';

function App() {
  const [session, setSession] = useState<Session | null>(null);
  const [weeklyPlan, setWeeklyPlan] = useState<WeeklyPlan | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const loadProfileAndPlan = useCallback(async () => {
    try {
      const profile = await getProfile();
      if (profile?.weekly_plan) {
        setWeeklyPlan(profile.weekly_plan);
        navigate('/plan');
      } else {
        navigate('/form');
      }
    } catch (e) {
      console.error("Failed to load profile", e);
      setError("Não foi possível carregar seu perfil. Tente novamente mais tarde.");
      navigate('/form');
    }
  }, [navigate]);

  useEffect(() => {
    if (!supabase) {
      navigate('/'); // Redireciona para landing se supabase não estiver inicializado
      return;
    }
    
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) {
        loadProfileAndPlan();
      } else if (window.location.pathname !== '/auth') { // Permite acesso à rota /auth sem sessão
        navigate('/');
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) {
        loadProfileAndPlan();
      } else if (window.location.pathname !== '/auth') { // Permite acesso à rota /auth sem sessão
        setWeeklyPlan(null);
        setError(null);
        navigate('/');
      }
    });

    return () => subscription.unsubscribe();
  }, [loadProfileAndPlan, navigate]);

  const handleLogout = async () => {
    if (!supabase) return;
    await supabase.auth.signOut();
    navigate('/');
  };

  const handleFormSubmit = useCallback(async (data: UserData) => {
    setError(null);
    navigate('/generating'); // Nova rota para o spinner
    try {
      await updateProfile(data);
      const plan = await generatePlan(data);
      await saveWeeklyPlan(plan);
      setWeeklyPlan(plan);
      navigate('/plan');
    } catch (err: any) {
      console.error(err);
      const errorMessage = err.message || 'Desculpe, não foi possível gerar seu plano. Verifique suas informações e tente novamente.';
      setError(errorMessage);
      navigate('/form');
    }
  }, [navigate]);

  const handleBackToForm = () => {
    setWeeklyPlan(null);
    setError(null);
    navigate('/form');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col">
      <Header session={session} onLogout={handleLogout} />
      <main className="flex-grow container mx-auto px-4 py-8 mt-20"> {/* Adicionado mt-20 para compensar o header fixo */}
        <Routes>
          <Route path="/" element={<LandingPage onStart={() => navigate('/auth')} />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/form" element={
            <>
              {error && (
                <div className="text-center mb-6 max-w-2xl mx-auto">
                  <p className="text-red-500 bg-red-100 p-4 rounded-lg">{error}</p>
                </div>
              )}
              <InputForm onSubmit={handleFormSubmit} />
            </>
          } />
          <Route path="/generating" element={<LoadingSpinner />} />
          <Route path="/plan" element={weeklyPlan ? <PlanDisplay plan={weeklyPlan} onBack={handleBackToForm} /> : <LoadingSpinner />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
