
import React from 'react';
import Button from './ui/Button';

interface LandingPageProps {
  onStart: () => void;
}

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; children: React.ReactNode }> = ({ icon, title, children }) => (
  <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
    <div className="flex items-center justify-center bg-emerald-100 rounded-full w-12 h-12 mb-4">
      {icon}
    </div>
    <h3 className="text-xl font-semibold text-slate-800 mb-2">{title}</h3>
    <p className="text-slate-600">{children}</p>
  </div>
);

const DumbbellIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-600"><path d="M14.4 14.4 9.6 9.6M18 7l-1.4-1.4M6 17l-1.4-1.4M21 16l-2-2M3 8l-2-2M12 22a1 1 0 0 0 1-1v-5a1 1 0 0 0-2 0v5a1 1 0 0 0 1 1ZM12 3a1 1 0 0 0-1 1v5a1 1 0 0 0 2 0V4a1 1 0 0 0-1-1Z"></path></svg>
);
const AppleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-600"><path d="M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0 0 17 5c-2.22 0-4 1.44-5 2-1-.56-2.78-2-5-2a4.9 4.9 0 0 0-5 4.78C2 14 5 22 8 22c1.25 0 2.5-1.06 4-1.06Z"></path><path d="M10 2c1 .5 2 2 2 5"></path></svg>
);
const HeartIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-600"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
);


const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
  return (
    <div className="flex flex-col items-center text-center">
      <section className="w-full py-20 md:py-32 bg-emerald-50 rounded-3xl">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-extrabold text-emerald-800 tracking-tight">
            Redescubra sua Vitalidade, com Segurança e Cuidado.
          </h2>
          <p className="mt-6 max-w-3xl mx-auto text-lg text-slate-600">
            Receba planos de exercícios e nutrição personalizados, criados por nossa IA especialista para promover um envelhecimento ativo e saudável. Seu bem-estar é a nossa prioridade.
          </p>
          <div className="mt-10">
            <Button onClick={onStart} size="lg">
              Começar minha Jornada
            </Button>
            <p className="mt-4 text-sm text-slate-500">Acesse com segurança para proteger suas informações.</p>
          </div>
        </div>
      </section>

      <section className="w-full py-20 md:py-24">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-slate-800 mb-12">Seu Guardião do Bem-Estar 60+</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard icon={<DumbbellIcon/>} title="Exercícios Seguros">
              Rotinas de baixo impacto para fortalecer, melhorar o equilíbrio e aumentar a mobilidade, respeitando seus limites.
            </FeatureCard>
            <FeatureCard icon={<AppleIcon/>} title="Nutrição Inteligente">
              Cardápios diários focados em nutrientes essenciais para a sua idade, considerando suas preferências e restrições.
            </FeatureCard>
            <FeatureCard icon={<HeartIcon/>} title="Apoio Compassivo">
              Uma IA treinada para ser seu guia diário, com linguagem clara, encorajadora e empática.
            </FeatureCard>
          </div>
        </div>
      </section>

      <section className="w-full py-16 bg-slate-100 rounded-3xl">
        <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
                <h3 className="text-3xl font-bold text-slate-800">Como Funciona?</h3>
                <p className="mt-4 text-slate-600">É simples, rápido e totalmente confidencial.</p>
                <div className="mt-8 grid md:grid-cols-3 gap-8 text-left">
                   <div className="p-4">
                        <span className="text-3xl font-bold text-emerald-500">1.</span>
                        <h4 className="font-semibold text-lg mt-2">Crie sua Conta</h4>
                        <p className="text-sm text-slate-500 mt-1">Crie seu acesso seguro para que suas informações fiquem sempre protegidas.</p>
                   </div>
                   <div className="p-4">
                        <span className="text-3xl font-bold text-emerald-500">2.</span>
                        <h4 className="font-semibold text-lg mt-2">Conte-nos sobre Você</h4>
                        <p className="text-sm text-slate-500 mt-1">Preencha um formulário simples com suas metas, condições e preferências.</p>
                   </div>
                   <div className="p-4">
                        <span className="text-3xl font-bold text-emerald-500">3.</span>
                        <h4 className="font-semibold text-lg mt-2">Receba seu Plano</h4>
                        <p className="text-sm text-slate-500 mt-1">Nossa IA cria e apresenta um plano semanal exclusivo para você em instantes.</p>
                   </div>
                </div>
            </div>
        </div>
      </section>

    </div>
  );
};

export default LandingPage;
