
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-100 border-t border-slate-200 mt-12">
      <div className="container mx-auto px-4 py-6 text-center text-slate-500">
        <p className="font-semibold text-red-600 mb-2">AVISO IMPORTANTE</p>
        <p className="text-sm">
          VitalidadeDourada AI é uma ferramenta de apoio e incentivo. As informações e planos gerados
          não substituem, em nenhuma hipótese, a consulta e o acompanhamento de médicos, nutricionistas,
          fisioterapeutas e outros profissionais de saúde. Sempre consulte um profissional antes de
          iniciar qualquer novo programa de exercícios ou dieta.
        </p>
        <p className="text-xs mt-4">
          &copy; {new Date().getFullYear()} VitalidadeDourada AI. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
