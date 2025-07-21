
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


// As credenciais do Supabase foram fornecidas e configuradas para o projeto.
const supabaseUrl = 'https://qyjpkcjsnmkfntyrbueh.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF5anBrY2pzbm1rZm50eXJidWVoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMwOTI5MTUsImV4cCI6MjA2ODY2ODkxNX0.P-r6RQqGpUt1e_JrE_x-x7PjjbiIyc-pdX5qhO_nKk0';

// Validação para garantir que as chaves não estão vazias.
if (!supabaseUrl || !supabaseAnonKey) {
  // Isso não deve acontecer com as chaves fornecidas, mas é uma boa prática de segurança.
  throw new Error('As credenciais do Supabase (URL ou Chave Anon) estão ausentes no arquivo services/supabaseClient.ts');
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);