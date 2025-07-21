import { GoogleGenAI, Type } from "@google/genai";
import type { UserData, WeeklyPlan } from '../types';

// The GoogleGenAI client is initialized using the API key from environment variables,
// as per the project's guidelines. The environment is responsible for providing
// a valid process.env.API_KEY.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const systemInstruction = `
Você é o "Guardião do Bem-Estar 60+", um assistente de IA compassivo e especialista em saúde e bem-estar para idosos.

Sua missão é criar planos semanais personalizados de exercícios de baixo impacto e nutrição balanceada para pessoas com 60 anos ou mais, focando em segurança, vitalidade e qualidade de vida.

REGRAS CRÍTICAS:
1.  **Segurança em Primeiro Lugar:** Sugira APENAS exercícios de baixo impacto. NUNCA recomende atividades de alto impacto que sobrecarreguem articulações, coração ou pulmões. Exemplos seguros: caminhada leve, hidroginástica, alongamento, yoga adaptada, tai chi, exercícios com faixas elásticas e pesos leves.
2.  **Dieta Personalizada:** O plano alimentar deve ser nutricionalmente denso, de fácil digestão e mastigação. Foque em alimentos integrais, ricos em fibras, proteínas magras, gorduras saudáveis e carboidratos complexos.
3.  **Foco em Nutrientes Essenciais:** Dê atenção especial a alimentos ricos em cálcio, vitamina D, B12, ômega-3, magnésio e potássio.
4.  **Suplementação com Cautela:** Mencione a importância da suplementação, mas SEMPRE reforce que a necessidade e dosagem DEVEM ser definidas por um médico ou nutricionista.
5.  **Não-Substituição:** Em TODAS as respostas, deixe claro que você é um guia de apoio e NÃO substitui o acompanhamento profissional. Qualquer dor ou dúvida deve ser comunicada a um médico.
6.  **Linguagem:** Use um tom encorajador, respeitoso, empático e claro em português do Brasil.
7.  **Adaptação:** Adapte rigorosamente o plano com base nas condições de saúde, restrições e recursos do usuário. Se o usuário tem osteoartrite no joelho, priorize exercícios na água ou sentado. Se tem intolerância à lactose, forneça alternativas.
8.  **Introdução:** Comece sempre com uma saudação calorosa e personalizada, reconhecendo o objetivo do usuário e reforçando a mensagem de apoio e segurança.
9.  **Vida Vitoriosa:** Ao final de cada plano diário, inclua uma seção "Vida Vitoriosa". Ela deve conter um versículo bíblico inspirador e uma breve reflexão motivacional baseada no versículo, conectando-o a temas de força, perseverança e fé.
`;

const responseSchema = {
    type: Type.OBJECT,
    properties: {
        introduction: {
            type: Type.STRING,
            description: "Uma introdução calorosa e personalizada, dando as boas-vindas ao usuário, reconhecendo seus objetivos e reforçando a mensagem de que o plano é um apoio e não substitui o acompanhamento profissional."
        },
        plan: {
            type: Type.ARRAY,
            description: "Uma lista de 7 planos diários, um para cada dia da semana.",
            items: {
                type: Type.OBJECT,
                properties: {
                    dayOfWeek: { type: Type.STRING, description: "O dia da semana (ex: Segunda-feira)." },
                    exerciseFocus: { type: Type.STRING, description: "O foco principal dos exercícios do dia (ex: Mobilidade Articular)." },
                    exercises: {
                        type: Type.ARRAY,
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                name: { type: Type.STRING, description: "Nome do exercício." },
                                description: { type: Type.STRING, description: "Descrição clara e segura de como executar o exercício, incluindo séries e repetições." }
                            }
                        }
                    },
                    exerciseNotes: {
                        type: Type.ARRAY, items: { type: Type.STRING },
                        description: "Observações importantes sobre os exercícios, como aquecimento, alongamento e a importância de ouvir o corpo."
                    },
                    mealFocus: { type: Type.STRING, description: "O foco nutricional do dia (ex: Fontes de Cálcio e Fibras)." },
                    breakfast: {
                        type: Type.OBJECT, properties: {
                            option: { type: Type.STRING, description: "Sugestão para o café da manhã." },
                            benefits: { type: Type.STRING, description: "Benefícios específicos da refeição para idosos." }
                        }
                    },
                    morningSnack: {
                        type: Type.OBJECT, properties: {
                            option: { type: Type.STRING, description: "Sugestão para o lanche da manhã." },
                            benefits: { type: Type.STRING, description: "Benefícios específicos da refeição para idosos." }
                        }
                    },
                    lunch: {
                        type: Type.OBJECT, properties: {
                            option: { type: Type.STRING, description: "Sugestão para o almoço." },
                            benefits: { type: Type.STRING, description: "Benefícios específicos da refeição para idosos." }
                        }
                    },
                    afternoonSnack: {
                        type: Type.OBJECT, properties: {
                            option: { type: Type.STRING, description: "Sugestão para o lanche da tarde." },
                            benefits: { type: Type.STRING, description: "Benefícios específicos da refeição para idosos." }
                        }
                    },
                    dinner: {
                        type: Type.OBJECT, properties: {
                            option: { type: Type.STRING, description: "Sugestão para o jantar." },
                            benefits: { type: Type.STRING, description: "Benefícios específicos da refeição para idosos." }
                        }
                    },
                    mealNotes: {
                        type: Type.ARRAY, items: { type: Type.STRING },
                        description: "Observações importantes sobre a nutrição, como hidratação e variedade."
                    },
                    vitalityReminders: {
                        type: Type.OBJECT,
                        properties: {
                            hydration: { type: Type.STRING },
                            movement: { type: Type.STRING },
                            supplements: { type: Type.STRING },
                            mentalWellbeing: { type: Type.STRING },
                            professionalFollowUp: { type: Type.STRING }
                        }
                    },
                    vidaVitoriosa: {
                        type: Type.OBJECT,
                        description: "Uma seção com um versículo bíblico e uma motivação baseada nele.",
                        properties: {
                            verse: { type: Type.STRING, description: "Um versículo bíblico inspirador (ex: 'Filipenses 4:13')." },
                            motivation: { type: Type.STRING, description: "Uma breve reflexão motivacional conectada ao versículo." }
                        }
                    }
                }
            }
        }
    }
};

export const generatePlan = async (userData: UserData): Promise<WeeklyPlan> => {
  const prompt = `
    Por favor, crie um plano semanal completo para o seguinte usuário, seguindo estritamente as suas diretrizes e o schema JSON fornecido.

    **Dados do Usuário:**
    - Idade: ${userData.age}
    - Gênero: ${userData.gender}
    - Peso Atual: ${userData.weight} kg
    - Altura: ${userData.height} cm
    - Objetivo de Peso: ${userData.weightGoal}
    - Condições de Saúde Relevantes: ${userData.healthConditions}
    - Restrições Alimentares/Alergias: ${userData.dietaryRestrictions}
    - Nível de Atividade Física Atual: ${userData.activityLevel}
    - Preferências Alimentares: ${userData.foodPreferences}
    - Recursos disponíveis para exercícios: ${userData.resources}

    Gere um plano para 7 dias, começando pela Segunda-feira.
  `;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
    config: {
        systemInstruction: systemInstruction,
        responseMimeType: "application/json",
        responseSchema: responseSchema,
    },
  });

  const jsonText = response.text.trim();
  try {
    return JSON.parse(jsonText) as WeeklyPlan;
  } catch (e) {
    console.error("Failed to parse Gemini JSON response:", e);
    console.error("Raw response text:", jsonText);
    throw new Error("A resposta da IA não estava no formato JSON esperado.");
  }
};