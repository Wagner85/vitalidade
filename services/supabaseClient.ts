
import { createClient } from '@supabase/supabase-js';
import type { Profile, UserData } from '../types';

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: Profile;
        Insert: Partial<UserData>;
        Update: Partial<Profile>;
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}


// As credenciais do Supabase são carregadas das variáveis de ambiente.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Validação para garantir que as chaves não estão vazias.
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('As credenciais do Supabase (VITE_SUPABASE_URL ou VITE_SUPABASE_ANON_KEY) estão ausentes nas variáveis de ambiente. Verifique seu arquivo .env.');
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
