
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

type View = 'loading' | 'landing' | 'auth' | 'form' | 'generating' | 'plan';

function App() {
  const [session, setSession] = useState<Session | null>(null);
  const [view, setView] = useState<View>('loading');
  const [weeklyPlan, setWeeklyPlan] = useState<WeeklyPlan | null>(null);
  const [error, setError] = useState<string | null>(null);

  const loadProfileAndPlan = useCallback(async () => {
    try {
      const profile = await getProfile();
      if (profile?.weekly_plan) {
        setWeeklyPlan(profile.weekly_plan);
        setView('plan');
      } else {
        setView('form');
      }
    } catch (e) {
      console.error("Failed to load profile", e);
      setError("Não foi possível carregar seu perfil. Tente novamente mais tarde.");
      setView('form');
    }
  }, []);

  useEffect(() => {
    if (!supabase) {
      setView('landing'); // Failsafe if supabase is not initialized
      return;
    }
    
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) {
        loadProfileAndPlan();
      } else {
        setView('landing');
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) {
        // Only change view if user was previously logged out
        setView(currentView => {
           if (currentView === 'landing' || currentView === 'auth') {
             loadProfileAndPlan();
             return 'loading'; // Will be updated by loadProfileAndPlan
           }
           return currentView;
        });
      } else {
        setWeeklyPlan(null);
        setError(null);
        setView('landing');
      }
    });

    return () => subscription.unsubscribe();
  }, [loadProfileAndPlan]);

  const handleLogout = async () => {
    if (!supabase) return;
    await supabase.auth.signOut();
  };

  const handleFormSubmit = useCallback(async (data: UserData) => {
    setView('generating');
    setError(null);
    try {
      await updateProfile(data);
      const plan = await generatePlan(data);
      await saveWeeklyPlan(plan); // Save the newly generated plan
      setWeeklyPlan(plan);
      setView('plan');
    } catch (err: any) {
      console.error(err);
      const errorMessage = err.message || 'Desculpe, não foi possível gerar seu plano. Verifique suas informações e tente novamente.';
      setError(errorMessage);
      setView('form');
    }
  }, []);

  const handleBackToForm = () => {
    setWeeklyPlan(null);
    setError(null);
    setView('form');
  };

  const handleGoHome = useCallback(() => {
    if (session) {
      // Se o usuário estiver logado, volta para o formulário ou plano existente
      loadProfileAndPlan(); // Isso vai definir 'form' ou 'plan'
    } else {
      // Se não estiver logado, volta para a landing page
      setView('landing');
    }
    setError(null); // Limpa qualquer erro ao voltar para a home
  }, [session, loadProfileAndPlan]);

  const renderContent = () => {
    if (!supabase) {
      return null; // Error message is handled by supabaseClient.ts
    }
    
    if (view === 'loading') {
        return <LoadingSpinner />;
    }

    if (!session) {
      switch (view) {
        case 'auth':
          return <Auth />;
        case 'landing':
        default:
          return <LandingPage onStart={() => setView('auth')} />;
      }
    }
    
    switch (view) {
      case 'generating':
        return <LoadingSpinner />;
      case 'plan':
        return weeklyPlan ? <PlanDisplay plan={weeklyPlan} onBack={handleBackToForm} /> : <LoadingSpinner />;
      case 'form':
      default:
        return (
          <>
            {error && (
              <div className="text-center mb-6 max-w-2xl mx-auto">
                <p className="text-red-500 bg-red-100 p-4 rounded-lg">{error}</p>
              </div>
            )}
            <InputForm onSubmit={handleFormSubmit} />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col">
      <Header session={session} onLogout={handleLogout} onHome={handleGoHome} />
      <main className="flex-grow container mx-auto px-4 py-8">
        {renderContent()}
      </main>
      <Footer />
    </div>
  );
}

export default App;
