
import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { UserData } from '../types';
import { getProfile } from '../services/profileService';
import Button from './ui/Button';
import Input from './ui/Input';
import Textarea from './ui/Textarea';
import Select from './ui/Select';
import Card from './ui/Card';

interface InputFormProps {
  onSubmit: (data: UserData) => void;
}

const InputForm: React.FC<InputFormProps> = ({ onSubmit }) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<UserData>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profileData = await getProfile();
        if (profileData) {
          // Preenche o formulário com os dados salvos do usuário
          const formData: Partial<UserData> = {
            age: profileData.age,
            gender: profileData.gender,
            weight: profileData.weight,
            height: profileData.height,
            weightGoal: profileData.weightGoal,
            healthConditions: profileData.healthConditions,
            dietaryRestrictions: profileData.dietaryRestrictions,
            activityLevel: profileData.activityLevel,
            foodPreferences: profileData.foodPreferences,
            resources: profileData.resources,
          };
          reset(formData);
        }
      } catch (error) {
        console.error("Erro ao buscar perfil:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [reset]);


  const onFormSubmit: SubmitHandler<UserData> = data => {
    // Convert numeric fields from string to number
    const processedData = {
        ...data,
        age: Number(data.age),
        weight: Number(data.weight),
        height: Number(data.height),
    };
    onSubmit(processedData);
  };
  
  if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
            <h2 className="mt-4 text-lg font-semibold text-slate-700">Carregando seu perfil...</h2>
        </div>
      )
  }

  return (
    <Card>
      <div className="p-8">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Conte-nos sobre Você</h2>
        <p className="text-slate-600 mb-6">Suas respostas nos ajudarão a criar o plano mais seguro e eficaz para suas necessidades. Suas informações são confidenciais.</p>
        
        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="age" className="block text-sm font-medium text-slate-700 mb-1">Idade</label>
              <Input id="age" type="number" {...register('age', { required: 'Idade é obrigatória', min: { value: 50, message: 'A idade mínima é 50 anos' } })} />
              {errors.age && <p className="text-red-500 text-sm mt-1">{errors.age.message}</p>}
            </div>
            <div>
              <label htmlFor="gender" className="block text-sm font-medium text-slate-700 mb-1">Gênero</label>
              <Select id="gender" {...register('gender', { required: 'Gênero é obrigatório' })}>
                <option value="Feminino">Feminino</option>
                <option value="Masculino">Masculino</option>
                <option value="Outro">Outro/Prefiro não dizer</option>
              </Select>
              {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender.message}</p>}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
             <div>
                <label htmlFor="weight" className="block text-sm font-medium text-slate-700 mb-1">Peso Atual (kg)</label>
                <Input id="weight" type="number" step="0.1" {...register('weight', { required: 'Peso é obrigatório', min: { value: 30, message: 'Peso inválido' } })} />
                {errors.weight && <p className="text-red-500 text-sm mt-1">{errors.weight.message}</p>}
             </div>
             <div>
                <label htmlFor="height" className="block text-sm font-medium text-slate-700 mb-1">Altura (cm)</label>
                <Input id="height" type="number" {...register('height', { required: 'Altura é obrigatória', min: { value: 100, message: 'Altura inválida' } })} />
                {errors.height && <p className="text-red-500 text-sm mt-1">{errors.height.message}</p>}
             </div>
          </div>

          <div>
            <label htmlFor="activityLevel" className="block text-sm font-medium text-slate-700 mb-1">Nível de Atividade Física Atual</label>
            <Select id="activityLevel" {...register('activityLevel', { required: 'Nível de atividade é obrigatório' })}>
                <option value="Muito sedentário">Muito sedentário(a)</option>
                <option value="Caminha um pouco">Caminho um pouco (ex: 20 min, 3x/semana)</option>
                <option value="Moderadamente ativo">Moderadamente ativo(a)</option>
                <option value="Muito ativo">Muito ativo(a)</option>
            </Select>
            {errors.activityLevel && <p className="text-red-500 text-sm mt-1">{errors.activityLevel.message}</p>}
          </div>

          <div>
            <label htmlFor="weightGoal" className="block text-sm font-medium text-slate-700 mb-1">Qual seu principal objetivo? (Ex: perder 5kg, ganhar mais disposição, melhorar mobilidade)</label>
            <Input id="weightGoal" {...register('weightGoal', { required: 'Objetivo é obrigatório' })} />
            {errors.weightGoal && <p className="text-red-500 text-sm mt-1">{errors.weightGoal.message}</p>}
          </div>

          <div>
            <label htmlFor="healthConditions" className="block text-sm font-medium text-slate-700 mb-1">Condições de Saúde Relevantes (crítico para sua segurança)</label>
            <Textarea id="healthConditions" placeholder="Ex: Osteoartrite nos joelhos, pressão alta controlada, diabetes tipo 2, osteoporose" {...register('healthConditions', { required: 'Esta informação é crucial para sua segurança.' })} />
            {errors.healthConditions && <p className="text-red-500 text-sm mt-1">{errors.healthConditions.message}</p>}
          </div>

          <div>
            <label htmlFor="dietaryRestrictions" className="block text-sm font-medium text-slate-700 mb-1">Restrições Alimentares ou Alergias</label>
            <Textarea id="dietaryRestrictions" placeholder="Ex: Intolerância à lactose, alergia a frutos do mar, não como carne vermelha, sou vegetariano(a)" {...register('dietaryRestrictions', { required: true })} />
             {errors.dietaryRestrictions && <p className="text-red-500 text-sm mt-1">{errors.dietaryRestrictions.message}</p>}
          </div>
          
          <div>
            <label htmlFor="foodPreferences" className="block text-sm font-medium text-slate-700 mb-1">Preferências Alimentares (Opcional)</label>
            <Textarea id="foodPreferences" placeholder="Ex: Gosto muito de peixe, não gosto de brócolis, prefiro café da manhã doce" {...register('foodPreferences')} />
          </div>

          <div>
            <label htmlFor="resources" className="block text-sm font-medium text-slate-700 mb-1">Recursos disponíveis para exercícios</label>
            <Textarea id="resources" placeholder="Ex: Tenho acesso a uma piscina, posso caminhar no parque, tenho faixas elásticas em casa, prefiro exercícios em casa sem equipamento" {...register('resources', { required: true })} />
             {errors.resources && <p className="text-red-500 text-sm mt-1">{errors.resources.message}</p>}
          </div>

          <div className="text-right pt-4">
            <Button type="submit" size="lg">
              Gerar meu Plano Personalizado
            </Button>
          </div>
        </form>
      </div>
    </Card>
  );
};

export default InputForm;
