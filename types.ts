
export interface UserData {
  age: number;
  gender: 'Feminino' | 'Masculino' | 'Outro';
  weight: number;
  height: number;
  weightGoal: string;
  healthConditions: string;
  dietaryRestrictions: string;
  activityLevel: 'Muito sedentário' | 'Caminha um pouco' | 'Moderadamente ativo' | 'Muito ativo';
  foodPreferences: string;
  resources: string;
}

export interface Profile extends Partial<UserData> {
    id: string;
    updated_at: string;
    is_enabled: boolean;
    weekly_plan?: WeeklyPlan | null;
}

export interface Exercise {
  name: string;
  description: string;
}

export interface Meal {
  option: string;
  benefits: string;
}

export interface DailyPlan {
  dayOfWeek: string;
  exerciseFocus: string;
  exercises: Exercise[];
  exerciseNotes: string[];
  mealFocus: string;
  breakfast: Meal;
  morningSnack: Meal;
  lunch: Meal;
  afternoonSnack: Meal;
  dinner: Meal;
  mealNotes: string[];
  vitalityReminders: {
    hydration: string;
    movement: string;
    supplements: string;
    mentalWellbeing: string;
    professionalFollowUp: string;
  };
  vidaVitoriosa: {
    verse: string;
    motivation: string;
  };
}

export interface WeeklyPlan {
  introduction: string;
  plan: DailyPlan[];
}

declare module '*.css' {
  const content: { [className: string]: string };
  export default content;
}
