
import { supabase } from './supabaseClient';
import type { UserData, Profile, WeeklyPlan } from '../types';

/**
 * Busca o perfil do usuário atualmente logado no banco de dados.
 * @returns O perfil do usuário ou null se não estiver logado ou não encontrado.
 */
export const getProfile = async (): Promise<Profile | null> => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        return null;
    }

    const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

    // "PGRST116" é o código para "nenhuma linha encontrada", o que é esperado para novos usuários.
    if (error && error.code !== 'PGRST116') {
        console.error('Erro ao buscar perfil:', error);
        throw error;
    }
    
    return data;
};

/**
 * Atualiza o perfil do usuário com os novos dados do formulário.
 * @param data - Os dados do formulário a serem salvos.
 */
export const updateProfile = async (data: UserData) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        throw new Error("Usuário não autenticado. Impossível atualizar o perfil.");
    }
    
    // As chaves no objeto 'data' correspondem diretamente aos nomes das colunas na tabela 'profiles'.
    const { error } = await supabase
        .from('profiles')
        .update(data)
        .eq('id', user.id);

    if (error) {
        console.error('Erro ao atualizar perfil:', error);
        throw new Error('Não foi possível salvar seu perfil.');
    }
};

/**
 * Salva o plano semanal gerado para o perfil do usuário.
 * @param plan - O objeto WeeklyPlan a ser salvo.
 */
export const saveWeeklyPlan = async (plan: WeeklyPlan) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        throw new Error("Usuário não autenticado. Impossível salvar o plano.");
    }

    const { error } = await supabase
        .from('profiles')
        .update({ weekly_plan: plan })
        .eq('id', user.id);

    if (error) {
        console.error('Erro ao salvar o plano semanal:', error);
        throw new Error('Não foi possível salvar seu plano semanal.');
    }
};
