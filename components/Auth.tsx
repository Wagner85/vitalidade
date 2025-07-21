
import React, { useState } from 'react';
import { supabase } from '../services/supabaseClient';
import Button from './ui/Button';
import Input from './ui/Input';
import Card from './ui/Card';

const Auth: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [isLoginView, setIsLoginView] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const handleAuth = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
        let authResponse;
        if (isLoginView) {
            authResponse = await supabase.auth.signInWithPassword({ email, password });
        } else {
            authResponse = await supabase.auth.signUp({ 
                email, 
                password,
                options: {
                    emailRedirectTo: window.location.origin,
                }
            });
            if (!authResponse.error) {
                setMessage('Cadastro realizado! Por favor, verifique seu e-mail para confirmar sua conta.');
            }
        }
        if (authResponse.error) throw authResponse.error;
    } catch (error: any) {
        setError(error.error_description || error.message);
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto">
        <Card>
            <div className="p-8">
                <h2 className="text-2xl font-bold text-slate-800 mb-2">{isLoginView ? 'Login' : 'Crie sua Conta'}</h2>
                <p className="text-slate-600 mb-6">
                    {isLoginView ? 'Bem-vindo(a) de volta!' : 'Comece sua jornada para uma vida mais saudável.'}
                </p>
                <form onSubmit={handleAuth} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                        <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="seu@email.com" />
                    </div>
                    <div>
                        <label htmlFor="password"className="block text-sm font-medium text-slate-700 mb-1">Senha</label>
                        <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} placeholder="Pelo menos 6 caracteres" />
                    </div>
                    <div className="pt-2">
                        <Button type="submit" size="lg" disabled={loading} className="w-full">
                            {loading ? 'Carregando...' : (isLoginView ? 'Entrar' : 'Cadastrar')}
                        </Button>
                    </div>
                </form>

                {error && <p className="mt-4 text-center text-sm text-red-600 bg-red-100 p-3 rounded-lg">{error}</p>}
                {message && <p className="mt-4 text-center text-sm text-green-700 bg-green-100 p-3 rounded-lg">{message}</p>}

                <div className="mt-6 text-center">
                    <button onClick={() => { setIsLoginView(!isLoginView); setError(null); setMessage(null); }} className="text-sm font-medium text-emerald-600 hover:underline">
                        {isLoginView ? 'Não tem uma conta? Cadastre-se' : 'Já tem uma conta? Faça login'}
                    </button>
                </div>
            </div>
        </Card>
    </div>
  );
};

export default Auth;
